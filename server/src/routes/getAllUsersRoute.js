import { User } from "../models/user";
import jwt from "jsonwebtoken";

export const getAllUsersRoute = {
  path: "/api/allusers",
  method: "get",
  handler: async (req, res) => {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];

    if (!authorization) {
      return res.status(401).json({ message: "No authorization header sent" });
    }

    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const { isAdmin } = decoded;

      if (isAdmin) {
        const userList = await User.find({ isAdmin: false }).select(
          "-passwordHash"
        );

        if (!userList)
          return res.status(500).json({ message: "List not found" });

        return res.status(200).send({ data: userList });
      } else {
        return res.status(400).json({ messgae: "Please Login with admin." });
      }
    } catch (error) {
      return res.send(error);
    }
  },
};
