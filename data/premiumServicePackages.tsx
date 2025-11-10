import {
  IconBrandGoogleHome,
  IconHomeHeart,
  IconHomeStar,
} from "@tabler/icons-react";

export const premiumServicePackages = [
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
      "Fully managed household team — recruitment, supervision, and replacement handled by use",
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
      "+ One additional domestic staff of your choice (Nanny, Chef, Housekeeper, Driver, or any preferred role)"
    ],
    featured: true,
    highlights: [
      "Fully managed household team — recruitment, supervision, and replacement handled by use",
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
      "+ Any two additional domestic staff of your choice (Driver, Butler, House Manager, Laundry Attendant, Gardener, or Security Assistant)"
    ],
    featured: false,
    highlights: [
      "Fully managed household team — recruitment, supervision, and replacement handled by use",
      "Elegant staff uniforms, etiquette training, and grooming",
      "Weekly home check-ins and continuous performance reviews",
    ],
    idealFor:
      "Diplomats, executives, and high-net-worth families who expect an effortless, luxury home experience",
  },
];
