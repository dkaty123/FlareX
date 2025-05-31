// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {PoolKey} from "@pancakeswap/v4-core/src/types/PoolKey.sol";
import {BalanceDelta, BalanceDeltaLibrary} from "@pancakeswap/v4-core/src/types/BalanceDelta.sol";
import {BeforeSwapDelta, BeforeSwapDeltaLibrary} from "@pancakeswap/v4-core/src/types/BeforeSwapDelta.sol";
import {PoolId, PoolIdLibrary} from "@pancakeswap/v4-core/src/types/PoolId.sol";
import {IBinPoolManager} from "@pancakeswap/v4-core/src/pool-bin/interfaces/IBinPoolManager.sol";
import {BinBaseHook} from "./BinBaseHook.sol";

/// @notice BinCounterHook is a contract that counts the number of times a hook is called
/// @dev note the code is not production ready, it is only to share how a hook looks like
contract BinCounterHook is BinBaseHook {
    using PoolIdLibrary for PoolKey;

    mapping(PoolId => uint256 count) public beforeMintCount;
    mapping(PoolId => uint256 count) public afterMintCount;
    mapping(PoolId => uint256 count) public beforeSwapCount;
    mapping(PoolId => uint256 count) public afterSwapCount;

    constructor(IBinPoolManager _poolManager) BinBaseHook(_poolManager) {}

    function getHooksRegistrationBitmap() external pure override returns (uint16) {
        return _hooksRegistrationBitmapFrom(
            Permissions({
                beforeInitialize: false,
                afterInitialize: false,
                beforeMint: true,
                afterMint: true,
                beforeBurn: false,
                afterBurn: false,
                beforeSwap: true,
                afterSwap: true,
                beforeDonate: false,
                afterDonate: false,
                beforeSwapReturnsDelta: false,
                afterSwapReturnsDelta: false,
                afterMintReturnsDelta: false,
                afterBurnReturnsDelta: false
            })
        );
    }
