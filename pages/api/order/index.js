import { getSession } from "next-auth/react";

import db from "../../../utils/db";
import Order from "../../../models/order.model";

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session?.user) return console.log("SignIn Required.");

  const {
    user: { _id },
  } = session;

  await db.content();

  const newOrder = new Order({ ...req.body, user: _id });
  const order = await newOrder.save();

  res.status(201).send(order);
}

export default handler;
