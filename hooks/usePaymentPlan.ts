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
}

const BASE_STAFF_PAY = 50000;

const PRICING: Record<ServiceType, number> = {
  "Live-in Nanny Services": 70000,
  "Live-in Help Services": 70000,
  "Live-in Nanny + Help Services": 80000,
  "Live-in Housekeeper Services": 70000,
  "Live-out Housekeeper Services": 60000
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
      clientPrice += (options.extraChildren < 3 ? 1 : options.extraChildren/3) * 10000;
    }

    if (options.extraRooms && options.extraRooms > 0) {
      clientPrice += (options.extraRooms < 3 ? 1 : options.extraRooms/3) * 10000;
    }

    if (options.extraDays && options.extraDays > 0) {
      clientPrice += (options.extraDays <= 2 ? 1 : options.extraDays/2) * 12000;
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
