import { ADDRESSES } from "./generate";
import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <select name="wallets" id="wallets" value={address} onChange={onChange}>
        <option value="" disabled>Select your account</option>
        {ADDRESSES.map((addr, idx) => (
          <option key={`${addr}_${idx}`} value={addr}>
            {addr}
          </option>
        ))}
      </select>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
