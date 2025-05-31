// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {
    HOOKS_BEFORE_INITIALIZE_OFFSET,
    HOOKS_AFTER_INITIALIZE_OFFSET,
    HOOKS_BEFORE_ADD_LIQUIDITY_OFFSET,
    HOOKS_AFTER_ADD_LIQUIDITY_OFFSET,
    HOOKS_BEFORE_REMOVE_LIQUIDITY_OFFSET,
    HOOKS_AFTER_REMOVE_LIQUIDITY_OFFSET,
    HOOKS_BEFORE_SWAP_OFFSET,
    HOOKS_AFTER_SWAP_OFFSET,
    HOOKS_BEFORE_DONATE_OFFSET,
    HOOKS_AFTER_DONATE_OFFSET,
    HOOKS_BEFORE_SWAP_RETURNS_DELTA_OFFSET,
    HOOKS_AFTER_SWAP_RETURNS_DELTA_OFFSET,
    HOOKS_AFTER_ADD_LIQUIDIY_RETURNS_DELTA_OFFSET,
    HOOKS_AFTER_REMOVE_LIQUIDIY_RETURNS_DELTA_OFFSET
} from "@pancakeswap/v4-core/src/pool-cl/interfaces/ICLHooks.sol";
import {PoolKey} from "@pancakeswap/v4-core/src/types/PoolKey.sol";
import {BalanceDelta} from "@pancakeswap/v4-core/src/types/BalanceDelta.sol";
import {BeforeSwapDelta} from "@pancakeswap/v4-core/src/types/BeforeSwapDelta.sol";
import {IHooks} from "@pancakeswap/v4-core/src/interfaces/IHooks.sol";
import {IVault} from "@pancakeswap/v4-core/src/interfaces/IVault.sol";
import {ICLHooks} from "@pancakeswap/v4-core/src/pool-cl/interfaces/ICLHooks.sol";
import {ICLPoolManager} from "@pancakeswap/v4-core/src/pool-cl/interfaces/ICLPoolManager.sol";
import {CLPoolManager} from "@pancakeswap/v4-core/src/pool-cl/CLPoolManager.sol";


abstract contract CLBaseHook is ICLHooks {
    error NotPoolManager();
    error NotVault();
    error NotSelf();
    error InvalidPool();
    error LockFailure();
    error HookNotImplemented();

    struct Permissions {
        bool beforeInitialize;
        bool afterInitialize;
        bool beforeAddLiquidity;
        bool afterAddLiquidity;
        bool beforeRemoveLiquidity;
        bool afterRemoveLiquidity;
        bool beforeSwap;
        bool afterSwap;
        bool beforeDonate;
        bool afterDonate;
        bool beforeSwapReturnsDelta;
        bool afterSwapReturnsDelta;
        bool afterAddLiquidityReturnsDelta;
        bool afterRemoveLiquidityReturnsDelta;
    }

    /// @notice The address of the pool manager
    ICLPoolManager public immutable poolManager;

    /// @notice The address of the vault
    IVault public immutable vault;

    constructor(ICLPoolManager _poolManager) {
        poolManager = _poolManager;
        vault = CLPoolManager(address(poolManager)).vault();
    }

    /// @dev Only the pool manager may call this function
    modifier poolManagerOnly() {
        if (msg.sender != address(poolManager)) revert NotPoolManager();
        _;
    }

    /// @dev Only the vault may call this function
    modifier vaultOnly() {
        if (msg.sender != address(vault)) revert NotVault();
        _;
    }

}
