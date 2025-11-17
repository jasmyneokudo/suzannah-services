import { ServiceType } from "@/types/ClientRequest";
import { useMemo } from "react";

interface PaymentResult {
  clientPrice: number;   // what client pays monthly
  staffPay: number;      // staff salary
  companyMargin: number; // Zana’s profit
}

interface Options {
  extraChildren?: number;
  extraRooms?: number;
  extraDays?: number;
  extraFloors?: number;
  newBorns?: number;
  extraDiners?: number;
  numberOfPassengers?: number;
  elderHealthConditions?: number;
}

const BASE_STAFF_PAY = 50000;

export const PRICING: Record<ServiceType, number> = {
  "Nanny Services": 85500,
  "General Help Services": 80500,
  "Nanny + Help Services": 95500,
  "Housekeeper Services": 75500,
  "Home Cook Services": 90500,
  "Driving Services": 140500,
  "Elder Caregiving Services": 150500
};

export function usePaymentPlan(
  service: ServiceType,
  options: Options = {}
): PaymentResult {
  return useMemo(() => {
    let clientPrice = PRICING[service];
    const staffPay = BASE_STAFF_PAY;

    // ✅ Add-ons
    if (options.extraChildren && options.extraChildren > 0) {
      clientPrice += (options.extraChildren) * 8000;
    }

    if (options.extraRooms && options.extraRooms > 0) {
      clientPrice += (options.extraRooms < 3 ? 1 : options.extraRooms/3) * 10000;
    }

    if (options.numberOfPassengers && options.numberOfPassengers > 0) {
      clientPrice += (options.numberOfPassengers < 3 ? 1 : options.numberOfPassengers/3) * 10000;
    }

    if (options.extraDays && options.extraDays > 0) {
      clientPrice += (options.extraDays <= 2 ? 1 : options.extraDays/2) * 15000;
    }

    if (options.extraFloors && options.extraFloors > 0) {
      clientPrice += (options.extraFloors < 2 ? 1 : options.extraFloors/2) * 12000;
    }

    if (options.extraDiners && options.extraDiners > 0) {
      clientPrice += (options.extraDiners <= 2 ? 1 : options.extraDiners/2) * 20000;
    }

    // Add 12k per new born
    if (options.newBorns && options.newBorns > 0) {
      clientPrice += (options.newBorns) * 12000;
    }

     // Add 12k per elder health condition
    if (options.elderHealthConditions && options.elderHealthConditions > 0) {
      clientPrice += (options.elderHealthConditions) * 12000;
    }

    // round to nearest 100
    if (clientPrice % 100 !== 0) {
        clientPrice = Math.ceil(clientPrice / 100) * 100;
    }

    const companyMargin = clientPrice - staffPay;

    return {
      clientPrice,
      staffPay,
      companyMargin,
    };
  }, [service, options]);
}
