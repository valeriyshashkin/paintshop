import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import prisma from "../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin || password !== admin.password) {
      res.json({ error: true });
      return;
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
