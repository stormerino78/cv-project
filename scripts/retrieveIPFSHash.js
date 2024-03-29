const contractABI = require("../artifacts/contracts/digitalCV.sol/digitalCV.json").abi; // Get the ABI of the contract

async function retrieveIPFSHash(contractAddress = '0x0648225A73b2130A37e3f4684D868783537dF9f5', userAddress ='0x0820E20E902902920902920290292092', hashIndex) {
    const [signer] = await ethers.getSigners(); //signer to execute the transaction
    console.log(signer);
    const contract = new ethers.Contract(contractAddress, contractABI, signer); // contract variable to interract with the contract
    try {
        const ipfsHashes = await contract.getCVHashes(userAddress); //execute the contract get method getCVHashes to get all Hashes linked to an address
        //console.log(`IPFS hashes for user ${userAddress} are: ${ipfsHashes}`);
        const ipfsHash = ipfsHashes[hashIndex]; //Isolating the hash corresponding to the index (select a special version of CV-DATA)
        //console.log(`IPFS hash for user ${userAddress} at index ${hashIndex} is: ${ipfsHash}`);
        return ipfsHash;

    } catch (error) {
        console.error(`Error retrieving IPFS hash for user ${userAddress}:`, error);
        return null;
    }
}

exports.retrieveIPFSHash = retrieveIPFSHash; //export it as uploadToIPFS to use it in the run.js

//testing purposes
//retrieveIPFSHash();