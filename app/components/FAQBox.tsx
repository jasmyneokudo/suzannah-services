import { useState } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";

type FAQType = {
  question: string;
  answer: string;
};

const FAQBox = (props: FAQType) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="align-middle text-center w-10/12">
      <button
        className="font-semibold bg-blue-950 text-white py-1 px-2 rounded"
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        <div className="flex justify-center items-center">
          {props.question}
          {
            clicked ? <IconX className="ml-2" color="white" stroke={5} size={15} />
            : <IconPlus className="ml-2" color="white" stroke={5} size={15} />
          }
          
          
        </div>
      </button>
      <div>
        <p className={`p-4 ${clicked ? "visible" : "collapse"}`}>
          {props.answer}
        </p>
      </div>
    </div>
  );
};

export default FAQBox;
