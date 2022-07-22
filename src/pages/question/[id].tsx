import { useState, useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import type { GetServerSideProps } from "next";
import type { Question } from "types/firebase";

import Answers from "components/AnswerList";
import Button from "components/Buttom";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import SubmitButton from "components/SubmitButton";
import TextArea from "components/TextArea";
import { useAuth } from "hooks/auth";
import { createAnswer } from "libs/answer";
import { getQuestion } from "libs/question";

type Props = {
  questionSsr: Question | null;
};

const Question = ({ questionSsr }: Props) => {
  const user = useAuth();
  const router = useRouter();
  // パスパラメータから値を取得
  const { id } = router.query;
  const [question, setQuestion] = useState<Question | null>(null);
  const [newAnswer, setNewAnswer] = useState<string>("");
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!questionSsr) {
      getQuestion(id).then((result) => {
        if (result) {
          setQuestion(result);
        } else {
          setIsNotFound(true);
        }
      });
    } else {
      setQuestion(questionSsr);
    }
  }, [id, questionSsr]);

  const onSubmitHundler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && newAnswer && question) {
      createAnswer(question.docId, newAnswer);
      setNewAnswer("");
    }
  };

  const shareOnTwitter = async () => {
    const hashtag = "回答箱";
    const text =
      "回答箱を作成しました！%0A匿名で回答を募集しています!%0A%0A質問 : %0A";
    const URL =
      "http://twitter.com/share?url=" +
      location.href +
      "&text=" +
      text +
      question?.question +
      "%0A%0A%20%23" +
      hashtag +
      "%20%0A";

    location.href = URL;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(location.href);
    setIsCopy(true);
  };
  if (isNotFound) {
    return <NotFound />;
  } else {
    return (
      <>
        <Head>
          <link
            rel="canonical"
            href={process.env.NEXT_PUBLIC_URL + "/question/" + id}
          />

          <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content={process.env.NEXT_PUBLIC_URL + "/img/ogp.png"}
          />
          <meta
            property="og:title"
            content={
              question?.question
                ? "回答箱 | 「" + question?.question + "」"
                : "回答箱"
            }
          />
          <meta
            property="og:description"
            content={
              "質問を作成して匿名で回答を募集しよう!" + question?.question
                ? " 質問 : 「" + question?.question + "」"
                : ""
            }
          />
          <meta name="twitter:card" content="summary_large_image" />

          <title>
            {question?.question
              ? "回答箱 | 「" + question?.question + "」"
              : "回答箱"}
          </title>
          <meta
            name="description"
            content={
              "質問を作成して匿名で回答を募集しよう!" + question?.question
                ? " 質問 : 「" + question?.question + "」"
                : ""
            }
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="px-4">
          <section>
            <h2>質問</h2>
            <div className="w-full rounded-3xl border-2 border-main-color bg-light-gray py-12 text-center">
              {question ? question.question : <Loading />}
            </div>

            <h3 className="text-center">質問のリンクを共有しよう！</h3>
            <div className="flex justify-center gap-4 ">
              <Button
                text={isCopy ? "copied !" : "リンクをコピー"}
                color="gray"
                onClick={copyLink}
              />
              <Button
                text="Tweet"
                color="twitter-color"
                onClick={shareOnTwitter}
              />
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
              <SubmitButton text="回答する" />
            </form>
          </section>

          <section>
            <h2>回答一覧</h2>
            <Answers />
          </section>

          <section className="text-center">
            <p className="pb-4">質問を作成して匿名の回答を募集しましょう!</p>
            <Button
              text="質問を作成する"
              color="main-color"
              onClick={() => {
                router.push("/");
              }}
            />
          </section>
        </main>
      </>
    );
  }
};

export default Question;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { getQuestionSsr } = await import("libs/questionSsr");
  const question = await getQuestionSsr(context.params?.id);

  const props: Props = {
    questionSsr: question,
  };

  return {
    props: props,
  };
};
