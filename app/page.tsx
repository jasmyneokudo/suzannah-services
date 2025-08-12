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
  IconHomeQuestion,
  IconUserQuestion,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormHelperText, TextareaAutosize, TextField } from "@mui/material";
import Button from "./components/Button";
// import PersonIcon from '@mui/icons-material/Person';

const SliderTyped = Slider as unknown as React.ComponentClass<Settings>;

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

const services = [
  {
    serviceName: "Live-in Nanny Services",
    serviceDescription:
      "Reliable, experienced live-in nannies who provide loving care for your children and support with their daily routines in the comfort of your home.",
    whatsIncluded: [
      "Daily childcare, including feeding, bathing, and dressing.",
      "Accompanying children to outings or appointments as needed.",
      "Monitoring children’s health and safety at all times.",
      "Supervising homework and educational activities."
    ],
  },
  {
    serviceName: "Live-in Help Services",
    serviceDescription:
      "Your reliable extra pair of hands, from tidying up to managing household errands, our live-in helpers ensure your home is always at its best.",
    whatsIncluded: [
      "Daily cleaning of rooms and living spaces.",
      "Laundry, ironing, and wardrobe organization.",
      "Grocery assistance and household supply management.",
      "Assistance with small household errands."
    ],
  },
  {
    serviceName: "Live-in Nanny + Help Services",
    serviceDescription:
      "An experienced and caring Nanny-Helo who lives in your home to provide loving childcare and assist with essential household duties.",
    whatsIncluded: [
      "Assistance with meal preparation and basic cooking.",
      "General home organization and tidiness.",
      "Accompanying children to school, activities, or appointments (if required).",
      "Assistance with small household errands."
    ],
  },
  {
    serviceName: "Live-in Housekeeper Services",
    serviceDescription:
      "Full-time live-in housekeeper for a consistently clean, well-maintained, and beautifully arranged home, so you never have to worry about the details.",
    whatsIncluded: [
      "Daily cleaning and tidying of all rooms.",
      "Organization of closets, shelves, and storage areas.",
      "Bed-making and linen changes on schedule.",
      "Seasonal deep cleaning tasks (as agreed)."
    ],
  },
];

