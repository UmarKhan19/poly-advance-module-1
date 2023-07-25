const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  try {
    const ethereumBridgeAddress = process.env.CONTRACT_ADDRESS; // Ethereum UNFTC contract address
    const accountAddress = process.env.PUBLIC_KEY; // Your account address
    const FxERC721RootTunnelArtifact = require("../bridgeContract/rootContractABI.json");

    // Connect to the Ethereum and Polygon networks
    const ethereumBridge = await ethers.getContractAt(
      "UNFTC",
      ethereumBridgeAddress
    );

    const fxERC721RootTunnel = await ethers.getContractAt(
      FxERC721RootTunnelArtifact,
      "0xF9bc4a80464E48369303196645e876c8C7D972de"
    );

    // Approve the FxRoot contract to spend all NFTs owned by your account
    await ethereumBridge.setApprovalForAll(fxERC721RootTunnel.address, true);

    const numNFTs = 5; // Number of NFTs to transfer

    // Depositing NFTs to the tunnel contract
    console.log("Depositing NFTs to Polygon...");
    for (let i = 0; i < numNFTs; i++) {
      const tokenId = i + 1;
      await fxERC721RootTunnel.deposit(
        ethereumBridgeAddress,
        accountAddress,
        tokenId,
        accountAddress,
        { gasLimit: 300000 }
      );
      console.log(`NFT #${tokenId} transferred successfully!`);
    }
    console.log("All NFTs transferred successfully!");
  } catch (error) {
    console.error("Failed to transfer NFTs:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
