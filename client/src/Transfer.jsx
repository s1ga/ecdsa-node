import { useState } from "react";
import server from "./server";
import { createSignature } from "./crypto";
import { getPrivateKey } from "./generate";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const message = {
      recipient,
      amount: +sendAmount,
    };
    const signature = createSignature(message, getPrivateKey(address));
    try {
      const {
        data: { senderBalance, recipientBalance },
      } = await server.post('send', {
        message,
        signature,
      });
      setBalance(senderBalance);
      console.log(`Sender balance: ${senderBalance}, recepient balance: ${recipientBalance}`);
    } catch (ex) {
      alert(ex.response?.data.message || ex.message || 'Internal server error');
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
