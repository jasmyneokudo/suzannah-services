import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

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
    <div className="self-center max-sm:h-[280px] bg-white shadow-md bg-clip-border px-4 py-5 rounded-xl">
      <StyledRating
        name="customized-color"
        defaultValue={5}
        getLabelText={(value: number) =>
          `${value} Heart${value !== 1 ? "s" : ""}`
        }
        precision={0.5}
        icon={<IconHeartFilled size="25" />}
        emptyIcon={<IconHeart size="25" />}
      />
      <p className="text-gray-600 text-lg">&quot;{props.review}&quot;</p>

      <div className="grid grid-cols-[1fr_4fr] grid-rows-2 h-[80px]">
        <div className="flex justify-center items-center mt-3 rounded-full bg-blue-950 w-12 h-12 p-3">
          <p className="text-white font-bold">{props.name.split(' ').map((item: string) => item[0])}</p>
        </div>
        <h3 className="text-black dark:text-gray-900 self-center font-semibold mt-3">
          {props.name}
        </h3>
        <p className="text-gray-500 text-sm col-start-2">
          {props.location}
        </p>
      </div>

      <div className="flex self-end bg-blue-900/20 w-fit px-3 py-[0.5px] rounded-full">
        <p className="text-blue-950 text-sm">{props.serviceType}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
