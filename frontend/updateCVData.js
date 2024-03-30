//function that will be called when the user updated its CV datas to update the IPFS and smart-contract
async function updateCVData(contractAddress, versionCV = 0) {
    try {
        const ipfsHash = await submitCV(); //ISSUE HERE WHEN SENDING THE DATA : source.on is not a function
        console.log(`Updated CV uploaded to IPFS with hash: ${ipfsHash}`);

        // Update the IPFS hash in the smart contract
        await updateSmartContract(contractAddress, ipfsHash, versionCV);
        console.log(`Smart contract at ${contractAddress} updated with new IPFS hash.`);
    } catch (error) {
        console.error('Error processing file change:', error);
    }
}