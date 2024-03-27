import { ethers } from "ethers";

async function connectMetamask() {
    if (window.ethereum) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send({ method: 'eth_requestAccounts' });
            const signer = await provider.getSigner();
            console.log('Connected to', signer);
            /*
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected to', accounts);
            return accounts[0]; Return the connected account address */
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            return null; // Handle errors or absence of MetaMask
        }
    } else {
        console.log('MetaMask is not installed!');
        return null;
    }
}
