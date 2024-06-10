import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AudienceDetailsCard from '../../components/AudienceDetailsCard';
import CampaignCreationCard from '../../components/CampainCreationCard';
import CampaignList from './ListCampaigns';

const campaignList = () => {
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
    <div className="overflow-x-auto mt-8">
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
  );
};

function Campaigns() {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full flex flex-row justify-evenly mb-8">
        <div className="m-2 p-4 mt-3 border-4 border-orange-500 shadow-2xl">
          <CampaignCreationCard />
        </div>
        <div className="m-2 p-4 mt-3 border-4 border-orange-500 shadow-2xl">
          <AudienceDetailsCard />
        </div>
      </div>
      <div className="w-full">
        <CampaignList />
      </div>
    </div>
  );
}

export default Campaigns;
