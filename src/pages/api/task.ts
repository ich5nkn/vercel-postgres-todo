// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      const result = await sql`SELECT * FROM TASKS;`;
      res.status(200).json(result);
    }
    if (req.method === "POST" && req.body.task) {
      const result =
        await sql`INSERT INTO TASKS (NAME) VALUES (${req.body.task});`;
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
