import getProducts from "../../utils/getProducts";
import { getCookie } from "cookies-next";

export default async function handler(req, res) {
  const publicIds = JSON.parse(getCookie("cart", { req, res }) || "[]");

  const products = await getProducts(publicIds);

  res.json(products);
}
