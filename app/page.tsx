"use client";

import AgreementDialog from "./components/AgreementDialog";
import Button from "./components/Button";
import FAQBox from "./components/FAQBox";
import FormControl from "@mui/material/FormControl";
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import ReviewCard from "./components/ReviewCard";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Slider, { Settings } from "react-slick";
import {
  CustomerRequest,
  PaymentPlan,
  ServiceType,
} from "@/types/ClientRequest";
import { faqs } from "@/data/faqs";
import {
  // CircularProgress,
  Fab,
  TextField,
} from "@mui/material";
import { Hero } from "./components/Hero";
import { SampleNextArrow } from "./components/NextArrow";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import "./loader.css";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }, // This ensures the component is only loaded on the client-side
);

import { IconBrandWhatsapp, IconFileDescription } from "@tabler/icons-react";
import { paymentPlans } from "@/data/paymentPlans";
import PaymentPlanCard from "./components/PaymentPlanCard";
import { usePaymentPlan } from "@/hooks/usePaymentPlan";
import { useGoogleSheets } from "@/hooks/useGoogleSheets";
import { usePathname, useRouter } from "next/navigation";
import { ServicesSection } from "./sections/ServicesSection";
import { CustomerPreferencesSection } from "./sections/CustomerPreferencesSection";
import { Footer } from "./components/Footer";

const SliderTyped = Slider as unknown as React.ComponentClass<Settings>;
const BOOKING_FEE = 20500;
const ONE_OFF_FEE = 202500;

type HomeProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Home({ searchParams }: HomeProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
  };

  const { updateValues } = useGoogleSheets();

  const router = useRouter();
  const pathname = usePathname();
  const [pageLoading, setPageLoading] = useState(false);

  // const searchParams = useSearchParams()

  const [requestStage, setRequestStage] = useState<Number>(0);
  const [isCustomerServicePolicyOpen, setIsCustomerServicePolicyOpen] =
    useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [days, setDays] = useState<string[]>(() => []);

  const defaultCustomRequest = {
    serviceName: "",
    serviceLocation: "",
    serviceDescription: "",
    name: "",
    emailAddress: "",
    whatsappNumber: "",
  };

  const defaultCustomerRequest: CustomerRequest = {
    serviceType: "Nanny Services",
    employeeGender: "Female",
    employeeAgeRange: "23-27",
    employeeTribePreference: "any tribe",
    employeeReligionPreference: "any religion",
    extraComment: "",
    clientName: "",
    clientPhoneNumber: "",
    clientEmail: "",
    clientAddress: "",
    numberOfKids: 0,
    numberOfDiners: 0,
    workMode: "Live-in",
    workingDays: [],
    workingHours: [],
    agesOfKids: "",
    numberOfRooms: "",
    typeOfHouse: "",
    numberOfBathrooms: 0,
    extraHomeInformation: "",
    elderAgeRange: "",
    elderGender: "Female",
    elderHealthConditions: "",
    numberOfPassengers: 0,
    mustBeAbleToCook: false,
    mustBeAbleToIron: false,
    mustBeAbleToTeachKids: false,
    otherMustBes: "",
    bookingFee: 0,
    paymentPlan: "monthly",
  };

  const [clientRequest, setClientRequest] = useState<CustomerRequest>(
    defaultCustomerRequest,
  );

  const [customRequest, setCustomRequest] = useState(defaultCustomRequest);

  const resetCustomerRequest = () => {
    setClientRequest(defaultCustomerRequest);
    // setDays([])
  };

  const { clientPrice } = usePaymentPlan(clientRequest.serviceType, {
    extraChildren: clientRequest.numberOfKids,
    extraRooms: Number(clientRequest.numberOfRooms[0]),
    extraDays:
      clientRequest.workMode === "Live-in"
        ? 0
        : clientRequest.workingDays.length,
    extraFloors:
      clientRequest.typeOfHouse !== ""
        ? Number(clientRequest.typeOfHouse[0]) + 1 || 1
        : 0,
    newBorns: (
      clientRequest.agesOfKids?.match(/\b(week|weeks|wk|wks|day|days|0 month|newborn|new born)\b/gi) ||
      []
    ).length, // check how many times the word week, weeks, day or days appear
    extraDiners:
      clientRequest.serviceType === "Home Cook Services"
        ? clientRequest.numberOfDiners
        : 0,
    numberOfPassengers:
      clientRequest.serviceType === "Driving Services"
        ? clientRequest.numberOfPassengers
        : 0,
    elderHealthConditions:
      clientRequest.serviceType === "Elder Caregiving Services"
        ? clientRequest.elderHealthConditions.split(", ").length
        : 0,
  });

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;
  const bookingFee =
    clientRequest.paymentPlan === "one-off" ? ONE_OFF_FEE : BOOKING_FEE;
  const componentProps = {
    email: clientRequest.clientEmail,
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
      const requestArray = [
        new Date(Date.now()).toLocaleString(),
        clientRequest.serviceType,
        clientRequest.clientName,
        clientRequest.clientEmail,
        clientRequest.clientPhoneNumber,
        clientRequest.clientAddress,
        clientRequest.serviceType === "Driving Services"
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
      ];

      try {
        await sendRequestDetails(requestArray);
        resetCustomerRequest();
        router.push(pathname);
        setRequestStage(0);
        alert(
          "Your request has been successfully dispatched and our team will reach out to you via WhatsApp shortly.",
        );
      } catch (err) {
        console.error("Failed to send request details", err);
        return; // stop the flow
      }
    },
    onClose: () => alert("Are you sure?"),
  };
  const step: number = Number(searchParams?.step) || 0;

  useEffect(() => {
    if (step === 0) {
      resetCustomerRequest();
    }
    if (requestStage !== step) {
      setRequestStage(step);
    }
  }, [step]);

  // useEffect(() => {
  //   if (step === 3 && clientRequest.bookingFee === 0) {
  //     alert("Something went wrong, please try booking again.");
  //     router.push("/#services-section");
  //   }
  // }, [clientRequest, step, router]);

  useEffect(() => {
    if (clientRequest.serviceType === "Driving Services") {
      setClientRequest({ ...clientRequest, employeeGender: "Male" });
    }
  }, [clientRequest.serviceType]);

  async function sendRequestDetails(requestArray: any[]) {
    const requestBody = `
      Incoming Client Request ${new Date(Date.now()).toLocaleString()}\n:
      Service Type: ${clientRequest.serviceType},
      Client's Particulars
      Name: ${clientRequest.clientName},
      Email address: ${clientRequest.clientEmail},
      Phone number: ${clientRequest.clientPhoneNumber},
      Address: ${clientRequest.clientAddress},
      Home/Family Details
      ${
        (clientRequest.serviceType === "Nanny Services" ||
          clientRequest.serviceType === "Nanny + Help Services") &&
        `Number of Kids: ${clientRequest.numberOfKids},
      Ages of Kids: ${clientRequest.agesOfKids},`
      }
      ${
        clientRequest.serviceType === "Home Cook Services" &&
        `Number of Diners: ${clientRequest.numberOfDiners},`
      }
      ${
        (clientRequest.serviceType === "Housekeeper Services" ||
          clientRequest.serviceType === "Nanny + Help Services" ||
          clientRequest.serviceType === "General Help Services") &&
        `House Type: ${clientRequest.typeOfHouse},
      Number of Rooms: ${clientRequest.numberOfRooms},
      Extra Home Info: ${clientRequest.extraHomeInformation},`
      }
      Candidate Preferences
      Gender: ${clientRequest.employeeGender},
      Age Range: ${clientRequest.employeeAgeRange},
      Tribe Preference: ${clientRequest.employeeTribePreference},
      Religion Preference: ${clientRequest.employeeReligionPreference},
      ${
        clientRequest.workMode === "Live-out" &&
        `Working Days: ${clientRequest.workingDays.join(", ")},
         Working Hours: ${clientRequest.workingHours.join(", ")},`
      },
      ${
        clientRequest.serviceType === "Elder Caregiving Services" &&
        `Elder Age/Gender: ${clientRequest.elderAgeRange} years, ${
          clientRequest.elderGender
        }
         Elder Health Conditions: ${
           clientRequest.elderHealthConditions ?? "nil"
         },`
      },
      ${
        clientRequest.serviceType === "Driving Services" &&
        `Number of Passengers: ${clientRequest.numberOfPassengers}`
      },
      Work Mode: ${clientRequest.workMode},
      Other Staff Preferences: ${clientRequest.extraComment},
      Amount Paid: ${
        clientRequest.paymentPlan === "one-off" ? ONE_OFF_FEE : BOOKING_FEE
      },
      Service Fee: ${clientRequest.bookingFee}
    `;
    // update excel sheet
    await updateValues([requestArray]);

    // send order details to whatsapp number
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
    router.push(pathname + "?step=1");
    setPageLoading(true);

    setTimeout(() => {
      document
        .getElementById("preferences-section")
        ?.scrollIntoView({ behavior: "smooth" });
      setPageLoading(false);
    }, 1000);
    setClientRequest({ ...clientRequest, serviceType: serviceType });
    setRequestStage(1);
  }

  function closeCustomerServicePolicy(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    setIsCustomerServicePolicyOpen(false);

    if (target.textContent === "Proceed") {
      router.push(pathname + "?step=3");
      setRequestStage(3);
      router.push(pathname + "?step=3");
      setTimeout(() => {
        document
          .getElementById("final-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }

  function selectPlan(paymentPlan: PaymentPlan): void {
    setClientRequest({ ...clientRequest, paymentPlan });
    if (paymentPlan === "monthly") {
      setIsCustomerServicePolicyOpen(true);
    } else {
      router.push(pathname + "?step=3");
      setRequestStage(3);
      setPageLoading(true);

      setTimeout(() => {
        document
          .getElementById("final-section")
          ?.scrollIntoView({ behavior: "smooth" });
        setPageLoading(false);
      }, 1000);
    }
  }

  return (
    <main className="flex  bg-white min-h-screen w-full flex-col items-center justify-between overflow-clip">
      {pageLoading && (
        <Image
          src="/images/suzannah-drop.png"
          alt="Vercel Logo"
          width="200"
          height="200"
          className="logo"
          priority
        />
      )}
      <div className={`w-full ${pageLoading && "opacity-20"} `}>
        <AgreementDialog
          liveIn={clientRequest.workMode === "Live-in"}
          open={isCustomerServicePolicyOpen}
          onClose={(e: React.MouseEvent<HTMLElement>) =>
            closeCustomerServicePolicy(e)
          }
        />
        <Fab
          variant="extended"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            backgroundColor: "#25D366",
            color: "white",
          }}
        >
          <Link
            className="flex items-center"
            href="https://wa.me/message/WSKBWTOOI3UPE1"
          >
            <IconBrandWhatsapp size={20} />
            &nbsp;Chat With Us
          </Link>
        </Fab>
        <Hero
          bookAServiceNow={() => {
            setRequestStage(0);
            resetCustomerRequest();
          }}
        />
        {/* SERVICES SECTION */}
        <ServicesSection
          requestStage={requestStage}
          onSelectService={selectService}
        />

        {/* CUSTOMER PREFERENCES SECTION */}
        <CustomerPreferencesSection
          goBack={() => {
            resetCustomerRequest();
            setRequestStage(0);
          }}
          onContinue={() => {
            setClientRequest({
              ...clientRequest,
              bookingFee: clientPrice,
            });
            router.push(pathname + "?step=2");
            setRequestStage(2);
            setPageLoading(true);

            setTimeout(() => {
              document
                .getElementById("payment-section")
                ?.scrollIntoView({ behavior: "smooth" });
              setPageLoading(false);
            }, 1000);
          }}
          setClientRequest={setClientRequest}
          clientRequest={clientRequest}
          requestStage={requestStage}
        />

        {/* PAYMENT PLANS SECTION */}
        <section
          id="payment-section"
          className={`${
            requestStage !== 2 && "hidden"
          } mt-20 max-sm:mt-10 flex flex-col bg-white max-sm:px-8`}
        >
          <Link
            onClick={() => setRequestStage(1)}
            href="/?step=1"
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
            onClick={() => {
              setRequestStage(1);
            }}
            href="/?step=1"
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
            onClick={() => {
              setRequestStage(2);
            }}
            href="/?step=2"
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
              <p className="text-xs text-gray-700 text-end">
                {clientRequest.serviceType}
              </p>
            </span>

            {(clientRequest.serviceType === "Nanny Services" ||
              clientRequest.serviceType === "Nanny + Help Services") && (
              <>
                <span className="flex items-center justify-between mt-2 gap-3">
                  <p className="font-semibold text-black text-sm">
                    Kids Details:
                  </p>
                  <p className="text-xs text-gray-700 text-end">
                    {clientRequest.numberOfKids} kid
                    {clientRequest.numberOfKids > 1 && "s"} of age(s):{" "}
                    {clientRequest.agesOfKids}
                  </p>
                </span>
              </>
            )}

            {(clientRequest.serviceType === "Housekeeper Services" ||
              clientRequest.serviceType === "General Help Services" ||
              clientRequest.serviceType === "Driving Services" ||
              clientRequest.serviceType === "Home Cook Services" ||
              clientRequest.serviceType === "Nanny + Help Services") && (
              <>
                <span className="flex items-center justify-between mt-2 gap-3">
                  <p className="font-semibold text-black text-sm">
                    Home Details:
                  </p>
                  <p className="text-xs text-gray-700 text-end">
                    {clientRequest.serviceType === "Home Cook Services"
                      ? `${clientRequest.numberOfDiners} people to be cooked for`
                      : clientRequest.serviceType === "Driving Services"
                        ? `${clientRequest.numberOfPassengers} individuals to be driven`
                        : `${clientRequest.typeOfHouse} home with ${clientRequest.numberOfRooms}`}
                  </p>
                </span>
                <span className="flex items-center justify-between mt-2 gap-3">
                  <p className="font-semibold text-black text-sm">
                    Additional Home Info:
                  </p>
                  <p className="text-xs text-gray-700">
                    {clientRequest.extraHomeInformation || "nil"}
                  </p>
                </span>
              </>
            )}

            <span className="flex items-center justify-between mt-2 gap-3">
              <p className="font-semibold text-black text-sm">Staff Details:</p>
              <p className="text-xs text-gray-700 text-end">
                Ages{" "}
                {`${clientRequest.employeeAgeRange}, ${
                  clientRequest.employeeGender === ""
                    ? "Any Gender"
                    : clientRequest.employeeGender
                }, ${clientRequest.employeeTribePreference},
              ${clientRequest.employeeReligionPreference}`}
              </p>
            </span>

            <span className="flex items-center justify-between mt-2 gap-3">
              <p className="font-semibold text-black text-sm">Work Mode:</p>
              <p className="text-xs text-gray-700 text-end">
                {clientRequest.workMode} option
              </p>
            </span>

            {clientRequest.workMode === "Live-out" && (
              <>
                <span className="flex items-center justify-between mt-2 gap-3">
                  <p className="font-semibold text-black text-sm">
                    Working Days:
                  </p>
                  <p className="text-xs text-gray-700 text-end">
                    {clientRequest.workingDays.length} day
                    {clientRequest.workingDays.length > 1 && "s"} a week (
                    {clientRequest.workingDays.join(", ")})
                  </p>
                </span>
                <span className="flex items-center justify-between mt-2 gap-3">
                  <p className="font-semibold text-black text-sm">
                    Working Hours:
                  </p>
                  <p className="text-xs text-gray-700 text-end">
                    {clientRequest.workingHours[1]},{" "}
                    {clientRequest.workingHours[0]}
                  </p>
                </span>
              </>
            )}

            <span className="flex items-center justify-between mt-2 gap-3">
              <p className="font-semibold text-black text-sm">
                Additional Staff Details:
              </p>
              <p className="text-xs text-gray-700 text-end">
                {clientRequest.extraComment || "nil"}
              </p>
            </span>

            {clientRequest.serviceType === "Elder Caregiving Services" && (
              <span className="flex items-center justify-between mt-2 gap-3">
                <p className="font-semibold text-black text-sm">
                  Elder Information:
                </p>
                <p className="text-xs text-gray-700 text-end">
                  {clientRequest.elderGender},&nbsp;
                  {clientRequest.elderAgeRange} years, &nbsp;
                  {clientRequest.elderHealthConditions || "No Health Condition"}
                </p>
              </span>
            )}

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
                {clientRequest.paymentPlan}
              </p>
            </span>
            <span className="flex items-center justify-between mt-2 gap-3">
              <p className="font-bold text-black text-sm">Service Fee:</p>
              <p className="font-bold text-sm text-red-700 text-end">
                ₦
                {clientRequest.paymentPlan === "monthly"
                  ? clientRequest.bookingFee.toLocaleString()
                  : ONE_OFF_FEE.toLocaleString()}{" "}
                {clientRequest.paymentPlan === "monthly" && "/month"}
              </p>
            </span>
            {clientRequest.paymentPlan === "monthly" && (
              <span className="flex items-center justify-between mt-2 gap-3">
                <p className="font-bold text-black text-sm flex">
                  Booking Fee:
                </p>
                <p className="font-bold text-sm text-red-700 text-end">
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
              value={clientRequest.clientName}
              onChange={(e) =>
                setClientRequest({
                  ...clientRequest,
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
              value={clientRequest.clientPhoneNumber}
              onChange={(e) =>
                setClientRequest({
                  ...clientRequest,
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
              value={clientRequest.clientEmail}
              onChange={(e) =>
                setClientRequest({
                  ...clientRequest,
                  clientEmail: e.target.value.trim(),
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
              value={clientRequest.clientAddress}
              onChange={(e) =>
                setClientRequest({
                  ...clientRequest,
                  clientAddress: e.target.value,
                })
              }
            />
            <p className="text-sm text-gray-600 mt-2">
              Kindly review the contact details provided before making payment
            </p>

            <PaystackButton
              disabled={
                clientRequest.clientEmail === "" ||
                clientRequest.clientPhoneNumber === "" ||
                (clientRequest.paymentPlan === "monthly" &&
                  clientRequest.bookingFee === 0)
              }
              className="paystack-button"
              {...componentProps}
            />
          </div>

          <Link
            onClick={() => setRequestStage(2)}
            href="/?step=2"
            className="text-start text-blue-950 mt-3 items-center"
          >
            &larr; Back To Payment Plans
          </Link>
        </section>

        {/* CLIENT REVIEWS SECTION STARTS */}
        <div
          id="client-review-section"
          className="z-50 relative  w-full mt-10 flex flex-col bg-gradient-to-b from-blue-950 to-[#0D98BA] max-sm:to-blue-950/90"
        >
          <h1 className="absolute z-50 top-72 max-sm:top-[10%] font-extralight text-3xl max-sm:text-2xl mt-5 mb-20 self-center text-white">
            WHAT OUR FAMILIES SAY
          </h1>
          <div className="relative ">
            <div className="absolute z-50 bg-white max-sm:bg-transparent w-full h-72 rounded-br-[400px] max-sm:"></div>
            <Image
              src="/images/reviews-bg2.jpg"
              alt="reviews background"
              width="0"
              height="0"
              sizes="100vw"
              className="-z-[100] max-sm:blur-[1px] w-full h-auto max-sm:h-[550px] opacity-30"
              priority
            />
          </div>

          <div className="absolute top-2/3 max-sm:top-[30%] w-3/4 max-sm:w-[84%] self-center flex justify-center items-top">
            <SliderTyped
              {...settings}
              className="w-full mr-[-100px] max-sm:mr-0"
            >
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

          <Link
            className="hidden text-sm border-yellow-400 border font-bold max-sm:flex max-sm:absolute max-sm:top-[85%] self-center hover:cursor-pointer text-white  bg-blue-950 px-5 py-3 rounded-lg"
            href="/#services-section"
            onClick={() => {
              setRequestStage(0);
              resetCustomerRequest();
            }}
          >
            Get a Domestic Staff In 1 Minute
          </Link>
        </div>

        {/* FAQs SECTION STARTS */}
        <section className="flex-col justify-center mx-10 max-sm:mx-5">
          <h1 className="font-extralight text-black dark:text-gray-900 text-center text-3xl mt-20 mb-20 max-sm:mb-10 self-center">
            FREQUENTLY ASKED QUESTIONS
          </h1>

          <div className="max-sm:flex max-sm:flex-col grid-cols-3 grid-flow-row grid place-items-center">
            {faqs.map((faq) => (
              <FAQBox
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </section>

        {/* PREMIUM SERVICES SECTION */}
        <section className="my-10 mx-5 flex flex-col items-center justify-center ">
          <Image
            onClick={() => {
              router.push("/executive");
            }}
            src="/images/executive-bg.png"
            alt="premium services background"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto border-8 border-luxury-gold rounded-lg max-sm:rounded-none"
            priority
          />
        </section>

        {/* CUSTOM REQUEST SECTION */}
        <section className="py-8 hidden max-sm:px-10 w-full">
          <h1 className="font-extralight text-3xl text-center text-black dark:text-gray-700">
            CUSTOM REQUEST
          </h1>
          <p className="text-sm text-gray-600 text-start w-1/2 max-sm:w-full ml-auto mr-auto mt-3">
            Need something specific? Submit your custom requirements and our
            team will reach out to you promptly.
          </p>

          <div className="shadow-md w-1/2 ml-auto mr-auto shadow-stone-300 max-sm:w-full p-4 mt-5">
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel id="demo2-simple-select-label">
                Service Type
              </InputLabel>
              <Select
                displayEmpty
                labelId="demo2-simple-select-label"
                id="demo-simple-select"
                value={customRequest.serviceName}
                label="Service Type"
                required
                onChange={(event: SelectChangeEvent) => {
                  setCustomRequest({
                    ...customRequest,
                    serviceName: event.target.value,
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
                <MenuItem value="Industrial Home/Office Cleaning">
                  Other
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Address (Where Service will be rendered)"
              value={customRequest.serviceLocation}
              onChange={(e) =>
                setCustomRequest({
                  ...customRequest,
                  serviceLocation: e.target.value,
                })
              }
              fullWidth
              sx={{ mt: 2 }}
              id="filled-multiline-static"
              placeholder="Address (Where Service will be rendered)"
            />

            <TextField
              label="Additional Comment/Description"
              value={customRequest.serviceDescription}
              onChange={(e) =>
                setCustomRequest({
                  ...customRequest,
                  serviceDescription: e.target.value,
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
              value={customRequest.name}
              onChange={(e) =>
                setCustomRequest({
                  ...customRequest,
                  name: e.target.value,
                })
              }
              fullWidth
              sx={{ mt: 2 }}
              id="filled-multiline-static"
              placeholder="Address (Where Service will be rendered)"
            />

            <TextField
              label="Email"
              value={customRequest.emailAddress}
              onChange={(e) =>
                setCustomRequest({
                  ...customRequest,
                  emailAddress: e.target.value,
                })
              }
              fullWidth
              sx={{ mt: 2 }}
              id="filled-multiline-static"
              placeholder="Email"
            />

            <TextField
              label="WhatsApp Number"
              value={customRequest.whatsappNumber}
              onChange={(e) =>
                setCustomRequest({
                  ...customRequest,
                  whatsappNumber: e.target.value,
                })
              }
              fullWidth
              sx={{ mt: 2 }}
              id="filled-multiline-static"
              placeholder="Address (Where Service will be rendered)"
            />

            <Button
              onClick={async () => {
                // update excel sheet
                setLoading(true);
                try {
                  await updateValues([
                    [
                      new Date(Date.now()).toLocaleString(),
                      customRequest.serviceName,
                      customRequest.serviceLocation,
                      customRequest.serviceDescription,
                      customRequest.name,
                      customRequest.emailAddress,
                      customRequest.whatsappNumber,
                    ],
                  ]);

                  alert(
                    "Your request has been successfully dispatched and our team will reach out to you via WhatsApp shortly.",
                  );
                  setCustomRequest(defaultCustomRequest);
                } catch (e) {
                  alert(
                    "An error occurred, please check your internet connection and retry",
                  );
                } finally {
                  setLoading(false);
                }
              }}
              disabled={
                customRequest.emailAddress === "" ||
                customRequest.serviceLocation === "" ||
                customRequest.serviceName === "" ||
                loading
              }
              buttonName={loading ? "Submitting..." : "Submit"}
            />
          </div>
        </section>

        {/* FOOTER SECTION STARTS */}
        <Footer />
      </div>
    </main>
  );
}
