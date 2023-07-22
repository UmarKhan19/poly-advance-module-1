const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  // Define the contract name, symbol, and description
  const name = "Umar NFT Collection";
  const symbol = "UNFTC";
  const promptDesc =
    "a coin made up of titanium, platinum and diamond painted by van gogh";

  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log(`Contract Deployer's address: ${deployerAddress}`);

  // Deploy the UNFTC contract
  const UNFTC = await ethers.getContractFactory("UNFTC");
  const unftc = await UNFTC.deploy(promptDesc, name, symbol);

  // Wait for the contract to be mined
  await unftc.deployed();

  // Print the contract address and transaction hash
  console.log("UNFTC deployed to:", unftc.address);
  console.log("Transaction hash:", unftc.deployTransaction.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
