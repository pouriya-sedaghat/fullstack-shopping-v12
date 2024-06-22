import { getSession } from "next-auth/react";

import db from "../../../utils/db";
import User from "../../../models/user.model";
import Product from "../../../models/product.model";
import Order from "../../../models/order.model";

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session?.user || !session?.user?.isAdmin)
    return console.log("SignIn Required.");

  await db.content();

  const userCount = await User.countDocuments();
  const productCount = await Product.countDocuments();
  const orderCount = await Order.countDocuments();

  res.send({ userCount, productCount, orderCount });
}

export default handler;
