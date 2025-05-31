// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/FlareFeeds.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address layerZeroEndpoint = vm.envAddress("LAYER_ZERO_ENDPOINT");
        address flareRegistry = vm.envAddress("FLARE_REGISTRY_ADDRESS");

        // Convert string array from env to uint256 array
        string memory feedIndexesStr = vm.envString("FTSO_FEED_INDEXES");
        // Remove brackets and split by comma
        feedIndexesStr = vm.replace(feedIndexesStr, "[", "");
        feedIndexesStr = vm.replace(feedIndexesStr, "]", "");
        string[] memory indexStrings = vm.split(feedIndexesStr, ",");
        
       
        

        vm.startBroadcast(deployerPrivateKey);
        
        FtsoV2FeedConsumer flareFeeds = new FtsoV2FeedConsumer(
            layerZeroEndpoint,
            flareRegistry,
            feedIndexes
        );
        
        vm.stopBroadcast();

        console.log("FtsoV2FeedConsumer deployed to:", address(flareFeeds));
    }
} 