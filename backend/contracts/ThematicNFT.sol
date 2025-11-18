// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ThematicNFT  is ERC721URIStorage, Ownable {
  // uint256 public basePrice = 0.01 ether;
  uint256 public basePrice;
  uint256 private constant SCALE = 1000;
  // Базовый URI для метаданных
  string private _baseTokenURI;

  // Счетчик токенов
  uint256 public totalSupply;
  uint256 public maxSupply;


  // Маппинг tokenId → уже заминчен или нет
  mapping(uint256 => bool) public minted;

  mapping(uint256 => uint256) public rarityMap; // tokenId → rarity
  mapping(uint256 => string) private _tokenURIsMap; // tokenId → URI


  constructor(
    address initialAccount,
    uint256 _basePrice,
    uint256[] memory tokenIds,
    string[] memory uris,
    uint256[] memory rarities
    // string memory name,
    // string memory symbol,
    // uint256 _maxSupply

  ) ERC721URIStorage() ERC721('ThematicNFT', 'TNFT') Ownable(initialAccount) {
    // maxSupply = _maxSupply;
    basePrice = _basePrice;

    // initialize token data (caller is owner at this point)
    _setTokensData(tokenIds, uris, rarities);

    // transfer ownership if an initialAccount is provided
    if (initialAccount != address(0)) {
      transferOwnership(initialAccount);
    }
  }

  function getPrice(uint256 rarity) public view returns (uint256) {
    uint256 scaled = SCALE + (rarity * SCALE / 10);
    uint256 squared = scaled * scaled;
    uint256 price = basePrice * squared / (SCALE * SCALE);
    return price;
  }

  function _setTokensData(
    uint256[] memory tokenIds,
    string[] memory uris,
    uint256[] memory rarities
  ) internal {
    require(
      tokenIds.length == rarities.length &&
      uris.length == rarities.length,
      "Arrays must be same length"
    );

    for(uint256 i=0; i<tokenIds.length; i++) {
      rarityMap[tokenIds[i]] = rarities[i];
      _tokenURIsMap[tokenIds[i]] = uris[i];
    }
  }

  function getTokenData(uint256 tokenId) public view returns (string memory, uint256 tokenRarity) {
    return (_tokenURIsMap[tokenId], rarityMap[tokenId]);
  }

}