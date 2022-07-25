import { getCookie } from "cookies-next";

export default async function handler(req, res) {
  const publicIds = JSON.parse(getCookie("cart", { req, res }) || "[]");

  const { products } = await (await fetch("http://localhost:3001")).json();

  const filtered = products.filter((p) => publicIds.includes(p.id));

  res.json(filtered);
}
