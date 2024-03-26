const {retrieveIPFSHash} = require('./retrieveIPFSHash.js'); //import retrieveIPFSHash method
const {fetchDataFromIPFS} = require('./fetchDataFromIPFS.js'); //import fetchDataFromIPFS method

// Set your contract address and user address here
const contractAddress = "0x0648225A73b2130A37e3f4684D868783537dF9f5";
const userAddress = "0x3288D6E2e196DC57515eC5F89d18973a0fFc22b4";

async function retrieveCVData() {
    const ipfsHash = await retrieveIPFSHash(contractAddress, userAddress, hashIndex=1); // Retrieve the IPFS hash for the given user and index
    if (ipfsHash) {
        await fetchDataFromIPFS(ipfsHash); // Fetch the data from IPFS using the retrieved hash
    } else {
        console.log('IPFS hash not found for the given index.');
    }
}

exports.retrieveCVData = retrieveCVData; //export it as uploadToIPFS to use it in the run.js
retrieveCVData();
