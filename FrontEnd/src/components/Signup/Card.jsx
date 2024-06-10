import { Card } from "flowbite-react";

export default function CardComponent({ title, count, description, imgSrc, imgAlt }) {
  return (
    <Card href="#" className="max-w-sm m-4 p-4 border-4 border-orange-500 shadow-2xl rounded-lg">
      {imgSrc && <img src={imgSrc} alt={imgAlt} className="w-full h-auto rounded-t-lg" />}
      <div className="p-4">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Total count: {count}
        </p>
      </div>
    </Card>
  );
}
