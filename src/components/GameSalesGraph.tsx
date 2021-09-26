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

export default function SalesViz() {
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
