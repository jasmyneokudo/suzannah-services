"use client";

import AlertDialogSlide from "./components/Dialog";
import Button from "./components/Button";
import FAQBox from "./components/FAQBox";
import FormControl from "@mui/material/FormControl";
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import ReviewCard from "./components/ReviewCard";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ServiceCard from "./components/ServiceCard";
import Slider, { Settings } from "react-slick";
import {
  CustomerRequest,
  PaymentPlan,
  ServiceType,
} from "@/types/ClientRequest";
import { faqs } from "@/data/faqs";
import { FormHelperText, TextField } from "@mui/material";
import { Hero } from "./components/Hero";
import { SampleNextArrow } from "./components/NextArrow";
import { services } from "@/data/services";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";
import Tooltip from "@mui/material/Tooltip";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false } // This ensures the component is only loaded on the client-side
);

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconFileDescription,
  IconHomeQuestion,
  IconQuestionMark,
  IconUserQuestion,
} from "@tabler/icons-react";
import { paymentPlans } from "@/data/paymentPlans";
import PaymentPlanCard from "./components/PaymentPlanCard";
import { usePaymentPlan } from "@/hooks/usePaymentPlan";

const SliderTyped = Slider as unknown as React.ComponentClass<Settings>;
const BOOKING_FEE = 10000;
const ONE_OFF_FEE = 120000;

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
  };

  const [requestStage, setRequestStage] = useState<0 | 1 | 2 | 3>(0);
  const [isCustomerServicePolicyOpen, setIsCustomerServicePolicyOpen] =
    useState(false);

  const defaultCustomerRequest: CustomerRequest = {
    serviceType: "Live-in Nanny Services",
    employeeGender: "",
    employeeAgeRange: "",
    employeeTribePreference: "any tribe",
    employeeReligionPreference: "any religion",
    extraComment: "",
    clientName: "",
    clientPhoneNumber: "",
    clientEmail: "",
    clientAddress: "",
    numberOfKids: 0,
    agesOfKids: "",
    numberOfRooms: "",
    typeOfHouse: "",
    numberOfBathrooms: 0,
    extraHomeInformation: "",
    mustBeAbleToCook: false,
    mustBeAbleToIron: false,
    mustBeAbleToTeachKids: false,
    otherMustBes: "",
    bookingFee: 0,
    paymentPlan: "monthly",
  };

  const [customerRequest, setCustomerRequest] = useState<CustomerRequest>(
    defaultCustomerRequest
  );

  const resetCustomerRequest = () => {
    setCustomerRequest(defaultCustomerRequest);
  };

  console.log(
    "number of rooms",
    customerRequest.numberOfRooms,
    Number(customerRequest.numberOfRooms)
  );
  console.log(
    "number of kids",
    customerRequest.numberOfKids,
    Number(customerRequest.numberOfKids)
  );

  const { clientPrice } = usePaymentPlan(customerRequest.serviceType, {
    extraChildren: Number(customerRequest.numberOfKids),
    extraRooms: Number(customerRequest.numberOfRooms[0]),
  });

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;
  const bookingFee =
    customerRequest.paymentPlan === "one-off" ? ONE_OFF_FEE : BOOKING_FEE;
  const componentProps = {
    email: customerRequest.clientEmail,
    amount: bookingFee * 100, // Paystack expects amount in kobo
    metadata: {
      custom_fields: [
        {
          display_name: "Customer ID",
          variable_name: "customer_id",
          value: "CUST123",
        },
      ],
    },
    publicKey,
    text: `Pay Now (₦${bookingFee.toLocaleString()})`,
    onSuccess: async () => {
      await sendRequestDetails();
      resetCustomerRequest();
      setRequestStage(0);
      alert(
        "Your request has been successfully dispatched and our team will reach out to you via WhatsApp shortly."
      );
    },
    onClose: () => alert("Are you sure?"),
  };

  function disableButton(): boolean {
    if (
      customerRequest.serviceType === "Live-in Help Services" ||
      customerRequest.serviceType === "Live-in Housekeeper Services"
    ) {
      return (
        customerRequest.typeOfHouse === "" &&
        customerRequest.numberOfRooms === ""
      );
    } else if (customerRequest.serviceType === "Live-in Nanny Services") {
      return customerRequest.agesOfKids === "";
    } else {
      return (
        customerRequest.typeOfHouse === "" &&
        customerRequest.numberOfRooms === "" &&
        customerRequest.agesOfKids === ""
      );
    }
  }

  async function sendRequestDetails() {
    const requestBody = `
      Incoming Client Request ${new Date(Date.now())}\n:
      Service Type: ${customerRequest.serviceType},
      Client's Particulars
      Name: ${customerRequest.clientName},
      Email address: ${customerRequest.clientEmail},
      Phone number: ${customerRequest.clientPhoneNumber},
      Address: ${customerRequest.clientAddress},
      Home/Family Details
      ${
        (customerRequest.serviceType === "Live-in Nanny Services" ||
          customerRequest.serviceType === "Live-in Nanny + Help Services") &&
        `Number of Kids: ${customerRequest.numberOfKids},
      Ages of Kids: ${customerRequest.agesOfKids},`
      }
      ${
        (customerRequest.serviceType === "Live-in Housekeeper Services" ||
          customerRequest.serviceType === "Live-in Nanny + Help Services" ||
          customerRequest.serviceType === "Live-in Help Services") &&
        `House Type: ${customerRequest.typeOfHouse},
      Number of Rooms: ${customerRequest.numberOfRooms},`
      }
      Candidate Preferences
      Gender: ${customerRequest.employeeGender},
      Age Range: ${customerRequest.employeeAgeRange},
      Tribe Preference: ${customerRequest.employeeTribePreference},
      Religion Preference: ${customerRequest.employeeReligionPreference},
      Other Preferences: ${customerRequest.extraComment},
      Amount Paid: ${customerRequest.bookingFee}
    `;

    try {
      const res = await fetch("/api/createRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: process.env.NEXT_PUBLIC_WASENDERAPI_PHONE_NUMBER,
          text: requestBody,
        }),
      });

      const data = await res.json();
      console.error("data:", data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      // setLoading(false);
    }
  }

  function selectService(serviceType: ServiceType) {
    setCustomerRequest({ ...customerRequest, serviceType: serviceType });
    setRequestStage(1);

    const section = document.getElementById("services-section");
    section?.scrollIntoView({ behavior: "smooth" });
  }

  function closeCustomerServicePolicy(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    setIsCustomerServicePolicyOpen(false);

    if (target.textContent === "Proceed") {
      setRequestStage(3);
      setTimeout(() => {
        document
          .getElementById("final-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }

  function selectPlan(paymentPlan: PaymentPlan): void {
    setCustomerRequest({ ...customerRequest, paymentPlan });
    if (paymentPlan === "monthly") {
      setIsCustomerServicePolicyOpen(true);
    } else {
      setRequestStage(3);
      setTimeout(() => {
        document
          .getElementById("final-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }

  return (
    <main className="flex bg-white min-h-screen w-full flex-col items-center justify-between overflow-clip">
      <AlertDialogSlide
        open={isCustomerServicePolicyOpen}
        onClose={(e: React.MouseEvent<HTMLElement>) =>
          closeCustomerServicePolicy(e)
        }
      />
      <Hero
        bookAServiceNow={() => {
          setRequestStage(0);
          resetCustomerRequest();
        }}
      />

      {/* SERVICES SECTION */}
      <section
        id="services-section"
        className={`${
          requestStage !== 0 && "hidden"
        } mt-20 max-sm:mt-10 flex flex-col items-center bg-white max-sm:px-10`}
      >
        <h1 className="font-extralight text-3xl text-black dark:text-gray-700">
          SERVICES
        </h1>

        {services.map((service, index) => (
          <ServiceCard
            whatsIncluded={service.whatsIncluded}
            key={index}
            serviceDescription={service.serviceDescription}
            serviceName={service.serviceName}
            onClick={() => selectService(service.serviceName as ServiceType)}
          />
        ))}
      </section>

      {/* CUSTOMER PREFERENCES SECTION */}
      <section
        className={`${
          requestStage !== 1 && "hidden"
        } mt-20 max-sm:mt-10 flex flex-col bg-white max-sm:px-8`}
      >
        <Link
          onClick={() => {
            resetCustomerRequest();
            setRequestStage(0);
          }}
          href="#"
          className="text-start text-blue-950 items-center"
        >
          &larr; Back
        </Link>
        <p className="mt-4 text-blue-950 text-sm text-center font-bold">
          {customerRequest.serviceType}
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
            Choose your preferred characteristics for your care provider
          </p>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo2-simple-select-label">Age Range</InputLabel>
            <Select
              displayEmpty
              labelId="demo2-simple-select-label"
              id="demo-simple-select"
              value={customerRequest.employeeAgeRange}
              label="Age Range"
              required
              onChange={(event: SelectChangeEvent) => {
                setCustomerRequest({
                  ...customerRequest,
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
              value={customerRequest.employeeGender}
              label="Gender"
              onChange={(event: SelectChangeEvent) => {
                setCustomerRequest({
                  ...customerRequest,
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
              value={customerRequest.employeeReligionPreference}
              label="Religion Preference"
              onChange={(event: SelectChangeEvent) => {
                setCustomerRequest({
                  ...customerRequest,
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
              value={customerRequest.employeeTribePreference}
              onChange={(event: SelectChangeEvent) => {
                setCustomerRequest({
                  ...customerRequest,
                  employeeTribePreference: event.target.value,
                });
              }}
            >
              <MenuItem value="north">Northerners/Hausa</MenuItem>
              <MenuItem value="igbo">Igbo</MenuItem>
              <MenuItem value="yoruba">Yoruba/Edo</MenuItem>
              <MenuItem value="benue">Idoma/Igede</MenuItem>
              <MenuItem value="efik">Efik/Ibibio</MenuItem>
              <MenuItem value="any tribe">
                No Preference (Any Tribe is fine)
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Other Preferences"
            value={customerRequest.extraComment}
            onChange={(e) =>
              setCustomerRequest({
                ...customerRequest,
                extraComment: e.target.value,
              })
            }
            fullWidth
            sx={{ mt: 2 }}
            id="filled-multiline-static"
            placeholder="Other Preferences"
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
          {customerRequest.serviceType !== "Live-in Housekeeper Services" &&
            customerRequest.serviceType !==
              ("Live-in Help Services" as ServiceType) && (
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
                    value={customerRequest.numberOfKids.toString()}
                    onChange={(event: SelectChangeEvent) => {
                      setCustomerRequest({
                        ...customerRequest,
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
                    value={customerRequest.agesOfKids}
                    required
                    error={customerRequest.agesOfKids === ""}
                    onChange={(e) => {
                      setCustomerRequest({
                        ...customerRequest,
                        agesOfKids: e.target.value, // Convert to numbers
                      });
                    }}
                    placeholder="Ages of Kids"
                    sx={{ mt: 2 }}
                  />
                  <FormHelperText>
                    Separate with commas, e.g 15 months,2 years,1 year and 3
                    months
                  </FormHelperText>
                </FormControl>
              </>
            )}

          {customerRequest.serviceType !== "Live-in Nanny Services" && (
            <>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Number of Rooms
                </InputLabel>
                <Select
                  error={customerRequest.numberOfRooms === ""}
                  label="Number of Rooms"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  required
                  value={customerRequest.numberOfRooms}
                  onChange={(event: SelectChangeEvent) => {
                    setCustomerRequest({
                      ...customerRequest,
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
                  error={customerRequest.typeOfHouse === ""}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={customerRequest.typeOfHouse}
                  onChange={(event: SelectChangeEvent) => {
                    setCustomerRequest({
                      ...customerRequest,
                      typeOfHouse: event.target.value,
                    });
                  }}
                >
                  <MenuItem value="bungalow">Bungalow</MenuItem>
                  <MenuItem value="1 storey">1 storey</MenuItem>
                  <MenuItem value="2 storey">2 storey</MenuItem>
                  <MenuItem value="3 storey">3 storey</MenuItem>
                  <MenuItem value="4 storey">4 storey</MenuItem>
                  <MenuItem value="4 storey">4 storey</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          <FormControl fullWidth>
            <TextField
              value={customerRequest.extraHomeInformation}
              multiline
              label="Other Information"
              rows={4}
              onChange={(e) => {
                setCustomerRequest({
                  ...customerRequest,
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
              setRequestStage(0);
              resetCustomerRequest();
            }}
            href="#"
            className="text-start text-blue-950 items-center"
          >
            &larr; Back To Services
          </Link>

          <Button
            disabled={disableButton()}
            onClick={() => {
              setCustomerRequest({
                ...customerRequest,
                bookingFee: clientPrice,
              });
              setRequestStage(2);

              setTimeout(() => {
                document
                  .getElementById("payment-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 0);
            }}
            style={{ width: "150px", alignSelf: "end" }}
            buttonName="Continue"
          />
        </div>
      </section>

      {/* PAYMENT PLANS SECTION */}
      <section
        id="payment-section"
        className={`${
          requestStage !== 2 && "hidden"
        } mt-20 max-sm:mt-10 flex flex-col bg-white max-sm:px-8`}
      >
        <Link
          onClick={() => setRequestStage(1)}
          href="#"
          className="text-start text-blue-950 items-center"
        >
          &larr; Back
        </Link>
        <h1 className="font-extralight text-center text-3xl mt-2 text-black dark:text-gray-800">
          CHOOSE YOUR PLAN
        </h1>
        <p className="text-gray-600 mt-5 text-base">
          Step 2 of 3: Choose your payment plan
        </p>

        {paymentPlans.map((paymentPlan, index) => (
          <PaymentPlanCard
            key={index}
            nameOfPlan={paymentPlan.name}
            description={paymentPlan.description}
            benefits={paymentPlan.benefits}
            howItWorks={paymentPlan.howItWorks}
            price={clientPrice.toLocaleString()}
            type={paymentPlan.type}
            selectPlan={() => selectPlan(paymentPlan.type)}
          />
        ))}

        <Link
          onClick={() => setRequestStage(1)}
          href="#"
          className="text-start text-blue-950 mt-3 items-center"
        >
          &larr; Back To Preferences
        </Link>
      </section>

      {/* FINAL SECTION */}
      <section
        id="final-section"
        className={`${
          requestStage !== 3 && "hidden"
        } mt-20 max-sm:mt-10 flex flex-col bg-white max-sm:px-8`}
      >
        <Link
          onClick={() => setRequestStage(2)}
          href="#"
          className="text-start text-blue-950 items-center"
        >
          &larr; Back
        </Link>
        <h1 className="font-extralight text-center text-3xl mt-2 text-black dark:text-gray-800">
          COMPLETE YOUR REQUEST
        </h1>
        <p className="text-gray-600 mt-5 text-base">
          Step 3 of 3: Fill in your contact details and make payment
        </p>

        <div className="border border-gray-300 rounded-lg p-4 mt-5">
          <span className="flex items-center gap-2">
            <IconFileDescription color="#172554" stroke={2} size={20} />
            <h2 className="text-black dark:text-gray-900 text-lg font-bold">
              Request Summary
            </h2>
          </span>

          <span className="flex items-center justify-between mt-2 gap-3">
            <p className="font-semibold text-black text-sm">Service Type:</p>
            <p className="text-xs text-gray-700">
              {customerRequest.serviceType}
            </p>
          </span>

          {(customerRequest.serviceType === "Live-in Nanny Services" ||
            customerRequest.serviceType ===
              "Live-in Nanny + Help Services") && (
            <>
              <span className="flex items-center justify-between mt-2 gap-3">
                <p className="font-semibold text-black text-sm">
                  Kids Details:
                </p>
                <p className="text-xs text-gray-700 text-end">
                  {customerRequest.numberOfKids} kid(s) of age(s):{" "}
                  {customerRequest.agesOfKids}
                </p>
              </span>
            </>
          )}

          {(customerRequest.serviceType === "Live-in Housekeeper Services" ||
            customerRequest.serviceType === "Live-in Help Services" ||
            customerRequest.serviceType ===
              "Live-in Nanny + Help Services") && (
            <>
              <span className="flex items-center justify-between mt-2 gap-3">
                <p className="font-semibold text-black text-sm">
                  Home Details:
                </p>
                <p className="text-xs text-gray-700 text-end">
                  {customerRequest.typeOfHouse} home of &nbsp;
                  {customerRequest.numberOfRooms}
                </p>
              </span>
              <span className="flex items-center justify-between mt-2 gap-3">
                <p className="font-semibold text-black text-sm">
                  Additional Home Info:
                </p>
                <p className="text-xs text-gray-700">
                  {customerRequest.extraHomeInformation || "nil"}
                </p>
              </span>
            </>
          )}

          <span className="flex items-center justify-between mt-2 gap-3">
            <p className="font-semibold text-black text-sm">Staff Details:</p>
            <p className="text-xs text-gray-700 text-end">
              Ages{" "}
              {`${customerRequest.employeeAgeRange}, ${customerRequest.employeeGender}, ${customerRequest.employeeTribePreference},
              ${customerRequest.employeeReligionPreference}`}
            </p>
          </span>

          <span className="flex items-center justify-between mt-2 gap-3">
            <p className="font-semibold text-black text-sm">
              Additional Staff Details:
            </p>
            <p className="text-xs text-gray-700 text-end">
              {customerRequest.extraComment || "nil"}
            </p>
          </span>

          <div className="w-full bg-gray-300 h-[0.5px] mt-3"></div>

          <span className="flex items-center gap-2 mt-3">
            <IconFileDescription color="#172554" stroke={2} size={20} />
            <h2 className="text-black dark:text-gray-900 text-lg font-bold">
              Payment Summary
            </h2>
          </span>
          <span className="flex items-center justify-between mt-2 gap-3">
            <p className="font-semibold text-black text-sm">Payment Plan:</p>
            <p className="text-xs text-gray-700 text-end">
              {customerRequest.paymentPlan}
            </p>
          </span>
          <span className="flex items-center justify-between mt-2 gap-3">
            <p className="font-bold text-black text-sm">Service Fee:</p>
            <p className="text-sm text-red-700 text-end">
              ₦
              {customerRequest.paymentPlan === "monthly"
                ? customerRequest.bookingFee.toLocaleString()
                : ONE_OFF_FEE.toLocaleString()}{" "}
              {customerRequest.paymentPlan === "monthly" && "/month"}
            </p>
          </span>
          {customerRequest.paymentPlan === "monthly" && (
            <span className="flex items-center justify-between mt-2 gap-3">
              <p className="font-bold text-black text-sm flex">
                Booking Fee:
              </p>
              <p className="text-sm text-red-700 text-end">
                ₦{BOOKING_FEE.toLocaleString()}
              </p>
            </span>
          )}
        </div>

        <div className="border border-gray-300 rounded-lg p-4 mt-5">
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            id="client-name"
            label="Your Name"
            variant="outlined"
            value={customerRequest.clientName}
            onChange={(e) =>
              setCustomerRequest({
                ...customerRequest,
                clientName: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            id="client-phone-number"
            type="number"
            label="Whatsapp Number"
            variant="outlined"
            value={customerRequest.clientPhoneNumber}
            onChange={(e) =>
              setCustomerRequest({
                ...customerRequest,
                clientPhoneNumber: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            id="client-email"
            type="text"
            label="Email Address"
            variant="outlined"
            value={customerRequest.clientEmail}
            onChange={(e) =>
              setCustomerRequest({
                ...customerRequest,
                clientEmail: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            sx={{ mt: 2 }}
            id="client-address"
            type="text"
            label="Address (Where Staff will work)"
            variant="outlined"
            value={customerRequest.clientAddress}
            onChange={(e) =>
              setCustomerRequest({
                ...customerRequest,
                clientAddress: e.target.value,
              })
            }
          />
          <p className="text-sm text-gray-600 mt-2">
            Kindly review the contact details provided before making payment
          </p>
          <PaystackButton disabled={customerRequest.clientEmail === "" || customerRequest.clientPhoneNumber === ""} className="paystack-button" {...componentProps} />
        </div>

        <Link
          onClick={() => setRequestStage(2)}
          href="#"
          className="text-start text-blue-950 mt-3 items-center"
        >
          &larr; Back To Payment Plans
        </Link>
      </section>

      {/* CLIENT REVIEWS SECTION STARTS */}
      <div className="z-50 relative h-3/4 w-full mt-10 flex flex-col bg-gradient-to-b from-blue-950 to-[#0D98BA] max-sm:to-blue-950/90">
        <h1 className="absolute z-50 top-72 max-sm:top-[10%] font-extralight text-3xl max-sm:text-2xl mt-5 mb-20 self-center text-white">
          WHAT OUR FAMILIES SAY
        </h1>
        <div className="relative ">
          <div className="absolute z-50 bg-[#EFF2F2] max-sm:bg-transparent w-full h-72 rounded-br-[400px] max-sm:"></div>
          <Image
            src="/images/reviews-bg2.jpg"
            alt="Vercel Logo"
            width="0"
            height="0"
            sizes="100vw"
            className="-z-[100] max-sm:blur-[1px] w-full h-auto max-sm:h-[450px] opacity-30"
            priority
          />
        </div>

        <div className="absolute top-2/3 max-sm:top-[30%] w-3/4 max-sm:w-[84%] self-center flex justify-center items-top">
          <SliderTyped {...settings} className="w-full mr-[-100px] max-sm:mr-0">
            <ReviewCard
              name="Mrs. Irene"
              location="Jabi"
              serviceType="Live-In Nanny Services"
              review="I'm satisfied and impressed with the services of the Nanny assigned. She's really experienced"
            />

            <ReviewCard
              name="Mrs. 0.A"
              location="Gwarimpa"
              serviceType="Live-In Nanny Services"
              review="So far, so good, the assigned Nanny is hard-working and patient with my son"
            />

            <ReviewCard
              name="Mrs. F"
              location="Kubwa"
              serviceType="Live-In Nanny + Help Services"
              review="The assigned Nanny is doing a good job, I'm pleased with her services, she is hardworking and cheerful."
            />
          </SliderTyped>
        </div>
      </div>

      {/* FAQs SECTION STARTS */}
      <section className="flex-col justify-center mx-10 max-sm:mx-5">
        <h1 className="font-extralight text-black dark:text-gray-900 text-center text-3xl mt-20 mb-20 max-sm:mb-10 self-center">
          FREQUENTLY ASKED QUESTIONS
        </h1>

        <div className="max-sm:flex max-sm:flex-col grid-cols-3 grid-flow-row grid place-items-center">
          {faqs.map((faq) => (
            <FAQBox key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      <section className="py-10 max-sm:px-10 w-full">
        <h1 className="font-extralight text-3xl text-center text-black dark:text-gray-700 mt-10">
          CUSTOM REQUEST
        </h1>
        <p className="text-sm text-gray-600 text-start w-1/2 max-sm:w-full ml-auto mr-auto mt-3">Need something specific? Submit your custom requirements and our team will reach out to you.</p>

        <div className="shadow-md w-1/2 ml-auto mr-auto shadow-stone-300 max-sm:w-full p-4 mt-5">
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="demo2-simple-select-label">Service Type</InputLabel>
            <Select
              displayEmpty
              labelId="demo2-simple-select-label"
              id="demo-simple-select"
              value={customerRequest.employeeAgeRange}
              label="Service Type"
              required
              onChange={(event: SelectChangeEvent) => {
                setCustomerRequest({
                  ...customerRequest,
                  employeeAgeRange: event.target.value,
                });
              }}
            >
              <MenuItem value="Weekly Nanny Services">
                Daily/Weekly Babysitting Service
              </MenuItem>
              <MenuItem value="Weekly Housekeeping">
                Weekly Housekeeping
              </MenuItem>
              <MenuItem value="Weekly Home">Weekly Home Cooking</MenuItem>
              <MenuItem value="Weekly Market Runs">
                Weekly Market Runs/Errands
              </MenuItem>
              <MenuItem value="Industrial Home/Office Cleaning">
                Industrial Home/Office Cleaning
              </MenuItem>
              <MenuItem value="Industrial Home/Office Cleaning">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Address (Where Service will be rendered)"
            value={customerRequest.extraComment}
            onChange={(e) =>
              setCustomerRequest({
                ...customerRequest,
                extraComment: e.target.value,
              })
            }
            fullWidth
            sx={{ mt: 2 }}
            id="filled-multiline-static"
            placeholder="Address (Where Service will be rendered)"
          />

          <TextField
            label="Additional Comment/Description"
            value={customerRequest.extraComment}
            onChange={(e) =>
              setCustomerRequest({
                ...customerRequest,
                extraComment: e.target.value,
              })
            }
            fullWidth
            sx={{ mt: 2 }}
            id="filled-multiline-static"
            placeholder="Additional Comment/Description"
            multiline
            rows={4}
          />

          <TextField
            label="Name"
            value={customerRequest.extraComment}
            onChange={(e) =>
              setCustomerRequest({
                ...customerRequest,
                extraComment: e.target.value,
              })
            }
            fullWidth
            sx={{ mt: 2 }}
            id="filled-multiline-static"
            placeholder="Address (Where Service will be rendered)"
          />

          <TextField
            label="Email"
            value={customerRequest.extraComment}
            onChange={(e) =>
              setCustomerRequest({
                ...customerRequest,
                extraComment: e.target.value,
              })
            }
            fullWidth
            sx={{ mt: 2 }}
            id="filled-multiline-static"
            placeholder="Email"
          />

          <TextField
            label="WhatsApp Number"
            value={customerRequest.extraComment}
            onChange={(e) =>
              setCustomerRequest({
                ...customerRequest,
                extraComment: e.target.value,
              })
            }
            fullWidth
            sx={{ mt: 2 }}
            id="filled-multiline-static"
            placeholder="Address (Where Service will be rendered)"
          />

          <Button buttonName="Submit" />
        </div>
      </section>

      {/* FOOTER SECTION STARTS */}
      <footer className="p-5 h-full py-52 bg-gradient-to-b relative from-blue-950 to-[#0D98BA] w-full flex flex-col justify-center items-center ">
        <Image
          src="/images/suzannah-large-white.png"
          alt="Vercel Logo"
          width="80"
          height="30"
          className="absolute top-5 left-5"
          priority
        />

        <div className="max-sm:hidden flex-col justify-center grid-cols-3 w-1/2 text-white grid-flow-row grid place-items-center">
          <div>
            <a href="#">
              <p>Resources</p>
            </a>
            <a href="#">
              <p className="font-thin">NewsLetter</p>
            </a>
            <a href="#">
              <p className="font-thin">Blog</p>
            </a>
            <a href="#">
              <p className="font-thin">Partners</p>
            </a>
            <a href="#">
              <p className="font-thin"></p>
            </a>
          </div>

          <div>
            <a href="#">
              <p>Social</p>
            </a>
            <a href="https://www.facebook.com/share/1A1j127rsf/">
              <p className="font-thin">Facebook</p>
            </a>
            <a href="https://www.instagram.com/suzannahservices?igsh=eThnNzExZnd6NHpu">
              <p className="font-thin">Instagram</p>
            </a>
            <a href="https://wa.me/message/WSKBWTOOI3UPE1">
              <p className="font-thin">Whatsapp</p>
            </a>
          </div>
          <div>
            <p>More</p>
            <a href="#">
              <p className="font-thin">About Us</p>
            </a>
            <a href="#">
              <p className="font-thin">Vision</p>
            </a>
            <a href="#">
              <p className="font-thin">Mission</p>
            </a>
          </div>
        </div>

        <Image
          src="/images/Parents.png"
          alt="Vercel Logo"
          width="300"
          height="300"
          className="absolute max-sm:w-[400px] left-0 max-sm:left-1/2 max-sm:-translate-x-1/2 bottom-0 opacity-30"
          priority
        />

        <Image
          src="/images/Thank-you-1.png"
          alt="Vercel Logo"
          width="300"
          height="300"
          className="max-sm:hidden absolute bottom-0 right-0 opacity-30"
          priority
        />

        <div className="flex flex-col items-center absolute bottom-14 max-sm:bottom-5 text-white">
          <p className="text-4xl">
            <span className="font-edu-sa">The </span>BRAND{" "}
            <span className="font-edu-sa">for</span>
          </p>
          <hr className=" bg-white w-full" />
          <h1 className="mt-2 text-white text-2xl">FAMILIES and HOMES</h1>
        </div>

        {/* <Image
          src="/images/brand-for-families.png"
          alt="Vercel Logo"
          width="450"
          height="100"
          // sizes="100vw"
          objectFit="cover"
          object-position="50% 50%"
        style={{  position: 'absolute', bottom: -20 }} // optional
          // className="opacity-70 absolute bottom-0"
          priority
        /> */}

        <div className="flex absolute bottom-16 max-sm:top-16 right-16 max-sm:right-10 justify-between w-1/6 max-sm:w-1/5 px-10 max-sm:px-0">
          <a href="https://www.facebook.com">
            <IconBrandFacebook fill="white" color="white" stroke={1} />
          </a>

          <a href="https://www.instagram.com">
            <IconBrandInstagram color="white" stroke={2} />
          </a>

          <a href="https://www.whatsapp.com">
            <IconBrandWhatsapp color="white" stroke={2} />
          </a>
        </div>
      </footer>
    </main>
  );
}
