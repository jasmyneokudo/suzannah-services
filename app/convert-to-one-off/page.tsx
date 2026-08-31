import type { Metadata } from "next";
import OneOffConversion from "./OneOffConversion";

export const metadata: Metadata = {
  title: "Convert to One-Off Plan | Suzannah Home & Care Services",
  description:
    "Convert your existing Suzannah Home & Care Services staff member from the Monthly Plan to the One-Off Plan.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <OneOffConversion />;
}