import { BOOKING_FEE, ONE_OFF_FEE } from "@/data/servicePrices";
import { createBooking } from "../services/bookings";
import { sendConfirmationEmail } from "./sendConfirmationMail";

export async function processBooking(clientRequest: any, updateValues: (arg0: any[][]) => any) {  
  const requestArray = [
        new Date(Date.now()).toLocaleString(),
        clientRequest.serviceType,
        clientRequest.clientName,
        clientRequest.clientEmail,
        clientRequest.clientPhoneNumber,
        clientRequest.clientAddress,
        clientRequest.serviceType === "Driving"
          ? clientRequest.numberOfPassengers + " Passengers"
          : clientRequest.numberOfKids,
        clientRequest.numberOfDiners,
        clientRequest.agesOfKids,
        clientRequest.typeOfHouse,
        clientRequest.numberOfRooms,
        clientRequest.extraHomeInformation,
        clientRequest.workMode,
        clientRequest.employeeGender,
        clientRequest.employeeAgeRange,
        clientRequest.employeeTribePreference,
        clientRequest.employeeReligionPreference,
        clientRequest.workingDays.join(", "),
        clientRequest.workingHours.join(", "),
        clientRequest.extraComment,
        clientRequest.paymentPlan === "one-off" ? ONE_OFF_FEE : BOOKING_FEE,
        clientRequest.bookingFee,
        clientRequest.elderAgeRange,
        clientRequest.elderGender,
        clientRequest.elderHealthConditions,
        clientRequest.clientDesire,
      ];
  
      // update excel sheet
      try {
        await updateValues([requestArray]);
        console.log("successfulyl update spreadsheet", requestArray)
      } catch (error) {
        console.error("Failed to update spreadsheet:", error);
      }
  
      try {
        await sendConfirmationEmail(
          clientRequest.clientEmail.trim(),
          clientRequest.clientName,
          clientRequest.serviceType,
          clientRequest.paymentPlan,
        );
      } catch (error) {
        console.error("Failed to send confirmation email:", error);
      }
  
      try {
        const res = await createBooking(
          clientRequest.clientName,
          clientRequest.clientAddress,
          clientRequest.clientPhoneNumber,
          clientRequest.clientEmail,
          clientRequest.workMode,
          clientRequest.serviceType,
          clientRequest.employeeGender,
          clientRequest.employeeAgeRange,
          clientRequest.paymentPlan,
          clientRequest.paymentPlan === "one-off" ? ONE_OFF_FEE : BOOKING_FEE,
          clientRequest.bookingFee,
          clientRequest.employeeReligionPreference,
          clientRequest.employeeTribePreference,
          clientRequest.numberOfKids,
          clientRequest.agesOfKids,
          clientRequest.extraComment,
          clientRequest.typeOfHouse,
          Number(clientRequest.numberOfRooms.slice(0, 2)),
          clientRequest.extraHomeInformation,
          clientRequest.numberOfDiners,
          clientRequest.elderAgeRange,
          clientRequest.elderHealthConditions,
          false,
          "",
          clientRequest.workingHours.join(", "),
          clientRequest.workingDays.join(", "),
        );
        console.log("Booking created:", res);
      } catch (error) {
        console.error("Failed to create booking:", error);
      }
  
}