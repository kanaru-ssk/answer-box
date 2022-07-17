type Props = {
  answer: string;
};
const AnswerItem = ({ answer }: Props) => {
  return (
    <li className="whitespace-pre-wrap border-b border-gray p-4 first:border-t">
      {answer}
    </li>
  );
};

export default AnswerItem;
