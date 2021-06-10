import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("roles").del();
  await knex("users").del();

  // Inserts seed entries

  //   ROLES
  await knex("roles").insert([
    { name: "ADMINSTRATOR", description: "Role given to admin" },
    {
      name: "AUTHENTICATED",
      description: "Role given to authenticated users",
    },
    { name: "PUBLIC", description: "Role given to public users" },
  ]);

  //   USERS
  await knex("users").insert([
    {
      role: "AUTHENTICATED",
      username: "dhruv",
      email: "saxenadhruv1927@gmail.com",
      password: "Tsg-msn12",
      name: "Dhruv Saxena",
    },
  ]);
}
