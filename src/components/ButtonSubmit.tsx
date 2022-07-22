import Loading from "components/Loading";

type Props = {
  text: string;
  isLoading?: boolean;
};

const ButtonSubmit = ({ text, isLoading }: Props) => {
  return (
    <div className="py-4 text-center">
      {isLoading ? (
        <button className="w-40 rounded-full bg-sub-color py-0.5">
          <Loading />
        </button>
      ) : (
        <button
          type="submit"
          className="w-40 rounded-full bg-main-color py-3 font-bold text-white"
        >
          {text}
        </button>
      )}
    </div>
  );
};

export default ButtonSubmit;
