// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";

contract Lock is UUPSUpgradeable, Ownable2StepUpgradeable {
    uint public unlockTime;
    uint public constant zaza = 10_000;
    uint public constant yuyu = 20_000;
    uint public constant bebe = 30_000;

    function _authorizeUpgrade(address) internal override onlyOwner {}

    event Withdrawal(uint amount, uint when);

    function initialize(uint _unlockTime) external initializer {
        __UUPSUpgradeable_init();
        __Ownable_init_unchained();
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
    }

    function withdraw() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");

        emit Withdrawal(address(this).balance, block.timestamp);
    }

    function getTime() external view returns (uint256) {
        return block.timestamp;
    }

    function getTime1() external view returns (uint256) {
        return block.timestamp + 1;
    }

}
