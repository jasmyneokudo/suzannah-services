import { CustomerRequest, ModeOfWork } from "@/types/ClientRequest";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
  FormHelperText,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { IconHomeQuestion, IconUserQuestion } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import router from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import Button from "../components/Button";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type CustomerPreferencesSection = {
  requestStage: Number;
  clientRequest: CustomerRequest;
  setClientRequest: (req: CustomerRequest) => void;
  goBack: () => void;
  onContinue: () => void;
};

export const CustomerPreferencesSection = ({
  requestStage,
  clientRequest,
  setClientRequest,
  goBack,
  onContinue,
}: CustomerPreferencesSection) => {
  const pathname = usePathname();
  const [agesOfKidsError, setAgesOfKidsError] = useState("");
  const [workMode, setWorkMode] = useState<ModeOfWork>("Live-in");
  const [duration, setDuration] = useState<Dayjs[]>([
    dayjs("2022-04-17T08:00"),
    dayjs("2022-04-17T12:00"),
  ]);
  const [healthConditions, setHealthConditions] = useState({
    diabetes: false,
    incontinence: false,
    paralysis: false,
    dementia: false,
    hearing: false,
    vision: false,
    hypertension: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHealthConditions({
      ...healthConditions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelectDays = (
    event: React.MouseEvent<HTMLElement>,
    newDays: string[]
  ) => {
    // setDays(newDays);
    setClientRequest({ ...clientRequest, workingDays: newDays });
  };

  const handleWorkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkMode(
      (event.target as HTMLInputElement).value as SetStateAction<ModeOfWork>
    );
    setClientRequest({
      ...clientRequest,
      workMode: event.target.value as ModeOfWork,
    });
  };

  function disableButton(): boolean {
    if (
      clientRequest.serviceType === "General Help Services" ||
      clientRequest.serviceType === "Housekeeper Services"
    ) {
      return (
        clientRequest.typeOfHouse === "" || clientRequest.numberOfRooms === ""
      );
    } else if (clientRequest.serviceType === "Nanny Services") {
      return (
        clientRequest.agesOfKids === "" ||
        clientRequest.numberOfKids === 0 ||
        agesOfKidsError !== ""
      );
    } else if (clientRequest.serviceType === "Home Cook Services") {
      return clientRequest.numberOfDiners === 0;
    } else if (clientRequest.serviceType === "Elder Caregiving Services") {
      return (
        clientRequest.elderAgeRange === "" || clientRequest.elderGender === ""
      );
    } else {
      return (
        clientRequest.typeOfHouse === "" ||
        clientRequest.numberOfRooms === "" ||
        clientRequest.agesOfKids === "" ||
        clientRequest.numberOfKids === 0 ||
        agesOfKidsError !== ""
      );
    }
  }

  useEffect(() => {
    setClientRequest({
                ...clientRequest,
                elderHealthConditions: Object.keys(healthConditions).filter((condition) => {
                    console.log(condition, healthConditions[condition as keyof typeof healthConditions]);

                    return healthConditions[condition as keyof typeof healthConditions]
                }).join(", ")
            });
  }, [healthConditions]);

  return (
    <section
      id="preferences-section"
      className={`${
        requestStage !== 1 && "hidden"
      } mt-20 max-sm:mt-10 flex flex-col bg-white max-sm:px-8`}
    >
      <Link
        onClick={() => {
          goBack();
        }}
        href="/#"
        className="text-start text-blue-950 items-center"
      >
        &larr; Back
      </Link>
      <p className="mt-4 text-blue-950 text-sm text-center font-bold">
        {clientRequest.serviceType}
      </p>
      <h1 className="font-extralight text-center text-3xl mt-2 text-black dark:text-gray-800">
        CUSTOMIZE YOUR SERVICE
      </h1>
      <p className="text-gray-600 mt-5 text-base">
        Step 1 of 3: Tell us about your preferences and home details
      </p>
      <div className="border border-gray-300 rounded-lg p-4 mt-5">
        <p className="font-extralight flex text-1xl mt-2 text-black dark:text-gray-800">
          <IconUserQuestion color="black" stroke={2} size={16} />
          &nbsp;&nbsp;&nbsp;Staff Preferences
        </p>
        <p className="text-xs text-gray-400">
          Choose your preferred characteristics for your service provider
        </p>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo2-simple-select-label">Age Range</InputLabel>
          <Select
            displayEmpty
            labelId="demo2-simple-select-label"
            id="demo-simple-select"
            value={clientRequest.employeeAgeRange}
            label="Age Range"
            required
            onChange={(event: SelectChangeEvent) => {
              setClientRequest({
                ...clientRequest,
                employeeAgeRange: event.target.value,
              });
            }}
          >
            <MenuItem value="18-22">18-22</MenuItem>
            <MenuItem value="23-27">23-27</MenuItem>
            <MenuItem value="28-32">28-32</MenuItem>
            <MenuItem value="33-37">33-37</MenuItem>
            <MenuItem value="38-42">38-42</MenuItem>
            <MenuItem value="43-47">43-47</MenuItem>
            <MenuItem value="46-51">46-51</MenuItem>
            <MenuItem value="50+">50+</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            displayEmpty
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={clientRequest.employeeGender}
            label="Gender"
            onChange={(event: SelectChangeEvent) => {
              setClientRequest({
                ...clientRequest,
                employeeGender: event.target.value,
              });
            }}
          >
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="any gender">
              No Preference (Any gender is fine)
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">
            Religion Preference
          </InputLabel>
          <Select
            displayEmpty
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={clientRequest.employeeReligionPreference}
            label="Religion Preference"
            onChange={(event: SelectChangeEvent) => {
              setClientRequest({
                ...clientRequest,
                employeeReligionPreference: event.target.value,
              });
            }}
          >
            <MenuItem value="Christian">Christianity</MenuItem>
            <MenuItem value="Muslim">Islam</MenuItem>
            <MenuItem value="any religion">
              No Preference (Any Religion is fine)
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">
            Tribe Preference
          </InputLabel>
          <Select
            displayEmpty
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Tribe Preference"
            value={clientRequest.employeeTribePreference}
            onChange={(event: SelectChangeEvent) => {
              setClientRequest({
                ...clientRequest,
                employeeTribePreference: event.target.value,
              });
            }}
          >
            <MenuItem value="North - Hausa/Fulani">
              North - Hausa/Fulani
            </MenuItem>
            <MenuItem value="Southeast - Igbo">Southeast - Igbo</MenuItem>
            <MenuItem value="Southwest - Yoruba">Southwest - Yoruba</MenuItem>
            <MenuItem value="North Central - Idoma/Igede/Tiv/Ebira">
              North Central - Idoma/Igede/Tiv/Ebira
            </MenuItem>
            <MenuItem value="South-South - Efik/Ibibio">
              South-South - Efik/Ibibio
            </MenuItem>
            <MenuItem value="any tribe">
              No Preference (Any Tribe is fine)
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl className="text-black dark:text-gray-900" sx={{ mt: 2 }}>
          <FormLabel id="demo-radio-buttons-group-label">Work Mode</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Live-in"
            value={workMode}
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

        {workMode === "Live-out" && (
          <>
            <FormControl fullWidth sx={{ my: 3 }}>
              <FormLabel id="demo-simple-select-label">
                Select preferred staff working days
              </FormLabel>
              <ToggleButtonGroup
                color="primary"
                value={clientRequest.workingDays}
                sx={{ mt: 2, alignSelf: "center" }}
                onChange={handleSelectDays}
              >
                <ToggleButton size="small" value="Mon" aria-label="Mon">
                  Mon
                </ToggleButton>
                <ToggleButton size="small" value="Tue" aria-label="Tue">
                  Tue
                </ToggleButton>
                <ToggleButton size="small" value="Wed" aria-label="Wed">
                  Wed
                </ToggleButton>
                <ToggleButton size="small" value="Thu" aria-label="Thu">
                  Thu
                </ToggleButton>
                <ToggleButton size="small" value="Fri" aria-label="Fri">
                  Fri
                </ToggleButton>
                <ToggleButton size="small" value="Sat" aria-label="Sat">
                  Sat
                </ToggleButton>
              </ToggleButtonGroup>

              {clientRequest.workingDays.length !== 0 && (
                <FormHelperText>
                  {clientRequest.workingDays.length > 1
                    ? clientRequest.workingDays.length
                    : "Once"}{" "}
                  {clientRequest.workingDays.length > 1 && "times"} a week
                </FormHelperText>
              )}
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormLabel>Select preferred staff working hours</FormLabel>
              <div className="flex justify-between text-black dark:text-gray-900">
                <FormControl
                  sx={{ mt: 2, display: "flex", flexDirection: "row" }}
                >
                  <DigitalClock
                    className="border-gray-300 border-[0.8px]"
                    shouldDisableTime={(timeValue, clockType) => {
                      if (clockType === "hours") {
                        // disable 10 PM (22) to 11 PM (23)
                        if (timeValue.hour() >= 19) return true;
                        // disable 12 AM (0) to 5 AM (4)
                        if (timeValue.hour() < 5) return true;
                      }
                      return false;
                    }}
                    skipDisabled
                    value={duration[0]}
                    onChange={(newValue) => {
                      setDuration([dayjs(newValue), duration[1]]);
                      setClientRequest({
                        ...clientRequest,
                        workingHours: [
                          `${newValue?.format(
                            "hh:mm A"
                          )} to ${duration[1]?.format("hh:mm A")}`,
                          `${duration[1].hour() - duration[0].hour()} hours`,
                        ],
                      });
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    mt: 2,
                    display: "flex",
                    alignContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <FormLabel className="mt-3 mr-5">to</FormLabel>
                  <DigitalClock
                    className="border-gray-300 border-[0.8px]"
                    shouldDisableTime={(timeValue, clockType) => {
                      if (clockType === "hours") {
                        // disable 10 PM (22) to 11 PM (23)
                        if (timeValue.hour() >= 22) return true;
                        // disable 12 AM (0) to 5 AM (4)
                        if (timeValue.hour() < 5) return true;
                      }
                      return false;
                    }}
                    skipDisabled
                    value={duration[1]}
                    onChange={(newValue) => {
                      setDuration([duration[0], dayjs(newValue)]);
                      setClientRequest({
                        ...clientRequest,
                        workingHours: [
                          `${duration[0]?.format(
                            "hh:mm A"
                          )} to ${newValue?.format("hh:mm A")}`,
                          `${duration[1].hour() - duration[0].hour()} hours`,
                        ],
                      });
                    }}
                  />
                </FormControl>
              </div>
              <FormHelperText sx={{ mt: 2 }}>
                Working hours: {duration[1].hour() - duration[0].hour()} hour(s)
                per day
              </FormHelperText>
            </LocalizationProvider>
          </>
        )}

        <TextField
          label="Other Preferences For Staff"
          value={clientRequest.extraComment}
          onChange={(e) =>
            setClientRequest({
              ...clientRequest,
              extraComment: e.target.value,
            })
          }
          fullWidth
          sx={{ mt: 2 }}
          id="filled-multiline-static"
          placeholder="Enter other preferences for staff (if any)"
          multiline
          rows={4}
        />
      </div>

      <div className="border border-gray-300 rounded-lg p-4 mt-5">
        <p className="font-extralight flex text-1xl mt-2 text-black dark:text-gray-800">
          <IconHomeQuestion color="black" stroke={2} size={18} />
          &nbsp;&nbsp;&nbsp;Home/Family Details
        </p>
        <p className="text-xs text-gray-400">
          Tell us about your household to better match our services
        </p>

        {clientRequest.serviceType === "Elder Caregiving Services" && (
          <div className="flex flex-col">
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">
                Gender of Elder
              </InputLabel>
              <Select
                displayEmpty
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={clientRequest.elderGender}
                label="Gender of Elder"
                onChange={(event: SelectChangeEvent) => {
                  setClientRequest({
                    ...clientRequest,
                    elderGender: event.target.value,
                  });
                }}
              >
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <TextField
                value={clientRequest.elderAgeRange}
                type="number"
                label="Age of Elder"
                onChange={(e) => {
                  setClientRequest({
                    ...clientRequest,
                    elderAgeRange: e.target.value,
                  });
                }}
                placeholder="Age of Elder"
                sx={{ mt: 2 }}
              />
            </FormControl>

            <FormControl sx={{ mt: 2 }} fullWidth>
              <FormLabel>Health conditions (Select all that apply)</FormLabel>

              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={healthConditions.diabetes}
                      onChange={handleChange}
                      name="diabetes"
                    />
                  }
                  label="Diabetes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={healthConditions.incontinence}
                      onChange={handleChange}
                      name="incontinence"
                    />
                  }
                  label="Incontinence"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={healthConditions.paralysis}
                      onChange={handleChange}
                      name="paralysis"
                    />
                  }
                  label="Paralysis"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={healthConditions.dementia}
                      onChange={handleChange}
                      name="dementia"
                    />
                  }
                  label="Dementia"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={healthConditions.hearing}
                      onChange={handleChange}
                      name="hearing"
                    />
                  }
                  label="Hearing Loss"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={healthConditions.vision}
                      onChange={handleChange}
                      name="vision"
                    />
                  }
                  label="Vision Loss"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={healthConditions.hypertension}
                      onChange={handleChange}
                      name="hypertension"
                    />
                  }
                  label="Hypertension"
                />
              </FormGroup>
            </FormControl>
          </div>
        )}
        {clientRequest.serviceType === "Home Cook Services" && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">
              Number of people to be served
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              required
              label="Any medical conditions we should be aware of?"
              value={clientRequest.numberOfDiners.toString()}
              onChange={(event: SelectChangeEvent) => {
                setClientRequest({
                  ...clientRequest,
                  numberOfDiners: Number(event.target.value),
                });
              }}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={13}>13</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
        )}
        {clientRequest.serviceType !== "Housekeeper Services" &&
          clientRequest.serviceType !== "Home Cook Services" &&
          clientRequest.serviceType !== "Elder Caregiving Services" &&
          clientRequest.serviceType !== "General Help Services" && (
            <>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Number of Kids to be cared for
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  required
                  label="Number of Kids to be cared for"
                  value={clientRequest.numberOfKids.toString()}
                  onChange={(event: SelectChangeEvent) => {
                    const ages = clientRequest.agesOfKids.split(",");
                    let error = "";

                    for (let i = 0; i < ages.length; i++) {
                      if (ages[i].trim().length <= 2) {
                        error = "Please enter a valid age for the next age";
                      } else {
                        error = "";
                      }
                    }

                    if (Number(event.target.value) !== ages.length) {
                      error =
                        "Ages of Kids does not correspond with numbers of Kids";
                    }

                    setAgesOfKidsError(error);
                    setClientRequest({
                      ...clientRequest,
                      numberOfKids: Number(event.target.value),
                    });
                  }}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  value={clientRequest.agesOfKids}
                  required
                  error={
                    clientRequest.agesOfKids === "" || agesOfKidsError !== ""
                  }
                  helperText={agesOfKidsError}
                  onChange={(e) => {
                    const agesOfKids = e.target.value;
                    const ages = agesOfKids.split(",");

                    for (let i = 0; i < ages.length; i++) {
                      if (ages[i].trim().length <= 2) {
                        setAgesOfKidsError(
                          "Please enter a valid age for the next age"
                        );
                      } else {
                        setAgesOfKidsError("");
                      }
                    }

                    clientRequest.numberOfKids !== ages.length
                      ? setAgesOfKidsError(
                          "Ages of Kids does not correspond with numbers of Kids"
                        )
                      : agesOfKidsError;

                    setClientRequest({
                      ...clientRequest,
                      agesOfKids,
                    });
                  }}
                  placeholder="Ages of Kids"
                  label="Ages of Kids"
                  sx={{ mt: 2 }}
                />
                <FormHelperText>
                  Separate ages with commas, e.g: 15 months,2 years,1 year and 3
                  months, 4 weeks
                </FormHelperText>
              </FormControl>
            </>
          )}

        {clientRequest.serviceType !== "Nanny Services" &&
          clientRequest.serviceType !== "Elder Caregiving Services" &&
          clientRequest.serviceType !== "Home Cook Services" && (
            <>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Number of Rooms
                </InputLabel>
                <Select
                  error={clientRequest.numberOfRooms === ""}
                  label="Number of Rooms"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  required
                  value={clientRequest.numberOfRooms}
                  onChange={(event: SelectChangeEvent) => {
                    setClientRequest({
                      ...clientRequest,
                      numberOfRooms: event.target.value,
                    });
                  }}
                >
                  <MenuItem value="1 Bedroom">1 Bedroom</MenuItem>
                  <MenuItem value="2 Bedroom">2 Bedroom</MenuItem>
                  <MenuItem value="3 Bedroom">3 Bedroom</MenuItem>
                  <MenuItem value="4 Bedroom">4 Bedroom</MenuItem>
                  <MenuItem value="5 Bedroom">5 Bedroom</MenuItem>
                  <MenuItem value="6 Bedroom">6 Bedroom</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Type of house
                </InputLabel>
                <Select
                  required
                  label="Type of House"
                  error={clientRequest.typeOfHouse === ""}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={clientRequest.typeOfHouse}
                  onChange={(event: SelectChangeEvent) => {
                    setClientRequest({
                      ...clientRequest,
                      typeOfHouse: event.target.value,
                    });
                  }}
                >
                  <MenuItem value="bungalow">Bungalow/Flat</MenuItem>
                  <MenuItem value="1 storey">1 storey</MenuItem>
                  <MenuItem value="2 storey">2 storey</MenuItem>
                  <MenuItem value="3 storey">3 storey</MenuItem>
                  <MenuItem value="4 storey">4 storey</MenuItem>
                  <MenuItem value="5 storey">5 storey</MenuItem>
                  <MenuItem value="6 storey">6 storey</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

        <FormControl fullWidth>
          <TextField
            value={clientRequest.extraHomeInformation}
            multiline
            label="Other Information"
            rows={4}
            onChange={(e) => {
              setClientRequest({
                ...clientRequest,
                extraHomeInformation: e.target.value,
              });
            }}
            placeholder="Other Information"
            sx={{ mt: 2 }}
          />
          <FormHelperText>
            Extra relevant information as regards the above
          </FormHelperText>
        </FormControl>
      </div>

      <div className="h-[0.9px] bg-gray-300 mt-3"></div>

      <p className="text-sm text-gray-600 mt-2">
        Kindly review the information you provided before clicking `Continue`
      </p>

      <div className="flex justify-between items-center mt-2">
        <Link
          onClick={() => {
            router.push(pathname);
            goBack();
          }}
          href="/"
          className="text-start text-blue-950 items-center"
        >
          &larr; Back To Services
        </Link>

        <Button
          disabled={
            clientRequest.workMode === "Live-in"
              ? disableButton()
              : clientRequest.workingDays.length === 0 || disableButton()
          }
          onClick={onContinue}
          style={{ width: "150px", alignSelf: "end" }}
          buttonName="Continue"
        />
      </div>
    </section>
  );
};
