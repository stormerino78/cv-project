//function that will be called when the user updated its CV datas to update the IPFS and smart-contract
async function updateCVData(versionCV = 0) {
    try {
        const ipfsHash = await submitCV(); //ISSUE HERE WHEN SENDING THE DATA : source.on is not a function
        console.log(`CV data uploaded to IPFS with hash: ${ipfsHash}`);
        // Update the IPFS hash in the smart contract
        const contractAddress = "0x0648225A73b2130A37e3f4684D868783537dF9f5"; // temporary
        await updateSmartContract(contractAddress, ipfsHash, versionCV);
        console.log(`Smart contract at ${contractAddress} updated with the new IPFS hash ${ipfsHash}.`);
    } catch (error) {
        console.error('Error processing file change:', error);
    }
}
  
async function updateSmartContract(contractAddress, ipfsHash, hashIndex) {
    const contractABI = await loadABI(); //front-end ABI function
    const { signer, address } = await connectMetamask(); // get the signer from metamask wallet
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.updateCVHash(hashIndex, ipfsHash); //hashIndex correspond to the CV the user wants to modify (if there is several)
    await tx.wait(); // Wait for the transaction to be mined
}