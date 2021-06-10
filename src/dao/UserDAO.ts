import db from "../database/db";
import sanitize from "../helpers/sanitize";

import { UserSanitizedResponse } from "../types/UserTypes";

class PersonDAO {
  async register(
    username: string,
    email: string,
    password: string,
    name?: string,
    image?: string
  ) {
    const [data] = await db("users")
      .insert({
        username,
        email,
        password,
        name,
        image,
        role: "AUTHENTICATED",
        is_verified: false,
      })
      .returning("*");

    return sanitize(data, "users") as UserSanitizedResponse;
  }
}

export default new PersonDAO();
