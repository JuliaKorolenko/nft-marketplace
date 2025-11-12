// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ThematicNFT  is ERC721URIStorage, Ownable {
  uint256 public basePrice = 0.01 ether;
  uint256 private constant SCALE = 1000;
  // Базовый URI для метаданных
  string private _baseTokenURI;

  // Счетчик токенов
  uint256 public totalSupply;
  uint256 public maxSupply;


  // Маппинг tokenId → уже заминчен или нет
  mapping(uint256 => bool) public minted;

  mapping(uint256 => uint256) public rarity;
  mapping(uint256 => string) private _tokenURIs;


  constructor(
    string memory name,
    string memory symbol,
    uint256 _maxSupply

  ) ERC721('ThematicNFT', 'TNFT') Ownable(msg.sender){
    maxSupply = _maxSupply;
  }
  function getPrice(uint256 rarity) public view returns (uint256) {
    uint256 scaled = SCALE + (rarity * SCALE / 10);
    uint256 squared = scaled * scaled;
    uint256 price = basePrice * squared / (SCALE * SCALE);

    return price;
  }

}