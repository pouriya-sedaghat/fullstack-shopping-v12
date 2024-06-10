import db from "../../utils/db";
import User from "../../models/user.model";

// import users from "../../data/users.js";

import bcrypt from "bcryptjs";

async function handler(req, res) {
  // Static Data

  // await db.content();

  // await User.deleteMany();
  // await User.insertMany(users);

  // res.send("Users Added.");

  // Dynamic Data

  await db.content();

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    res.send({ massage: "User Registered." });
  } else {
    const newUser = new User({
      ...req.body,
      password: bcrypt.hashSync(req.body.password),
    });

    const user = await newUser.save();
    res.status(201).send(user);
  }
}

export default handler;
