// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockscoutUtils {
    // Mapping of Etherscan base URLs to Blockscout base URLs
    mapping(string => string) private etherscanToBlockscout;

    constructor() {
        etherscanToBlockscout["https://etherscan.io"] = "https://eth.blockscout.com";
        etherscanToBlockscout["https://sepolia.etherscan.io"] = "https://eth-sepolia.blockscout.com";
        etherscanToBlockscout["https://optimistic.etherscan.io"] = "https://optimism.blockscout.com";
        etherscanToBlockscout["https://arbiscan.io"] = "https://arbitrum.blockscout.com";
        etherscanToBlockscout["https://polygonscan.com"] = "https://polygon.blockscout.com";
        etherscanToBlockscout["https://gnosisscan.io"] = "https://gnosis.blockscout.com";
        etherscanToBlockscout["https://celoscan.io"] = "https://celo.blockscout.com";
    }

    // Function to replace Etherscan URL with Blockscout URL
    function replaceExplorerLink(string memory etherscanUrl) public view returns (string memory) {
        for (string memory etherscanBase in etherscanToBlockscout) {
            if (startsWith(etherscanUrl, etherscanBase)) {
                string memory blockscoutBase = etherscanToBlockscout[etherscanBase];
                return string(abi.encodePacked(blockscoutBase, substring(etherscanUrl, bytes(etherscanBase).length)));
            }
        }
        revert("Unsupported Etherscan URL");
    }

    // Helper function to check if a string starts with another string
    function startsWith(string memory str, string memory prefix) internal pure returns (bool) {
        return bytes(str).length >= bytes(prefix).length &&
               keccak256(abi.encodePacked(substring(str, 0, bytes(prefix).length))) == keccak256(abi.encodePacked(prefix));
    }

    // Helper function to get a substring
    function substring(string memory str, uint startIndex, uint endIndex) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }
        return string(result);
    }
}