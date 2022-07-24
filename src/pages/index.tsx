import Head from "next/head";

import type { NextPage } from "next";

import Footer from "components/common/Footer";
import Introduction from "components/common/Introduction";
import QuestionForm from "components/top/QuestionForm";
import { title, description } from "constants/common";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_URL} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        <title>{title}</title>
        <meta name="description" content={description} />
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
