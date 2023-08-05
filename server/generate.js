import { toHex } from 'ethereum-cryptography/utils';
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { getAddress } from './crypto.js';

const privateKey = secp256k1.utils.randomPrivateKey();
const publicKey = secp256k1.getPublicKey(privateKey);

console.log('Private key', toHex(privateKey));
console.log('Public key', toHex(publicKey));
console.log('Address', getAddress(publicKey));