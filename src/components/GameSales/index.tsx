import {
  VictoryChart,
  VictoryStack,
  VictoryAxis,
  VictoryBar,
  VictoryTooltip,
} from "victory";
import { useState } from "react";

import Loading from "../Loading";
import { companies } from "../../constants/companies";

import useSalesData, { SalesData } from "./useSalesData";

// FIXME(vitor): make this function also work with by-genre data. We need a way to
//               grab an array of all possible genres so we can iterate them here.
function prepareData(yearlySalesPerCompany: SalesData = {}, { startYear }) {
  const allYears = Object.keys(yearlySalesPerCompany);
  const startYearIndex = allYears.indexOf(startYear);
  const years = allYears.slice(
    allYears.indexOf(startYear) || 0,
    startYearIndex + 10
  );

  // Prepare dataset for our stacked bar chart so the totals for each datapoint sum to 100%
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

function SalesChart({ startYear }) {
  const { status, error, data } = useSalesData({ by: "company" });

  if (status === "loading") {
    return (
      <div style={{ margin: "150px auto", width: "100px" }}>
        <Loading />
      </div>
    );
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  const preparedData = prepareData(data, { startYear });

  return (
    <VictoryChart
      height={600}
      width={preparedData.years.length * 100}
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
        {preparedData.dataset.map((data, i) => {
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
      <VictoryAxis tickFormat={preparedData.years} />
    </VictoryChart>
  );
}

export default function GameSales() {
  const [startYear, setStartYear] = useState("1990");

  return (
    <>
      <label className="pt-6">
        Pick your decade:{" "}
        <select
          value={startYear}
          onChange={(event) => {
            setStartYear(event.target.value);
          }}
        >
          <option value="1990">90's</option>
          <option value="2000">00's</option>
          <option value="2010">10's</option>
        </select>
      </label>
      <SalesChart startYear={startYear} />
    </>
  );
}
