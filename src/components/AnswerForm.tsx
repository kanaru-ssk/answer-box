import { useState } from "react";

import type { Question } from "types/firebase";

import { useAuth } from "hooks/auth";
import { createAnswer } from "libs/answer";

type Props = {
  question: Question | null;
};

const AnswerForm = ({ question }: Props) => {
  const user = useAuth();

  const [newAnswer, setNewAnswer] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);

  const onSubmitHundler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && newAnswer && question) {
      createAnswer(question.docId, newAnswer);
      setNewAnswer("");
    }
  };

  const onChangeHundler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (typeof e.target.value === "string") {
      setNewAnswer(e.target.value);
      if (e.target.value.length > 0) {
        setIsReady(true);
      } else {
        setIsReady(false);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitHundler}
      className="fixed bottom-0 left-0 flex w-full items-center border-t border-gray bg-white px-4 py-2"
    >
      <div className="relative flex-1">
        <div
          id="dummy"
          className="max-h-[116px] min-h-[48px] overflow-hidden whitespace-pre-wrap px-5 py-3 leading-5"
          aria-hidden="true"
        >
          {newAnswer + "\u200b"}
        </div>
        <textarea
          name="answer"
          id="answer"
          placeholder="回答を入力してください。"
          value={newAnswer}
          onChange={onChangeHundler}
          className="absolute top-0 h-full w-full resize-none overflow-visible rounded-3xl border-2 border-gray px-5 py-3 leading-5"
        ></textarea>
      </div>

      <button className={(isReady ? "" : "text-gray") + " pl-3 text-right"}>
        送信
      </button>
    </form>
  );
};

export default AnswerForm;
