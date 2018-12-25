import path from "path";
import loadSql from "../../../utils/loadSql";

export default {
  create: loadSql(path.resolve(__dirname, "create.sql")),
  getAll: loadSql(path.resolve(__dirname, "getAll.sql")),
  getById: loadSql(path.resolve(__dirname, "getById.sql")),
  find: loadSql(path.resolve(__dirname, "find.sql")),
  clear: loadSql(path.resolve(__dirname, "clear.sql"))
};
