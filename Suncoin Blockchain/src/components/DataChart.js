import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const DataChart = ({ data }) => {
  const timestamps = data.map(item => new Date(item.timestamp).toLocaleString());
  const powerValues = data.map(item => item.power);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Power (kW)',
        data: powerValues,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2>Solar Panel Power Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default DataChart;
