import dotenv from "dotenv";
import Knex from "knex";
import { Model } from "objection";
import main from "./views/main";

dotenv.config();

const knex = Knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
});

Model.knex(knex);

main()
  .then(() => {
    console.log("Quiting...");
    setImmediate(() => {
      process.exit(0);
    });
  })
  .catch(error => {
    console.error(error);
    setImmediate(() => {
      process.exit(1);
    });
  });
