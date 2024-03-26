// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract digitalCV {
    // Mapping from user address to their IPFS hash
    mapping(address => string[]) private cvHashes;

    // Event to emit when a CV hash is updated
    //event CVHashUpdated(address indexed user, uint256 hashIndex, string newHash);


    // Function to update a specific CV hash or add a new one
    function updateCVHash(uint256 hashIndex, string memory newHash) public {
        // If the specified index is exactly equal to the length of the user's hash array,
        // it means we are adding a new hash.
        require(hashIndex <= cvHashes[msg.sender].length, "Index out of bounds.");

        if (hashIndex == cvHashes[msg.sender].length) {
            // Add a new hash
            cvHashes[msg.sender].push(newHash);
        } else {
            // Update an existing hash
            cvHashes[msg.sender][hashIndex] = newHash;
        }

        //emit CVHashUpdated(msg.sender, hashIndex, newHash);
    }

    // Function to retrieve all CV hashes for a user
    function getCVHashes(address user) public view returns (string[] memory) {
        return cvHashes[user];
    }
    
    /*function getCVHash(address user, uint256 hashIndex) public view returns (string memory) {
        require(hashIndex >= cvHashes[user].length, "Index out of bounds");
        return cvHashes[user][hashIndex];
    }*/
}