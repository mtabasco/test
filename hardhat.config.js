require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.16",
  networks: {
    goerli: {
      url: 'https://goerli.infura.io/v3/1810bc4fb927499990638f8451a455e4',
      accounts: ['0xae87f9772e5ce51b9aed74ea3614a4c2c6032eba125c92bdc65535ab4f34a5bc']
    }
  },
};
