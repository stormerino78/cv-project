async function loadABI() { // Get the ABI of the contract
  const response = await fetch('http://localhost:8080/artifacts/contracts/digitalCV.sol/digitalCV.json'); // path to the artifact file of the contract
  const artifact = await response.json();
  return artifact.abi;
}

async function updateSmartContract(contractAddress, ipfsHash, hashIndex) {
  const contractABI = await loadABI();
  const { signer, address } = await connectMetamask(); // get the signer from metamask wallet
  console.log("signer address:",address);
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const tx = await contract.updateCVHash(hashIndex, ipfsHash); //hashIndex correspond to the CV the user wants to modify (if there is several)
  await tx.wait(); // Wait for the transaction to be mined
  console.log(`The hash in smart contract ${contractAddress} has been updated`);
}