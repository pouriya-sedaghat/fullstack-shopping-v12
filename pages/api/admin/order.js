// import { getSession } from "next-auth/react";

import db from "../../../utils/db";
import Order from "../../../models/order.model";

async function handler(req, res) {
  // const session = await getSession({ req });

  // if (!session?.user || !session?.user?.isAdmin)
  // return console.log("SignIn Required.");

  await db.content();

  const orders = await Order.find().lean();

  res.send(orders);
}

export default handler;
