const { ethers, upgrades } = require('hardhat');

async function upgradeSSVNetwork() {

  //const Lock2 = await ethers.getContractFactory("Lock2");
  const Lock3 = await ethers.getContractFactory("Lock3");

  //await upgrades.forceImport('0x81d9Ff669e40b4237B5e3Ced62b71a6f08665f3d', Lock, { kind: 'uups' });
  await upgrades.upgradeProxy('0x4c115F5948Ba632fF9B0a5a40f84Af9A825484e0', Lock3, { kind: 'uups' });

  console.log("Lock upgraded successfully");
}

upgradeSSVNetwork()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });