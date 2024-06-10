
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('/api/campaigns/list');
        setCampaigns(response.data.campaigns);
        setLoading(false);
      } catch (error) {
        setError('Error fetching campaigns. Please try again.');
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Campaign List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 border-b font-semibold text-gray-800">Name</th>
              <th className="py-3 px-6 border-b font-semibold text-gray-800">Created At</th>
              <th className="py-3 px-6 border-b font-semibold text-gray-800">Total Audience Size</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => (
              <tr key={campaign._id} className="hover:bg-gray-50">
                <td className="py-4 px-6 border-b">{campaign.name}</td>
                <td className="py-4 px-6 border-b">{new Date(campaign.createdAt).toLocaleDateString()}</td>
                <td className="py-4 px-6 border-b">{campaign.totalAudienceSize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
