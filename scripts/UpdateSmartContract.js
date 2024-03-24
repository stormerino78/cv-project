import { ethers } from 'ethers';
import contractInfo from '../cv-management-frontend/src/contract-info.json'; // import the contract ABI and contract address

export async function storeIPFSHash(ipfsHash) {
  // Check if the Ethereum object is available in the window (MetaMask)
  if (window.ethereum) {
    // Request the user's account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Create an instance of a provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get the signer to sign transactions
    const signer = provider.getSigner();

    // Create an instance of the contract
    const contract = new ethers.Contract(contractInfo.address, contractInfo.abi, signer);

    try {
      // The contract has a function `updateCVHash` that takes a string argument for the IPFS hash
      const transaction = await contract.updateCVHash(ipfsHash);

      // Wait for the transaction to be mined
      await transaction.wait();

      console.log('IPFS hash stored successfully:', ipfsHash);
      return true;
    } catch (error) {
      console.error('Error storing IPFS hash:', error);
      return false;
    }
  } else {
    console.log('Ethereum wallet (e.g., MetaMask) is not connected');
    return false;
  }
}

/* USE as component
import React, { useState } from 'react';
import { storeIPFSHash } from './ethereumUtils'; // Adjust the import path as needed

const YourComponent = () => {
  const [ipfsHash, setIpfsHash] = useState('');

  const handleSubmit = async () => {
    const stored = await storeIPFSHash(ipfsHash);
    if (stored) {
      alert('Hash stored successfully');
    } else {
      alert('Failed to store the hash');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={ipfsHash}
        onChange={(e) => setIpfsHash(e.target.value)}
        placeholder="Enter IPFS Hash"
      />
      <button onClick={handleSubmit}>Store IPFS Hash</button>
    </div>
  );
};

export default YourComponent;
*/
