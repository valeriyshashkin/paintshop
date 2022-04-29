import prisma from "./prisma";
import slugify from "slugify";

export default async function getProducts() {
  const products = await prisma.product.findMany({
    select: {
      name: true,
      publicId: true,
      price: true,
    },
  });

  return products.map(({ name, publicId, price }) => ({
    name,
    price,
    href: `/product/${publicId}/${slugify(name)}`,
    publicId,
  }));
}
