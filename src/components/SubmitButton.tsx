type Props = {
  text: string;
};
const SubmitButton = ({ text }: Props) => {
  return (
    <div className="py-4 text-center">
      <button
        type="submit"
        className="m-auto rounded-full bg-main-color py-3 px-12 font-bold text-white"
      >
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;
