const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const ethereumBridgeAddress = process.env.CONTRACT_ADDRESS; // Replace with the Ethereum UNFTC contract address
  const polygonBridgeAddress = "0x26f3b04299802f824f667F7bAa7b9799b0503Eb3"; // Replace with the Polygon UNFTC contract address
  const accountAddress = process.env.PUBLIC_KEY; // Replace with your account address
  const numNFTs = 5; // Number of NFTs to transfer

  // Connect  to the Ethereum and Polygon networks
  const ethereumBridge = await ethers.getContractAt(
    "UNFTC",
    ethereumBridgeAddress
  );
  const polygonBridge = await ethers.getContractAt(
    "UNFTC",
    polygonBridgeAddress
  );

  for (let i = 0; i < numNFTs; i++) {
    console.log(`Transferring NFT #${i + 1}`);

    // Get the NFT tokenId you want to transfer
    const tokenId = i + 1;

    // Check if the NFT is owned by the account
    const owner = await ethereumBridge.ownerOf(tokenId);
    if (owner !== accountAddress) {
      console.log(
        `Skipping transfer of NFT #${tokenId} as it is not owned by the account.`
      );
      continue;
    }

    // Approve the NFT to be transferred by the UNFTC contract on Ethereum
    await ethereumBridge.approve(polygonBridge.address, tokenId);

    // Deposit the NFT to the Bridge on Ethereum
    await ethereumBridge["safeTransferFrom(address,address,uint256)"](
      accountAddress,
      polygonBridge.address,
      tokenId
    );

    // Wait for the deposited NFT to be processed and minted on Polygon Mumbai
    console.log(
      "Waiting for NFT to be processed and minted on Polygon Mumbai..."
    );
    // await new Promise((resolve) => setTimeout(resolve, 120000)); // Wait for 2 minutes

    console.log(`NFT #${i + 1} transferred successfully`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
