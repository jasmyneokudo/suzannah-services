import { PremiumServicePackages } from "@/data/premiumServicePackages";
import { IconCheck, IconSpaces } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export const PremiumPackageSection = () => {
  const router = useRouter();
  return (
    <section
      id="premium-packages-section"
      className="text-black my-8 py-5  px-5 bg-gradient-to-br from-luxury-ivory via-luxury-gold/5 to-luxury-champagne"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-60" />

      <h1 className="font-extralight text-3xl text-center text-black dark:text-gray-700 mt-10">
        Our Bespoke Packages
      </h1>
      <p className="text-center text-sm text-blue-950 font-sans mt-2">
        Curated Household Management Concierge for distinguished homes.
      </p>

    <div className="grid grid-cols-[1fr_1fr] gap-x-8 px-10 max-sm:flex max-sm:flex-col max-sm:px-0">
      {PremiumServicePackages().map((servicePackage, index: number) => (
        <div
          onClick={() => {
            if (index === 3) {
              router.push("/build");
            } else {
              router.push(`/package?type=${index + 1}`);
            }
          }}
          key={index}
          className={`mt-6 p-3 rounded-lg border text-card-foreground shadow-sm  ${
            servicePackage.featured
              ? "border-2 border-luxury-gold bg-gradient-to-br from-luxury-ivory via-luxury-gold/10 to-luxury-champagne"
              : "border-luxury-champagne bg-luxury-ivory/95 backdrop-blur-sm"
          } overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer`}
        >
          <div className="self-center mx-auto rounded-full bg-luxury-gold w-12 h-12 items-center flex justify-center mt-5">
            {servicePackage.icon}
          </div>

          <h2 className="text-center mt-1 font-young-serif text-lg">
            {servicePackage.serviceName}
          </h2>
          <h4 className="text-center text-luxury-gold font-bold mt-1">
            {index !== 3
              ? `₦${servicePackage.investment.toLocaleString()} per month`
              : "Custom pricing based on your selection"}
          </h4>

          <p className="text-black font-semibold mt-3">Includes: </p>
          <ol className="mt-1 text-sm list-none text-black dark:text-gray-900">
            {servicePackage.includes.map((item, index) => (
              <li key={index} className="flex">
                <IconCheck
                  color="#172554"
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
            {servicePackage.highlights.map((item, index) => (
              <li key={index} className="flex">
                <IconSpaces
                  color="#172554"
                  stroke={2}
                  size={20}
                  className="mr-2 shrink-0"
                />{" "}
                {item}
              </li>
            ))}
          </ol>
        </div>
      ))}
      </div>
    </section>
  );
};
