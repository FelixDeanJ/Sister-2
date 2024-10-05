import React, { useState } from 'react';
import { Navbar, Button, Card } from 'flowbite-react';
import Node from './components/node'; // Ubah nama file menjadi huruf kecil
import Server from './components/server'; // Ubah nama file menjadi huruf kecil
import Comparison from './components/comparison'; // Ubah nama file menjadi huruf kecil

const App = () => {
  const [logMessages, setLogMessages] = useState([]);
  const [nodeMessages, setNodeMessages] = useState({ 'Node 1': [], 'Node 2': [] });
  const [communicationMode, setCommunicationMode] = useState('request-response');
  const [comparisonLog, setComparisonLog] = useState([]);

  const sendMessage = (nodeName, message) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `${timestamp} - ${nodeName} mengirim: ${message}`;
    setLogMessages((prevLogs) => [...prevLogs, logEntry]);

    if (communicationMode === 'request-response') {
      const serverResponse = `${timestamp} - Server menerima dari ${nodeName}: ${message}`;
      setLogMessages((prevLogs) => [...prevLogs, serverResponse]);
      setTimeout(() => {
        const responseEntry = `${timestamp} - Server merespons: Pesan diterima`;
        setLogMessages((prevLogs) => [...prevLogs, responseEntry]);
        setComparisonLog((prevLogs) => [...prevLogs, responseEntry]);
      }, 1000);
    }

    if (communicationMode === 'publish-subscribe') {
      const broadcastMessage = `${timestamp} - Server broadcast: Pesan dari ${nodeName}`;
      setLogMessages((prevLogs) => [...prevLogs, broadcastMessage]);
      const otherNode = nodeName === 'Node 1' ? 'Node 2' : 'Node 1';
      setNodeMessages((prevMessages) => ({
        ...prevMessages,
        [otherNode]: [...prevMessages[otherNode], `${timestamp} - Broadcast diterima: ${message}`],
      }));
      setComparisonLog((prevLogs) => [...prevLogs, broadcastMessage]);
    }

    if (communicationMode === 'message-passing') {
      const otherNode = nodeName === 'Node 1' ? 'Node 2' : 'Node 1';
      const directMessage = `${timestamp} - ${otherNode} menerima dari ${nodeName}: ${message}`;
      setNodeMessages((prevMessages) => ({
        ...prevMessages,
        [otherNode]: [...prevMessages[otherNode], directMessage],
      }));
      setLogMessages((prevLogs) => [...prevLogs, directMessage]);
      setComparisonLog((prevLogs) => [...prevLogs, directMessage]);
    }

    if (communicationMode === 'rpc') {
      const rpcResponse = `${timestamp} - Server RPC menerima permintaan dari ${nodeName}: ${message}`;
      setLogMessages((prevLogs) => [...prevLogs, rpcResponse]);
      setTimeout(() => {
        const rpcAck = `${timestamp} - Server RPC merespons: Operasi berhasil`;
        setLogMessages((prevLogs) => [...prevLogs, rpcAck]);
        setComparisonLog((prevLogs) => [...prevLogs, rpcAck]);
      }, 1000);
    }
  };

  return (
    <div className="App">
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Simulasi Sistem Terdistribusi
          </span>
        </Navbar.Brand>
      </Navbar>
      <div className="container mx-auto my-6">
        <Card>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Pilih Mode Komunikasi
          </h5>
          <div className="my-4">
            <label htmlFor="mode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Mode Komunikasi:
            </label>
            <select
              id="mode"
              value={communicationMode}
              onChange={(e) => setCommunicationMode(e.target.value)}
              className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            >
              <option value="request-response">Request-Response</option>
              <option value="publish-subscribe">Publish-Subscribe</option>
              <option value="message-passing">Message Passing</option>
              <option value="rpc">Remote Procedure Call (RPC)</option>
            </select>
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
          <Card>
            <Node nodeName="Node 1" sendMessage={sendMessage} messages={nodeMessages['Node 1']} />
          </Card>
          <Card>
            <Node nodeName="Node 2" sendMessage={sendMessage} messages={nodeMessages['Node 2']} />
          </Card>
        </div>
        <div className="mt-6">
          <Card>
            <Server logMessages={logMessages} />
          </Card>
        </div>
        <div className="mt-6">
          <Card>
            <Comparison comparisonLog={comparisonLog} communicationMode={communicationMode} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App;
