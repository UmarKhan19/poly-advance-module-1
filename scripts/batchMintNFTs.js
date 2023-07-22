const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS; // Replace with your contract address
  const contract = await ethers.getContractAt("UNFTC", contractAddress);
  const accountAddress = process.env.PUBLIC_KEY; // Replace with the recipient account address
  const metadataURIs = [
    "https://gateway.pinata.cloud/ipfs/QmYkuE2WyNUbm63zrTdHYLn7NXARR7h3kKbvULzwr2bUQz",
    "https://gateway.pinata.cloud/ipfs/QmeFi43bDkH5C4QFS5y8mmWKtFHAuobukAZPnezLajbXcs",
    "https://gateway.pinata.cloud/ipfs/QmRNPpjSYTf5o1TiEyFDYWd46oEWPa5TYZbeDgvKjyX35v",
    "https://gateway.pinata.cloud/ipfs/Qmb1gdKLG5jzEqznkyGpT8GVHhwCmAZzRRMLrAfsfxKQ8L",
    "https://gateway.pinata.cloud/ipfs/Qmbttir8iKGzkQ2N9GU6E4koAxesT1KraWN77CrGNYXUrW",
  ];
  const numNFTs = 5; // Number of NFTs to mint

  for (let i = 0; i < numNFTs; i++) {
    const metadataURI = metadataURIs[i];
    console.log(`Minting NFT #${i + 1} with metadataURI: ${metadataURI}`);

    // Call the contract's mintNFT function
    const transaction = await contract.mintNFT(accountAddress, metadataURI);
    await transaction.wait();

    console.log(`NFT #${i + 1} minted successfully`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
