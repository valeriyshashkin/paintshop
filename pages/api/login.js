import setCookie from "../../utils/cookies";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);

    if (email !== "admin@admin.com" || password !== "admin") {
      res.json({ error: true });
    }

    setCookie(
      res,
      "auth",
      jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1y" }),
      {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        path: "/",
      }
    );
    res.json({ error: false });
  }
}
