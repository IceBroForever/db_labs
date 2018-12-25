import dbDriver from "../lib/dbDriver";
import queries from "./sql/singers";

export default class Singers {
  static create(data) {
    return dbDriver.one(queries.create, data, result => result.id);
  }

  static getById(id) {
    return dbDriver.oneOrNone(queries.getById, { id });
  }

  static getAll() {
    return dbDriver.manyOrNone(queries.getAll);
  }

  static find(input) {
    return dbDriver.manyOrNone(queries.find, { input });
  }

  static clear() {
    return dbDriver.any(queries.clear);
  }
}
