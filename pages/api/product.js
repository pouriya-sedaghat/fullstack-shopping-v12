import db from "../../utils/db";
import Product from "../../models/product.model";

import { products } from "../../data/products.json";

async function handler(req, res) {
  await db.content();

  await Product.insertMany(products);

  res.send("Products Added.");
}

export default handler;
