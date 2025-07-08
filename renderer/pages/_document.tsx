import clsx from "clsx";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body
        className="min-h-screen bg-background font-sans antialiased bg-white/95"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
