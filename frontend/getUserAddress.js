async function getUserAddress() {
    const userAddress = await getCurrentUserAddress(); // Implement this function to get the user's address from MetaMask
    const response = await fetch(`/retrieveCV/${userAddress}`);
    const data = await response.json();

    if(data.success) {
        console.log('CV Data:', data.cvData);
        // Further processing...
    } else {
        console.error('Failed to retrieve CV data');
    }
}
