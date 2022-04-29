import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, description, price, publicId } = JSON.parse(req.body);

    await prisma.product.update({
      where: {
        publicId,
      },
      data: {
        name,
        description,
        price,
      },
    });

    res.end();
  }
}
