//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Quiver {
    string private _name;

    string private _symbol;

    address private _owner;

    mapping(uint256 => address) private _owners;

    mapping(address => uint256) private _balances;

    mapping(uint256 => TokenMetaData) private _tokenMetaData;

    uint256 private _totalSupply;

    constructor() {
        _name = "AyiamcoTest";
        _symbol = "ATY";
        _totalSupply = 0;
        _owner = msg.sender;
    }

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "Balance query for the zero address");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "Owner query for nonexistent token");
        return owner;
    }

    function mintToken(string memory imageUrl, string memory description)
        public
        payable
    {
        bytes memory imageUrlBytes = bytes(imageUrl);
        require(imageUrlBytes.length > 0, "Image Url cannot be empty string.");
        _owners[_totalSupply + 1] = msg.sender;
        _balances[msg.sender] = _balances[msg.sender] + 1;
        _tokenMetaData[_totalSupply] = TokenMetaData(
            append(_name, " ", uint2str(_totalSupply)),
            imageUrl,
            description
        );
        _totalSupply = _totalSupply + 1;
    }

    function get_totalSupply() public view onlyOwner returns (uint256) {
        return _totalSupply;
    }

    function append(
        string memory a,
        string memory b,
        string memory c
    ) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b, c));
    }

    function uint2str(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    struct TokenMetaData {
        string Name;
        string ImageUrl;
        string Description;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner);
        _;
    }
}
