const { ethers } = require("hardhat");
require("dotenv").config();

const polygonBridgeAddress = "0x26f3b04299802f824f667F7bAa7b9799b0503Eb3"; // Replace with the Polygon UNFTC contract address
const accountAddress = process.env.PUBLIC_KEY; // Replace with your account address

async function balance() {
  const polygonBridge = await ethers.getContractAt(
    "UNFTC",
    polygonBridgeAddress
  );

  const balanceOnMumbai = await polygonBridge.balanceOf(accountAddress);
  console.log(`Balance of NFTs on Mumbai: ${balanceOnMumbai}`);
}

balance().catch((err) => {
  console.log(err);
});
