import prisma from "../../../utils/prisma";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    jwt.verify(req.cookies.auth, process.env.JWT_SECRET);
  } catch {
    res.json({ error: true });
    return;
  }

  const { publicId } = req.query;

  const product = await prisma.product.findUnique({
    where: {
      publicId,
    },
    select: {
      price: true,
      name: true,
      description: true,
    },
  });

  res.json({ product, error: false });
}
