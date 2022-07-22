type Props = {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: any) => void;
};

const TextArea = ({ name, value, placeholder, onChange }: Props) => {
  return (
    <textarea
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-none rounded-3xl border-2 border-gray py-12 text-center"
    ></textarea>
  );
};

export default TextArea;
