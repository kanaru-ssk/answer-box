import "styles/globals.css";
import type { AppProps } from "next/app";

import Header from "components/Header";
import { AuthProvider } from "hooks/auth";
import { initFirebase } from "libs/initFirebase";

function MyApp({ Component, pageProps }: AppProps) {
  initFirebase();

  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
