import { Keccak } from "sha3";

const FROM_HEXADECIMAL = 16;

const isCharacter = (c) => {
  const charCode = c.charCodeAt(0);
  return charCode >= 97 && charCode < 123;
};

const hashAddress = (address, chainId) => {
  const keccak = new Keccak(256);
  // We assume that if the chainId was sent, then it's a EIP-1991 call.
  if (chainId) {
    address = `${chainId}0x${address}`;
  }
  return keccak.update(address).digest("hex");
};

/**
 *
 * @param {string} address the Ethereum compatible address
 * @param {string} chainId the Ethereum compatible chain id (RSK, Binance Smart Chain, etc)
 * @returns {string} checkSummedAddress
 */
export function checkSumAddress(address, chainId) {
  address = address.toLowerCase();
  if (address.startsWith("0x")) {
    address = address.slice(2);
  }
  const addressHash = hashAddress(address, chainId);
  const addressChars = address.split("");
  for (let i = 0; i < addressChars.length; i++) {
    const addressChar = addressChars[i];
    // If character at ith index is not a letter, there is no need to process it.
    if (!isCharacter(addressChar)) {
      continue;
    }
    const hashChar = addressHash.charAt(i);
    const hashCharToNumber = parseInt(hashChar, FROM_HEXADECIMAL);
    const isHashCharValueGte8 = hashCharToNumber >= 8;
    if (isHashCharValueGte8) {
      addressChars[i] = addressChar.toUpperCase();
    }
  }
  return addressChars.join("");
}
