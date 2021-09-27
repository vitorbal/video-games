import { useQuery } from "react-query";
import groupBy from "lodash/groupBy";

type VideoGame = {
  id: number;
  Name: string;
  Platform: string;
  Year_of_Release: number;
  Genre: string;
  Global_Sales: number;
  NA_Sales: number;
};

type SalesData = {
  [year: number]: VideoGame[];
};

function prepareData(salesData: SalesData = {}, { startYear, endYear }) {
  const platformToCompany = {
    Wii: "Nintendo",
    NES: "Nintendo",
    GB: "Nintendo",
    GBA: "Nintendo",
    DS: "Nintendo",
    X360: "Microsoft",
    XB: "Microsoft",
    PS4: "Sony",
    PS3: "Sony",
    PS2: "Sony",
    PS: "Sony",
    PSP: "Sony",
    SNES: "Nintendo",
    "3DS": "Nintendo",
    N64: "Nintendo",
    GEN: "Sega",
    GG: "Sega",
    SCD: "Sega",
    SAT: "Sega",
    PC: "PC",
  };
  const companies = Object.keys(groupBy(platformToCompany));
  const years = [];
  const yearlySalesPerCompany = {};

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);

    // Calculate sales per company and total sales
    const salesBreakdown = (salesData[year] || []).reduce((prev, curr) => {
      const company = platformToCompany[curr.Platform];
      // Ignore platforms we didn't map out
      if (!company) {
        return prev;
      }
      return {
        ...prev,
        [company]: (prev[company] || 0) + curr.Global_Sales,
        total: (prev["total"] || 0) + curr.Global_Sales,
      };
    }, {});
    yearlySalesPerCompany[year] = salesBreakdown;
  }

  const dataset = companies.map((company) => {
    return years.map((year) => {
      const companyTotal = yearlySalesPerCompany[year][company] || 0;
      const grandTotal = yearlySalesPerCompany[year]["total"] || 0;
      return {
        x: year,
        y: (companyTotal / grandTotal) * 100,
        label: `${company} (${Math.floor(companyTotal)}M)`,
      };
    });
  });

  return {
    dataset,
    years,
  };
}

async function getGameSales() {
  const response = await fetch(`/api/sales-per-year`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export default function useSalesData({ startYear, endYear }) {
  const result = useQuery<{ items: SalesData }, Error>(
    "game-sales",
    getGameSales
  );

  return {
    ...result,
    data: prepareData(result.data, { startYear, endYear }),
  };
}
