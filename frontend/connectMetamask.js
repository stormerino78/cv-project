async function connectMetamask() {
    try {
        if (window.ethereum == null) {
            // If MetaMask is not installed, we use the default provider(INFURA), no private keys installed so read-only access
            console.log("MetaMask not installed; using read-only defaults")
            provider = ethers.getDefaultProvider()
        } else {
            // Connect to the MetaMask EIP-1193 object which allows Ethers access to make all read-only requests through MetaMask.
            const provider = new ethers.BrowserProvider(window.ethereum)
            // Request access to write operations, which will be performed by the private key of the user
            const signer = await provider.getSigner();
            console.log('Connected to', signer);
            return signer;
        }
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        return null; // Handle errors or absence of MetaMask
    }   
}
