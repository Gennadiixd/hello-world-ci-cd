import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("products").del();

  await knex("products").insert([
    {
      id: 1,
      title: "titleOne",
      description: "descriptionOne",
      price: "priceOne",
    },
    {
      id: 2,
      title: "titleTwo",
      description: "descriptionTwo",
      price: "priceTwo",
    },
    {
      id: 3,
      title: "titleThree",
      description: "descriptionThree",
      price: "priceThree",
    },
    {
      id: 4,
      title: "titleFour",
      description: "descriptionFour",
      price: "priceFour",
    },
  ]);
}
