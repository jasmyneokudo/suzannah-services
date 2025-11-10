"use client";

import { premiumServicePackages } from "@/data/premiumServicePackages";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { IconCheck, IconCreditCardPay, IconPuzzle } from "@tabler/icons-react";
import { SetStateAction, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Button from "../components/Button";

type HomeProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Home({ searchParams }: HomeProps) {
  const type: number = Number(searchParams?.type) || 0;
  const selectedPackage = premiumServicePackages[type - 1];
  const [paymentPlans, setPaymentPlan] = useState<
    "monthly" | "biannual" | "annual"
  >("monthly");

  const { premiumPackageRequest, setPremiumPackageRequest } = useAppContext();

  const handlePaymentPlanChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentPlan(
      (event.target as HTMLInputElement).value as SetStateAction<
        "monthly" | "biannual" | "annual"
      >
    );
    // setClientRequest({
    //   ...clientRequest,
    //   workMode: event.target.value as ModeOfWork,
    // });
  };

  return (
    <div className="bg-white h-full p-5">
      <div className="flex z-50 items-center sticky top-0 bg-white pt-5 pb-3 border-b border-[#F3E8C6]">
        <IconCreditCardPay
          size={25}
          className="mr-3"
          color="#1e3a8a"
          stroke={1.5}
        />
        <h1 className="font-bold text-center text-lg">Payment Plans</h1>
      </div>

      <h1 className="mt-3 font-semibold text-lg text-center">
        {selectedPackage?.serviceName}
      </h1>

      <p className="mt-3 text-gray-500">Select your preferred payment plan</p>

      <RadioGroup
        row
        aria-labelledby="gender-radio-buttons-group-label"
        defaultValue="Female"
        value={paymentPlans}
        onChange={handlePaymentPlanChange}
      >
        <div
          onClick={() => setPaymentPlan("monthly")}
          className={`border w-full ${
            paymentPlans === "monthly" ? "border-blue-600" : "border-gray-400"
          }  rounded-md p-4 mt-4`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Monthly</h2>
            <FormControlLabel
              value="monthly"
              control={<Radio />}
              label=""
              labelPlacement="start"
            />
          </div>

          <p className="text-sm text-gray-600">Renews every month</p>

          <h2 className="text-blue-600 text-2xl font-bold mt-3">
            ₦{selectedPackage?.investment.toLocaleString()}
          </h2>
          <p className="text-sm text-gray-600">Total amount</p>

          <h2 className="text-black text-lg font-bold border-t pt-2 border-gray-300 mt-3">
            ₦{selectedPackage?.investment.toLocaleString()}
          </h2>
          <p className="text-sm text-gray-600">per month</p>
        </div>

        <div
          onClick={() => setPaymentPlan("biannual")}
          className={`border relative w-full ${
            paymentPlans === "biannual" ? "border-blue-600" : "border-gray-400"
          }  rounded-md p-4 mt-4`}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 rounded-xl bg-blue-600 px-3 flex items-center">
            <p className="text-white font-medium">Save 8%</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Bi-Annual</h2>
            <FormControlLabel
              value="biannual"
              control={<Radio />}
              label=""
              labelPlacement="start"
            />
          </div>

          <p className="text-sm text-gray-600">Renews every six (6) month</p>

          <h2 className="text-blue-600 text-2xl font-bold mt-3">
            ₦{(selectedPackage?.investment * 0.92 * 6).toLocaleString()}
          </h2>
          <p className="text-sm text-gray-600">Total amount</p>

          <h2 className="text-black text-lg font-bold border-t pt-2 border-gray-300 mt-3">
            ₦{(selectedPackage?.investment * 0.92).toLocaleString()}
          </h2>
          <p className="text-sm text-gray-600">per month</p>

          <div className="mt-2 border-t -mx-4 border-[#2563eb]/10 flex bg-blue-600/5 py-4">
            <IconCheck
              color="#2563eb"
              stroke={2}
              size={20}
              className="mr-2 ml-4 shrink-0"
            />
            <p className="text-[#2563eb]  font-medium">
              You save ₦
              {(selectedPackage?.investment * 0.08 * 6).toLocaleString()}
            </p>
          </div>
        </div>

        <div
          onClick={() => setPaymentPlan("annual")}
          className={`border relative w-full ${
            paymentPlans === "annual" ? "border-blue-600" : "border-gray-400"
          }  rounded-md p-4 mt-4`}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 rounded-xl bg-blue-600 px-3 flex items-center">
            <p className="text-white font-medium">Save 15%</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Annual</h2>
            <FormControlLabel
              value="annual"
              control={<Radio />}
              label=""
              labelPlacement="start"
            />
          </div>
          <p className="text-sm text-gray-600">Renews every year</p>

          <h2 className="text-blue-600 text-2xl font-bold mt-3">
            {" "}
            ₦{(selectedPackage?.investment * 0.92 * 12).toLocaleString()}
          </h2>
          <p className="text-sm text-gray-600">Total amount</p>

          <h2 className="text-black text-lg font-bold border-t pt-2 border-gray-300 mt-3">
            ₦{(selectedPackage?.investment * 0.85).toLocaleString()}
          </h2>
          <p className="text-sm text-gray-600">per month</p>

          <div className="mt-2 border-t -mx-4 border-[#2563eb]/10 flex bg-blue-600/5 py-4">
            <IconCheck
              color="#2563eb"
              stroke={2}
              size={20}
              className="mr-2 ml-4 shrink-0"
            />
            <p className="text-[#2563eb]  font-medium">
              You save ₦
              {(selectedPackage?.investment * 0.15 * 12).toLocaleString()}
            </p>
          </div>
        </div>
      </RadioGroup>

      <h2 className="mt-5 text-xl font-bold">Client Information</h2>

      <div className="mt-5 rounded-md border border-gray-300 p-5">
        <TextField
          label="Address (Where Service will be rendered)"
          value={premiumPackageRequest.clientInformation.address}
          onChange={(e) =>
            setPremiumPackageRequest({
              ...premiumPackageRequest,
              clientInformation: {
                ...premiumPackageRequest.clientInformation,
                address: e.target.value,
              },
            })
          }
          fullWidth
          sx={{ mt: 2 }}
          id="filled-multiline-static"
          placeholder="Address (Where Service will be rendered)"
        />

        <TextField
          label="Name"
          value={premiumPackageRequest.clientInformation.name}
          onChange={(e) =>
            setPremiumPackageRequest({
              ...premiumPackageRequest,
              clientInformation: {
                ...premiumPackageRequest.clientInformation,
                name: e.target.value,
              },
            })
          }
          fullWidth
          sx={{ mt: 2 }}
          id="filled-multiline-static"
          placeholder="Your Full Name"
        />

        <TextField
          label="Email"
          value={premiumPackageRequest.clientInformation.email}
          onChange={(e) =>
            setPremiumPackageRequest({
              ...premiumPackageRequest,
              clientInformation: {
                ...premiumPackageRequest.clientInformation,
                email: e.target.value,
              },
            })
          }
          fullWidth
          sx={{ mt: 2 }}
          id="filled-multiline-static"
          placeholder="Email"
        />

        <TextField
          label="WhatsApp Number"
          value={premiumPackageRequest.clientInformation.address}
          onChange={(e) =>
            setPremiumPackageRequest({
              ...premiumPackageRequest,
              clientInformation: {
                ...premiumPackageRequest.clientInformation,
                address: e.target.value,
              },
            })
          }
          fullWidth
          sx={{ mt: 2 }}
          id="filled-multiline-static"
          placeholder="Address (Where Service will be rendered)"
        />
      </div>

      <div className="mt-3 flex justify-between border-t border-[#F3E8C6]">
        <Button
          //   disabled={
          //     clientRequest.workMode === "Live-in"
          //       ? disableButton()
          //       : clientRequest.workingDays.length === 0 || disableButton()
          //   }
          //   onClick={onContinue}
          outline
          style={{
            width: "150px",
            color: "black",
            borderColor: "#F3E8C6",
            backgroundColor: "#fff",
            alignSelf: "start",
          }}
          buttonName="Cancel"
        />
        <Button
          //   disabled={
          //     clientRequest.workMode === "Live-in"
          //       ? disableButton()
          //       : clientRequest.workingDays.length === 0 || disableButton()
          //   }
        //   onClick={proceedToPaymeent}
          style={{
            width: "150px",
            alignSelf: "end",
            color: "black",
            backgroundColor: "hsl(45 100% 51%)",
          }}
          buttonName="Proceed"
        />
      </div>
    </div>
  );
}
