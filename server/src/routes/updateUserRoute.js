import { User } from "../models/user";
import mongoose from "mongoose";

export const updateUserRoute = {
  path: "/api/user/update/:id",
  method: "put",
  handler: async (req, res) => {
    const { id } = req.params;
    //validate if product id is real
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send("Invalid user ID");
    }
    const { fullName, age, gender, favoriteFood, hairColor } = req.body;

    const info = {
      fullName: fullName,
      age: age,
      gender: gender,
      favoriteFood: favoriteFood,
      hairColor: hairColor,
    };
    const user = await User.findByIdAndUpdate(
      id,
      {
        info: info,
      },
      { new: true }
    ).select("-passwordHash");
    if (!user) return res.status(500).send({ message: "User cannot update." });

    return res.status(200).send({ data: user });
  },
};
