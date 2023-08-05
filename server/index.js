import express, { json } from "express";
import cors from "cors";
import { getAddress, recoverPublicKey } from "./crypto.js";

const app = express();
const port = 3042;

app.use(cors());
app.use(json());

const balances = new Map();

app.get("/balance/:address", (req, res) => {
  const balance = balances.get(req.params.address) || 0;
  res.send({ balance });
});

app.post('/deposit', (req, res) => {
  const { address, balance } = req.body;
  balances.set(address, balance);
  res.status(200).send({ message: `Successfull deposit for ${address}: ${balance}` });
});

app.post("/send", (req, res) => {
  const { message, signature } = req.body;
  const { recipient, amount } = message;

  const sender = getAddress(
    recoverPublicKey(message, signature)
  );

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances.get(sender) < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances.set(sender, balances.get(sender) - amount);
    balances.set(recipient, balances.get(recipient) + amount);
    res.send({
      senderBalance: balances.get(sender),
      recipientBalance: balances.get(recipient),
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (balances.has(address)) return;
  balances.set(address, 0);
}
