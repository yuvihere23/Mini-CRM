// routes/vendor.routes.js
import express from 'express';
import { sendBulkMessages, handleDeliveryReceipt } from '../middelwares/vendorApi.js';

const router = express.Router();

router.post('/send-bulk-messages', sendBulkMessages);
router.post('/delivery-receipt', handleDeliveryReceipt);

export default router;
