const {uploadToIPFS} = require('./uploadCVtoIPFS.js'); //import uploadToIPFS method
const {updateSmartContract} = require('./UpdateSmartContract.js'); // import updateSmartContract method

//function that will be called when the user updated its CV datas to update the IPFS and smart-contract
async function updateCVData(file, contractAddress, versionCV = 0) {
    try {
    // Upload the updated CV to IPFS
    /* file form:
    {
    name: 'hello',
    email: 'hello.hi@hello.fr',
    job: 'zaczc',
    bio: 'zac'
    }*/
    const ipfsHash = await uploadToIPFS(file); //ISSUE HERE WHEN SENDING THE DATA : source.on is not a function
    console.log(`Updated CV uploaded to IPFS with hash: ${ipfsHash}`);

    // Update the IPFS hash in the smart contract
    await updateSmartContract(contractAddress, ipfsHash, versionCV);
    console.log(`Smart contract at ${contractAddress} updated with new IPFS hash.`);
    } catch (error) {
        console.error('Error processing file change:', error);
    }
}
exports.updateCVData = updateCVData; //export it as uploadToIPFS to use it in the run.js

//testing purposes
//updateCVData();