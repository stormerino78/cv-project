// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract digitalCV {

    address public owner;
    // Mapping the owner address to their CV hash
    mapping(address => bytes32) public cvHashes;

    // Function to update the caller's CV hash
    function updateCVHash(bytes32 _cvIPFSHash) public {
        cvHashes[msg.sender] = _cvIPFSHash;
    }

    // Function to retrieve a CV hash by owner address
    function getCVHash(address _jobSeeker) public view returns (bytes32) {
        return cvHashes[_jobSeeker];
    }
}
