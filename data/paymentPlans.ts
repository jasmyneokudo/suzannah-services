import { PaymentPlan } from "@/types/ClientRequest";

export const paymentPlans = [
  {
    name: "Monthly Management Plan",
    description:
      "Ideal for clients who want convenience and full staff management.",
    howItWorks: [
      "Within 1 working day of booking this payment plan, we send 1-3 available candidates profiles for selection.",
      "Once selected, the staff resumes work promptly.",
      "We manage the staff’s performance.",
      "Client pays a monthly service fee to the company and need not pay the staff directly.",
    ],
    benefits: [
      "We manage the staff’s performance and payroll so you can focus on what's important to you.",
      "Guaranteed replacement policy throughout your subscription.",
    ],
    price: "80,000",
    type: "monthly" as PaymentPlan,
  },
  {
    name: "One-off Payment Plan",
    description:
      "For clients who prefer a single payment for specific services.",
    howItWorks: [
      "Client makes a one-time payment for recruitment & screening.",
      "We conduct interviews and shortlist 2 competent candidates within 2 working days and send their profiles to the client.",
      "We bring the candidates over to client's selected location for physical interview",
      "Client discusses and agrees on salary directly with their chosen candidate (starting from ₦60,000/month for Nannies/Helps/Housekeepers, ₦80,000/month for cooks, ₦100,000/month for Elder Caregivers).",
      "We run medical tests before the staff resumes.",
      "Replacement is only valid for one month after initial placemment",
    ],
    benefits: [
      "Opportunity to interview up to 2 candidates and select your preferred candidate.",
      "Free Medical Test for selected candidate",
      "Manage your own staff directly without external inteference.",
    ],
    price: "150,500",
    type: "one-off" as PaymentPlan,
  },
];
