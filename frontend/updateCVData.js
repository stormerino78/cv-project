//function that will be called when the user updated its CV datas to update the IPFS and smart-contract
async function updateCVData() {
    try {
        index = document.getElementById('index').value;
        index = index-1; //index for machine starts at 0 and not at 1
        console.log("CV version:", index);
        const cvData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            job: document.getElementById('job').value,
            bio: document.getElementById('bio').value,
        };
        const ipfsHash = await submitCV(cvData);
        console.log(`CV data uploaded to IPFS with hash: ${ipfsHash}`);
        // Update the IPFS hash in the smart contract
        const contractAddress = "0x0648225A73b2130A37e3f4684D868783537dF9f5"; // temporary
        await updateSmartContract(contractAddress, ipfsHash, index);
        console.log(`Smart contract at ${contractAddress} updated with the new IPFS hash ${ipfsHash}.`);
    } catch (error) {
        console.error('Error processing file change:', error);
    }
}
  
async function updateSmartContract(contractAddress, ipfsHash, index) {
    const contractABI = await loadABI(); //front-end ABI function
    const { signer, address } = await connectMetamask(); // get the signer from metamask wallet
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log("Uploading IPFS hash into the smart contract...")
    const tx = await contract.updateCVHash(index, ipfsHash); //index correspond to the CV the user wants to modify (if there is several)
    await tx.wait(); // Wait for the transaction to be mined
}