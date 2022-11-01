import { getAllUsersRoute } from "./getAllUsersRoute";
import { getUserByIDRoute } from "./getUserByIDRoute";
import { loginRoute } from "./loginRoute";
import { register } from "./registerRoute";
import { updateUserRoute } from "./updateUserRoute";

export const routes = [
  register,
  loginRoute,
  getAllUsersRoute,
  getUserByIDRoute,
  updateUserRoute,
];
