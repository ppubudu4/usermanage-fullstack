import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) return res.status(401).json({ message: "User Not Found" });

    const { _id: id, passwordHash, isAdmin } = user;
    const isCorrect = await bcrypt.compare(password, passwordHash);

    if (isCorrect) {
      const token = jwt.sign(
        { id: id, email: email, isAdmin: isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );

      return res.status(200).send({ token: token });
    } else {
      return res
        .status(400)
        .send({ message: "Username or Password incorrect." });
    }
  },
};
