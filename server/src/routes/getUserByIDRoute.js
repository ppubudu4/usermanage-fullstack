import { User } from "../models/user";

export const getUserByIDRoute = {
  path: "/api/user/:id",
  method: "get",
  handler: async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id).select("-passwordHash");

    if (!user) {
      res
        .status(500)
        .json({ message: "The user with the given ID not found." });
    }
    return res.status(200).send({ data: user });
  },
};
