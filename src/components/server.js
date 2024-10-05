import React from 'react';

const Server = ({ logMessages }) => {
  return (
    <div>
      <h5 className="text-lg font-bold">Log Server</h5>
      <ul>
        {logMessages.map((msg, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Server;
