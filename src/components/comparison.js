import React from 'react';

const Comparison = ({ comparisonLog, communicationMode }) => {
  const compareMessages = () => {
    switch (communicationMode) {
      case 'request-response':
        return 'Dalam Request-Response, server mengirimkan respons "Pesan diterima" setelah menerima pesan.';
      case 'publish-subscribe':
        return 'Dalam Publish-Subscribe, pesan disiarkan ke semua node terdaftar.';
      case 'message-passing':
        return 'Dalam Message Passing, pesan dikirim langsung ke node tujuan.';
      case 'rpc':
        return 'Dalam Remote Procedure Call (RPC), server menerima permintaan dan merespons dengan status operasi.';
      default:
        return '';
    }
  };

  return (
    <div>
      <h5 className="text-lg font-bold">Perbandingan Model Komunikasi</h5>
      <p>{compareMessages()}</p>
      <div className="mt-4">
        <h6 className="font-semibold">Log Perbandingan:</h6>
        <ul>
          {comparisonLog.map((msg, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Comparison;
