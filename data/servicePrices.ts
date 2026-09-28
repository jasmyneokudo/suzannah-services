import { ServiceType } from "@/types/ClientRequest";

export const BOOKING_FEE = 25500;
export const ONE_OFF_FEE = 262500;

export const PRICING: Record<ServiceType, number> = {
  "Nanny": 105500,
  "General Help": 100500,
  "Nanny + Help": 110500,
  "Housekeeper": 95500,
  "Chef": 200500,
  // take back to 170,500 after eid
  "Driving": 160500,
  "Elder Caregiving": 250500
};