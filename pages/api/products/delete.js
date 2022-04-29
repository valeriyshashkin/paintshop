import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { publicId } = JSON.parse(req.body);

    await prisma.product.delete({
      where: {
        publicId,
      },
    });

    res.end();
  }
}
