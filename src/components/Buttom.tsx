type Props = {
  text: string;
  color: "gray" | "twitter-color";
  onClick: (e: any) => void;
};

const Button = ({ text, color, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-${color} w-40 text-center text-white sm:hover:bg-light-gray sm:focus:text-white sm:active:bg-dark-gray `}
    >
      {text}
    </button>
  );
};

export default Button;
