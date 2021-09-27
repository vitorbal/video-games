import Head from "next/head";
import GameSales from "../components/GameSales";

export default function Home() {
  return (
    <>
      <Head>
        <title>Video Games</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center h-screen">
        <main>
          <h1 className="text-center text-5xl">Console Wars!</h1>
          <div className="w-screen flex flex-col items-center justify-center">
            <GameSales />
          </div>
        </main>

        <footer>
          <a
            href="https://twitter.com/vitorbal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made by Vitor Balocco
          </a>
        </footer>
      </div>
    </>
  );
}
