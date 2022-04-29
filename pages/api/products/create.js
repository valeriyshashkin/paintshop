import prisma from "../../../utils/prisma";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, description, price } = JSON.parse(req.body);

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
      },
    });

    res.end();
  }
}
