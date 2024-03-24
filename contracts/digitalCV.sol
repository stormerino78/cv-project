// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract digitalCV {
    // Mapping the owner address to their CV hash
    mapping(address => bytes32) public cvHashes;

    // Event that is emitted when a CV hash is updated
    event CVHashUpdated(address owner, bytes32 cvHash);

    // Function to update the caller's CV hash
    function updateCVHash(bytes32 _cvHash) public {
        cvHashes[msg.sender] = _cvHash;
        emit CVHashUpdated(msg.sender, _cvHash);
    }

    // Function to retrieve a CV hash by owner address
    function getCVHash(address _jobSeeker) public view returns (bytes32) {
        return cvHashes[_jobSeeker];
    }
}
