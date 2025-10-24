import {
  IconCheck,
  IconMoodCheck,
  IconProgressCheck,
} from "@tabler/icons-react";
import Button from "./Button";
import { PaymentPlan } from "@/types/ClientRequest";

type PaymentPlanCardProps = {
  selectPlan: (plan: PaymentPlan) => void;
  nameOfPlan: string;
  description: string;
  howItWorks: string[];
  benefits: string[];
  price: string;
  type: PaymentPlan;
};

export const PaymentPlanCard = (props: PaymentPlanCardProps) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mt-5 text-black dark:text-gray-900">
      <h1 className="font-semibold text-xl">{props.nameOfPlan}</h1>
      <p className="text-sm text-gray-600 mt-1">{props.description}</p>
      <h3 className="text-xl mt-3 font-medium flex items-center gap-1">
        <IconProgressCheck color="#172554" stroke={2} size={20} />
        How It works
      </h3>
      <ol className="text-sm list-inside mt-2 text-black dark:text-gray-900">
        {props.howItWorks.map((value, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="flex-shrink-0 text-bold text-blue-950">
              {index + 1}.
            </span>
            {value}
          </li>
        ))}
      </ol>

      <h3 className="text-xl mt-3 font-medium flex items-center gap-1 text-black dark:text-gray-900">
        <IconMoodCheck color="#172554" stroke={2} size={20} />
        Benefits
      </h3>
      <ol className="mt-1 text-sm list-none text-black dark:text-gray-900">
        {props.benefits.map((value, index) => (
          <li key={index} className="flex">
            <IconCheck
              color="green"
              stroke={2}
              size={20}
              className="mr-2 shrink-0"
            />{" "}
            {value}
          </li>
        ))}
      </ol>

      <span className="flex mt-4 items-baseline">
        <h1 className="text-2xl font-bold text-blue-950">₦{props.type === 'monthly' ? props.price: '150,500'}</h1>
        {props.type === 'monthly' && <span className="text-black dark:text-gray-900">/month</span>}
      </span>

      <Button
        onClick={() => props.selectPlan(props.type)}
        style={{ width: "100%" }}
        buttonName="Select Plan"
      />
    </div>
  );
};

export default PaymentPlanCard;
