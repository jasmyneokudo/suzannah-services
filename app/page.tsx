"use client";
import Image from "next/image";
import ServiceCard from "./components/ServiceCard";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewCard from "./components/ReviewCard";
import FAQBox from "./components/FAQBox";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconCheck,
  IconHomeQuestion,
  IconMoodCheck,
  IconProgressCheck,
  IconUserQuestion,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormHelperText, TextField } from "@mui/material";
import Button from "./components/Button";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";
import AlertDialogSlide from "./components/Dialog";
import { CustomerRequest, ServiceType } from "@/types/ClientRequest";

const SliderTyped = Slider as unknown as React.ComponentClass<Settings>;

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

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

  type Kid = {
    name: string;
    age: number;
  };

  const [requestStage, setRequestStage] = useState<0 | 1 | 2 | 3>(3);

  const [isCustomerServicePolicyOpen, setIsCustomerServicePolicyOpen] =
    useState(false);

  const [customerRequest, setCustomerRequest] = useState<CustomerRequest>({
    serviceType: "Live-in Nanny Services",
    employeeGender: "",
    employeeAgeRange: "",
    employeeTribePreference: "",
    employeeReligionPreference: "",
    extraComment: "",
    clientName: "",
    clientPhoneNumber: "",
    clientEmail: "",
    clientAddress: "",
    numberOfKids: 0,
    agesOfKids: [],
    numberOfRooms: "",
    typeOfHouse: "",
    numberOfBathrooms: 0,
    mustBeAbleToCook: false,
    mustBeAbleToIron: false,
    mustBeAbleToTeachKids: false,
    otherMustBes: "",
  });

  function selectService(serviceType: ServiceType) {
    setCustomerRequest({ ...customerRequest, serviceType: serviceType });
    setRequestStage(1);

    const section = document.getElementById("services-section");
    section?.scrollIntoView({ behavior: "smooth" });
  }

  function closeCustomerServicePolicy(e: React.MouseEvent<HTMLElement>) {
    console.log(
      "Closing customer service policy dialog",
      e.currentTarget.TEXT_NODE.toString()
    );
    const target = e.target as HTMLElement;
    if (target.textContent === "Proceed") {
      setIsCustomerServicePolicyOpen(false);
      setRequestStage(3);
      setTimeout(() => {
        document
          .getElementById("payment-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }

  type PaymentPlan = "monthly" | "one-off";

  function selectPlan(paymentPlan: PaymentPlan): void {
    if (paymentPlan === "monthly") {
      setIsCustomerServicePolicyOpen(true);
    }
  }

  return (
    <main className="flex bg-white min-h-screen w-full flex-col items-center justify-between overflow-clip">
      <AlertDialogSlide
        open={isCustomerServicePolicyOpen}
        onClose={(e: React.MouseEvent<HTMLElement>) => closeCustomerServicePolicy(e)}
      />
      <div className="z-10 relative w-full items-center justify-between bg-gradient-to-b  from-blue-950 to-[#0D98BA] max-sm:to-blue-950/90  h-3/4 max-sm:h-[400px] rounded-br-[400px] max-sm:rounded-none text-sm lg:flex">
        {/* for our menu items #0D98BA */}
        <div className="flex max-sm:hidden absolute top-3 left-0 right-0 mr-auto ml-auto w-[600px]">
          <a
            href="https://google.com"
            className="z-10 px-5 py-4 transition-colors text-white opacity-70 hover:opacity-100 duration-500 hover:scale-125"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="m-0 max-w-[30ch]">Home</p>
          </a>
          <a
            href="https://"
            className="z-10 px-5 py-4 transition-colors text-white opacity-70 hover:opacity-100 duration-500 hover:scale-125"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="m-0 max-w-[30ch]">Our Services</p>
          </a>
          <a
            href="https://"
            className="z-10 px-5 py-4 transition-colors text-white opacity-70 hover:opacity-100 duration-500 hover:scale-125"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="m-0 max-w-[30ch]">Reviews</p>
          </a>

          <a
            href="https://"
            className="z-10 px-5 py-4 transition-colors text-white opacity-70 hover:opacity-100 duration-500 hover:scale-125"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="m-0 max-w-[30ch]">FAQs</p>
          </a>
          <a
            href="https://"
            className="z-10 px-5 py-4 transition-colors text-white opacity-70 hover:opacity-100 duration-500 hover:scale-125"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="m-0 max-w-[30ch]">Contact Us</p>
          </a>
        </div>
        <Image
          src="/images/suzannah-large.png"
          alt="Logo"
          width="80"
          height="30"
          className="absolute top-2 left-2 z-20"
          priority
        />
        <Image
          src="/images/background-image.jpg"
          alt="Background"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full max-sm:blur-[1px] h-auto max-sm:h-[400px] opacity-15 rounded-br-[400px] max-sm:rounded-none"
          priority
        />

        <h1 className="absolute text-white top-[50%] max-sm:top-[29%] w-1/2 max-sm:w-[55%] text-center left-1/2 -translate-x-1/2 z-10 font-extralight text-4xl max-sm:text-2xl">
          Trusted, Professional Home And Care Service Provider In The F.C.T
        </h1>

        <Link
          className="hidden font-bold max-sm:flex max-sm:absolute max-sm:top-[75%] left-1/2 -translate-x-1/2 hover:cursor-pointer text-white  bg-blue-950 px-5 py-3 rounded-sm"
          href="#services-section"
          onClick={() => requestStage !== 0 && setRequestStage(0)}
        >
          Book A Service Now
        </Link>
      </div>

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

      <section
        className={`${
          requestStage !== 1 && "hidden"
        } mt-20 max-sm:mt-10 flex flex-col bg-white max-sm:px-8`}
      >
        <Link
          onClick={() => setRequestStage(0)}
          href="#"
          className="text-start text-blue-950"
        >
          &larr; Back
        </Link>
        <h1 className="font-extralight text-center text-3xl mt-2 text-black dark:text-gray-800">
          CUSTOMIZE YOUR SERVICE
        </h1>
        <p className="text-gray-600 mt-5 text-base">
          Step 1 of 2: Tell us about your preferences and home details
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
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={customerRequest.employeeGender}
              label="Age Range"
              onChange={(event: SelectChangeEvent) => {
                setCustomerRequest({
                  ...customerRequest,
                  employeeGender: event.target.value,
                });
              }}
            >
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="No Preference">
                No Preference (Any is fine)
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
              label="Age Range"
              onChange={(event: SelectChangeEvent) => {
                setCustomerRequest({
                  ...customerRequest,
                  employeeReligionPreference: event.target.value,
                });
              }}
            >
              <MenuItem value="Christian">Christian</MenuItem>
              <MenuItem value="Islam">Islam</MenuItem>
              <MenuItem value="No Preference">
                No Preference (Any is fine)
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
              value={customerRequest.employeeTribePreference}
              aria-placeholder="Age Range"
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
              <MenuItem value="none">No Preference</MenuItem>
            </Select>
          </FormControl>

          <TextField
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
          {(customerRequest.serviceType !== "Live-in Housekeeper Services" &&
          customerRequest.serviceType !== "Live-in Help Services" as ServiceType)  && (
            <>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Number of Kids to be cared for
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={customerRequest.employeeAgeRange}
                  onChange={(event: SelectChangeEvent) => {
                    setCustomerRequest({
                      ...customerRequest,
                      employeeAgeRange: event.target.value,
                    });
                  }}
                >
                  <MenuItem value={10}>1</MenuItem>
                  <MenuItem value={20}>2</MenuItem>
                  <MenuItem value={20}>3</MenuItem>
                  <MenuItem value={20}>4</MenuItem>
                  <MenuItem value={20}>5</MenuItem>
                  <MenuItem value={20}>6</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  value={customerRequest.agesOfKids}
                  onChange={(e) =>
                    setCustomerRequest({
                      ...customerRequest,
                      agesOfKids: e.target.value
                        .split(",")
                        .map((age) => parseInt(age.trim(), 10)) as [], // Convert to numbers
                    })
                  }
                  placeholder="Ages of Kids"
                  sx={{ mt: 2 }}
                />
                <FormHelperText>
                  Separate with commas, e.g 1,2,3,5
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
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={customerRequest.numberOfRooms}
                  onChange={(event: SelectChangeEvent) => {
                    console.log("event.target.value", event.target.value);

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
        </div>

        <div className="h-[0.9px] bg-gray-300 mt-3"></div>

        <p className="text-sm text-gray-600">
          Kindly review the information your provided before clicking `Continue`
        </p>

        <Button
          onClick={() => {
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
      </section>

      <section
        id="payment-section"
        className={`${
          requestStage !== 2 && "hidden"
        } mt-20 max-sm:mt-10 flex flex-col bg-white max-sm:px-8`}
      >
        <Link
          onClick={() => setRequestStage(1)}
          href="#"
          className="text-start text-blue-950"
        >
          &larr; Back
        </Link>
        <h1 className="font-extralight text-center text-3xl mt-2 text-black dark:text-gray-800">
          CHOOSE YOUR PLAN
        </h1>
        <p className="text-gray-600 mt-5 text-base">
          Step 3 of 3: Choose your payment plan
        </p>

        <div className="border border-gray-300 rounded-lg p-4 mt-5 text-black dark:text-gray-900">
          <h1 className="font-semibold text-xl">Monthly Management Plan</h1>
          <p className="text-xs text-gray-600 mt-1">
            Ideal for clients who want convenience and full staff management.
          </p>
          <h3 className="text-xl mt-3 font-medium flex items-center gap-1">
            <IconProgressCheck color="#172554" stroke={2} size={20} />
            How It works
          </h3>
          <ol className="text-sm list-inside mt-2 text-black dark:text-gray-900">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 text-bold text-blue-950">1.</span>
              Within 24 hours of booking this payment plan, we send 1-3
              available staff profiles for selection.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 text-bold text-black dark:text-gray-900">
                2.
              </span>
              Once selected, the staff resumes work promptly.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 text-bold text-black dark:text-gray-900">
                3.
              </span>
              We manage the staff’s performance.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 text-bold text-black dark:text-gray-900">
                4.
              </span>
              Client pays a monthly service fee to the company and need not pay
              staff directly.
            </li>
          </ol>

          <h3 className="text-xl mt-3 font-medium flex items-center gap-1 text-black dark:text-gray-900">
            <IconMoodCheck color="#172554" stroke={2} size={20} />
            Benefits
          </h3>
          <ol className="mt-1 text-sm list-none text-black dark:text-gray-900">
            <li className="flex">
              <IconCheck
                color="green"
                stroke={2}
                size={20}
                className="mr-2 shrink-0"
              />{" "}
              We manage the staff’s performance and payroll.
            </li>
            <li className="flex">
              <IconCheck
                color="green"
                stroke={2}
                size={20}
                className="mr-2 shrink-0"
              />{" "}
              Guaranteed replacement policy throughout your subscription..
            </li>
          </ol>

          <span className="flex mt-4 items-baseline">
            <h1 className="text-2xl font-bold text-blue-950">₦80,000</h1>
            <span className="text-black dark:text-gray-900">/month</span>
          </span>

          <Button
            onClick={() => selectPlan("monthly")}
            style={{ width: "100%" }}
            buttonName="Select Plan"
          />
        </div>

        <div className="border border-gray-300 rounded-lg p-4 mt-5">
          <h1 className="font-semibold text-xl text-black dark:text-gray-900">
            One-off Placement Plan
          </h1>

          <p className="text-xs text-gray-600 mt-1">
            Perfect for clients who prefer to employ and manage staff directly.
          </p>

          <h3 className="text-xl mt-3 font-medium flex items-center gap-1 text-black dark:text-gray-900">
            <IconProgressCheck color="#172554" stroke={2} size={20} />
            How It works
          </h3>
          <ol className="text-sm list-inside mt-2 text-black dark:text-gray-900">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 text-bold text-blue-950">1.</span>
              Client makes a one-time payment for recruitment & screening.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 text-bold text-black dark:text-gray-900">
                2.
              </span>
              We conduct interviews and shortlist 2 competent candidates within
              48 hours and send their profiles to client.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 text-bold text-black dark:text-gray-900">
                3.
              </span>
              We bring the candidates over to client&apos;s selected location
              for physical interview
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 text-bold text-black dark:text-gray-900">
                4.
              </span>
              Client discusses and agrees on salary directly with their chosen
              candidate (starting from ₦60,000 monthly).
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 text-bold text-black dark:text-gray-900">
                5.
              </span>
              We run medical tests before the staff resumes.
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 text-bold text-black dark:text-gray-900">
                6.
              </span>
              Replacement is only valid for one month after initial placemment
            </li>
          </ol>

          <h3 className="text-xl mt-3 font-medium flex items-center gap-1 text-black dark:text-gray-900">
            <IconMoodCheck color="#172554" stroke={2} size={20} />
            Benefits
          </h3>
          <ul className="mt-1 text-sm list-none text-black dark:text-gray-900">
            <li className="flex">
              <IconCheck
                color="green"
                stroke={2}
                size={20}
                className="mr-2 shrink-0"
              />{" "}
              Opportunity to interview up to 2 candidates and select your
              preferred candidate.
            </li>
            <li className="flex">
              <IconCheck
                color="green"
                stroke={2}
                size={20}
                className="mr-2 shrink-0"
              />
              Free Medical Test for selected candidate
            </li>
            <li className="flex">
              <IconCheck
                color="green"
                stroke={2}
                size={20}
                className="mr-2 shrink-0"
              />
              Manage your own staff directly without external inteference and
              any monthly service fee
            </li>
          </ul>
          <span className="flex mt-4 items-baseline">
            <h1 className="text-2xl font-bold text-blue-950">₦120,000</h1>
          </span>
          <Button
            onClick={() => selectPlan("one-off" as PaymentPlan)}
            style={{ width: "100%" }}
            buttonName="Select Plan"
          />
        </div>
      </section>

      <section
        id="final-section"
        className={`${
          requestStage !== 3 && "hidden"
        } mt-20 max-sm:mt-10 flex flex-col bg-white max-sm:px-8`}
      >
        <Link
          onClick={() => setRequestStage(2)}
          href="#"
          className="text-start text-blue-950"
        >
          &larr; Back
        </Link>
        <h1 className="font-extralight text-center text-3xl mt-2 text-black dark:text-gray-800">
          COMPLETE YOUR REQUEST
        </h1>
        <p className="text-gray-600 mt-5 text-base">
          Step 4 of 4: Fill in your contact details
        </p>

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
            label="Phone Number"
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
        </div>
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
            className="-z-[100] max-sm:blur-[1px] w-full h-auto max-sm:h-[400px] opacity-30"
            priority
          />
        </div>

        <div className="absolute top-2/3 max-sm:top-[45%] max-sm:left-5 w-3/4 max-sm:w-full right-0 flex justify-center items-top">
          <SliderTyped {...settings} className="w-full mr-[-100px] max-sm:mr-0">
            <ReviewCard
              name="Mrs. A | Guzape"
              review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              beatae repellendus, quaerat, voluptas obcaecati sint minima et
              excepturi, aut quas voluptatem odit amet temporibus similique quam"
            />

            <ReviewCard
              name="Mrs. A | Wuse 2"
              review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              beatae repellendus, quaerat, voluptas obcaecati sint minima et
              excepturi, aut quas voluptatem odit amet temporibus similique quam"
            />

            <ReviewCard
              name="Mrs. A | Dawaki"
              review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              beatae repellendus, quaerat, voluptas obcaecati sint minima et
              excepturi, aut quas voluptatem odit amet temporibus similique quam"
            />
            <ReviewCard
              name="Mrs. A | Asokoro"
              review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              beatae repellendus, quaerat, voluptas obcaecati sint minima et
              excepturi, aut quas voluptatem odit amet temporibus similique quam"
            />
            <ReviewCard
              name="Mr. B | Katampe Extension"
              review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              beatae repellendus, quaerat, voluptas obcaecati sint minima et
              excepturi, aut quas voluptatem odit amet temporibus similique quam"
            />
            <ReviewCard
              name="Mr. P | Area 1"
              review="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              beatae repellendus, quaerat, voluptas obcaecati sint minima et
              excepturi, aut quas voluptatem odit amet temporibus similique quam"
            />
          </SliderTyped>
        </div>
      </div>

      {/* FAQs SECTION STARTS */}
      <section className="flex flex-col justify-center mx-10 h-[400px]">
        <h1 className="max-sm:hidden font-extralight text-3xl mt-20 mb-20 self-center">
          FREQUENTLY ASKED QUESTIONS
        </h1>

        <div className="max-sm:hidden  grid-cols-3 grid-flow-row grid place-items-center">
          {faqs.map((faq) => (
            <FAQBox key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* FOOTER SECTION STARTS */}
      <footer className="p-5 h-full py-52 bg-gradient-to-b relative from-blue-950 to-[#0D98BA] w-full flex flex-col justify-center items-center ">
        <Image
          src="/images/suzannah-large.png"
          alt="Vercel Logo"
          width="80"
          height="30"
          className="absolute top-5 left-5"
          priority
        />

        <div className="flex-col justify-center grid-cols-3 w-1/2 text-white grid-flow-row grid place-items-center">
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
            <a href="#">
              <p className="font-thin">Facebook</p>
            </a>
            <a href="#">
              <p className="font-thin">Instagram</p>
            </a>
            <a href="#">
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
          // sizes="100vw"
          className="absolute left-0 bottom-0 opacity-30"
          priority
        />

        <Image
          src="/images/Thank-you-1.png"
          alt="Vercel Logo"
          width="300"
          height="300"
          // sizes="100vw"
          className="absolute bottom-0 right-0 opacity-30"
          priority
        />

        <div className="flex flex-col items-center absolute bottom-14 text-white">
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

        <div className="flex absolute bottom-16 right-16 justify-between w-1/6 px-10">
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

      {/* <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div> */}
      {/* 
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </main>
  );
}
