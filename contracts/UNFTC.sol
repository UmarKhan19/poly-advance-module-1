// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract UNFTC is ERC721 {
    using Strings for uint256;

    string private _name;
    string private _symbol;
    uint256 private tokenIdCounter;
    string public promptDesc;
    mapping(uint256 => string) private tokenURIs;

    event NFTMinted(address indexed owner, uint256 indexed tokenId, string tokenURI);

    constructor(string memory _promptDesc, string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        tokenIdCounter = 0;
        promptDesc = _promptDesc;
        _name = name_;
        _symbol = symbol_;
    }

    function mintNFT(address recipient, string memory nftTokenURI) public returns (uint256) {
        uint256 tokenId = tokenIdCounter + 1;
        _mint(recipient, tokenId);
        _setTokenURI(tokenId, nftTokenURI);
        emit NFTMinted(recipient, tokenId, nftTokenURI);
        tokenIdCounter = tokenId;
        return tokenId;
    }

    function _setTokenURI(uint256 tokenId, string memory nftTokenURI) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        tokenURIs[tokenId] = nftTokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return tokenURIs[tokenId];
    }

    function getNFTURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }
}
