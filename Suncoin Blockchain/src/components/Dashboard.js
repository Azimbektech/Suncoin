import React from 'react';
import useData from '../hooks/useData';
import useBalance from '../hooks/useBalance';

const Dashboard = ({ contractABI, contractAddress, walletAddress }) => {
  const { data, loading: dataLoading, error: dataError } = useData();
  const { balance, loading: balanceLoading, error: balanceError } = useBalance(contractABI, contractAddress, walletAddress);

  if (dataLoading || balanceLoading) {
    return <div>Loading...</div>;
  }

  if (dataError || balanceError) {
    return <div>Error: {dataError || balanceError}</div>;
  }

  return (
    <div>
      <h1>Solar Panel Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.timestamp}: {item.power} kW</li>
        ))}
      </ul>
      <h2>Coin Balance: {balance} SLC</h2>
    </div>
  );
};

export default Dashboard;
