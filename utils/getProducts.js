import prisma from "./prisma";
import slugify from "slugify";

export default async function getProducts(publicIds) {
  const products = await prisma.product.findMany({
    where: publicIds && { publicId: { in: publicIds } },
    select: {
      name: true,
      publicId: true,
      price: true,
      src: true,
    },
  });

  return products.map(({ name, publicId, price, src }) => ({
    name,
    price,
    href: `/product/${publicId}/${slugify(name)}`,
    publicId,
    src,
  }));
}
