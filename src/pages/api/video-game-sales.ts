import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_SUPABASE_URL,
  process.env.NEXT_SUPABASE_CLIENT_KEY
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase.from("video_games_sales");
  if (error) {
    return res.status(+error.code).json({ error: error.message });
  }

  return res.status(200).json({ items: data });
};
