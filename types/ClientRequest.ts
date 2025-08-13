
  export type ServiceType =
    | "Live-in Nanny Services"
    | "Live-in Help Services"
    | "Live-in Nanny + Help Services"
    | "Live-in Housekeeper Services";

  export interface CustomerRequest { 
    serviceType: ServiceType;
    employeeGender: string; 
    employeeAgeRange: string;
    employeeTribePreference: string;
    employeeReligionPreference: string;
    extraComment: string;
    clientName: string;
    clientPhoneNumber: string;
    clientEmail: string;
    clientAddress: string;
    numberOfKids: number;
    agesOfKids: string;
    numberOfRooms: string;
    typeOfHouse: string;
    numberOfBathrooms: number;
    mustBeAbleToCook: boolean;
    mustBeAbleToIron: boolean;
    mustBeAbleToTeachKids: boolean;
    otherMustBes: string;
    bookingFee: number;
  }