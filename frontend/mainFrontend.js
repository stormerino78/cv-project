async function main(){
    await connectMetamask();
    await updateSmartContract('0x0648225A73b2130A37e3f4684D868783537dF9f5', 'HJGZHBAJZBUhz7762729812BJBAZJCKZ', signer);
}