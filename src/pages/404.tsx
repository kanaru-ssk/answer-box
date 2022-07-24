import Head from "next/head";
import Link from "next/link";

import type { NextPage } from "next";

import Footer from "components/common/Footer";
import { title } from "constants/common";

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 | {title}</title>
      </Head>

      <main>
        <h1>404 Not Found</h1>
        <p className="pb-8">
          申し訳ございません。お探しのページは見つかりませんでした。
        </p>
        <Link href="/">
          <a className="text-main-color underline sm:hover:text-dark-gray">
            トップページに戻る
          </a>
        </Link>
      </main>

      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </>
  );
};

export default Custom404;
