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

    const { email } = JSON.parse(req.body);

    await prisma.contact.update({
      where: {
        key: "email",
      },
      data: {
        value: email,
      },
    });

    res.end();
  }
}
