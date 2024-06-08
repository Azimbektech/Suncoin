require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const contractPath = path.resolve(__dirname, 'contracts', 'SolarCoin.json');
const { abi, evm } = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(abi);

  const deployTx = contract.deploy({
    data: evm.bytecode.object,
  });

  const gas = await deployTx.estimateGas();
  const gasPrice = await web3.eth.getGasPrice();
  const data = deployTx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(accounts[0]);

  const tx = {
    from: accounts[0],
    data,
    gas,
    gasPrice,
    nonce,
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log('Contract deployed at address:', receipt.contractAddress);
};

deploy();
