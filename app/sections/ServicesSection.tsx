import { services } from "@/data/services";
import ServiceCard from "../components/ServiceCard"
import { ServiceType } from "@/types/ClientRequest";

type ServicesSectionType = {
    requestStage: Number;
    onSelectService: (serviceName: ServiceType) => void;
}

export const ServicesSection = ({ requestStage, onSelectService }: ServicesSectionType) => {
    return (
        <section
            id="services-section"
            className={`${
            requestStage !== 0 && "hidden"
            } mt-20 max-sm:mt-10 flex flex-col items-center bg-white max-sm:px-10`}
        >
            <h1 className="font-extralight text-3xl text-black dark:text-gray-700">
            SERVICES
            </h1>

            {services.map((service, index) => (
            <ServiceCard
                whatsIncluded={service.whatsIncluded}
                key={index}
                serviceDescription={service.serviceDescription}
                serviceName={service.serviceName}
                onClick={() => onSelectService(service.serviceName as ServiceType)}
            />
            ))}
        </section>
    )
}