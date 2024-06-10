// controllers/campaign.controller.js
import Campaign from '../model/campain.model.js';
import axios from 'axios';
import Customer from '../model/customer.model.js';
import CommunicationLog from '../model/communicationLogs.model.js';

// Create a new campaign
export const createCampaign = async (req, res) => {
    const { name, audienceCriteria, logicalOperators } = req.body;
    
    if (!name || !audienceCriteria || !logicalOperators) {
      return res.status(400).json({ message: 'Name, audience criteria, and logical operators are required' });
    }
  
    try {
      // Parse and structure the audience criteria data
      const parsedCriteria = parseAudienceCriteria(audienceCriteria);
      
      const newCampaign = new Campaign({ 
          name, 
          audienceCriteria: parsedCriteria,
          logicalOperators
        });
      await newCampaign.save();
      res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
      console.log('Campaign created successfully', newCampaign);
    } catch (error) {
      res.status(500).json({ message: 'Error creating campaign', error });
    }
  };

// Helper function to parse audience criteria
const parseAudienceCriteria = (audienceCriteria) => {
  const parsedCriteria = {};

  // Iterate through each criterion
  Object.keys(audienceCriteria).forEach(key => {
    const criterion = audienceCriteria[key];

    // Parse and add the criterion to the parsedCriteria object
    parsedCriteria[key] = {
      operator: criterion.operator,
      value: criterion.value
    };
  });
  console.log('parsedCriteria:', parsedCriteria);

  return parsedCriteria;

};




// Send a campaign
export const sendCampaign = async (req, res) => {
  const { campaignId } = req.params;

  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      console.error('Campaign not found:', campaignId);
      return res.status(404).json({ message: 'Campaign not found' });
    }
    console.log('Campaign:', campaign);

    // Constructing the query for MongoDB based on audience criteria
    const criteria = constructCriteria(campaign.audienceCriteria, campaign.logicalOperators);
    console.log('Criteria:', JSON.stringify(criteria));

    // Find customers matching the constructed query
    const customers = await Customer.find(criteria);
    console.log('Customers:', customers);

    // Simulate sending the campaign
    const logs = [];
    for (const customer of customers) {
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
      const log = new CommunicationLog({ campaignId: campaign._id, customerId: customer._id, status });
      await log.save();
      logs.push(log);
    }
    
        // const response = await axios.post('http://localhost:5000/api/vendor/send-bulk-messages', {
        //     campaignId,
        //     customers,
        // });
        // console.log('response:', response.data);

    // Update campaign attributes based on response
    campaign.totalAudienceSize = customers.length;
    campaign.sent = logs.filter(log => log.status === 'SENT').length;
    campaign.failed = logs.filter(log => log.status === 'FAILED').length;
    campaign.sentAt = new Date();
    console.log('Updated Campaign:', campaign);

    await campaign.save();

    res.status(200).json({ message: 'Campaign sent successfully', campaign });
  } catch (error) {
    console.error('Error sending campaign:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error sending campaign', error: error.message });
  }
};

export const getAudienceSize = async (req, res) => {
    const { campaignId } = req.params;

    try {
        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        const criteria = constructCriteria(campaign.audienceCriteria, campaign.logicalOperators);
        console.log('criteria:', criteria);

        const customers = await Customer.find(criteria);
        console.log('customers:', customers);

        res.status(200).json({ audienceSize: customers.length });
    } catch (error) {
        console.error('Error getting audience size:', error);
        res.status(500).json({ message: 'Error getting audience size', error: error.message });
    }
};

const constructCriteria = (audienceCriteria, logicalOperators) => {
  const criteria = [];

  // Apply totalSpends criterion
  if (audienceCriteria.totalSpends) {
    const { operator, value } = audienceCriteria.totalSpends;
    const mongoOperator = operator === 'gt' ? '$gt' : '$lt';
    criteria.push({ totalSpends: { [mongoOperator]: value } });
  }

  // Apply visits criterion
  if (audienceCriteria.visits) {
    const { operator, value } = audienceCriteria.visits;
    const mongoOperator = operator === 'gt' ? '$gt' : '$lt';
    criteria.push({ visits: { [mongoOperator]: value } });
  }

  // Apply lastVisit criterion
  if (audienceCriteria.lastVisit) {
    const { operator, value } = audienceCriteria.lastVisit;
    const mongoOperator = operator === 'gt' ? '$gt' : '$lt';
    const date = new Date();
    date.setMonth(date.getMonth() - value);
    criteria.push({ lastVisit: { [mongoOperator]: date } });
  }

  let query = {};

  if (logicalOperators.spendsVisits === 'AND' && logicalOperators.visitsLastVisit === 'AND') {
    query = { $and: criteria };
  } else if (logicalOperators.spendsVisits === 'AND' && logicalOperators.visitsLastVisit === 'OR') {
    query = { $and: [criteria[0], { $or: [criteria[1], criteria[2]] }] };
  } else if (logicalOperators.spendsVisits === 'OR' && logicalOperators.visitsLastVisit === 'AND') {
    query = { $or: [{ $and: [criteria[0], criteria[1]] }, criteria[2]] };
  } else {
    query = { $or: criteria };
  }

  return query;
};

  
  

// Get all campaigns
export const getAllCampaigns = async (req, res) => {
    try {
      const campaigns = await Campaign.find().sort({ createdAt: -1 });
  
      // Get the count of total campaigns
      const campaignCount = await Campaign.countDocuments();
  
      res.status(200).json({ campaigns, count : campaignCount });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving campaigns', error });
    }
  };

export const getCampaignById = async (req, res) => {
    const { campaignId } = req.params;
  
    try {
      const campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }
      res.status(200).json({ campaign });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving campaign', error });
    }
  };
  