import { NextApiRequest, NextApiResponse } from "next";
import { onboardingSchema } from "@/lib/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const validatedData = onboardingSchema.parse(req.body);

      const response = await fetch("http://localhost:5000/api/v1/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to onboard user");
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
