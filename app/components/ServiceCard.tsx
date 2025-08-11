import Button from "./Button";
import Image from "next/image";

type ServiceProps = {
    imgUrl: string;
    serviceName: string;
    serviceDescription: string;
    serviceUrl: string;
}

const ServiceCard = (props: ServiceProps) => {
  return (
    <div className="mt-20 flex w-1/2 justify-between p-5 shadow-md shadow-stone-300">
      <div className=" w-full bg-gradient-to-b  from-blue-950 to-[#0D98BA] h-full rounded">
        <Image
          src={props.imgUrl}
          alt="Vercel Logo"
          width="200"
          height="200"
          className="opacity-40 rounded-br-[400px]"
          priority
        />
      </div>

      <div className="ml-10">
        <h2 className="font-semibold">{props.serviceName}</h2>
        <p>
          {props.serviceDescription}
        </p>
        <Button url={props.serviceUrl} />
      </div>
    </div>
  );
};

export default ServiceCard;
