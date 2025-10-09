import Button from "./Button";

type ServiceProps = {
  serviceName: string;
  serviceDescription: string;
  serviceUrl?: string;
  onClick?: () => void;
  whatsIncluded: string[];
  price: string;
};

const ServiceCard = (props: ServiceProps) => {
  return (
    <div className="mt-20 max-sm:mt-10 flex w-1/2 max-sm:w-full justify-between p-5  shadow-md shadow-stone-300">
      <div className="ml-10 max-sm:ml-2">
        <h2 className="font-semibold text-[20px] text-black dark:text-gray-900">
          {props.serviceName}
        </h2>
        <p className="mt-2 text-gray-600 max-lg font-light">
          {props.serviceDescription}
        </p>
        <h4 className="mt-3 font-medium text-black dark:text-gray-900">
          What&apos;s Included:
        </h4>
        <ol className="mt-2 marker:text-blue-950 list-disc pl-5 text-gray-600 max-lg font-light mb-3">
          {props.whatsIncluded.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
        <div className="flex justify-between">
          <h2 className="text-xl text-blue-950 font-semibold">{props.price}</h2>
          <p className="text-gray-600 text-sm">starting at</p>
        </div>
        <Button onClick={props.onClick} url={props.serviceUrl} />
      </div>
    </div>
  );
};

export default ServiceCard;
