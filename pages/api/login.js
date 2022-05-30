import jwt from "jsonwebtoken";
import { setCookies } from "cookies-next";
import prisma from "../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = JSON.parse(req.body);
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin || password !== admin.password) {
      res.json({ error: true });
      return;
    }

    res.setPreviewData({});

    res.json({ error: false });
  }
}
