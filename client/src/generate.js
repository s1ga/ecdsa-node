import { toAddress } from "./crypto";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import server from "./server";

const ADDRESSES_COUNT = 2;
const ACCOUNTS = new Map();
const ADDRESSES = [];

function getPrivateKey(address) {
  return ACCOUNTS.get(address).privateKey;
}

for (let i = 0; i < ADDRESSES_COUNT; i++) {
  const privateKey = secp256k1.utils.randomPrivateKey();
  const publicKey = secp256k1.getPublicKey(privateKey);

  const address = toAddress(publicKey);
  ACCOUNTS.set(address, {
    privateKey: toHex(privateKey),
    publicKey: toHex(publicKey),
  });
  ADDRESSES.push(address);
  try {
    const {
      data: { message },
    } = await server.post('/deposit', {
      address: address,
      balance: 50,
    });
    alert(message);
  } catch (ex) {
    alert(ex.response.data.message || 'Internal server error');
  }
}

export {
  ADDRESSES,
  getPrivateKey,
};