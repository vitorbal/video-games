import {
  VictoryChart,
  VictoryStack,
  VictoryAxis,
  VictoryBar,
  VictoryTooltip,
} from "victory";
import useSalesData from "./useSalesData";
import Loading from "../Loading";

export default function SalesViz() {
  const startYear = 1999;
  const endYear = 2010;

  const { status, error, data } = useSalesData({ startYear, endYear });

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

  return (
    <VictoryChart
      height={600}
      width={data.years.length * 100}
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
        {data.dataset.map((data, i) => {
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
      <VictoryAxis tickFormat={data.years} />
    </VictoryChart>
  );
}
