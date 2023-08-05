import { keccak256 } from 'ethereum-cryptography/keccak';
import { toHex, hexToBytes } from 'ethereum-cryptography/utils';
import { secp256k1 } from "ethereum-cryptography/secp256k1";

export const hashMessage = msg => keccak256(Uint8Array.from(msg));

export const getAddress = (publicKey) => '0x' + toHex(keccak256(publicKey.slice(1)).slice(-20));

export const recoverPublicKey = (msg, signature) => {
  const [recovery, ...bytes] = hexToBytes(signature);
  const compactHex = toHex(new Uint8Array(bytes));
  return secp256k1.Signature
    .fromCompact(compactHex)
    .addRecoveryBit(recovery)
    .recoverPublicKey(hashMessage(msg))
    .toRawBytes();
};
