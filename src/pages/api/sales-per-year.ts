import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import groupBy from "lodash/groupBy";

import { platformToCompany } from "../../constants/companies";

export const supabase = createClient(
  process.env.NEXT_SUPABASE_URL,
  process.env.NEXT_SUPABASE_CLIENT_KEY
);

function aggregateByCompany(sales) {
  const years = Object.keys(sales);
  const yearlySalesPerCompany = {};

  years.forEach((year) => {
    // Calculate sales per company and total sales
    const salesBreakdown = (sales[year] || []).reduce((prev, curr) => {
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
  });

  return yearlySalesPerCompany;
}

function aggregateByGenre(sales) {
  const years = Object.keys(sales);
  const yearlySalesPerCompany = {};

  years.forEach((year) => {
    // Calculate sales per company and total sales
    const salesBreakdown = (sales[year] || []).reduce((prev, curr) => {
      const genre = curr.Genre;
      return {
        ...prev,
        [genre]: (prev[genre] || 0) + curr.Global_Sales,
        total: (prev["total"] || 0) + curr.Global_Sales,
      };
    }, {});
    yearlySalesPerCompany[year] = salesBreakdown;
  });

  return yearlySalesPerCompany;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { by } = req.query;

  const { data, error } = await supabase
    .from("game_sales")
    .select("id,Name,Platform,Year_of_Release,Genre,Global_Sales,NA_Sales")
    // Data before 1990 is sparse, so let's trim it
    .gte("Year_of_Release", 1990);

  if (error) {
    return res.status(+error.code).json({ error: error.message });
  }

  const groupedByYear = groupBy(data, "Year_of_Release");

  if (by === "genre") {
    return res.status(200).json(aggregateByGenre(groupedByYear));
  }

  // Default to company
  return res.status(200).json(aggregateByCompany(groupedByYear));
};
