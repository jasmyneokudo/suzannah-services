"use client";

import { Checkbox, FormControlLabel } from "@mui/material";
import {
  IconCreditCard,
  IconPackage,
  IconShoppingCartPlus,
  IconUser,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";
import { premiumServicePackages } from "@/data/premiumServicePackages";
import { useState } from "react";
import { PremiumPackageNetPercentages } from "@/types/ClientRequest";
import SelectedStaffDetails from "../components/SelectedStaffDetails";

const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false } // This ensures the component is only loaded on the client-side
);

type HomeProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Home({ searchParams }: HomeProps) {
  const type: number = Number(searchParams?.type) || 0;

  const { premiumPackageRequest, setPremiumPackageRequest } = useAppContext();
  const router = useRouter();

  const { nanny, chef, housekeeper } = premiumPackageRequest.coreStaffMembers;
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleTermsAndConditionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsAccepted(event.target.checked);
  };

  const componentProps = {
    email: premiumPackageRequest.clientInformation.email,
    amount: premiumPackageRequest.paymentPlan.totalAmount * 100, // Paystack expects amount in kobo
    metadata: {
      custom_fields: [
        {
          display_name: "Customer ID",
          variable_name: "customer_id",
          value: "CUST123",
        },
      ],
    },
    publicKey,
    text: `Pay Now (₦${premiumPackageRequest.paymentPlan.totalAmount.toLocaleString()})`,
    onSuccess: async () => {
      //   await sendRequestDetails();
      //   resetCustomerRequest();
      //   router.push(pathname);
      //   setRequestStage(0);
      alert(
        "Your request has been successfully dispatched and our team will reach out to you via WhatsApp shortly."
      );
    },
    onClose: () => alert("Are you sure?"),
  };

  return (
    <div className="bg-white h-full p-5 text-black">
      <div className="flex z-50 items-center sticky top-0 bg-white pt-5 pb-3 border-b border-[#F3E8C6]">
        <IconShoppingCartPlus
          size={25}
          className="mr-3"
          color="#1e3a8a"
          stroke={1.5}
        />
        <h1 className="font-bold text-center text-lg">Confirmation</h1>
      </div>

      <h1 className="mt-3 text-black font-bold text-lg">Booking Summary</h1>
      <p className="mt-1 text-gray-600 text-sm">
        Review your booking details before completing payment{" "}
      </p>

      <div className="mt-3 rounded-md border border-gray-300 p-4 shadow-sm">
        <div className="flex z-50 items-center sticky top-0 bg-white ">
          <IconPackage
            size={25}
            className="mr-3"
            color="#1e3a8a"
            stroke={1.5}
          />
          <h1 className="font-semibold text-center text-lg text-black">
            Your Selected Package
          </h1>
        </div>
        <p className="text-sm text-gray-500">
          {
            premiumServicePackages[premiumPackageRequest.packageType]
              .serviceName
          }
        </p>

        {/* Divider */}
        <div className="bg-gray-400 h-[0.2px] w-full my-3" />

        <SelectedStaffDetails
          staffMemberRole="Professional Nanny"
          genderPreference={nanny.genderPreference}
          accomodationPreference={nanny.accomodationPreference}
          otherPreferences={nanny.otherPreferences}
        />

        <SelectedStaffDetails
          staffMemberRole="Professional Housekeeper"
          genderPreference={housekeeper.genderPreference}
          accomodationPreference={housekeeper.accomodationPreference}
          otherPreferences={housekeeper.otherPreferences}
        />

        <SelectedStaffDetails
          staffMemberRole="Private Chef"
          genderPreference={chef.genderPreference}
          accomodationPreference={chef.accomodationPreference}
          otherPreferences={chef.otherPreferences}
        />

        {type !== 1 && (
          <>
            <h1 className="mt-5 font-semibold text-black">
              Additional Staff Members
            </h1>
            <div className="bg-gray-400 h-[0.2px] w-full my-3" />

            {premiumPackageRequest.additionalStaffMembers.map(
              (staffMember, index) => (
                <SelectedStaffDetails
                  key={index}
                  staffMemberRole={staffMember.staffMemberRole}
                  genderPreference={staffMember.genderPreference}
                  accomodationPreference={staffMember.accomodationPreference}
                  otherPreferences={staffMember.otherPreferences}
                />
              )
            )}
          </>
        )}
      </div>

      <div className="mt-3 rounded-md border border-gray-300 p-4 shadow-sm">
        <div className="flex z-50 items-center sticky top-0 bg-white ">
          <IconCreditCard
            size={25}
            className="mr-3"
            color="#1e3a8a"
            stroke={1.5}
          />
          <h1 className="font-semibold text-center text-lg">
            Your Selected Payment Plan
          </h1>
        </div>
        <p className="text-sm text-gray-500">
          {premiumPackageRequest.paymentPlan.name} - to renew every{" "}
          {premiumPackageRequest.paymentPlan.name === "monthly"
            ? "month"
            : premiumPackageRequest.paymentPlan.name === "biannual"
            ? "6 months"
            : "year"}{" "}
        </p>

        {/* Divider */}
        <div className="bg-gray-400 h-[0.2px] w-full my-3" />

        <div className="mt-2 flex justify-between text-gray-500">
          <p>Amount: </p>
          <p>
            ₦
            {(
              premiumServicePackages[type - 1].investment *
              PremiumPackageNetPercentages[
                premiumPackageRequest.paymentPlan.name
              ]
            ).toLocaleString()}
          </p>
        </div>
        <div className="mt-2 flex justify-between text-gray-500">
          <p>Duration: </p>
          <p>
            {premiumPackageRequest.paymentPlan.name === "monthly"
              ? "1 Month"
              : premiumPackageRequest.paymentPlan.name === "biannual"
              ? "6 Months"
              : "1 Year"}
          </p>
        </div>

        {/* Divider */}
        <div className="bg-gray-400 h-[0.2px] w-full my-3" />

        <div className="mt-2 flex justify-between font-bold text-black">
          <p>Total Amount:</p>
          <p>
            ₦ {premiumPackageRequest.paymentPlan.totalAmount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-md border border-gray-300 p-4 shadow-sm">
        <div className="flex z-50 items-center sticky top-0 bg-white ">
          <IconUser size={25} className="mr-3" color="#1e3a8a" stroke={1.5} />
          <h1 className="font-semibold text-center text-lg">
            Client Information
          </h1>
        </div>

        {/* Divider */}
        <div className="bg-gray-400 h-[0.2px] w-full my-3" />

        <div className="mt-2 text-gray-500">
          <p className="text-sm">Name: </p>
          <p className="font-bold text-black">
            {premiumPackageRequest.clientInformation.name}
          </p>
        </div>
        <div className="mt-2 text-gray-500">
          <p className="text-sm">Email: </p>
          <p className="font-bold text-black">
            {premiumPackageRequest.clientInformation.email}
          </p>
        </div>
        <div className="mt-2 text-gray-500">
          <p className="text-sm">Phone: </p>
          <p className="font-bold text-black">
            {premiumPackageRequest.clientInformation.phoneNumber}
          </p>
        </div>
        <div className="mt-2 text-gray-500">
          <p className="text-sm">Address: </p>
          <p className="font-bold text-black">
            {premiumPackageRequest.clientInformation.address}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-md border border-gray-300 p-4 shadow-sm">
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
              onChange={handleTermsAndConditionsChange}
              name="termsAccepted"
            />
          }
          label={
            <p>
              I agree to the{" "}
              <a
                className="text-blue-800 underline"
                href="#terms-and-conditions"
              >
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a className="text-blue-800 underline" href="#privacy-policy">
                Privacy Policy
              </a>
              . I understand that this payment is for{" "}
              {premiumPackageRequest.paymentPlan.name} and acknowledge the
              package details and payment plan outlined above.
            </p>
          }
        />

        <PaystackButton
          disabled={!termsAccepted}
          className="paystack-button"
          {...componentProps}
        />
      </div>

      <div
        id="terms-and-conditions"
        className="bg-gray-300 p-3 my-5 rounded-md bg-gradient-to-b from-white to-yellow-50 text-gray-800 md:p-16"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-16 border border-yellow-100">
          <h1 className="text-4xl font-semibold text-center mb-8 text-yellow-800">
            Terms & Conditions
          </h1>

          <article className="prose prose-lg prose-slate max-w-none">
            <p className="lead">
              At <strong>Suzannah Home &amp; Care Services</strong>, we provide
              discreet, professional and reliable managed home services for
              discerning households. Below are the terms guiding our premium
              engagements.
            </p>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                1. Service Preparation & Commencement
              </h3>
              <p className="text-gray-900 text-sm">
                Upon confirmation of payment, please allow{" "}
                <strong>10 working days</strong> for onboarding and team
                preparation. This window covers background checks, medical
                screening, orientation, and tailored briefing so each staff
                member meets your household standards.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                2. Renewal Schedule
              </h3>
              <p className="text-gray-900 text-sm">
                Service renewal occurs at{" "}
                <strong>1 month, 6 months, or 1 year</strong> depending on the
                payment plan selected. You will receive a reminder prior to
                renewal to ensure uninterrupted service.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                3. Quality Supervision & Monitoring
              </h3>
              <p className="text-gray-900 text-sm">
                A Suzannah supervisor will visit periodically to perform
                discreet performance reviews, collect feedback, and confirm
                adherence to our standards. Additional visits may be scheduled
                upon request.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                4. Staff Replacement Policy
              </h3>
              <p className="text-gray-900 text-sm">
                If a team member underperforms, submit a replacement request to
                your Account Manager. We aim to provide a suitable replacement
                within <strong>two weeks</strong>, following verification and
                transitional planning.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                5. Uniforms & Professional Presentation
              </h3>
              <p className="text-gray-900 text-sm">
                All staff are provided with elegant uniforms and receive
                training in etiquette, grooming, and service presentation to
                reflect the standards of an elite household.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                6. Client Support & Issue Resolution
              </h3>
              <p className="text-gray-900 text-sm">
                Our Client Support Team prioritizes premium client inquiries. We
                commit to acknowledging issues within <strong>24 hours</strong>{" "}
                and resolving urgent concerns promptly.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                7. Payroll & Staff Management
              </h3>
              <p className="text-gray-900 text-sm">
                All payroll, salary administration and statutory obligations
                related to team members are managed by Suzannah. Clients are not
                required to handle staff salaries directly.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                8. Live-in Staff Off-Days
              </h3>
              <p className="text-gray-900 text-sm">
                Live-in staff are entitled to off-days during the last weekend
                of each month. This schedule can be adjusted to suit household
                needs with prior notice. Temporary cover can be arranged for
                essential continuity.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                9. Confidentiality & Discretion
              </h3>
              <p className="text-gray-900 text-sm">
                All Suzannah staff are bound by strict confidentiality
                agreements. We protect client privacy and treat household
                information with absolute discretion. Any breach results in
                immediate termination and remediation.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                10. Trial Period & Performance Guarantee
              </h3>
              <p className="text-gray-900 text-sm">
                New placements include a <strong>trial period</strong> during
                which performance is monitored. If a staff member does not meet
                agreed expectations, we will provide replacements or corrective
                training as required.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                11. Liability & Insurance
              </h3>
              <p className="text-gray-900 text-sm">
                Suzannah maintains professional liability insurance for the
                services we provide. Clients should notify us immediately of any
                incident to initiate an investigation and any required insurance
                claims.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                12. Termination & Notice
              </h3>
              <p className="text-gray-900 text-sm">
                Either party may terminate the service agreement with prior
                written notice as stipulated in the service contract.
                Termination terms (notice period and any applicable fees) will
                be described in the individual engagement agreement.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                13. Governing Law
              </h3>
              <p className="text-gray-900 text-sm">
                These terms are governed by the laws of the Federal Republic of
                Nigeria. Any disputes shall be settled through negotiation or,
                if necessary, legal processes in Nigeria.
              </p>
            </section>

            <section className="mt-3">
              <h3 className="text-xl font-semibold text-yellow-700">
                Contact & Consent
              </h3>
              <p className="text-gray-900 text-sm">
                For queries or to exercise data rights, contact{" "}
                <a
                  href="mailto:suzannahhomeandcareservices@gmail.com"
                  className="text-purple-700 underline"
                >
                  suzannahhomeandcareservices@gmail.com
                </a>
                . By engaging Suzannah, you agree to these terms and consent to
                the processing of personal data necessary to deliver our
                services.
              </p>
            </section>

            <footer className="mt-8 border-t pt-6 text-sm text-gray-600">
              <p className="text-gray-900 text-sm">
                © {new Date().getFullYear()} Suzannah Home &amp; Care Services —
                All rights reserved.
              </p>
            </footer>
          </article>
        </div>
      </div>

      <div
        id="privacy-policy"
        className="min-h-screen bg-gradient-to-b from-white to-yellow-50 text-gray-800 p-3 md:p-16"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-16 border border-yellow-100">
          <h1 className="text-4xl font-semibold text-center mb-8 text-yellow-800">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-center mb-12">
            At <strong>Suzannah Home & Care Services</strong>, we deeply respect
            your privacy. This policy explains how we collect, use, and protect
            your personal information.
          </p>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-yellow-700 mb-3">
                1. Information We Collect
              </h2>
              <p>
                We may collect personal information such as your name, contact
                details, address, and family preferences when you register for
                our services. For staff and candidates, we also collect
                identification, employment history, and verification documents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-700 mb-3">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  To match you with suitable domestic service professionals.
                </li>
                <li>
                  To improve our services and tailor experiences to your
                  household needs.
                </li>
                <li>
                  To communicate with you about service updates, renewals, or
                  inquiries.
                </li>
                <li>To comply with legal and regulatory requirements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-700 mb-3">
                3. Data Protection & Security
              </h2>
              <p>
                Your personal data is securely stored and only accessed by
                authorized personnel. We use encryption and secure cloud systems
                to ensure confidentiality. We do not sell or share your data
                with third parties without consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-700 mb-3">
                4. Cookies and Analytics
              </h2>
              <p>
                Our website may use cookies and analytics tools to enhance user
                experience and monitor performance. You can manage your cookie
                preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-700 mb-3">
                5. Third-Party Services
              </h2>
              <p>
                In cases where we engage third-party vendors (e.g., background
                check or payment services), we ensure they adhere to the same
                privacy standards and data protection protocols.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-700 mb-3">
                6. Your Rights
              </h2>
              <p>
                You have the right to access, correct, or delete your personal
                information. To exercise these rights or make inquiries, please
                contact us at{" "}
                <a
                  href="mailto:suzannahhomeandcareservices@gmail.com"
                  className="text-yellow-700 font-semibold"
                >
                  suzannahhomeandcareservices@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-700 mb-3">
                7. Updates to This Policy
              </h2>
              <p>
                We may update this policy from time to time. Any changes will be
                reflected on this page with the updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-yellow-700 mb-3">
                8. Contact Us
              </h2>
              <p>
                For any questions or privacy concerns, please contact:
                <br />
                <strong>Suzannah Home & Care Services</strong>
                <br />
                Email:{" "}
                <a
                  href="mailto:suzannahhomeandcareservices@gmail.com"
                  className="text-yellow-700 font-semibold"
                >
                  suzannahhomeandcareservices@gmail.com
                </a>
                <br />
                Phone: +234 800 000 0000
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => window.print()}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200"
            >
              Print / Save Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
