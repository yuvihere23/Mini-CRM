import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import customerRoutes from './routes/customer.route.js';
import orderRoutes from './routes/order.route.js';
import bodyParser from 'body-parser';
import campaignRoutes from './routes/campain.route.js';
import communicationLogRoutes from './routes/communicationLogs.route.js';
import vendorRoutes from './routes/vendorApi.route.js';


const app = express();

app.use(cors({
  origin: 'https://main--xeno-crm.netlify.app', // Replace with your actual Netlify domain
  credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());


app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", orderRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/communications', communicationLogRoutes);
app.use('/api/vendor', vendorRoutes);




export { app };