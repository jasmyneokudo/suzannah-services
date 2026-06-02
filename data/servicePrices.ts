import { ServiceType } from "@/types/ClientRequest";

export const PRICING: Record<ServiceType, number> = {
  "Nanny": 100500,
  "General Help": 95500,
  "Nanny + Help": 105500,
  "Housekeeper": 90500,
  "Chef": 190500,
  // take back to 170,500 after eid
  "Driving": 160500,
  "Elder Caregiving": 230500
};