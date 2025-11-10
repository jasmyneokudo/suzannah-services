"use client";

import { premiumServicePackages } from "@/data/premiumServicePackages";
import { ModeOfWork, StaffRole } from "@/types/ClientRequest";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "../components/Button";
import { IconPuzzle } from "@tabler/icons-react";
import { useAppContext } from "../context/AppContext";

type HomeProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

type StaffDetails = {
  workMode: ModeOfWork;
  gender: string;
  others: string;
};

export default function Home({ searchParams }: HomeProps) {
  const type: number = Number(searchParams?.type) || 0;
  const router = useRouter();
  const [nannyDetails, setNannyDetails] = useState<StaffDetails>({
    workMode: "Live-in",
    gender: "Female",
    others: "",
  });
  const [chefDetails, setChefDetails] = useState<StaffDetails>({
    workMode: "Live-in",
    gender: "Female",
    others: "",
  });
  const [housekeeperDetails, setHousekeeperDetails] = useState<StaffDetails>({
    workMode: "Live-in",
    gender: "Female",
    others: "",
  });

  const [gender, setGender] = useState<"Female" | "Male" | "Any Gender">(
    "Female"
  );

  const { premiumPackageRequest, setPremiumPackageRequest } = useAppContext();

  const selectedPackage = premiumServicePackages[type - 1];

  const handleWorkModeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    staffMember: StaffRole
  ) => {
    if (staffMember === "nanny") {
      setNannyDetails({
        ...nannyDetails,
        workMode: (event.target as HTMLInputElement).value as ModeOfWork,
      });
    } else if (staffMember === "chef") {
      setChefDetails({
        ...chefDetails,
        workMode: (event.target as HTMLInputElement).value as ModeOfWork,
      });
    } else if (staffMember === "housekeeper") {
      setHousekeeperDetails({
        ...housekeeperDetails,
        workMode: (event.target as HTMLInputElement).value as ModeOfWork,
      });
    }

    setPremiumPackageRequest({
      ...premiumPackageRequest,
      coreStaffMembers: {
        [staffMember]: {
          ...premiumPackageRequest.coreStaffMembers[staffMember],
          accomodationPreference: event.target.value as ModeOfWork,
        },
        ...premiumPackageRequest.coreStaffMembers,
      },
    });
  };

  const handleGenderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    staffMember: StaffRole
  ) => {
    if (staffMember === "nanny") {
      setNannyDetails({
        ...nannyDetails,
        gender: (event.target as HTMLInputElement).value as ModeOfWork,
      });
    } else if (staffMember === "chef") {
      setChefDetails({
        ...chefDetails,
        gender: (event.target as HTMLInputElement).value as ModeOfWork,
      });
    } else if (staffMember === "housekeeper") {
      setHousekeeperDetails({
        ...housekeeperDetails,
        gender: (event.target as HTMLInputElement).value as ModeOfWork,
      });
    }

    setPremiumPackageRequest({
      ...premiumPackageRequest,
      coreStaffMembers: {
        ...premiumPackageRequest.coreStaffMembers,

        [staffMember]: {
          ...premiumPackageRequest.coreStaffMembers[staffMember],

          genderPreference: event.target.value as ModeOfWork,
        },
      },
    });
  };


    const handleAdditionDetailsChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, staffMember: StaffRole
    ) => {
      setPremiumPackageRequest({
        ...premiumPackageRequest,
        coreStaffMembers: {
          ...premiumPackageRequest.coreStaffMembers,
          [staffMember]: {
            ...premiumPackageRequest.coreStaffMembers[staffMember],
            otherPreferences: e.target.value,
          },
        },
      });
    };

  const proceedToPaymeent = () => {
    router.push(`/payment?type=${type}`);
  };

  return (
    <div className="bg-white h-full p-5">
      <div className="flex z-50 items-center sticky top-0 bg-white pt-5 pb-3 border-b border-[#F3E8C6]">
        <IconPuzzle size={25} className="mr-3" color="#1e3a8a" stroke={1.5} />
        <h1 className="font-bold text-center text-lg">
          Customize your package
        </h1>
      </div>

      <div className="self-center mx-auto rounded-full bg-blue-900 w-12 h-12 items-center flex justify-center my-5">
        {selectedPackage.icon}
      </div>
      <h2 className="text-center mt-1 font-semibold text-lg">
        {selectedPackage.serviceName}
      </h2>
      <h3 className="mt-2 text-center text-gray-500 text-base">
        ₦{selectedPackage.investment.toLocaleString()} per month
      </h3>
      <p className="mt-3 text-gray-600 text-sm">
        At Suzannah Home & Care Services, we understand that true luxury is not
        just comfort — it’s peace of mind. Our Managed Home Service Packages are
        designed for discerning families and executives who want a *well-run,
        elegant home without the stress of managing domestic staff.
      </p>

      <div
        className="p-6 rounded-lg mt-4"
        style={{
          background:
            "linear-gradient(135deg, hsl(40 33% 97%), hsl(42 47% 88%))",
          borderColor: "hsl(42 47% 88%)",
          borderWidth: 1,
        }}
      >
        <h3 className="font-semibold">Childcare Professional</h3>
        <FormControl className="text-black dark:text-gray-900" sx={{ mt: 2 }}>
          <FormLabel id="demo-radio-buttons-group-label">
            Accomodation Preference
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Live-in"
            value={nannyDetails.workMode}
            onChange={(e) => handleWorkModeChange(e, "nanny")}
          >
            <FormControlLabel
              value="Live-in"
              control={<Radio />}
              label="Live-in"
            />
            <FormControlLabel
              value="Live-out"
              control={<Radio />}
              label="Live-out"
            />
          </RadioGroup>
        </FormControl>

        <FormControl className="text-black dark:text-gray-900" sx={{ mt: 2 }}>
          <FormLabel id="gender-radio-buttons-group-label">
            Gender Preference
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender-radio-buttons-group-label"
            defaultValue="Female"
            value={nannyDetails.gender}
            onChange={(e) => handleGenderChange(e, "nanny")}
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Any Gender"
              control={<Radio />}
              label="Any Gender"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel className="mt-2" id="gender-radio-buttons-group-label">
            Additional Details or Special Requirements
          </FormLabel>
          <TextField
            value={premiumPackageRequest.coreStaffMembers.nanny.otherPreferences}
            onChange={(e) => handleAdditionDetailsChange(e, "nanny")}
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Any specific requirements, preferences, or notes for this staff member..."
            multiline
            rows={4}
          />
        </FormControl>
      </div>

      <div
        className="p-6 rounded-lg mt-4"
        style={{
          background:
            "linear-gradient(135deg, hsl(40 33% 97%), hsl(42 47% 88%))",
          borderColor: "hsl(42 47% 88%)",
          borderWidth: 1,
        }}
      >
        <h3 className="font-semibold">Private Chef</h3>
        <FormControl className="text-black dark:text-gray-900" sx={{ mt: 2 }}>
          <FormLabel id="demo-radio-buttons-group-label">
            Accomodation Preference
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Live-in"
            value={chefDetails.workMode}
            onChange={(e) => handleWorkModeChange(e, "nanny")}
          >
            <FormControlLabel
              value="Live-in"
              control={<Radio />}
              label="Live-in"
            />
            <FormControlLabel
              value="Live-out"
              control={<Radio />}
              label="Live-out"
            />
          </RadioGroup>
        </FormControl>

        <FormControl className="text-black dark:text-gray-900" sx={{ mt: 2 }}>
          <FormLabel id="gender-radio-buttons-group-label">
            Gender Preference
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender-radio-buttons-group-label"
            defaultValue="Female"
            value={chefDetails.gender}
            onChange={(e) => handleGenderChange(e, "chef")}
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Any Gender"
              control={<Radio />}
              label="Any Gender"
            />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel className="mt-2" id="gender-radio-buttons-group-label">
            Additional Details or Special Requirements
          </FormLabel>
          <TextField
            value={
              premiumPackageRequest.coreStaffMembers.chef.otherPreferences
            }
            onChange={(e) => handleAdditionDetailsChange(e, "chef")}
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Any specific requirements, preferences, or notes for this staff member..."
            multiline
            rows={4}
          />
        </FormControl>
      </div>

      <div
        className="p-6 rounded-lg mt-4"
        style={{
          background:
            "linear-gradient(135deg, hsl(40 33% 97%), hsl(42 47% 88%))",
          borderColor: "hsl(42 47% 88%)",
          borderWidth: 1,
        }}
      >
        <h3 className="font-semibold">Professional Housekeeper</h3>
        <FormControl className="text-black dark:text-gray-900" sx={{ mt: 2 }}>
          <FormLabel id="demo-radio-buttons-group-label">
            Accomodation Preference
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Live-in"
            value={housekeeperDetails.workMode}
            onChange={(e) => handleWorkModeChange(e, "housekeeper")}
          >
            <FormControlLabel
              value="Live-in"
              control={<Radio />}
              label="Live-in"
            />
            <FormControlLabel
              value="Live-out"
              control={<Radio />}
              label="Live-out"
            />
          </RadioGroup>
        </FormControl>

        <FormControl className="text-black dark:text-gray-900" sx={{ mt: 2 }}>
          <FormLabel id="gender-radio-buttons-group-label">
            Gender Preference
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender-radio-buttons-group-label"
            defaultValue="Female"
            value={housekeeperDetails.gender}
            onChange={(e) => handleGenderChange(e, "housekeeper")}
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Any Gender"
              control={<Radio />}
              label="Any Gender"
            />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel className="mt-2" id="gender-radio-buttons-group-label">
            Additional Details or Special Requirements
          </FormLabel>
          <TextField
            value={premiumPackageRequest.coreStaffMembers.housekeeper.otherPreferences}
            onChange={(e) => handleAdditionDetailsChange(e, "housekeeper")}
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Any specific requirements, preferences, or notes for this staff member..."
            multiline
            rows={4}
          />
        </FormControl>
      </div>

      {type !== 1 && (
        <>
          <h1 className="border-b border-[#F3E8C6] mt-4 font-semibold">
            Additional Staff Members (1 choice)
          </h1>

          <div
            className="p-6 rounded-lg mt-4"
            style={{
              background:
                "linear-gradient(135deg, hsl(40 33% 97%), hsl(42 47% 88%))",
              borderColor: "hsl(42 47% 88%)",
              borderWidth: 1,
            }}
          >
            {/* <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel id="demo2-simple-select-label">
                Select Staff Member 1
              </FormLabel>
              <Select
                displayEmpty
                labelId="demo2-simple-select-label"
                id="demo-simple-select"
                // value={clientRequest.employeeAgeRange}
                // label="Age Range"
                aria-placeholder="he"
                required
                // onChange={(event: SelectChangeEvent) => {
                //   setClientRequest({
                //     ...clientRequest,
                //     employeeAgeRange: event.target.value,
                //   });
                // }}
              >
                <MenuItem value="Nanny">Childcare Professional</MenuItem>
                <MenuItem value="Chef">Private Chef</MenuItem>
                <MenuItem value="Housekeeper">Professional Housekeeper</MenuItem>
                <MenuItem value="Driver">Executive Chaffeur/Driver</MenuItem>
                <MenuItem value="House Help">House Attendant/Help</MenuItem>
                <MenuItem value="House Help">Personal Assistant</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              className="text-black dark:text-gray-900"
              sx={{ mt: 2 }}
            >
              <FormLabel id="demo-radio-buttons-group-label">
                Accomodation Preference
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Live-in"
                // value={nannyWorkMode}
                onChange={handleWorkModeChange}
              >
                <FormControlLabel
                  value="Live-in"
                  control={<Radio />}
                  label="Live-in"
                />
                <FormControlLabel
                  value="Live-out"
                  control={<Radio />}
                  label="Live-out"
                />
              </RadioGroup>
            </FormControl>

            <FormControl
              className="text-black dark:text-gray-900"
              sx={{ mt: 2 }}
            >
              <FormLabel id="gender-radio-buttons-group-label">
                Gender Preference
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="gender-radio-buttons-group-label"
                defaultValue="Female"
                value={gender}
                onChange={handleGenderChange}
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Any Gender"
                  control={<Radio />}
                  label="Any Gender"
                />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel className="mt-2" id="gender-radio-buttons-group-label">
                Additional Details or Special Requirements
              </FormLabel>
              <TextField
                // value={"customRequest.serviceDescription"}
                onChange={(e) => null}
                fullWidth
                sx={{ mt: 2 }}
                placeholder="Any specific requirements, preferences, or notes for this staff member..."
                multiline
                rows={4}
              />
            </FormControl> */}
          </div>
        </>
      )}

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
          onClick={proceedToPaymeent}
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
