import { Keccak } from 'sha3';

const isCharacter = c => {
    const charCode = c.charCodeAt(0);
    return (charCode >= 97 && charCode < 123);
};

const hashAddress = (address, chainId, prepend0xPrefix) => {
    const keccak = new Keccak(256);
    if(prepend0xPrefix && !address.startsWith('0x')) {
        address = `0x${address}`;
    }
    const concatenatedAddress = `${chainId}${address}`;
    return keccak.update(concatenatedAddress).digest('hex');
}

export function checkSumAddress(address, chainId, prepend0xPrefix = true) {
    const addressHash = hashAddress(address, chainId, prepend0xPrefix);
    address = address.toLowerCase();
    if(address.startsWith('0x')) {
        address = address.slice(2);
    }
    const addressChars = address.split('');
    for(let i = 0; i < addressChars.length; i++) {
        const hashChar = addressHash.charAt(i);
        const hashCharToNumber = Number(`0x${hashChar}`);
        const isHashCharValueGte8 = hashCharToNumber >= 8;
        const addressChar = addressChars[i];
        if(isCharacter(addressChar) && isHashCharValueGte8) {
            addressChars[i] = addressChar.toUpperCase();
        }
    }
    return addressChars.join('');
}

const addressWithNoChecksum = '3a29282d5144cea68cb33995ce82212f4b21ccec';
const checkSummedFromMetamaskWe3AndEtherScan = '3A29282d5144cEa68cb33995Ce82212f4B21ccEc';
const checkSummedFromRskBlockExplorer = '3a29282D5144cea68Cb33995cE82212F4B21CcEC';

const resultForRsk = checkSumAddress(addressWithNoChecksum, 31);

// It seems Metamask, Web3 and Etherscan don't add the chain id nor the 0x prefix to the address before hashing it.
const resultForMetamaskWeb3AndEtherscan = checkSumAddress(addressWithNoChecksum, '', false);

console.log('checkSummedFromRskBlockExplorer === resultForRsk: ', checkSummedFromRskBlockExplorer === resultForRsk); // true
console.log('checkSummedFromMetamaskWe3AndEtherScan === resultForMetamaskWeb3AndEtherscan: ', checkSummedFromMetamaskWe3AndEtherScan === resultForMetamaskWeb3AndEtherscan); // true
