const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const contractPath = path.resolve(__dirname, '../contracts', 'SolarCoin.json');
const { abi } = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(abi, contractAddress);

const mintCoins = async (amount) => {
  const mintTransaction = contract.methods.mint(amount);
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
  return await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};

module.exports = { mintCoins };
