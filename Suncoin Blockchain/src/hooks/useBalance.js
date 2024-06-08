import { useState, useEffect } from 'react';
import Web3 from 'web3';

const useBalance = (contractABI, contractAddress, walletAddress) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`);
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const fetchBalance = async () => {
      try {
        const balance = await contract.methods.balanceOf(walletAddress).call();
        setBalance(balance);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [contractABI, contractAddress, walletAddress]);

  return { balance, loading, error };
};

export default useBalance;
