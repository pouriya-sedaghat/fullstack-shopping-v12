import { getSession } from "next-auth/react";

import db from "../../../utils/db";
import Order from "../../../models/order.model";

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session?.user) return console.log("SingIn Required.");

  const {
    user: { _id },
  } = session;

  await db.content();

  const orders = await Order.find({ user: _id });

  res.send(orders);
}

export default handler;
