// We want to wait for a new vote to be "executed"

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    //mintDelay: How long you have to wait before executing
    // proposers: the list of addresses that can propose
    // executors: who can execute when a proposal passes
    // admin: optional account to be granted admin role; disable with zero address
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
