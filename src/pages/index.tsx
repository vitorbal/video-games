import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Video Games</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Video Games Sales</h1>
        <div>Dataviz goes here</div>
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
  );
}
