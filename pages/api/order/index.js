// import { getSession } from "next-auth/react";

import db from "../../../utils/db";
import Order from "../../../models/order.model";

async function handler(req, res) {
  // const session = await getSession({ req });

  // if (!session?.user) return console.log("SignIn Required.");

  // const { user } = session;

  await db.content();

  // const newOrder = new Order({ ...req.body, user });
  const newOrder = new Order({ ...req.body });
  const order = await newOrder.save();

  res.status(201).send(order);
}

export default handler;
