

import { Button, Card } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

export default function CampaignCreationCard() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/campaigns/create');
    };
  
  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       Click Here to create a new Campaign.
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      You can Create a new Campaign by clicking the button below.
      </p>
      <Button onClick={handleClick}
      className='text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'
      >
        Create Camapign
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Card>
  );
}
