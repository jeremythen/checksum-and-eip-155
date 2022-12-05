# evm-checksum-address-converter

This is a simple non-checksummed to checksummed EVM addresses conversion tool that implements [EIP-55](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md)

To learn more about checksummed addresses, check this article: 

[Ethereum checksummed addresses, importance, and implementation](https://medium.com/coinmonks/ethereum-checksummed-addresses-importance-and-implementation-eef74aa3ae18)

## Frontend tool

To use the frontend tool, open the `index.html` file in a browser.

If you list of non-checksummed addresses look like the following:

```js
0x6827b8f6cc60497d9bf5210d602C0EcaFDF7C405
0x66b0b1d2930059407dcc30f1a2305435fc37315e
```
Then simply paste it in the first textarea and click on the `Convert` button. Then copy the checksummed addresses from the second, non-editable, text area.

If the address belongs to a network different than Ethereum, then make sure to specify the chain id in the text box above before converting to checksummed addresses. Leave empty for Ethereum.

And the result would be like:

```js
0x6827b8f6cc60497d9bf5210d602C0EcaFDF7C405
0x66B0b1d2930059407DcC30F1A2305435fc37315E
```

To check the list of available EVM chain ids, check [chainlist.org](https://chainlist.org/)

If you list of addresses look like this:

```js
[0x66b0b1d2930059407dcc30f1a2305435fc37315e,
0x66b0b1d2930059407dcc30f1a2305435fc37315e,
0x66b0b1d2930059407dcc30f1a2305435fc37315e]
```

Then remember to check the checkbox `Addresses in array?`. This way it returns a result like:

```js
[0x66B0b1d2930059407DcC30F1A2305435fc37315E,
0x66B0b1d2930059407DcC30F1A2305435fc37315E,
0x66B0b1d2930059407DcC30F1A2305435fc37315E]
```

## Backend tool

To use the tool in Nodejs, simply install the `sha3` dependency with:

`npm install`

Then import the `checkSumAddress` function and use it like:

```js

import { checkSumAddress } from 'emv-checksum-address-convertor';

//...

const checksummedAddress = checkSumAddress(address, chainId);

//...

```