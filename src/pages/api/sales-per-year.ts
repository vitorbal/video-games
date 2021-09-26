import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import groupBy from "lodash/groupBy";

export const supabase = createClient(
  process.env.NEXT_SUPABASE_URL,
  process.env.NEXT_SUPABASE_CLIENT_KEY
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const year = req.query.year;
  const { data, error } = await supabase
    .from("game_sales")
    .select("id,Name,Platform,Year_of_Release,Genre,Global_Sales,NA_Sales")
    // Data before 1990 is sparse, so let's trim it
    .gte("Year_of_Release", 1990);
  if (error) {
    return res.status(+error.code).json({ error: error.message });
  }

  const groupedByYear = groupBy(data, "Year_of_Release");

  return res.status(200).json(groupedByYear);
};
