import db from "../database/db";
import sanitize from "../helpers/sanitize";

class PersonDAO {
  async create(
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
        role_id: 2,
        is_verified: false,
      })
      .returning("*");

    return sanitize(data, "users");
  }
}

export default new PersonDAO();
