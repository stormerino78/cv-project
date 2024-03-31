const contractAddress ="0x0648225A73b2130A37e3f4684D868783537dF9f5";

async function submitCV() { //POST method
    const cvData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        job: document.getElementById('job').value,
        bio: document.getElementById('bio').value,
    };
    try {
        // Assuming you have an endpoint set up to accept CV data and upload it to IPFS
        const response = await fetch('http://localhost:3000/updateCV', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cvData),
        });
        const result = await response.json();
        if (result.success) {
            return result.ipfsHash;
        }else{
            console.error('Upload failed:', result.message);
        }
        // Display success message or handle the IPFS hash as needed
    } catch (error) {
        console.error('Failed to submit CV:', error);
    }
}

async function getCVData() {
    const contractABI = await loadABI();
    const {signer, address} = await connectMetamask(); // Get the user signer object
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
        const ipfsHashes = await contract.getCVHashes(address);
        console.log(JSON.stringify({ipfsHashes}));
        //{"ipfsHashes":["QmbjJSe58sLC19gXyi3U8wrbLwF4XTG8pWx2tWsi9MXn7E","QmZdopXBYBFhoCnkxoBvGV4px1hbrRYTqBHkT76yaGNXoM"]}
        const response = await fetch(`http://localhost:3000/fetchDataFromIPFS`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ipfsHashes}),
        });
        const data = await response.json();
        console.log("Data from IPFS:", data);
        // Handle displaying the data in your frontend here
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}