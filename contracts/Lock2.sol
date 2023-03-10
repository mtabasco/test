// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./Lock.sol";

contract Lock2 is Lock {
    uint public newTime;

    function setTime() external {
        newTime = block.timestamp + 10;
    }
}
