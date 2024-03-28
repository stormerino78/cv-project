async function loadABI() { // Get the ABI of the contract
  const response = await fetch('../artifacts/contracts/digitalCV.sol/digitalCV.json'); // path to the artifact file of the contract
  const artifact = await response.json();
  return artifact.abi;
}

async function updateSmartContract(contractAddress, ipfsHash, signer, hashIndex = 0) {
  const contractABI = await loadABI();
  const contract = new ethers.Contract(contractAddress, contractABI, signer); // `signer` should be connected to your wallet
  const tx = await contract.updateCVHash(hashIndex, ipfsHash); //hashIndex correspond to the CV the user wants to modify (if he has several)
  await tx.wait(); // Wait for the transaction to be mined
  console.log(`The hash in smart contract ${contractAddress} has been updated`);
}

//exports.updateSmartContract = updateSmartContract;