import { useState, useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import type { NextPage } from "next";
import type { Question } from "types/firebase";

import Answers from "components/AnswerList";
import SubmitButton from "components/SubmitButton";
import TextArea from "components/TextArea";
import { useAuth } from "hooks/auth";
import { createAnswer } from "libs/answer";
import { getQuestion } from "libs/question";

const Question: NextPage = () => {
  const user = useAuth();
  const router = useRouter();
  // パスパラメータから値を取得
  const { id } = router.query;
  const [question, setQuestion] = useState<Question | null>(null);
  const [newAnswer, setNewAnswer] = useState<string>("");

  useEffect(() => {
    if (typeof id === "string") {
      getQuestion(id).then((result) => {
        setQuestion(result);
      });
    }
  }, [id]);

  const onSubmitHundler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && newAnswer && question) {
      createAnswer(question.docId, newAnswer);
      setNewAnswer("");
    }
  };

  return (
    <>
      <Head>
        <title>回答箱</title>
        <meta
          name="description"
          content="匿名で回答を送れちゃう！某質問系サービスのパクリサービスです！"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-4">
        <section>
          <h2>質問</h2>
          <div className="w-full rounded-3xl border-2 border-main-color bg-light-gray py-12 text-center">
            {question?.question}
          </div>
        </section>

        <section>
          <h2>匿名で回答する</h2>
          <form onSubmit={onSubmitHundler}>
            <TextArea
              name="answer"
              placeholder="回答を入力してください。"
              value={newAnswer}
              onChange={setNewAnswer}
            />
            <SubmitButton text="回答作成" />
          </form>
        </section>

        <section>
          <h2>回答一覧</h2>
          <Answers />
        </section>
      </main>
    </>
  );
};

export default Question;
