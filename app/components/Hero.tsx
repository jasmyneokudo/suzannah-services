import { IconCheck } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export const Hero = (props: any) => {
  return (
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
        className="w-full max-sm:blur-[1px] h-auto max-sm:h-[400px] opacity-15 rounded-br-[400px] max-sm:rounded-none"
        priority
      />

      <h1 className="absolute text-white top-[50%] max-sm:top-[25%] w-1/2 max-sm:w-[55%] text-center left-1/2 -translate-x-1/2 z-10 font-extralight text-4xl max-sm:text-2xl">
        Trusted, Professional Home And Care Service Provider In The F.C.T
      </h1>

      <div className="absolute font-bold flex  pt-3 justify-around left-1/2 transform -translate-x-1/2  text-center top-[80%] text-base max-sm:top-[83%] self-center max-sm:w-[95%]">
        <p className="text-white flex flex-col border-r-[0.3px] border-blue-400 pr-6">
          Registered <span className="text-xs text-gray-300">Company</span>
        </p>
        <p className="flex flex-col text-white">
          Verified
          {/* <IconCheck
              color="green"
              stroke={2}
              size={20}
              className="mr-2 shrink-0"
            /> */}
          <span className="text-xs text-gray-300">Staff</span>
        </p>
        <p className="text-white flex flex-col border-l-[0.3px] border-blue-400 pl-6">
          Secure <span className="text-xs text-gray-300">Payments</span>
        </p>
      </div>

      <Link
        className="hidden border-blue-400 border font-bold max-sm:flex max-sm:absolute max-sm:top-[69%] left-1/2 -translate-x-1/2 hover:cursor-pointer text-white  bg-blue-950 px-5 py-3 rounded-lg"
        href="/#services-section"
        onClick={() => props.bookAServiceNow()}
      >
        Book A Service Now
      </Link>
    </div>
  );
};
