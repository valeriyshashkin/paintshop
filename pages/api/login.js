import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);

    if (email !== "admin@admin.com" || password !== "admin") {
      res.json({ error: true });
    }

    res.setHeader(
      "Set-Cookie",
      serialize(
        "auth",
        jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1y" }),
        {
          maxAge: 365 * 24 * 60 * 60 * 1000,
          path: "/",
        }
      )
    );

    res.json({ error: false });
  }
}
