import { ServiceType } from "@/types/ClientRequest";

export const PRICING: Record<ServiceType, number> = {
  "Nanny Services": 100500,
  "General Help Services": 95500,
  "Nanny + Help Services": 105500,
  "Housekeeper Services": 90500,
  "Home Cook Services": 200500,
  // take back to 170,500 after eid
  "Driving Services": 160500,
  "Elder Caregiving Services": 220500
};