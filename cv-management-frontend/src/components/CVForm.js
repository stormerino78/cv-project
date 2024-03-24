import React, { useState } from "react";
import { ethers } from 'ethers';
import contractInfo from "../contract-info.json";

export default function CVForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    // Add more fields as needed

    async function submitCV() {
        if (window.ethereum) {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractInfo.address, contractInfo.abi, signer);
    
            try {
                const tx = await contract.updateCV(name, email, bio, "workExperience", "education", "skills");
                await tx.wait();
                alert("CV updated successfully!");
            } catch (error) {
                console.error("Error updating CV:", error);
                alert("Failed to update CV.");
            }
        } else {
            alert("Please install MetaMask!");
        }
    }

    return (
        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio"></textarea>
            {/* Add more input fields as needed */}
            <button onClick={submitCV}>Submit CV</button>
        </div>
    );
}
