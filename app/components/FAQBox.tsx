import { useState } from "react";
import { IconChevronDown, IconPlus, IconX } from "@tabler/icons-react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

type FAQType = {
  question: string;
  answer: string;
};

const FAQBox = (props: FAQType) => {
  return (
    <div className="align-middle text-center w-10/12">
      <Accordion
        sx={{
          // border: 0.4, 
          // borderColor: '#172554',
          // borderRadius: '20%',
          mt: 2
        }}>
        <AccordionSummary
          expandIcon={<IconChevronDown stroke={2} color="#172554" />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex justify-center items-center">
            {props.question}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <p className="text-gray-500 text-start text-sm">
            {props.answer}
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FAQBox;
