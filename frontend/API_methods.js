const { uploadToIPFS } = require('../scripts/uploadCVtoIPFS.js');
const { connectMetaMask } = require('./connectMetamask.js');

async function postCVData() {
    userAddress = checkMetamask();
    const cvData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        job: document.getElementById('job').value,
        bio: document.getElementById('bio').value
    };
    try {
        const response = await fetch('http://localhost:3000/uploadCV', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cvData), // Convert cvData to a JSON string
        });

        if (!response.ok) throw new Error('Network response was not ok.');

        const result = await response.json();
        console.log(result);
        alert('CV Uploaded Successfully');
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to upload CV');
    }

    // Convert cvData to a JSON string
    const jsonData = JSON.stringify(cvData);
    // Create a Blob from the JSON string
    const blob = new Blob([jsonData], {type: "application/json"});
    // Optionally, convert the Blob to a File
    const file = new File([blob], "cvData.json", {type: "application/json"});

    console.log(jsonData);
    console.log(file);

    //uploadToIPFS(file) //sending the data to the IPFS
}


async function submitCVData(cvData) {
    // This assumes you have ethers.js included in your project
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        // Assuming cvData includes the necessary information for the smart contract method
        // and updateCVData is the contract method to be called
        const txResponse = await contract.updateCVData(...cvData);
        await txResponse.wait();
        console.log('CV data updated successfully:', txResponse);
    } catch (error) {
        console.error('Failed to update CV data:', error);
    }
}


async function getCVData() {
    userAddress = checkMetamask();
    fetch(`/retrieveCV/${userAddress[0]}`)
        .then((response) => response.json())
        .then((data) => {
            if(data.success) {
                console.log(data.cvData);
                // Process and display CV data as needed
            } else {
                console.error(data.message);
            }
        })
        .catch((error) => console.error('Error fetching CV data:', error));
}

async function checkMetamask(){
    const signer = await connectMetaMask(); // Ensure we're connected to MetaMask
    if (!signer) {
        console.error('Error connecting to MetaMask:'); // Stop if we couldn't connect to MetaMask
        return null; 
    }
    return signer;
}