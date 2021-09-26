import Head from "next/head";
import { useQuery } from "react-query";

type VideoGame = {
  id: number;
  name: string;
};

async function getVideoGameSales() {
  const response = await fetch("/api/video-game-sales");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function SalesViz() {
  const { isLoading, isError, data, error } = useQuery<
    { items: VideoGame[] },
    Error
  >("video-game-sales", getVideoGameSales);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ul>
      {data.items.map((videoGame) => (
        <li key={videoGame.id}>{videoGame.name}</li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Video Games</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Video Games Sales</h1>
        <SalesViz />
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
