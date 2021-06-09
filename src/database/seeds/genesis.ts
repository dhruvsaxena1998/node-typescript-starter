import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("roles").del();
  await knex("users").del();

  // Inserts seed entries

  //   ROLES
  await knex("roles").insert([
    { id: 1, name: "ADMINSTRATOR", description: "Role given to admin" },
    {
      id: 2,
      name: "AUTHENTICATED",
      description: "Role given to authenticated users",
    },
    { id: 3, name: "PUBLIC", description: "Role given to public users" },
  ]);

  //   USERS
  await knex("users").insert([
    {
      id: 1,
      username: "dhruv",
      email: "saxenadhruv1927@gmail.com",
      password: "Tsg-msn12",
      roleId: 1,
      name: "Dhruv Saxena",
    },
  ]);
}
