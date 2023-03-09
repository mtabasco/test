const { ethers, upgrades } = require('hardhat');

async function upgradeSSVNetwork() {

  //const Lock2 = await ethers.getContractFactory("Lock2");
  const Lock = await ethers.getContractFactory("Lock");

  //await upgrades.forceImport('0x81d9Ff669e40b4237B5e3Ced62b71a6f08665f3d', Lock, { kind: 'uups' });
  await upgrades.upgradeProxy('0x094025275548bEb649D02255130587D972968815', Lock, { kind: 'uups' });

  console.log("Lock upgraded successfully");
}

upgradeSSVNetwork()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });