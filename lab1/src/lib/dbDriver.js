import pg from "pg-promise";
import { dbConfig } from "../../config";

const pgp = pg();

const dbDriver = pgp(dbConfig);

export default dbDriver;
