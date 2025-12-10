import {
  AccordionSummary,
  AccordionDetails,
  AccordionProps,
  styled,
} from "@mui/material";
import { IconChevronDown } from "@tabler/icons-react";
import MuiAccordion from "@mui/material/Accordion";
import { useState } from "react";

const luxuryFaqs = [
  {
    id: "1",
    question: "How do you vet and select your household staff?",
    answer:
      "Every member of our household teams undergoes a rigorous 5-stage vetting process including background verification, reference checks, skills assessment, personality profiling, and a comprehensive training program. We only onboard the top 5% of applicants who meet our exacting standards for professionalism and discretion.",
  },
  {
    id: "2",
    question: "What training do your staff members receive?",
    answer:
      "Our staff receive specialized training in household management, etiquette, discretion protocols, and service excellence. This includes modules on high-net-worth household operations, privacy awareness, emergency response, and the specific requirements of managing luxury residences.",
  },
  {
    id: "3",
    question:
      "Can I customize my package based on my household's specific needs?",
    answer:
      "Absolutely. Our Bespoke Package option allows you to build a completely customized household team. You can select the exact number and type of staff you need, their accommodation preferences, and specific requirements. Our consultants work with you to design the perfect solution for your residence.",
  },
  {
    id: "4",
    question: "What is included in the monthly package fee?",
    answer:
      "Your monthly investment covers staff salaries, professional uniforms, ongoing training and development, supervision and quality assurance, replacement guarantees, and 24/7 support. There are no hidden fees — everything needed to maintain your household team is included.",
  },
  {
    id: "5",
    question: "How do you ensure staff discretion and privacy?",
    answer:
      "Discretion is paramount in our service. All staff sign comprehensive confidentiality agreements and receive specialized training in privacy protocols. We understand that our clients value their privacy, and our staff are trained to maintain absolute professionalism in all aspects of household operations.",
  },
  {
    id: "6",
    question: "What happens if I'm not satisfied with a staff member?",
    answer:
      "Your satisfaction is guaranteed. If any staff member doesn't meet your expectations, we provide a prompt replacement at no additional cost. We conducts regular check-ins to ensure service excellence is maintained.",
  },
  {
    id: "7",
    question: "Do you serve areas outside Lagos and Abuja?",
    answer:
      "We currently serve elite households in Lagos, Abuja, and Port Harcourt. We're expanding to other major cities. Contact us to discuss service availability in your location — we accommodate special arrangements for exceptional clients.",
  },
  {
    id: "8",
    question: "What payment options are available?",
    answer:
      "We offer flexible payment plans including monthly, bi-annual (with 8% savings), and annual (with 15% savings) options. Payment can be made via bank transfer or card. Corporate accounts with customized billing arrangements are also available.",
  },
];

export const LuxuryFAQSection = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
  setExpanded(isExpanded ? panel : false);
};
  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    borderRadius: 10,
    marginBottom: theme.spacing(1),
    border: `0.8px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
    "&.Mui-expanded": {
      backgroundColor: "hsl(42 47% 88%)",
    },
  }));

  return (
    <section className="px-4 pb-24">
      <div className="mx-auto">
          <h1 className="text-black text-3xl text-center py-4 font-extralight">
            FAQs
          </h1>
          <p className="text-center text-sm text-blue-950 font-sans mt-2 mb-4">
            Everthing you need to know about our household management bespoke
            packages.
          </p>
        <div className="max-sm:flex max-sm:flex-col grid-cols-3 grid-flow-row grid place-items-center">
          {luxuryFaqs.map((faq, key) => (
            <div key={key} className="align-middle text-center w-10/12">
              <Accordion
              expanded={expanded === `panel${key}`} onChange={handleChange(`panel${key}`)}
              >
                <AccordionSummary
                  expandIcon={<IconChevronDown stroke={2} color="#172554" />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className="flex font-bold justify-center items-center">
                    {faq.question}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <p className="text-gray-500 text-start text-sm">
                    {faq.answer}
                  </p>
                </AccordionDetails>
              </Accordion>
            </div>
            // <FAQBox key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};
