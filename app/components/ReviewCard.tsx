const ReviewCard = (props: any) => {
  return (
    <div className="mr-5 bg-white shadow-md bg-clip-border px-5 py-5 rounded-xl">
      <h3 className="self-center text-center font-semibold mb-2">
        {props.name}
      </h3>
      <p>{props.review}</p>
    </div>
  );
};

export default ReviewCard;
