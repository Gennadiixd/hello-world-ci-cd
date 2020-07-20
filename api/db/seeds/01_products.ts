import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("products").del();

  await knex("products").insert([
    {
      title: "titleOne",
      description: "descriptionOne",
      price: "priceOne",
    },
    {
      title: "titleTwo",
      description: "descriptionTwo",
      price: "priceTwo",
    },
    {
      title: "titleThree",
      description: "descriptionThree",
      price: "priceThree",
    },
    {
      title: "titleFour",
      description: "descriptionFour",
      price: "priceFour",
    },
  ]);
}
