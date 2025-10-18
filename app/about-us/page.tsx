import Link from "next/link";
import { Footer } from "../components/Footer";
import Image from "next/image";
import { IconHeart, IconShield } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div className="z-10 relative w-full items-center justify-between bg-gradient-to-b  from-blue-950 to-[#0D98BA] max-sm:to-blue-950/90 h-3/4  max-sm:h-[300px] rounded-br-[400px] max-sm:rounded-none text-sm lg:flex">
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
        <Link href="/">
          <Image
            src="/images/suzannah-large-white.png"
            alt="Logo"
            width="80"
            height="30"
            className="absolute top-2 left-2 z-20"
            priority
          />
        </Link>

        <Image
          src="/images/background-image.jpg"
          alt="Background"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full max-sm:blur-[1px] h-auto max-sm:h-[300px] opacity-15 rounded-br-[400px] max-sm:rounded-none"
          priority
        />

        <h1 className="absolute text-white top-[50%] max-sm:top-[45%] w-1/2 max-sm:w-[55%] text-center left-1/2 -translate-x-1/2 z-10 font-extralight text-4xl max-sm:text-3xl">
          About Us
        </h1>
      </div>

      <main className="py-4 px-6 flex flex-col items-center text-center ">
        <h1 className="font-bold mt-5 text-2xl text-black">Our Story</h1>
        <p className="mt-4 text-gray-600">
          Suzannah Home & Care Services was started in 2023 after seeing how difficult
          it is for busy parents/professionals to find trustworthy, reliable
          home support, and how many domestic workers struggle to find decent
          jobs. Furthermore, the current market is largely informal and
          unregulated. With technology, we’re building a trusted system that
          connects both sides, helping families hire reliable, well-trained
          staff, while creating dignified, well-paying jobs in the domestic
          service sector. <b>Our vision is that one day, every home will have
          prompt access to the trusted, excellent domestic support they need to
          thrive.</b>
        </p>

        {/* <h1 className="font-bold mt-10 text-2xl text-black">Our Values</h1>
        <p className="mt-3 text-gray-600 text-sm">
          These core principles guide our approach to care and define who we are
          as an organization
        </p>

        <div className="mt-7 gap-6 flex flex-col">
          <div className="grid grid-cols-[1fr_4fr] gap-2 rounded-md border-gray-400 border py-4 px-4">
            <div className="bg-[#0D98BA] w-12 h-12 rounded-md flex items-center justify-center">
              <IconHeart size={35} color="white" stroke={1.5} />
            </div>
            <div className="flex flex-col text-start">
              <h2 className="font-semibold text-xl text-black">Trust</h2>
              <p className=" text-gray-600 ">
                We approach every family with empathy, understanding, and a
                genuine desire to help.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_4fr] gap-2 rounded-md border-gray-400 border py-4 px-4">
            <div className="bg-[#0D98BA] w-12 h-12 rounded-md flex items-center justify-center">
              <IconShield size={35} color="white" stroke={1.5} />
            </div>
            <div className="flex flex-col text-start">
              <h2 className="font-semibold text-xl text-black">Excellence</h2>
              <p className=" text-gray-600 ">
                We approach every family with empathy, understanding, and a
                genuine desire to help.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_4fr] gap-2 rounded-md border-gray-400 border py-4 px-4">
            <div className="bg-[#0D98BA] w-12 h-12 rounded-md flex items-center justify-center">
              <IconShield size={35} color="white" stroke={1.5} />
            </div>
            <div className="flex flex-col text-start">
              <h2 className="font-semibold text-xl text-black">Family</h2>
              <p className=" text-gray-600 ">
                We approach every family with empathy, understanding, and a
                genuine desire to help.
              </p>
            </div>
          </div>
        </div> */}

        <h1 className="font-bold mt-10 text-2xl text-black">Our Admin Team</h1>
        <p className="mt-3 text-gray-600 text-sm">
          Dedicated individuals committed to delivering exceptional care and
          support to every family we serve.
        </p>

        <div className="p-4 flex max-sm:flex-col gap-10 ">
          <div className="rounded-md border-gray-400 border mt-5">
            <Image
              src="/images/admin1.1.jpeg"
              alt="Admin Team"
              width="400"
              height="400"
              className="rounded-t-md"
              priority
            />
            <div className="p-4 text-start">
              <h2 className="font-semibold text-xl text-black">
                Bright Japhet
              </h2>
              <p className="text-gray-600">Manager/Client Success</p>
              <p className="mt-2 text-gray-600">
                With a Master&apos;s degree in Public Administration and years of experience in tbe public service sector, Bright is passionate about using his skills and experience to make a positive impact in people&apos;s lives.
              </p>
            </div>
          </div>

          <div className="rounded-md border-gray-400 border mt-5">
            <Image
              src="/images/admin3.jpeg"
              alt="Admin Team"
              width="400"
              height="400"
              className="rounded-t-md"
              priority
            />
            <div className="p-4 text-start">
              <h2 className="font-semibold text-xl text-black">Chika Okudo</h2>
              <p className="text-gray-600">Logistics/Training</p>
              <p className="mt-2 text-gray-600">
                Certified Caregiver with decades of experience in home care and management.
              </p>
            </div>
          </div>

          <div className="rounded-md border-gray-400 border mt-5">
            <Image
              src="/images/admin2.jpeg"
              alt="Admin Team"
              width="400"
              height="400"
              className="rounded-t-md"
              priority
            />
            <div className="p-4 text-start">
              <h2 className="font-semibold text-xl text-black">
                Jasmyne Japhet
              </h2>
              <p className="text-gray-600">IT/Social Media</p>
              <p className="mt-2 text-gray-600">
                Software Engineer who is passionate about solving problems especially in the domestic service sector through the use of technology and media.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
