import { ServiceType } from "@/types/ClientRequest";

export const BOOKING_FEE = 35500; // added 10k
export const ONE_OFF_FEE = 312500; // added 50k

export const PRICING: Record<ServiceType, number> = {
  "Nanny": 115500, // added 10k
  "General Help": 120500, // added 10k
  "Nanny + Help": 120500, // added 10k
  "Housekeeper": 105500, // added 10k
  "Chef": 270500, // added 20k
  // take back to 170,500 after eid
  "Driving": 180500, // added 20k
  "Elder Caregiving": 270500 // added 20k
};