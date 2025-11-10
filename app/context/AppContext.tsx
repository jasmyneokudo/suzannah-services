"use client";

import { PremiumPackageRequest } from "@/types/ClientRequest";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  premiumPackageRequest: PremiumPackageRequest;
  setPremiumPackageRequest: React.Dispatch<React.SetStateAction<PremiumPackageRequest>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);



export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [premiumPackageRequest, setPremiumPackageRequest] = useState<PremiumPackageRequest>({
    packageType: "",
    coreStaffMembers: {
        nanny: {
            accomodationPreference: "",
            genderPreference: "",
            otherPreferences: "",
        },
        housekeeper: {
            accomodationPreference: "",
            genderPreference: "",
            otherPreferences: "",
        },
        chef: {
            accomodationPreference: "",
            genderPreference: "",
            otherPreferences: "",
        }
    },
    additionalStaffMembers: [],
    paymentPlan: "",
    clientInformation: {
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
    }
  });

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
