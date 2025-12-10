"use client";

import { StaffMemberDetails } from "@/types/ClientRequest";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { IconHammer, IconPlus } from "@tabler/icons-react";
import { useAppContext } from "../context/AppContext";
import CustomStaffMember from "../components/CustomStaffMember";
import { HouseholdSection } from "../sections/HouseHoldSection";

type HomeProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Home({ searchParams }: HomeProps) {
  const router = useRouter();
  const { premiumPackageRequest, setPremiumPackageRequest } = useAppContext();
  const [numberOfStaffMembers, setNumberOfStaffMembers] = useState(0);

  useEffect(() => {
    setPremiumPackageRequest({
      ...premiumPackageRequest,
      packageType: 4,
    });
  }, []);

  return (
    <div className="bg-white min-h-screen h-full p-5">
      <div className="flex z-50 items-center sticky top-0 bg-white pt-5 pb-3 border-b border-[#F3E8C6]">
        <IconHammer fill="hsl(42 47% 88%)" size={25} className="mr-3 text-luxury-champagne" stroke={1.5} />
        <h1 className="font-bold text-center text-lg text-gray-600">
          Build your custom household package
        </h1>
      </div>

      <div className="text-black self-center mt-2">
        Select and customize as many staff members as you need
      </div>

      {[...Array(numberOfStaffMembers)].map((_, i) => (
        <CustomStaffMember
          key={i}
          number={i + 1}
          setStaffDetails={(details: StaffMemberDetails) => {
            const updatedAdditionalStaffMembers = [
              ...premiumPackageRequest.additionalStaffMembers,
            ];
            updatedAdditionalStaffMembers[i] = {
              ...updatedAdditionalStaffMembers[i],
              staffMemberRole: details.staffMemberRole,
              accomodationPreference: details.accomodationPreference,
              genderPreference: details.genderPreference,
              otherPreferences: details.otherPreferences,
            };
            setPremiumPackageRequest({
              ...premiumPackageRequest,
              additionalStaffMembers: updatedAdditionalStaffMembers,
            });
          }}
          staffDetails={
            premiumPackageRequest.additionalStaffMembers[i] || {
              accomodationPreference: "Live-in",
              genderPreference: "Female",
              otherPreferences: "",
              staffMemberRole: "",
            }
          }
          deleteStaffMember={() => {
            const updatedAdditionalStaffMembers = [
              ...premiumPackageRequest.additionalStaffMembers,
            ];
            updatedAdditionalStaffMembers.splice(i, 1);
            setPremiumPackageRequest({
              ...premiumPackageRequest,
              additionalStaffMembers: updatedAdditionalStaffMembers,
            });
            setNumberOfStaffMembers(numberOfStaffMembers - 1);
          }}
        />
      ))}

      <button
        onClick={() => {
          setNumberOfStaffMembers(numberOfStaffMembers + 1);
        }}
        className="w-full gap-2 text-luxury-gold border-[0.6px] py-2 border-luxury-gold rounded-md mt-5 flex items-center justify-center"
      >
        <IconPlus stroke={1} />
        Add Staff Member
      </button>

      {numberOfStaffMembers >= 1 &&
        <HouseholdSection
          householdDetails={premiumPackageRequest.householdDetails}
          setHouseholdDetails={(householdDetails) => {
            setPremiumPackageRequest({
              ...premiumPackageRequest,
              householdDetails: householdDetails,
            });
          }}
        />
      }

      <div className="mt-3 flex justify-between border-t border-[#F3E8C6]">
        <Button
          onClick={() => router.push("/executive#premium-packages-section")}
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
          disabled={numberOfStaffMembers === 0 || premiumPackageRequest.householdDetails.buildingDescription === ""}
          onClick={() => router.push(`/payment?type=4`)}
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
