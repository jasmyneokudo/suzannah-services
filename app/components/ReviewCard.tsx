import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { PaystackButton } from 'react-paystack'

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#0D98BA",
  },
  "& .MuiRating-iconHover": {
    color: "#0D98BA",
  },
});

const ReviewCard = (props: any) => {
  return (
    <div className="mr-3 bg-white shadow-md bg-clip-border px-4 py-5 rounded-xl">
      <StyledRating
        name="customized-color"
        defaultValue={5}
        getLabelText={(value: number) =>
          `${value} Heart${value !== 1 ? "s" : ""}`
        }
        precision={0.5}
        icon={<IconHeartFilled size="30" />}
        emptyIcon={<IconHeart size="30" />}
      />
      <p className="text-gray-600 text-sm">&quot;{props.review}&quot;</p>

      <div className="grid grid-cols-[1fr_4fr] grid-rows-2 h-[90px]">
        <div className="flex justify-center items-center mt-3 rounded-full bg-blue-950 w-14 h-14 p-4">
          <p className="text-white font-bold">DER</p>
        </div>
        <h3 className="self-center font-semibold mt-3">
          {props.name}
        </h3>
        <p className="text-gray-500 text-sm col-start-2">
          {props.location}
        </p>
      </div>

      <div className="bg-blue-900/20 w-fit px-3 py-[0.5px] rounded-full">
        <p className="text-blue-950 text-sm">{props.serviceType}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
