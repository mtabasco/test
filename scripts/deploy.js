// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs').promises;

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await upgrades.deployProxy(Lock, [unlockTime], { kind: 'uups' });
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  await lock.deployed();

  // Only extract ABIs for mainnet or goerli deployments
  if (hre.network.name == 'goerli' || hre.network.name == 'mainnet') {
    const { abi: lockABI, contractName } = await hre.artifacts.readArtifact("Lock");

    await fs.mkdir('abi/', { recursive: true });
    await fs.writeFile(`abi/${contractName}.json`, `${JSON.stringify(lockABI, null, 2)}\n`, { flag: 'w' });
  }
  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
