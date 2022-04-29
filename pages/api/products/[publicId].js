import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
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

  res.json({ product });
}
