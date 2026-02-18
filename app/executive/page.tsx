"use client";

import Image from "next/image";
import { Footer } from "../components/Footer";
import { PremiumPackageSection } from "../sections/PremiumPackageSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  defaultPremiumPackageRequest,
  useAppContext,
} from "../context/AppContext";
import { LuxuryFAQSection } from "../sections/PremiumFAQs";
import { Fab } from "@mui/material";
import Link from "next/link";
import { IconBrandWhatsapp } from "@tabler/icons-react";

const words = [
  "for Discerning Homes.",
  "for the Modern Executive.",
  "for those who value Time, Discretion and Perfection.",
];

type HomeProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Home({ searchParams }: HomeProps) {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  const { premiumPackageRequest, setPremiumPackageRequest } = useAppContext();

  // Tracks scroll progress for this element ONLY
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 20%"],
  });

  // Map scroll position → upward movement
  // Gentle upward motion (Apple-style)
  const y = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  // Elegant luxury fade (slow in → slow out)
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      2500,
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPremiumPackageRequest(defaultPremiumPackageRequest);
  }, []);
  return (
    <div className="bg-white">
      <Fab
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "#000",
          color: "white",
        }}
      >
        <Link className="flex items-center" href="https://wa.link/33l45y">
          <IconBrandWhatsapp size={20} />
          &nbsp;CUSTOMER SUPPORT
        </Link>
      </Fab>
      <section className="relative  max-sm:h-[400px] w-full">
        <h1 className="font-crushed text-luxury-gold absolute text-lg font-bold z-50 top-3 left-1/2 -translate-x-1/2">
          SHC
        </h1>

        <h3 className="w-full absolute text-gray-300 z-50 font-medium top-10 left-1/2 -translate-x-1/2 uppercase text-[10px] text-center">
          Africa&apos;s First Managed Home Service Brand
        </h3>

        <div className="z-50 absolute top-1/2 -translate-y-1/2 left-1/2 font-young-serif -translate-x-1/2 w-full">
          <h1 className="text-white text-5xl max-sm:text-2xl text-center">
            Domestic Excellence
          </h1>

          <motion.div
            key={index}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2 }}
            className="text-4xl font-bold"
          >
            <h2 className="text-luxury-gold text-3xl max-sm:text-lg mx-1 text-center ">
              {words[index]}
            </h2>
          </motion.div>
        </div>

        <div className="absolute w-full h-full bg-black opacity-60 top-0 left-0 z-10"></div>

        <div className="absolute justify-center flex items-center w-full text-gray-300 top-[80%] z-50 text-xs text-center">
          <p>A brand by</p>
          <Image
            src="/images/suzannah-large-white.png"
            alt="Logo"
            width="50"
            height="30"
            priority
          />
        </div>
        <Image
          src="/images/luxuryhomeint3.jpg"
          alt="Background"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full top-0 h-auto max-sm:h-[400px]"
          priority
        />
      </section>

      <section className="p-5 gap-5 flex max-sm:flex-col">
        <div className="text-center space-y-4 p-8 rounded-lg border bg-luxury-ivory/30 border-luxury-champagne/50">
          <motion.div
            transition={{ duration: 0.3, ease: [0.52, 0.72, 0, 1] }}
            ref={ref}
            style={{ y }}
          >
            <h3 className="font-young-serif text-lg text-luxury-gold">
              Purpose
            </h3>
          </motion.div>
          <motion.div
            transition={{ duration: 0.3, ease: [0.52, 0.72, 0, 1] }}
            ref={ref}
            style={{ y }}
          >
            <p className="text-black">
              We exist to redefine how domestic service is delivered in Nigeria.
            </p>
          </motion.div>
        </div>
        <div className="text-center space-y-4 p-8 rounded-lg border bg-luxury-ivory/30 border-luxury-champagne/50">
          <motion.div
            transition={{ duration: 0.3, ease: [0.52, 0.72, 0, 1] }}
            ref={ref}
            style={{ y }}
          >
            <h3 className="font-young-serif text-lg text-luxury-gold">
              Promise
            </h3>
          </motion.div>
          <motion.div
            transition={{ duration: 0.3, ease: [0.52, 0.72, 0, 1] }}
            ref={ref}
            style={{ y }}
          >
            <p className="text-black">
              Every home deserves trained, trusted professionals who value
              discretion as much as skill.
            </p>
          </motion.div>
        </div>
        <div className="text-center space-y-4 p-8 rounded-lg border bg-luxury-ivory/30 border-luxury-champagne/50">
          <motion.div
            transition={{ duration: 0.3, ease: [0.52, 0.72, 0, 1] }}
            ref={ref}
            style={{ y }}
          >
            <h3 className="font-young-serif text-lg text-luxury-gold">Pride</h3>
          </motion.div>
          <motion.div
            transition={{ duration: 0.3, ease: [0.52, 0.72, 0, 1] }}
            ref={ref}
            style={{ y }}
          >
            <p className="text-black">
              Our clients are the families who expect the best — and we deliver
              nothing less.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4 py-8 px-6 bg-luxury-gold/10 border border-luxury-gold/30 rounded-lg">
          <p className="text-2xl md:text-3xl font-young-serif font-semibold text-black">
            Trusted by 20+ discerning households around Nigeria
          </p>
          <a href="#premium-packages-section">
            <p className="text-lg text-luxury-gold mt-4">Get Started Today</p>
          </a>
        </div>
      </section>

      <PremiumPackageSection />

      <section className="p-6 ">
        <h1 className="text-black text-3xl text-center py-4 font-extralight">
          Testimonials
        </h1>
        <div className="gap-3 grid grid-cols-3 max-sm:flex max-sm:flex-col">
          <div className="bg-luxury-ivory/40 border border-luxury-champagne/60 rounded-lg p-10 space-y-6">
            <div className="flex gap-1 text-luxury-gold">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            {/* <Rating
                    name="customized-color"
                    defaultValue={5}
                    precision={0.5}
                    sx={{color: 'hsl(45 100% 51%)'}}
                    // icon={<IconHeartFilled size="25" />}
                    // emptyIcon={<IconHeart size="25" />}
                /> */}
            <p className="text-lg text-foreground/90 italic leading-relaxed">
              &quot;The staff assigned to our home is very good. We are
              satisfied with his services. He is calm and passionate about his
              work. He provides solutions to any observed issues. We are glad to
              have him.&quot;
            </p>
            <div className="border-t border-luxury-champagne/50 pt-4">
              <p className="font-semibold text-foreground">Mrs Joy Teben</p>
              <p className="text-sm text-muted-foreground">Abuja, Nigeria</p>
            </div>
          </div>

          <div className="bg-luxury-ivory/40 border border-luxury-champagne/60 rounded-lg p-10 space-y-6">
            <div className="flex gap-1 text-luxury-gold">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            {/* <Rating
                    name="customized-color"
                    defaultValue={5}
                    precision={0.5}
                    sx={{color: 'hsl(45 100% 51%)'}}
                    // icon={<IconHeartFilled size="25" />}
                    // emptyIcon={<IconHeart size="25" />}
                /> */}
            <p className="text-lg text-foreground/90 italic leading-relaxed">
              &quot;I&apos;m highly impressed with your services. The staff
              assigned to my home is hardworking, neat, respectful and above all
              very patient.&quot;
            </p>
            <div className="border-t border-luxury-champagne/50 pt-4">
              <p className="font-semibold text-foreground">Mrs Zainab Sani</p>
              <p className="text-sm text-muted-foreground">Abuja, Nigeria</p>
            </div>
          </div>

          <div className="bg-luxury-ivory/40 border border-luxury-champagne/60 rounded-lg p-10 space-y-6">
            <div className="flex gap-1 text-luxury-gold">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-lg text-foreground/90 italic leading-relaxed">
              &quot;I&apos;m impressed and satisfied with your services, truly
              reliable! The staff assigned to our home is experienced.&quot;
            </p>
            <div className="border-t border-luxury-champagne/50 pt-4">
              <p className="font-semibold text-foreground">Mrs Irene A</p>
              <p className="text-sm text-muted-foreground">Abuja, Nigeria</p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 mb-6">
        <div className="relative max-w-3xl mx-auto text-center space-y-6 py-12 px-8 bg-gradient-to-br from-[#FFC105]/20 to-[#F1ECD6]/30 border border-[#FFC105]/40 rounded-2xl">
          <h3 className="font-young-serif text-xl md:text-4xl font-bold text-[#020617]">
            Limited Availability
          </h3>
          <p className="text-4xl z-50 md:text-6xl font-young-serif font-bold text-[#FFC105]">
            7/10 Slots Left
          </p>
          <p className="text-lg text-muted-foreground text-blue-950">
            for 2026
          </p>
          <a href="/executive/#premium-packages-section">
            <button className="mt-4 z-50 bg-[#FFC105] hover:bg-[#FFC105]/90 text-white font-semibold px-6 py-3 text-lg rounded-sm">
              Book Your Slot Now
            </button>
          </a>
        </div>
      </section>

      <LuxuryFAQSection />

      <Footer />
    </div>
  );
}
