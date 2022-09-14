import data from "../data";
import slugify from "slugify";

export default function total(cart) {
  const total = 0;

  cart.map((c) => {
    total +=
      data.products.find((p) => c.name === slugify(p.name).toLowerCase())
        .price * c.amount;
  });

  return total;
}
