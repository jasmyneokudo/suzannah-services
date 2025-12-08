import { useAppContext } from "@/app/context/AppContext";
import {
  IconBrandGoogleHome,
  IconHomeHeart,
  IconHomeStar,
  IconHammer,
} from "@tabler/icons-react";

export const PremiumServicePackages = () => {
  const { premiumPackageRequest, setPremiumPackageRequest: _ } = useAppContext();
  return [
  {
    icon: (
      <IconHomeHeart
        className="self-center"
        size={30}
        color="white"
        stroke={1.5}
      />
    ),
    serviceName: "The Executive Home Comfort Package",
    investment: 1200000,
    includes: [
      "Professional Nanny",
      "Professional Housekeeper",
      "Private Chef",
    ],
    featured: false,
    highlights: [
      "Fully managed household team — recruitment, supervision, and replacement handled by us",
      "Elegant staff uniforms, etiquette training, and grooming",
      "Weekly home check-ins and continuous performance reviews",
    ],
    idealFor:
      "Busy professionals, executives, and young families who value comfort and confidentiality",
  },
  {
    icon: (
      <IconHomeStar
        className="self-center"
        size={30}
        color="white"
        stroke={1.5}
      />
    ),
    serviceName: "The Prestige Lifestyle Package",
    investment: 1800000,
    includes: [
      "Professional Nanny",
      "Professional Housekeeper",
      "Private Chef",
      "+ One additional domestic professional of your choice (Private Driver, Home Assistant, Laundry Attendant, Gardener, Security Assistant, or any preferred roles)",
    ],
    featured: true,
    highlights: [
      "Fully managed household team — recruitment, supervision, and replacement handled by us",
      "Elegant staff uniforms, etiquette training, and grooming",
      "Weekly home check-ins and continuous performance reviews",
    ],
    idealFor:
      "Families that host regularly or desire flexible, high-quality domestic support",
  },
  {
    icon: (
      <IconBrandGoogleHome
        className="self-center"
        size={30}
        color="white"
        stroke={1.5}
      />
    ),
    serviceName: "The Royal Residence Management Package",
    investment: 2200000,
    includes: [
      "Professional Nanny",
      "Professional Housekeeper",
      "Private Chef",
      "+ Any two additional domestic professional of your choice (Private Driver, Home Assistant, Laundry Attendant, Gardener, Security Assistant, or any preferred roles)",
    ],
    featured: false,
    highlights: [
      "Fully managed household team — recruitment, supervision, and replacement handled by us",
      "Elegant staff uniforms, etiquette training, and grooming",
      "Periodic home check-ins and continuous performance reviews",
    ],
    idealFor:
      "Diplomats, executives, and high-net-worth families who expect an effortless, luxury home experience",
  },
  {
    icon: (
      <IconHammer
        className="self-center"
        size={30}
        color="white"
        stroke={1.5}
      />
    ),
    serviceName: "Build your Own Household Package",
    investment: 500000 * premiumPackageRequest.additionalStaffMembers.length,
    includes: [
      "Choose any number and type of domestic staff",
      "Complete flexibility in team composition",
      "All staff types available: Childcare Professional, Private Chef, Professional Housekeeper, Private Driver, Home Assistant, Laundry Attendant, Gardener, Security Assistant",
    ],
    featured: true,
    highlights: [
      "Fully customizable household team tailored to your exact needs",
      "Select quantity and preferences for each staff type",
      "Same premium vetting, training, and supervision standards as our other packages",
      "Perfect for unique household requirements and larger estates",
      "Flexible accommodation and scheduling options for each staff member"
    ],
    idealFor:
      "Diplomats, executives, and high-net-worth families who expect an effortless, luxury home experience",
  },
];}
