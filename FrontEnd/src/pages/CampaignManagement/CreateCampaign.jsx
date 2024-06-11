import React, { useState } from 'react';
import axios from 'axios';
import { Button, Label, TextInput, Select } from "flowbite-react";
import  {useNavigate} from 'react-router-dom';

export default function CreateCampaign() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    audienceCriteria: {
      totalSpends: { operator: '', value: '' },
      visits: { operator: '', value: '' },
      lastVisit: { operator: '', value: '' }
    },
    logicalOperators: {
      spendsVisits: 'AND',  // Logical operator between totalSpends and visits
      visitsLastVisit: 'AND'  // Logical operator between visits and lastVisit
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field, operator, value) => {
    setFormData(prevState => ({
      ...prevState,
      audienceCriteria: {
        ...prevState.audienceCriteria,
        [field]: { operator, value }
      }
    }));
  };

  const handleLogicalOperatorChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      logicalOperators: {
        ...prevState.logicalOperators,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/campaigns/create`, formData);
      console.log('Campaign created:', response.data);
      setFormData({
        name: '',
        audienceCriteria: {
          totalSpends: { operator: '', value: '' },
          visits: { operator: '', value: '' },
          lastVisit: { operator: '', value: '' }
        },
        logicalOperators: {
          spendsVisits: 'AND',
          visitsLastVisit: 'AND'
        }
      });
      setLoading(false);
      navigate('/audience');
      
    } catch (error) {
      setError('Failed to create campaign. Please try again.');
      setLoading(false);
    }


  };

  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold">Create Campaign</h1>
      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name of the campaign" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="Enter campaign name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          shadow
        />
      </div>

      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="totalSpendsOperator" value="Select Customer Total Spending Range" />
        </div>
        <Select
          id="totalSpendsOperator"
          value={formData.audienceCriteria.totalSpends.operator}
          onChange={(e) => handleChange('totalSpends', e.target.value, formData.audienceCriteria.totalSpends.value)}
          required
        >
          <option value="">Select Operator</option>
          <option value="equals">Equals</option>
          <option value="lt">Less than</option>
          <option value="gt">Greater than</option>
        </Select>
        <TextInput
          id="valueTotalSpends"
          type="number"
          placeholder="Value"
          value={formData.audienceCriteria.totalSpends.value}
          onChange={(e) => handleChange('totalSpends', formData.audienceCriteria.totalSpends.operator, e.target.value)}
          required
          shadow
        />
      </div>

      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="spendsVisitsOperator" value="Logical Operator Between Total Spends and Visits" />
        </div>
        <Select
          id="spendsVisitsOperator"
          value={formData.logicalOperators.spendsVisits}
          onChange={(e) => handleLogicalOperatorChange('spendsVisits', e.target.value)}
          required
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </Select>
      </div>

      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="visitsOperator" value="Select for Number of Visits" />
        </div>
        <Select
          id="visitsOperator"
          value={formData.audienceCriteria.visits.operator}
          onChange={(e) => handleChange('visits', e.target.value, formData.audienceCriteria.visits.value)}
          required
        >
          <option value="">Select Operator</option>
          <option value="equals">Equals</option>
          <option value="lt">Less than</option>
          <option value="gt">Greater than</option>
        </Select>
        <TextInput
          id="valueVisits"
          type="number"
          placeholder="Value"
          value={formData.audienceCriteria.visits.value}
          onChange={(e) => handleChange('visits', formData.audienceCriteria.visits.operator, e.target.value)}
          required
          shadow
        />
      </div>

      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="visitsLastVisitOperator" value="Logical Operator Between Visits and Last Visit" />
        </div>
        <Select
          id="visitsLastVisitOperator"
          value={formData.logicalOperators.visitsLastVisit}
          onChange={(e) => handleLogicalOperatorChange('visitsLastVisit', e.target.value)}
          required
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </Select>
      </div>

      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="lastVisitOperator" value="Select for Last Visited Month Criteria" />
        </div>
        <Select
          id="lastVisitOperator"
          value={formData.audienceCriteria.lastVisit.operator}
          onChange={(e) => handleChange('lastVisit', e.target.value, formData.audienceCriteria.lastVisit.value)}
          required
        >
          <option value="">Select Operator</option>
          <option value="equals">Equals</option>
          <option value="lt">Less than</option>
          <option value="gt">Greater than</option>
        </Select>
        <TextInput
          id="valueLastVisit"
          type="number"
          placeholder="Value"
          value={formData.audienceCriteria.lastVisit.value}
          onChange={(e) => handleChange('lastVisit', formData.audienceCriteria.lastVisit.operator, e.target.value)}
          required
          shadow
        />
      </div>

      <Button
        className='text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'
        type="submit"
      >
        Create Campaign
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
}
