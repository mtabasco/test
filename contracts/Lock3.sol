// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./Lock2.sol";

contract Lock3 is Lock2 {

    function initializev3(string calldata _version) external reinitializer(_getInitializedVersion() + 1) {
         version = _version;
    }

    function setNewTime() external {
        newTime = block.timestamp + 100;
    }
}
