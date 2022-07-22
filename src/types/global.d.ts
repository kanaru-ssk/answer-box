// 環境変数の型定義
namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_URL: string;
    readonly NEXT_PUBLIC_FIREBASE_API_KEY: string;
    readonly NEXT_PUBLIC_FIREBASE_DOMAIN: string;
    readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    readonly NEXT_PUBLIC_FIREBASE_STORAGE: string;
    readonly NEXT_PUBLIC_FIREBASE_MESSAGING_ID: string;
    readonly NEXT_PUBLIC_FIREBASE_APP_ID: string;
    readonly NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;

    readonly FIREBASE_PROJECT_ID: string;
    readonly FIREBASE_CLIENT_EMAIL: string;
    readonly FIREBASE_PRIVATE_KEY: string;
  }
}
