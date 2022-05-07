import prisma from "../../../utils/prisma";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      jwt.verify(req.cookies.auth, process.env.JWT_SECRET);
    } catch {
      res.end();
      return;
    }

    const { name, description, price, src } = JSON.parse(req.body);

    let publicId;

    while (true) {
      publicId = nanoid(11);

      const theSamePublicId = await prisma.product.findUnique({
        where: {
          publicId,
        },
      });

      if (!theSamePublicId) {
        break;
      }
    }

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        publicId,
        src,
      },
    });

    res.end();
  }
}
