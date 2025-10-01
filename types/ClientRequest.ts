
  export type ServiceType =
    | "Nanny Services"
    | "General Help Services"
    | "Nanny + Help Services"
    | "Housekeeper Services"
    | "Home Cook Services";

  export type PaymentPlan = "monthly" | "one-off";

  export type ModeOfWork = "Live-in" | "Live-out"

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
    mustBeAbleToCook: boolean;
    mustBeAbleToIron: boolean;
    mustBeAbleToTeachKids: boolean;
    otherMustBes: string;
    bookingFee: number;
    paymentPlan: PaymentPlan;
  }