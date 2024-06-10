import bcrypt from "bcryptjs";

const users = [
  {
    username: "Pouriay Seadaghat",
    email: "pouriyastk1@gmail.com",
    password: bcrypt.hashSync("Pou7riy9@31"),
    isAdmin: true,
  },
  {
    username: "Masood Sadri",
    email: "masoodsadri@gmail.com",
    password: bcrypt.hashSync("mas7ood9@31"),
    isAdmin: false,
  },
];

export default users;