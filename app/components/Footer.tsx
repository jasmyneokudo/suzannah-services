import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="p-5 h-full py-52 bg-gradient-to-b relative from-blue-950 to-[#0D98BA] w-full flex flex-col justify-center items-center ">
      <Image
        src="/images/suzannah-large-white.png"
        alt="Vercel Logo"
        width="80"
        height="30"
        className="absolute top-5 left-5"
        priority
      />

      <div className="flex-col justify-center grid-cols-3 w-1/2 max-sm:w-full text-white grid-flow-row grid place-items-center">
        <div className="max-sm:hidden">
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

        <div className="max-sm:hidden">
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

        <div className="self-start w-full max-sm:gap-3">
          <p className="max-sm:hidden">More</p>
          <p className="font-bold">Quick Links</p>
          <Link
            className="relative z-10 font-thin max-sm:text-sm max-sm:mt-2 max-sm:text-white"
            href="/about-us"
          > About Us
          </Link>
          <a href="#services-section">
            <p className="relative z-10 font-thin max-sm:text-sm max-sm:mt-2 max-sm:text-white">
              Services
            </p>
          </a>
          {/* <a href="#">
                        <p className="font-thin max-sm:text-sm max-sm:mt-2 max-sm:text-gray-200">Mission</p>
                      </a> */}
        </div>

        <div className=" self-start w-full max-sm:gap-3 hidden">
          <p className="max-sm:hidden">More</p>
          <p className="font-bold">Legal</p>
          <a href="#">
            <p className="font-thin max-sm:text-sm max-sm:mt-2 max-sm:text-gray-200">
              Privacy Policy
            </p>
          </a>
          <a href="#">
            <p className="font-thin max-sm:text-sm max-sm:mt-2 max-sm:text-gray-200">
              Terms & Conditions
            </p>
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

      <div className="flex flex-col items-center absolute bottom-14 max-sm:bottom-9 text-white">
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
        <a href="https://www.facebook.com/share/1A1j127rsf/">
          <IconBrandFacebook fill="white" color="white" stroke={1} />
        </a>

        <a href="https://www.instagram.com/suzannahservices?igsh=eThnNzExZnd6NHpu">
          <IconBrandInstagram color="white" stroke={2} />
        </a>

        <a href="https://wa.me/message/WSKBWTOOI3UPE1">
          <IconBrandWhatsapp color="white" stroke={2} />
        </a>
      </div>
      <p className="text-xs font-light text-gray-200 absolute bottom-1">
        © {new Date().getFullYear()} Suzannah Home & Care Services
      </p>
    </footer>
  );
};
