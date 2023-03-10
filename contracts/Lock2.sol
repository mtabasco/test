// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./Lock.sol";

contract Lock2 is Lock {
    uint public newTime;

    function initializev2(string calldata _version) external reinitializer(_getInitializedVersion() + 1) {
         version = _version;
    }

    function setTime() external {
        newTime = block.timestamp + 12;
    }
}
