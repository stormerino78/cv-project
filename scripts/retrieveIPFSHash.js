const contractABI = require("../artifacts/contracts/digitalCV.sol/digitalCV.json").abi; // Get the ABI of the contract

async function retrieveIPFSHash(contractAddress = "0xC350AAB6bc7dD4a7C929c0E4118d3A9b7B26f377", userAddress = "0x3288D6E2e196DC57515eC5F89d18973a0fFc22b4", hashIndex = 1) {
    const [signer] = await ethers.getSigners(); //signer to execute the transaction
    const contract = new ethers.Contract(contractAddress, contractABI, signer); // contract variable to interract with the contract
    try {
        const ipfsHashes = await contract.getCVHashes(userAddress); //execute the contract get method getCVHashes to get all Hashes linked to an address
        console.log(`IPFS hashes for user ${userAddress} are: ${ipfsHashes}`);

        const hashValue = ipfsHashes[hashIndex]; //Isolating the hash corresponding to the index (select a special version of CV-DATA)
        console.log(`IPFS hash for user ${userAddress} at index ${hashIndex} is: ${hashValue}`);
        
        return {ipfsHashes, hashValue};

    } catch (error) {
        console.error(`Error retrieving IPFS hash for user ${userAddress}:`, error);
    }
}

exports.retrieveIPFSHash = retrieveIPFSHash; //export it as uploadToIPFS to use it in the run.js

retrieveIPFSHash();