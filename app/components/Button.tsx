interface ButtonProps {
  url?: string;
  buttonName?: string;
  style?: { width?: string; alignSelf?: string; backgroundColor?: string, color?: string, borderColor?: string };
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
  outline?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props?.disabled ?? false}
      type={props.type}
      onClick={props.onClick}
      style={{ width: props.style?.width, alignSelf: props.style?.alignSelf, backgroundColor: props.style?.backgroundColor, color: props.style?.color }}
      className={`bg-blue-950 disabled:bg-gray-400/60 h-10 max-sm:w-full text-white rounded px-4 mt-3 enable:hover:bg-gradient-to-b  enabled:hover:from-blue-950 enabled:hover:to-[#0D98BA] ${props.outline ? `border border-[${props.style?.borderColor}]` : ""}`}
    >
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        {props.buttonName || "Book Now"}
      </a>
    </button>
  );
};

export default Button;
