import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../path/to/your/contractABI.json';

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const provider = new ethers.providers.Web3Provider(window.ethereum);

function RetrieveCV() {
    const [userAddress, setUserAddress] = useState('');
    const [cvHash, setCvHash] = useState('');

    const fetchCVHash = async () => {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

        try {
            const hash = await contract.getCVHashes(userAddress);
            setCvHash(hash[0]); // Assuming you're interested in the first hash
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    return (
        <div>
            <input
                type="text"
               
