interface ButtonProps {
    url?: string;
    buttonName?: string;
    style?: {width?: string; alignSelf?: string; backgroundColor?: string;};
    onClick?: () => void;
    type?: "submit" | "button";
    disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <button disabled={props?.disabled ?? false} type={props.type} onClick={props.onClick} style={{width: props.style?.width, alignSelf: props.style?.alignSelf}} className="bg-blue-950 disabled:bg-gray-400 h-10 max-sm:w-full text-white rounded px-4 mt-3 enable:hover:bg-gradient-to-b  enabled:hover:from-blue-950 enabled:hover:to-[#0D98BA]">
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        {props.buttonName || "Book Now"}
      </a>
    </button>
  );
};

export default Button;
