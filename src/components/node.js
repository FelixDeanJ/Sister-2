import React, { useState } from 'react';
import { Button, TextInput } from 'flowbite-react';

const Node = ({ nodeName, sendMessage, messages }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage) {
      sendMessage(nodeName, inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h4 className="text-xl font-bold">{nodeName}</h4>
      <div className="my-4">
        <TextInput
          placeholder="Ketik pesan..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="mb-2"
        />
        <Button onClick={handleSendMessage} color="purple">
          Kirim
        </Button>
      </div>
      <h5 className="font-semibold">Pesan yang Diterima:</h5>
      <ul>
        {messages.map((msg, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Node;
