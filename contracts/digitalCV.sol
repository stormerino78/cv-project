// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract digitalCV {

    address public owner;
    // Mapping the owner address to their CV hash
    mapping(address => string) public cvHashes;

    // Function to update the caller's CV hash
    function updateCVHash(string memory _cvIPFSHash) public {
        cvHashes[msg.sender] = _cvIPFSHash;
    }

    // Function to retrieve a CV hash by owner address
    function getCVHash(address _jobSeeker) public view returns (string memory) {
        return cvHashes[_jobSeeker];
    }
}
