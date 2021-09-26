import { useQuery } from "react-query";
import {
  VictoryChart,
  VictoryStack,
  VictoryAxis,
  VictoryBar,
  VictoryTooltip,
} from "victory";
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

async function getGameSales() {
  const response = await fetch(`/api/sales-per-year`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

function prepareData(salesData: SalesData, { startYear, endYear }) {
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
    const salesBreakdown = salesData[year].reduce((prev, curr) => {
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

export default function SalesViz() {
  const startYear = 1999;
  const endYear = 2010;

  const { isLoading, isError, data, error } = useQuery<
    { items: SalesData },
    Error
  >("game-sales", getGameSales);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const { dataset, years } = prepareData(data, { startYear, endYear });

  return (
    <VictoryChart
      height={600}
      width={years.length * 100}
      domainPadding={{ x: 30, y: 20 }}
    >
      <VictoryStack
        colorScale={[
          // Nintendo
          "Red",
          // Microsoft
          "Green",
          // Sony
          "Blue",
          // Sega
          "Orange",
          // PC
          "Black",
        ]}
      >
        {dataset.map((data, i) => {
          return (
            <VictoryBar
              data={data}
              key={i}
              labelComponent={<VictoryTooltip />}
            />
          );
        })}
      </VictoryStack>
      <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} />
      <VictoryAxis tickFormat={years} />
    </VictoryChart>
  );
}
