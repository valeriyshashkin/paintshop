import getProducts from "../../../utils/getProducts";

export default async function handler(req, res) {
  const { publicIds } = req.query;

  const products = await getProducts(JSON.parse(publicIds));

  res.json(products);
}
