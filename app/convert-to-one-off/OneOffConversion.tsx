"use client";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";


const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }, // This ensures the component is only loaded on the client-side
);

const CONVERSION_FEE = 242000;
const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

export default function OneOffConversion() {
  const [staffCount, setStaffCount] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [email, setEmail] = useState("")
  const router = useRouter();

  const totalAmount = staffCount * CONVERSION_FEE;

  const componentProps = {
    email,
    amount: totalAmount * 100, // Paystack expects amount in kobo
    metadata: {
      custom_fields: [
        {
          display_name: email,
          variable_name: "customer_id",
          value: "CUST123",
        },
      ],
    },
    publicKey,
    text: `Pay Now (₦${totalAmount.toLocaleString()})`,
    onSuccess: async () => {
      alert("You have successfully converted from our monthly payment plan to our one off payment plan, please expect further details from a team member via Whatsapp. Thank you for Choosing Suzannah Home & Care Services!")

      router.push("/");
    },
    onClose: () => alert("Are you sure?"),
  };

  const increaseStaff = () => {
    setStaffCount((prev) => prev + 1);
  };

  const decreaseStaff = () => {
    setStaffCount((prev) => Math.max(1, prev - 1));
  };

  // const handlePayment = () => {
  //   if (!acceptedTerms) {
  //     alert("Please read and accept the Terms & Conditions before proceeding.");
  //     return;
  //   }

  //   // Paystack integration goes here
  //   console.log({
  //     staffCount,
  //     totalAmount,
  //   });
  // };
  return (
    <div className="h-full w-full bg-white">
      <section className="z-10 relative w-full items-center justify-between bg-gradient-to-b  from-blue-950 to-[#0D98BA] max-sm:to-blue-950/90 h-[30%]  max-sm:h-[330px] rounded-br-[400px] max-sm:rounded-none text-sm lg:flex">
        {/* for our menu items #0D98BA */}

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
          src="/images/reviews-bg1.jpg"
          alt="Background"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto max-sm:h-[330px] opacity-15 rounded-br-[400px] max-sm:rounded-none"
          priority
        />

        <h1 className="absolute text-white top-[50%] max-sm:top-[30%] text-center left-[40%] -translate-x-[35%] z-10 font-extralight text-4xl max-sm:text-2xl">
          Move From Monthly to One-Off Plan
        </h1>
        <div className="absolute flex  pt-3 justify-around left-1/2 transform -translate-x-1/2  text-center top-[80%] text-base max-sm:top-[53%] self-center max-sm:w-[95%]">
          <p className="mx-10 text-sm text-blue-100 font-sans mt-4 max-w-xl">
            Happy with your current domestic staff and ready to retain them long-term, while managing them directly ?
            You can convert your existing Monthly Plan placement to our One-Off
            Payment Plan.
          </p>
        </div>
        {/* <p className="absolute text-white top-[50%] max-sm:top-[25%] w-1/2 max-sm:w-[7%] text-center left-1/2 -translate-x-1/2 z-10 font-extralight text-4xl max-sm:text-lg">
        We have a dream to impact 2,000 homes across the F.C.T by providing trusted, reliable domestic services that make life easier and stress-free — and we cannot do it without you.
      </p> */}
      </section>

      {/* Important Notice */}
      <section className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="mb-2 font-semibold text-blue-900">Before You Convert</h2>

        <p className="text-sm leading-6 text-blue-800">
          The Conversion to one one-off plan is intended for clients who have worked with
          their domestic staff member(s) for at least 3 months (or 90 days) and are confident that they would like to retain
          them long-term.
        </p>

        <p className="mt-3 text-sm leading-6 text-blue-800">
          Please only proceed if you are satisfied with your current staff
          member and intend to continue the employment arrangement.
        </p>
      </section>

      {/* Pricing */}
      <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            One-Off Conversion Fee
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Because you are an existing Monthly Plan customer, you receive a
            special conversion rate instead of the full One-Off placement fee.
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-5">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Conversion fee per staff</span>

            <span className="text-xl font-bold text-gray-900">
              ₦{CONVERSION_FEE.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Staff Quantity */}
        <div className="mt-6">
          <label className="mb-3 block text-sm font-medium text-gray-700">
            How many staff members would you like to convert?
          </label>

          <div className="flex text-black w-fit items-center rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={decreaseStaff}
              disabled={staffCount === 1}
              className="px-5 py-3 text-lg hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>

            <span className="min-w-[60px] text-center font-semibold">
              {staffCount}
            </span>

            <button
              type="button"
              onClick={increaseStaff}
              className="px-5 py-3 text-lg hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">Total Amount</span>

            <span className="text-2xl font-bold text-gray-900">
              ₦{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold text-gray-900">
          Terms & Conditions
        </h2>

        <div className="space-y-5 text-sm leading-6 text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-900">
              1. Eligibility for Conversion
            </h3>

            <p>
              The One-Off Conversion Plan is available only to existing Suzannah
              Home & Care Services customers who currently have a domestic staff member
              placed through our Monthly Plan for a minimum period of 3 months (90 days).
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              2. Client&apos;s Decision to Convert
            </h3>

            <p>
              By making the conversion payment, the client confirms that they
              are satisfied with the staff member and intend to retain them on a
              long-term basis.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              3. What the Conversion Fee Covers
            </h3>

            <p>
              The conversion fee covers the administrative conversion of an
              existing Monthly Plan placement to the One-Off arrangement and the
              limited replacement protection stated below.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              4. Replacement Protection
            </h3>

            <p>
              A one-time replacement window of 14 days applies from the date the
              conversion payment is confirmed.
            </p>

            <p className="mt-2">
              If the staff member leaves within this period for reasons
              attributable to the staff member, Suzannah Home & Care Services
              may provide one replacement candidate at no additional placement
              fee.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              5. After the 14-Day Window
            </h3>

            <p>
              After the 14-day replacement period expires, the placement will be
              considered fully transferred to the client&apos;s direct employment
              arrangement.
            </p>

            <p className="mt-2">
              Any future replacement or new staffing requirement will require a
              new booking with Suzannah Home & Care Services under the
              applicable terms and fees at that time.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              6. Salary and Employment
            </h3>

            <p>
              After conversion, the client is responsible for paying the staff
              member&apos;s salary directly and managing the staff member&apos;s
              employment,the minimum staff member&apos; salary would have been communicated to client.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              7. No Refund After Conversion
            </h3>

            <p>
              Once the conversion has been processed, the conversion fee is
              non-refundable.
            </p>
          </div>

          {/* <div>
            <h3 className="font-semibold text-gray-900">
              8. Changes to Employment
            </h3>

            <p>
              The client should notify Suzannah Home & Care Services of any
              significant changes to the domestic staff member&apos; role,
              salary, working conditions or employment status.
            </p>
          </div> */}
        </div>

        {/* Terms Checkbox */}
        <div className="mt-6 border-t border-gray-100 pt-6">

        <TextField
            fullWidth
            sx={{ my: 3 }}
            id="client-email"
            type="text"
            label="Your Email Address"
            variant="outlined"
            value={email}
            onChange={(e) =>
            setEmail(e.target.value.trim())
            }
        />

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 h-4 w-4"
            />

            <span className="text-sm text-gray-700">
              I have read and understood the Terms & Conditions and confirm that
              I am satisfied with my current staff member and wish to convert to
              the One-Off Payment Plan.
            </span>
          </label>
        </div>
      </section>

      {/* Payment */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Complete Your Conversion
          </h2>

          <p className="mt-2 text-sm text-gray-500">Your total payment is:</p>

          <p className="mt-1 text-3xl font-bold text-gray-900">
            ₦{totalAmount.toLocaleString()}
          </p>
        </div>


        <PaystackButton
          disabled={!acceptedTerms || email === ""}
          className="paystack-button rounded-xl"
          {...componentProps}
        />

        {/* <button
          type="button"
          onClick={handlePayment}
          disabled={!acceptedTerms}
          className="w-full rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Proceed to Payment
        </button> */}

        <p className="mt-4 text-center text-xs text-gray-400">
          Secure payment powered by Paystack
        </p>
      </section>
    </div>
  );
}
