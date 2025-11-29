"use client";

import { PremiumPackagePaymentPlan, PremiumPackageRequest } from "@/types/ClientRequest";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  premiumPackageRequest: PremiumPackageRequest;
  setPremiumPackageRequest: React.Dispatch<React.SetStateAction<PremiumPackageRequest>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const defaultPremiumPackageRequest = {
    packageType: 0,
    coreStaffMembers: {
        nanny: {
            accomodationPreference: "Live-in",
            genderPreference: "Female",
            otherPreferences: "",
        },
        housekeeper: {
            accomodationPreference: "Live-in",
            genderPreference: "Female",
            otherPreferences: "",
        },
        chef: {
            accomodationPreference: "Live-in",
            genderPreference: "Female",
            otherPreferences: "",
        }
    },
    additionalStaffMembers: [],
    paymentPlan: {
      name: "" as PremiumPackagePaymentPlan,
      durationInMonths: 0,
      totalAmount: 0,
    },
    clientInformation: {
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
    },
    householdDetails: {
      buildingDescription: "",
      numberOfHouseholdOccupants: undefined,
      kidsDetails: "",
      petDetails: "",
      otherInformation: ""
    }
  }

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [premiumPackageRequest, setPremiumPackageRequest] = useState<PremiumPackageRequest>(defaultPremiumPackageRequest);

  return (
    <AppContext.Provider value={{ premiumPackageRequest, setPremiumPackageRequest }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
