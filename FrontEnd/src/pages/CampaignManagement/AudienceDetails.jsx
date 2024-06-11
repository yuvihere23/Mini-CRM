import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/campaigns/list`);
        setCampaigns(response.data.campaigns);
      } catch (error) {
        console.error('Error fetching campaigns:', error); // Log the error
        setError('Failed to fetch campaigns.');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleSendCampaign = async (campaignId) => {
    try {
      const response = await axios.post(`/api/campaigns/send/${campaignId}`);
      alert('Campaign sent successfully!');
      // Refresh the campaigns list to reflect any updates
      const updatedResponse = await axios.get('/api/campaigns/list');
      setCampaigns(updatedResponse.data.campaigns);
    } catch (error) {
      console.error('Error sending campaign:', error); // Log the error
      setError('Failed to send campaign.');
    }
  };

  const handleViewAudienceSize = async (campaignId) => {
    try {
      const response = await axios.get(`/api/campaigns/audience-size/${campaignId}`);
      alert(`Total Audience Size: ${response.data.audienceSize}`);
    } catch (error) {
      console.error('Error getting audience size:', error); // Log the error
      setError('Failed to get audience size.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col  items-center min-h-screen bg-gray-100">
        <h1 className=' text-2xl font-semibold mb-4 '>This is the Created Campaigns lists</h1>
      {campaigns.map((campaign) => (
        <Card key={campaign._id} className="mb-4 w-full max-w-3xl"> {/* Adjust the width here */}
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {campaign.name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Audience Size: {campaign.totalAudienceSize}
          </p>
          <div className="mt-4 flex"> {/* Use flexbox for horizontal layout */}
            <Button
              onClick={() => handleSendCampaign(campaign._id)}
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Send Campaign
            </Button>
            <Button
              onClick={() => handleViewAudienceSize(campaign._id)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
            >
              View Audience Size
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
