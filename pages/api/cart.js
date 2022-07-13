import { getCookie } from "cookies-next";
import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  const publicIds = JSON.parse(getCookie("cart", { req, res }) || "[]");

  const products = JSON.parse(
    await fs.readFile(path.join(process.cwd(), "products.json"))
  ).filter((p) => publicIds.includes(p.id));

  res.json(products);
}
