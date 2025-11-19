"use client";

import Image from "next/image";
import { Footer } from "../components/Footer";
import { PremiumPackageSection } from "../sections/PremiumPackageSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
      2500
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-white">
      <section className="relative  max-sm:h-[400px] w-full">
        <h1 className="font-crushed text-yellow-500 absolute text-lg font-bold z-50 top-3 left-1/2 -translate-x-1/2">
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
            <h2 className="text-yellow-500 text-3xl max-sm:text-lg mx-1 text-center ">
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
            // className="absolute top-2 left-2 z-20"
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
            <h3
              style={{ color: "hsl(45 100% 51%)" }}
              className="font-young-serif text-lg"
            >
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
          <p className="text-2xl md:text-3xl font-young-serif font-semibold text-blue-950">
            Trusted by 20+ discerning households
          </p>
          <a href="#premium-packages-section">
            <p className="text-lg text-luxury-gold mt-4">Get Started Today</p>
          </a>
        </div>
      </section>

      <PremiumPackageSection />
      <section className="px-6 mb-6">
        <div className="relative max-w-3xl mx-auto text-center space-y-6 py-12 px-8 bg-gradient-to-br from-[#FFC105]/20 to-[#F1ECD6]/30 border border-[#FFC105]/40 rounded-2xl">
          <h3 className="font-young-serif text-xl md:text-4xl font-bold text-[#020617]">
            Limited Availability
          </h3>
          <p className="text-4xl z-50 md:text-6xl font-young-serif font-bold text-[#FFC105]">
            2/10 Slots Left
          </p>
          <p className="text-lg text-muted-foreground text-blue-950">for 2026</p>
          <a href="/executive/#premium-packages-section">
            <button className="mt-4 z-50 bg-[#FFC105] hover:bg-[#FFC105]/90 text-white font-semibold px-6 py-3 text-lg rounded-sm">
              Book Your Slot Now
            </button>
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
