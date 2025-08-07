const { ethers } = require("hardhat");



async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const TestToken = await ethers.getContractFactory("TestToken");
  const contract = await TestToken.deploy();

  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log("Contract deployed to:", address);

  // const address = "0xfe987957f928100B5D3F213ABA5A4858d976aCa6";

  console.log("Verifying contract on Etherscan...");
  await run("verify:verify", {
    address: address,
    constructorArguments: [],
  });
  console.log("Contract verified successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });