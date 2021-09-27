import { useQuery } from "react-query";

type VideoGame = {
  id: number;
  Name: string;
  Platform: string;
  Year_of_Release: number;
  Genre: string;
  Global_Sales: number;
  NA_Sales: number;
};

export type SalesData = {
  [year: number]: VideoGame[];
};

async function getGameSales({ by }) {
  const response = await fetch(`/api/sales-per-year?by=${by}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export default function useSalesData({ by = "company" }) {
  return useQuery<{ items: SalesData }, Error>(["game-sales", by], () =>
    getGameSales({ by })
  );
}
