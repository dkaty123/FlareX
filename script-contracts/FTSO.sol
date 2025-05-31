// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {TestFtsoV2Interface} from "@flarenetwork/flare-periphery-contracts/coston2/TestFtsoV2Interface.sol";
import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import {IFeeCalculator} from "@flarenetwork/flare-periphery-contracts/coston2/IFeeCalculator.sol";

contract FtsoV2Consumer {
    bytes21 public constant flrUsdId = 0x01464c522f55534400000000000000000000000000;

    bytes21[] public feedIds = [
        0x01464c522f55534400000000000000000000000000,
        0x014254432f55534400000000000000000000000000,
        0x014554482f55534400000000000000000000000000
    ];

    function getFlrUsdPrice() external view returns (uint256, int8, uint64) {
        TestFtsoV2Interface ftsoV2 = ContractRegistry.getFtsoV2();
        return ftsoV2.getFeedById(flrUsdId);
    }

    function getFlrUsdPriceWei() external view returns (uint256, uint64) {
        TestFtsoV2Interface ftsoV2 = ContractRegistry.getFtsoV2();
        return ftsoV2.getFeedByIdInWei(flrUsdId);
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
        TestFtsoV2Interface ftsoV2 = ContractRegistry.getFtsoV2();
        return ftsoV2.getFeedsById(feedIds);
    }
}
