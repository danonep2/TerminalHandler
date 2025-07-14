import clsx from "clsx";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body
        className="min-h-screen text-gray-600 bg-background font-sans antialiased
        bg-[#f1f2f1] dark:bg-gray-800 transition-all ease-in-out duration-300
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar]:p-0.5
        [&::-webkit-scrollbar-track]:opacity-0
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-md"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
