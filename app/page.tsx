"use client";
import Image from "next/image";
import ServiceCard from "./components/ServiceCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewCard from "./components/ReviewCard";
import FAQBox from "./components/FAQBox";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import Link from "next/link";

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

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between overflow-clip">
      <div className="z-10 relative w-full items-center justify-between bg-gradient-to-b  from-blue-950 to-[#0D98BA] h-3/4 max-sm:h-[400px] rounded-br-[400px] max-sm:rounded-none text-sm lg:flex">
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
          className="w-full h-auto max-sm:h-[400px] opacity-15 rounded-br-[400px] max-sm:rounded-none bg-repeat-y"
          priority
        />

        <h1 className="absolute text-white top-1/2 max-sm:top-[20%] w-1/2 text-center left-1/4 z-10 font-extralight text-4xl max-sm:text-2xl">
          Trusted Professional Home And Care Service Provider In F.C.T
        </h1>

        <Link href=".">
        
        Book A Service</Link>
      </div>

      <div className="mt-20 flex flex-col items-center">
        <h1 className="font-extralight text-3xl">HOW WE CAN SERVE YOU</h1>

        <ServiceCard
          imgUrl="/images/nanny.jpg"
          serviceDescription="Lorem ipsum dolor sit amet, ipsum inventore illo amet facere
              perferendis accusamus veritatis suscipit, in blanditiis
              necessitatibus magnam beatae aliquam non architecto debitis"
          serviceUrl="https://www.google.com"
          serviceName="Nanny Services"
        />

        <ServiceCard
          imgUrl="/images/housekeeper-1.jpg"
          serviceDescription="Lorem ipsum dolor sit amet, ipsum inventore illo amet facere
              perferendis accusamus veritatis suscipit, in blanditiis
              necessitatibus magnam beatae aliquam non architecto debitis"
          serviceUrl="https://www.google.com"
          serviceName="Housekeeping/Home Cleaning Services"
        />

        <ServiceCard
          imgUrl="/images/eldercare1.jpg"
          serviceDescription="Lorem ipsum dolor sit amet, ipsum inventore illo amet facere
              perferendis accusamus veritatis suscipit, in blanditiis
              necessitatibus magnam beatae aliquam non architecto debitis"
          serviceUrl="https://www.google.com"
          serviceName="Elderly Care Services"
        />

        <ServiceCard
          imgUrl="/images/chef.jpg"
          serviceDescription="Lorem ipsum dolor sit amet, ipsum inventore illo amet facere
              perferendis accusamus veritatis suscipit, in blanditiis
              necessitatibus magnam beatae aliquam non architecto debitis"
          serviceUrl="https://www.google.com"
          serviceName="Home Cooking Services"
        />

        <ServiceCard
          imgUrl="/images/nanny.jpg"
          serviceDescription="Lorem ipsum dolor sit amet, ipsum inventore illo amet facere
              perferendis accusamus veritatis suscipit, in blanditiis
              necessitatibus magnam beatae aliquam non architecto debitis"
          serviceUrl="https://www.google.com"
          serviceName="Other Services"
        />
      </div>

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
          <Slider {...settings} className=" w-full mr-[-100px]">
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
          </Slider>
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
            <span className="font-edu-sa">The </span>BRAND <span className="font-edu-sa">for</span>
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
