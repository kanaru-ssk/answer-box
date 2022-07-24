import Head from "next/head";

import type { NextPage } from "next";

import Footer from "components/common/Footer";
import Introduction from "components/common/Introduction";
import QuestionForm from "components/top/QuestionForm";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_URL} />

        <meta property="og:title" content="回答箱" />
        <meta
          property="og:description"
          content="質問を作成して匿名で回答を募集しよう!"
        />

        <title>回答箱</title>
        <meta
          name="description"
          content="質問を作成して匿名で回答を募集しよう!"
        />
      </Head>

      <main>
        <p className="py-4">質問を作成しよう!</p>
        <QuestionForm />
        <Introduction />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
