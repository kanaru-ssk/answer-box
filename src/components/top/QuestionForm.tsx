import { useState } from "react";

import { useRouter } from "next/router";

import Loading from "components/common/Loading";
import { useAuth } from "hooks/auth";
import { createQuestion } from "libs/question";

const QuestionForm = () => {
  const router = useRouter();
  const user = useAuth();
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const onSubmitHundler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    if (user && newQuestion) {
      createQuestion(newQuestion).then((result) => {
        if (result) router.push("question/" + result);
      });
    }
  };

  return (
    <form onSubmit={onSubmitHundler}>
      <div className="relative flex-1">
        <div
          className="invisible min-h-[48px] overflow-hidden whitespace-pre-wrap break-all border-2 px-5 py-12 leading-5"
          aria-hidden="true"
        >
          {newQuestion + "\u200b"}
        </div>
        <textarea
          name="answer"
          placeholder="質問を入力して下さい。"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="absolute top-0 h-full w-full resize-none overflow-visible rounded-3xl border-2 border-gray px-5 py-12 text-center leading-5"
        ></textarea>
      </div>
      <div className="py-4 text-center">
        {isCreating ? (
          <button className="w-40 rounded-full bg-sub-color py-0.5">
            <Loading />
          </button>
        ) : (
          <button
            type="submit"
            className="w-40 rounded-full bg-main-color py-3 font-bold text-white"
          >
            質問作成
          </button>
        )}
      </div>
    </form>
  );
};

export default QuestionForm;
