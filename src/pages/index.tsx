import { useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import SubmitButton from "components/SubmitButton";
import TextArea from "components/TextArea";
import { useAuth } from "hooks/auth";
import { createQuestion } from "libs/question";

const Home: NextPage = () => {
  const router = useRouter();
  const user = useAuth();
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [questionPath, setQuestionPath] = useState<string | null>(null);

  const onSubmitHundler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && newQuestion) {
      createQuestion(newQuestion).then((result) => {
        if (result) router.push("question/" + result);
      });
    }
  };

  return (
    <div>
      <Head>
        <title>回答箱</title>
        <meta
          name="description"
          content="匿名で回答を送れちゃう！某質問系サービスのパクリサービスです！"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p className="py-4">質問を作成しよう!</p>
        <form onSubmit={onSubmitHundler}>
          <TextArea
            name="question"
            placeholder="質問を入力して下さい。"
            value={newQuestion}
            onChange={setNewQuestion}
          />
          <SubmitButton text="質問作成" />
        </form>
      </main>
    </div>
  );
};

export default Home;
