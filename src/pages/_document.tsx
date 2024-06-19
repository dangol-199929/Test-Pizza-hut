import { FavIcon } from "@/shared/lib/image-config";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="shortcut icon"
          href={FavIcon}
          type="image/x-icon"
          sizes="16x16"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light+Two&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
