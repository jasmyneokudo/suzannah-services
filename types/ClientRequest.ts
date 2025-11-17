export type ServiceType =
  | "Nanny Services"
  | "General Help Services"
  | "Nanny + Help Services"
  | "Housekeeper Services"
  | "Home Cook Services"
  | "Elder Caregiving Services"
  | "Driving Services";

export type PaymentPlan = "monthly" | "one-off";

export type ModeOfWork = "Live-in" | "Live-out";

export interface CustomerRequest {
  serviceType: ServiceType;
  employeeGender: string;
  employeeAgeRange: string;
  employeeTribePreference: string;
  employeeReligionPreference: string;
  workMode: ModeOfWork;
  workingDays: string[];
  workingHours: string[];
  extraComment: string;
  clientName: string;
  clientPhoneNumber: string;
  clientEmail: string;
  clientAddress: string;
  numberOfKids: number;
  numberOfDiners: number;
  agesOfKids: string;
  numberOfRooms: string;
  typeOfHouse: string;
  extraHomeInformation: string;
  numberOfBathrooms: number;
  elderGender: string;
  elderAgeRange: string;
  elderHealthConditions: string;
  numberOfPassengers: number;
  mustBeAbleToCook: boolean;
  mustBeAbleToIron: boolean;
  mustBeAbleToTeachKids: boolean;
  otherMustBes: string;
  bookingFee: number;
  paymentPlan: PaymentPlan;
}

export type StaffRole = "nanny" | "housekeeper" | "chef";

export type PremiumPackagePaymentPlan = "monthly" | "biannual" | "annual";

export const PremiumPackageNetPercentages: Record<PremiumPackagePaymentPlan, number> = {
  monthly: 1,
  biannual: 0.92,
  annual: 0.85,
};

export type StaffMemberDetails = {
  staffMemberRole: StaffRole;
  accomodationPreference: ModeOfWork;
  genderPreference: string;
  otherPreferences: string;
}
export interface PremiumPackageRequest {
  packageType: number;
  coreStaffMembers: {
    nanny: {
      accomodationPreference: string;
      genderPreference: string;
      otherPreferences: string;
    };
    housekeeper: {
      accomodationPreference: string;
      genderPreference: string;
      otherPreferences: string;
    };
    chef: {
      accomodationPreference: string;
      genderPreference: string;
      otherPreferences: string;
    };
  };
  additionalStaffMembers: StaffMemberDetails[];
  paymentPlan: {
    name: PremiumPackagePaymentPlan;
    durationInMonths: number;
    netPercentage?: number;
    totalAmount: number;
  };
  clientInformation: {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
}
