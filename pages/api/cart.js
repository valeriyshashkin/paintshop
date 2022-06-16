import { getCookie } from "cookies-next";
import client from "../../client";

export default async function handler(req, res) {
  const publicIds = JSON.parse(getCookie("cart", { req, res }) || "[]");

  const products = await client.fetch(
    `*[_type == "products" && _id in $publicIds]`,
    { publicIds }
  );

  res.json(products);
}