const faqs = [
  {
    id: 1,
    question: "Where is your office located?",
    answer:
      " Facilis, distinctio recusandae nostrum soluta suscipit iure endi!",
  },
  {
    id: 2,
    question: "Where is your office located?",
    answer:
      " Facilis, distinctio recusandae nostrum soluta suscipit iure endi!",
  },
  {
    id: 3,
    question: "Where is your office located?",
    answer:
      " Facilis, distinctio recusandae nostrum soluta suscipit iure endi!",
  },
  {
    id: 4,
    question: "Where is your office located?",
    answer:
      " Facilis, distinctio recusandae nostrum soluta suscipit iure endi!",
  },
  {
    id: 5,
    question: "Where is your office located?",
    answer:
      " Facilis, distinctio recusandae nostrum soluta suscipit iure endi!",
  },
  {
    id: 6,
    question: "Where is your office located?",
    answer:
      " Facilis, distinctio recusandae nostrum soluta suscipit iure endi!",
  },
  {
    id: 7,
    question: "Where is your office located?",
    answer:
      " Facilis, distinctio recusandae nostrum soluta suscipit iure endi!",
  },
  {
    id: 8,
    question: "Where is your office located?",
    answer:
      " Facilis, distinctio recusandae nostrum soluta suscipit iure endi!",
  },
  {
    id: 9,
    question: "Where is your office located?",
    answer:
      " Facilis, distinctio recusandae nostrum soluta suscipit iure endi!",
  },
];

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
  };

  type Kid = {
    name: string;
    age: number;
  };

  type ServiceType = "Live-in Nanny Services" | "Live-in Help Services" | "Live-in Nanny + Help Services" | "Live-in Housekeeper Services";

  const [requestStage, setRequestStage] = useState<0 | 1 | 2 | 3>(0);

  const [customerRequest, setCustomerRequest] = useState({
    serviceType: "",
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
    numberOfRooms: 0,
    numberOfBathrooms: 0,
    mustBeAbleToCook: false,
    mustBeAbleToIron: false,
    mustBeAbleToTeachKids: false,
    otherMustBes: "",
  });

  function selectService(serviceType: ServiceType) {
    // alert("selecting service " + serviceType);
    setCustomerRequest({...customerRequest, serviceType: serviceType})
    setRequestStage(1)

    const section = document.getElementById("services-section")
    section?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="flex bg-white min-h-screen w-full flex-col items-center justify-between overflow-clip">
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
          className="w-full max-sm:blur-sm h-auto max-sm:h-[400px] opacity-15 rounded-br-[400px] max-sm:rounded-none"
          priority
        />

        <h1 className="absolute text-white top-[50%] max-sm:top-[29%] w-1/2 max-sm:w-[55%] text-center left-1/2 -translate-x-1/2 z-10 font-extralight text-4xl max-sm:text-2xl">
          Trusted, Professional Home And Care Service Provider In The F.C.T
        </h1>

        <Link
          className="hidden font-bold max-sm:flex max-sm:absolute max-sm:top-[75%] left-1/2 -translate-x-1/2 hover:cursor-pointer text-white  bg-blue-950 px-5 py-3 rounded-sm"
          href="."
        >
          Book A Service Now
        </Link>
      </div>

      <section id="services-section"
        className={`${
          requestStage !== 0 && "hidden"
        } mt-20 max-sm:mt-10 flex flex-col items-center bg-white max-sm:px-10`}
      >
        <h1 className="font-extralight text-3xl text-black dark:text-gray-700">SERVICES</h1>

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

      <section className={`${requestStage !== 1 && 'hidden'} mt-20 max-sm:mt-10 flex flex-col bg-white max-sm:px-8`}>
        <Link onClick={() => setRequestStage(0)} href="#" className="text-start text-blue-950">
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
            <InputLabel id="demo-simple-select-label">Age Range</InputLabel>
            <Select
              displayEmpty
              labelId="demo-simple-select-label"
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
              <MenuItem value={10}>18-22</MenuItem>
              <MenuItem value={20}>22-25</MenuItem>
              <MenuItem value={30}>25-28</MenuItem>
              <MenuItem value={30}>29-32</MenuItem>
              <MenuItem value={30}>33-36</MenuItem>
              <MenuItem value={30}>37-40</MenuItem>
              <MenuItem value={30}>41-44</MenuItem>
              <MenuItem value={30}>45+</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              displayEmpty
              labelId="demo-simple-select-label"
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
              <MenuItem value={10}>Female</MenuItem>
              <MenuItem value={20}>Male</MenuItem>
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
              value={customerRequest.employeeAgeRange}
              label="Age Range"
              onChange={(event: SelectChangeEvent) => {
                setCustomerRequest({
                  ...customerRequest,
                  employeeAgeRange: event.target.value,
                });
              }}
            >
              <MenuItem value={10}>Christian</MenuItem>
              <MenuItem value={20}>Islam</MenuItem>
              <MenuItem value={20}>No Preference</MenuItem>
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
              value={customerRequest.employeeAgeRange}
              aria-placeholder="Age Range"
              onChange={(event: SelectChangeEvent) => {
                setCustomerRequest({
                  ...customerRequest,
                  employeeAgeRange: event.target.value,
                });
              }}
            >
              <MenuItem value={10}>Hausa</MenuItem>
              <MenuItem value={20}>Igbo</MenuItem>
              <MenuItem value={20}>Yoruba</MenuItem>
              <MenuItem value={20}>Fulani</MenuItem>
              <MenuItem value={20}>Edo</MenuItem>
              <MenuItem value={20}>Any tribe is fine</MenuItem>
            </Select>
          </FormControl>

          <TextField
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
            <TextField placeholder="Ages of Kids" sx={{ mt: 2 }} />
            <FormHelperText>Separate with commas, e.g 1,2,3,5</FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">
              Number of Rooms
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
              <MenuItem value={10}>1 Bedroom</MenuItem>
              <MenuItem value={20}>2 Bedroom</MenuItem>
              <MenuItem value={20}>3 Bedroom</MenuItem>
              <MenuItem value={20}>4 Bedroom</MenuItem>
              <MenuItem value={20}>5 Bedroom</MenuItem>
              <MenuItem value={20}>6 Bedroom</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Type of house</InputLabel>
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
              <MenuItem value={10}>Bungalow</MenuItem>
              <MenuItem value={20}>1 storey</MenuItem>
              <MenuItem value={20}>2 storey</MenuItem>
              <MenuItem value={20}>3 storey</MenuItem>
              <MenuItem value={20}>4 storey</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="h-[0.9px] bg-gray-300 mt-3"></div>

        <p className="text-sm text-gray-600">
          Kindly review the information your provided before clicking `Continue`
        </p>

        <Button
          style={{ width: "150px", alignSelf: "end" }}
          buttonName="Continue"
        />
      </section>

      {/* CLIENT REVIEWS SECTION STARTS */}
      <div className="z-50 relative h-3/4 w-full mt-10 flex flex-col bg-gradient-to-b  from-blue-950 to-[#0D98BA]">
        <h1 className="absolute z-50 top-72 font-extralight text-3xl mt-20 mb-20 self-center text-white">
          WHAT OUR CLIENTS ARE SAYING ABOUT US
        </h1>
        <div className="relative ">
          <div className="absolute z-50 bg-[#EFF2F2] w-full h-72 rounded-br-[400px]"></div>
          <Image
            src="/images/reviews-bg2.jpg"
            alt="Vercel Logo"
            width="0"
            height="0"
            sizes="100vw"
            className=" -z-[100] w-full h-auto opacity-30"
            priority
          />
        </div>

        <div className="absolute top-2/3 w-3/4 right-0 flex justify-center items-top">
          <SliderTyped {...settings} className=" w-full mr-[-100px]">
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
      <div className="flex flex-col justify-center mx-10">
        <h1 className="font-extralight text-3xl mt-20 mb-20 self-center">
          FREQUENTLY ASKED QUESTIONS
        </h1>

        <div className="grid-cols-3 grid-flow-row grid place-items-center">
          {faqs.map((faq) => (
            <FAQBox key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

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

        <div className=" flex-col justify-center grid-cols-3 w-1/2 text-white grid-flow-row grid place-items-center">
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
