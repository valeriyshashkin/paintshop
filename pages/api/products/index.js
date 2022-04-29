import getProducts from "../../../utils/getProducts";

export default async function handler(req, res) {
  res.json({ products: await getProducts() });
}
