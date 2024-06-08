require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Web3 = require('web3');
const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define schema and model
const dataSchema = new mongoose.Schema({
  voltage: Number,
  current: Number,
  power: Number,
  timestamp: { type: Date, default: Date.now }
});
const Data = mongoose.model('Data', dataSchema);

// Initialize web3
const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const contractABI = []; // Your contract ABI
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

app.post('/api/data', async (req, res) => {
  const { voltage, current, power } = req.body;

  const data = new Data({ voltage, current, power });
  await data.save();

  // Convert power to coins and update blockchain
  const coins = power * 0.1; // Example conversion rate
  const mintTransaction = contract.methods.mint(coins);
  const gas = await mintTransaction.estimateGas({ from: process.env.WALLET_ADDRESS });
  const gasPrice = await web3.eth.getGasPrice();
  const dataTx = mintTransaction.encodeABI();
  const nonce = await web3.eth.getTransactionCount(process.env.WALLET_ADDRESS);

  const tx = {
    from: process.env.WALLET_ADDRESS,
    to: contractAddress,
    gas,
    gasPrice,
    data: dataTx,
    nonce,
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);
  await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  res.status(200).send('Data received and processed');
});

app.get('/api/data', async (req, res) => {
  const data = await Data.find().sort({ timestamp: -1 }).limit(100);
  res.json(data);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
