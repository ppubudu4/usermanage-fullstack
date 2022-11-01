import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = {
  path: "/api/register",
  method: "post",
  handler: async (req, res) => {
    const { email, password, fullName, age, gender, favoriteFood, hairColor } =
      req.body;

    const userDB = await User.findOne({ email: email });

    if (userDB) {
      return res.status(409).json({ message: "User already exsits" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const info = {
      fullName: fullName,
      age: age,
      gender: gender,
      favoriteFood: favoriteFood,
      hairColor: hairColor,
    };

    const user = new User({
      email: email,
      passwordHash: passwordHash,
      info: info,
      isAdmin: false,
    });

    await user.save();

    const { _id } = user;

    jwt.sign(
      { id: _id, email: email, isAdmin: false },
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).send({ token: token });
      }
    );
  },
};
