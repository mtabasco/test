require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
const fs = require('fs').promises;

task("deploy:contracts", "A sample deploy")
  .addParam("tag", "Version of the contract")
  .setAction(async ({ tag }) => {
    try {
      const Lock = await hre.ethers.getContractFactory("Lock");
      const lock = await upgrades.deployProxy(Lock, [tag], { kind: 'uups' });
      // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
      await lock.deployed();

      // Only extract ABIs for mainnet or goerli deployments
      if (hre.network.name == 'goerli' || hre.network.name == 'mainnet') {
        const { abi: lockABI, contractName } = await hre.artifacts.readArtifact("Lock");

        await fs.mkdir('abi/', { recursive: true });
        await fs.writeFile(`abi/${contractName}.json`, `${JSON.stringify(lockABI, null, 2)}\n`, { flag: 'w' });
      }
      console.log(`Version ${tag} deployed to ${lock.address}`);
    } catch (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });

task("upgrade:Lock", "Upgrade Lock")
  .addParam("tag", "Version of the contract")
  .setAction(async ({ tag }) => {
    try {
      const Lock2 = await ethers.getContractFactory("Lock2");
      //const Lock3 = await ethers.getContractFactory("Lock3");

      //await upgrades.forceImport('0x81d9Ff669e40b4237B5e3Ced62b71a6f08665f3d', Lock, { kind: 'uups' });
      await upgrades.upgradeProxy('0xAdfB55F01564CFcc30534B056e63B33bdd8D08f4', Lock2, {
        kind: 'uups',
        call: {
          fn: 'initializev2',
          args: [tag]
        }
      });

      console.log("Lock upgraded successfully");
      console.log(`Version ${tag} deployed`);
    } catch (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.16",
  networks: {
    goerli: {
      url: 'https://goerli.infura.io/v3/1810bc4fb927499990638f8451a455e4',
      accounts: ['0xae87f9772e5ce51b9aed74ea3614a4c2c6032eba125c92bdc65535ab4f34a5bc']
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "9KSBBHVJ7R9QKYGQW4R3CNM5GZE8YBQ7YR"
  },
};
