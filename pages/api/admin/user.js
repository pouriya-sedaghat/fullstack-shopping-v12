import { getSession } from "next-auth/react";

import db from "../../../utils/db";
import User from "../../../models/user.model";

async function handler(req, res) {
  const session = await getSession({ req });

  if (!session?.user || !session?.user?.isAdmin)
    return console.log("SignIn Required.");

  await db.content();

  const users = await User.find().lean();

  res.send(users);
}

export default handler;
