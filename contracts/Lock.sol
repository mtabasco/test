// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";

contract Lock is UUPSUpgradeable, Ownable2StepUpgradeable {
    string public version;
    uint public coco;

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function initialize(string calldata _version) external initializer {
        __UUPSUpgradeable_init();
        __Ownable_init_unchained();

        version = _version;
        coco = 10_000;
    }

    function getTime() external view returns (uint256) {
        return block.timestamp + 1;
    }
}
