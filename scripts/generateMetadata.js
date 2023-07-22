const fs = require("fs");
const path = require("path");

// Image URLs for the 5 NFTs
const imageUrls = [
  "https://gateway.pinata.cloud/ipfs/QmRtLEMBuCp2HBsvVtt5xCZ1uk3yHrezrBsuJsKN2btQD3",
  "https://gateway.pinata.cloud/ipfs/ QmVPS3BnGcJu75Lsj7brsH8gj3cFtzMLn9pAX6HvBRS189",
  "https://gateway.pinata.cloud/ipfs/QmbaCtBArn26rhprHCd7pLsorffGVTxrbAak1Qq21szDMR",
  "https://gateway.pinata.cloud/ipfs/QmZpDdpo7V7TzGGsFnM8JspD1DFzVSHUx9vhAiXq4KwXMp",
  "https://gateway.pinata.cloud/ipfs/QmSzGBTCnKTktTwwerY1pvguEiZDMDdXJrHBkrQ9FbXRdk",
];

// NFT information
const name = "Van Gogh coin";
const description = "Van Gogh on a Coin";

// Create NFThub directory if it doesn't exist
const dir = "./NFThub";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Generate metadata for each NFT
for (let i = 0; i < imageUrls.length; i++) {
  const nftData = {
    name: `${name} #${i + 1}`,
    description: description,
    image: imageUrls[i],
  };

  const nftJson = JSON.stringify(nftData, null, 2);
  const fileName = `nft${i + 1}.json`;
  const filePath = path.join(dir, fileName);

  fs.writeFileSync(filePath, nftJson);
}

console.log("Metadata files generated successfully!");
