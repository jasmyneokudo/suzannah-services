import { premiumServicePackages } from "@/data/premiumServicePackages";
import {
  IconCheck,
  IconSpaces,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export const PremiumPackageSection = () => {
  const router = useRouter();
  return (
    <section
      id="premium-packages-section"
      className="text-black my-10 py-5 px-5 bg-gradient-to-br from-[#fff]  via-blue-600/5 to-[#f5f5dc]"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-60" />

      <h1 className="font-extralight text-3xl text-center text-black dark:text-gray-700 mt-10">
        Our Bespoke Packages
      </h1>
      <p className="text-center text-sm text-blue-800 font-sans mt-2">
        Personalized home services for distinguished homes.
      </p>

      {premiumServicePackages.map((servicePackage, index) => (
        <div
          // onClick={() => alert('Our Premium Home Services Packages will be available on the 1st of December 2025, Send a Whatsapp message to be added to the waiting list. Thank you!')}
          onClick={() => {
            router.push(`/package?type=${index + 1}`)
          }}
          key={index}
          className={`mt-6 p-3 rounded-lg border text-card-foreground shadow-sm  ${
            servicePackage.featured
              ? "border-2 border-blue-600 bg-gradient-to-br from-[#FFFFF0] via-blue-600/10 to-[#F5F5DC]"
              : "border-[#F5F5DC] bg-[#FFFFF0]/95 backdrop-blur-sm"
          } overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer`}
        >
          <div className="self-center mx-auto rounded-full bg-blue-900 w-12 h-12 items-center flex justify-center mt-5">
            {servicePackage.icon}
          </div>

          <h2 className="text-center mt-1 font-semibold text-lg">
            {servicePackage.serviceName}
          </h2>
          <h4 className="text-center text-blue-600 font-bold mt-1">
            ₦{servicePackage.investment.toLocaleString()} per month
          </h4>

          <p className="text-black font-semibold mt-3">Includes: </p>
          <ol className="mt-1 text-sm list-none text-black dark:text-gray-900">
            {servicePackage.includes.map((item, index) => (
              <li key={index} className="flex">
                <IconCheck
                  color="green"
                  stroke={2}
                  size={20}
                  className="mr-2 shrink-0"
                />
                {item}
              </li>
            ))}
          </ol>

          <p className="text-black font-semibold mt-3">Highlights: </p>
          <ol className="mt-1 text-sm list-none text-black dark:text-gray-900">
            {
                servicePackage.highlights.map((item, index) => (
                  <li key={index} className="flex">
                    <IconSpaces
                      color="green"
                      stroke={2}
                      size={20}
                      className="mr-2 shrink-0"
                    />{" "}
                    {item}
                  </li>))
             }
            
          </ol>
        </div>
      ))}
    </section>
  );
};
