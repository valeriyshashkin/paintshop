import prisma from "../../../utils/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      jwt.verify(req.cookies.auth, process.env.JWT_SECRET);
    } catch {
      res.end();
      return;
    }

    const { public_id } = JSON.parse(req.body);

    await prisma.image.create({
      data: {
        src: public_id,
      },
    });

    res.end();
  }
}
