import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from 'ethereum-cryptography/keccak';
import { toHex, hexToBytes } from "ethereum-cryptography/utils";

export const hashMessage = msg => keccak256(Uint8Array.from(msg));

export const toAddress = publicKey => '0x' + toHex(keccak256(publicKey.slice(1)).slice(-20));

export const createSignature = (msg, privateKey) => {
  const sig = secp256k1.sign(hashMessage(msg), privateKey);
  const compactHex = sig.toCompactHex();
  const bytes = new Uint8Array([sig.recovery, ...hexToBytes(compactHex)]);
  return toHex(bytes);
}
