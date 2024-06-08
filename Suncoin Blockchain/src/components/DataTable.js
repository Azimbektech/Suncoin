import React from 'react';

const DataTable = ({ data }) => {
  return (
    <div>
      <h2>Solar Panel Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Voltage (V)</th>
            <th>Current (A)</th>
            <th>Power (kW)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
              <td>{item.voltage.toFixed(2)}</td>
              <td>{item.current.toFixed(2)}</td>
              <td>{item.power.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
