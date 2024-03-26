async function connectMetaMask() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected to', accounts[0]);
            return accounts[0]; // Return the connected account address
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            return null; // Handle errors or absence of MetaMask
        }
    } else {
        console.log('MetaMask is not installed!');
        return null;
    }
}
