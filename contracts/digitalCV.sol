// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract digitalCV {

    address public owner;
    
    // Mapping the owner address to their CV hash
    mapping(address => string) public cvHashes;

    constructor() {
        owner = msg.sender; // Set the contract deployer as the owner
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can update CV hashes.");
        _;
    }

    // Function to update the caller's CV hash
    function updateCVHash(string memory _cvIPFSHash) public onlyOwner {
        //we update only if the hash is different than the one stored
        require(keccak256(abi.encodePacked(cvHashes[msg.sender])) != keccak256(abi.encodePacked(_cvIPFSHash)), "New CV hash must be different.");
        cvHashes[msg.sender] = _cvIPFSHash;
    }

    // Function to retrieve a CV hash by owner address
    function getCVHash(address _jobSeeker) public view returns (string memory) {
        return cvHashes[_jobSeeker];
    }
}
