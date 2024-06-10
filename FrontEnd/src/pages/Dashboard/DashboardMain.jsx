import { useEffect, useState } from "react";
import CardComponent from "../../components/Signup/Card.jsx";
import customer from "../../assets/images/customers.jpg"
import order from "../../assets/images/order.jpg"
import campaign from "../../assets/images/campaign.jpg"

export default function Dashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    // Fetch counts for customers, orders, and campaigns
    const fetchData = async () => {
      try {
        // Fetch customer count
        const customerResponse = await fetch("/api/customer/getCustomerCount");
        console.log('customerResponse:', customerResponse);
        const customerData = await customerResponse.json();
        setCustomerCount(customerData.count);

        // Fetch order count
        const orderResponse = await fetch("/api/order/count");
        const orderData = await orderResponse.json();
        setOrderCount(orderData.count);

        // Fetch campaign count
        const campaignResponse = await fetch("/api/campaigns/list");
        const campaignData = await campaignResponse.json();
        setCampaignCount(campaignData.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-between">
      <CardComponent 
        title="Customers" 
        count={customerCount} 
        description="Customers registered." 
        imgSrc={customer}
        imgAlt="Customers"
      />
      <CardComponent 
        title="Orders" 
        count={orderCount} 
        description="Orders placed." 
        imgSrc={order}
        imgAlt="Orders"
      />
      <CardComponent 
        title="Campaigns" 
        count={campaignCount} 
        description="Campaigns created." 
        imgSrc={campaign}
        imgAlt="Campaigns"
      />
    </div>
  );
}
