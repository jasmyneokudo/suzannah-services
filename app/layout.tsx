import type { Metadata } from "next";
import {
  Inter,
  Open_Sans,
  Roboto_Mono,
  Edu_SA_Beginner,
} from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

const openSans = Open_Sans({
  subsets: ["latin"],
  // display: 'swap',
  //👇 Add variable to our object
  variable: "--font-opensans",
});

//👇 Configure the object for our second font
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const eduSABeginner = Edu_SA_Beginner({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-edu-sa-beginner",
});

export const metadata: Metadata = {
  title: "Suzannah Home & Care Services",
  description:
    "Trusted, Professional Home And Care Service Provider In The F.C.T",
  keywords: [
    "nanny services in Abuja",
    "househelp in Abuja",
    "live-in nanny in Abuja",
    "live-out nanny in Abuja",
    "housekeeper services in Abuja",
    "home help services Abuja",
    "trained domestic staff in Abuja",
    "domestic staff agency in Abuja",
    "home care services Abuja",
    "reliable nanny agency in Abuja",
    "professional house cleaning in Abuja",
    "cook services in Abuja",
    "elderly caregiver in Abuja",
    "trusted home service agency Nigeria"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${robotoMono.variable} ${eduSABeginner.variable} font-inter`}
    >
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="beforeInteractive"
      />
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
