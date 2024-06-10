// controllers/vendor.controller.js
import axios from 'axios';
import CommunicationLog from '../model/communicationLogs.model.js'

export const sendBulkMessages = async (req, res) => {
  const { campaignId, customers } = req.body;

  try {
    const logs = await Promise.all(customers.map(async (customer) => {
      const message = `Hi ${customer.name}, here is 10% off on your next order`;

      
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
      const log = new CommunicationLog({
        campaignId,
        customerId: customer._id,
        status,
        message,
      });

      await log.save();
      console.log('Message sent:', message);    

      // Call the Delivery Receipt API
      await axios.post('http://localhost:5000/api/vendor/delivery-receipt', { logId: log._id, status });

      return log;
    }));

    res.status(200).json({ message: 'Messages sent successfully', logs });
  } catch (error) {
    res.status(500).json({ message: 'Error sending messages', error });
  }
};
// controllers/vendor.controller.js (continued)
export const handleDeliveryReceipt = async (req, res) => {
    const { logId, status } = req.body;
  
    try {
      const log = await CommunicationLog.findById(logId);
      if (!log) {
        return res.status(404).json({ message: 'Communication log not found' });
      }
  
      log.status = status;
      await log.save();
  
      res.status(200).json({ message: 'Delivery receipt updated successfully', log });
    } catch (error) {
      res.status(500).json({ message: 'Error updating delivery receipt', error });
    }
  };
  