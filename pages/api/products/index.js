import getProducts from "../../../utils/getProducts";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    jwt.verify(req.cookies.auth, process.env.JWT_SECRET);
  } catch {
    res.json({ error: true });
    return;
  }

  res.json({ products: await getProducts(), error: false });
}
