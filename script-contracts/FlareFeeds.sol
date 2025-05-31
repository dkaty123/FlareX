// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { IFlareContractRegistry } from "lib/flare-foundry-periphery-package/src/coston2/util-contracts/userInterfaces/IFlareContractRegistry.sol";
import { IFastUpdater } from "lib/flare-foundry-periphery-package/src/coston2/util-contracts/userInterfaces/IFastUpdater.sol";
import "lib/LayerZero/contracts/interfaces/ILayerZeroEndpoint.sol";
import "lib/LayerZero/contracts/interfaces/ILayerZeroReceiver.sol";

contract FtsoV2FeedConsumer is ILayerZeroReceiver {
    IFlareContractRegistry public contractRegistry;
    IFastUpdater public ftsoV2;
    ILayerZeroEndpoint public endpoint;
    uint256[] public feedIndexes;
    address public owner;

    struct MessagingFee {
        uint256 nativeFee;
        uint256 lzTokenFee;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(
        address _endpoint,
        address _contractRegistry,
        uint256[] memory _feedIndexes
    ) {
        require(_endpoint != address(0), "Invalid endpoint address");
        require(_contractRegistry != address(0), "Invalid registry address");
        require(_feedIndexes.length > 0, "Must provide at least one feed index");
        
        owner = msg.sender;
        endpoint = ILayerZeroEndpoint(_endpoint);
        contractRegistry = IFlareContractRegistry(_contractRegistry);
        ftsoV2 = IFastUpdater(contractRegistry.getContractAddressByName("FastUpdater"));
        feedIndexes = _feedIndexes;
    }

    function updateFeedIndexes(uint256[] memory _newIndexes) external onlyOwner {
        require(_newIndexes.length > 0, "Must provide at least one feed index");
        feedIndexes = _newIndexes;
        emit FeedIndexesUpdated(_newIndexes);
    }

    function updateEndpoint(address _newEndpoint) external onlyOwner {
        require(_newEndpoint != address(0), "Invalid endpoint address");
        endpoint = ILayerZeroEndpoint(_newEndpoint);
        emit EndpointUpdated(_newEndpoint);
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid owner address");
        owner = _newOwner;
        emit OwnershipTransferred(msg.sender, _newOwner);
    }

    function getFtsoV2CurrentFeedValues()
        external
        view
        returns (
            uint256[] memory _feedValues,
            int8[] memory _decimals,
            uint64 _timestamp
        )
    {
        (uint256[] memory feedValues, int8[] memory decimals, uint64 timestamp) = ftsoV2.fetchCurrentFeeds(feedIndexes);
        return (feedValues, decimals, timestamp);
    }

    



    function _lzSend(
        uint16 _dstChainId,
        bytes memory _payload,
        bytes memory _options,
        MessagingFee memory fees,
        address payable _refundAddress
    ) internal {
        require(_dstChainId > 0, "Invalid destination chain ID");
        require(_payload.length > 0, "Payload cannot be empty");

        emit SendingMessage(_dstChainId, _payload, _options);

        endpoint.send{value: fees.nativeFee}(
            _dstChainId,
            abi.encodePacked(address(this)),
            _payload,
            _refundAddress,
            address(0x0),
            _options
        );
    }


    function estimateFees(
        uint16 _dstChainId,
        bytes calldata _destination,
        bytes calldata _payload
    ) external view returns (uint256 nativeFee, uint256 zroFee) {
        return endpoint.estimateFees(_dstChainId, address(this), _payload, false, bytes(""));
    }

    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner).transfer(balance);
        emit FundsWithdrawn(balance);
    }

    receive() external payable {}

    // Events
    event SendingMessage(uint16 indexed dstChainId, bytes payload, bytes options);
    event ReceivedMessage(uint16 indexed srcChainId, bytes indexed srcAddress, uint64 indexed nonce, bytes payload);
    event DecodedMessage(string message, uint256 value);
    event FeedIndexesUpdated(uint256[] newIndexes);
    event EndpointUpdated(address newEndpoint);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event FundsWithdrawn(uint256 amount);
}
