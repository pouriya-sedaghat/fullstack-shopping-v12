// import { getSession } from "next-auth/react";

import db from "../../../utils/db";
import Product from "../../../models/product.model";

async function handler(req, res) {
  // const session = await getSession({ req });

  // if (!session?.user || !session?.user?.isAdmin)
  // return console.log("SignIn Required.");

  await db.content();

  const products = await Product.find().lean();

  res.send(products);
}

export default handler;
