import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommunicationLogCard = () => {
  const [communicationLogs, setCommunicationLogs] = useState([]);

  useEffect(() => {
    // Fetch communication logs from the backend API
    const fetchCommunicationLogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/communications/logs`);
        setCommunicationLogs(response.data.logs);
        console.log(response);
      } catch (error) {
        console.error('Error fetching communication logs:', error);
      }
    };

    fetchCommunicationLogs();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-4">
        {communicationLogs.map((log) => (
          <div key={log._id} className="rounded-lg overflow-hidden shadow-md bg-white w-full">
            <div className="p-4">
              <h5 className="text-lg font-semibold mb-2">Campaign: {log.campaignId?.name}</h5>
              <p className="text-sm mb-2">Customer: {log.customerId?.name}</p>
              <p className="text-sm">Status: {log.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default CommunicationLogCard;
