import Head from "next/head";
import Link from "next/link";

import type { NextPage } from "next";

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 | 回答箱</title>
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
    </>
  );
};

export default Custom404;
