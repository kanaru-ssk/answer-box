import { useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import ButtonSubmit from "components/ButtonSubmit";
import TextArea from "components/TextArea";
import { useAuth } from "hooks/auth";
import { createQuestion } from "libs/question";

const Home: NextPage = () => {
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
    <div>
      <Head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_URL} />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_URL + "/img/ogp.png"}
        />
        <meta property="og:title" content="回答箱" />
        <meta
          property="og:description"
          content="匿名で回答を送れちゃう！某質問系サービスのパクリサービスです！"
        />
        <meta name="twitter:card" content="summary_large_image" />

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
          <ButtonSubmit text="質問作成" isLoading={isCreating} />
        </form>
      </main>
    </div>
  );
};

export default Home;
