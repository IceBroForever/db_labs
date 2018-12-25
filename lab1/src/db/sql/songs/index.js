import path from "path";
import loadSql from "../../../utils/loadSql";

export default {
  create: loadSql(path.resolve(__dirname, "create.sql")),
  addSinger: loadSql(path.resolve(__dirname, "addSinger.sql")),
  getSingers: loadSql(path.resolve(__dirname, "getSingers.sql")),
  getById: loadSql(path.resolve(__dirname, "getById.sql")),
  getByAlbum: loadSql(path.resolve(__dirname, "getByAlbum.sql")),
  getBySinger: loadSql(path.resolve(__dirname, "getBySinger.sql")),
  findByPhrase: loadSql(path.resolve(__dirname, "findByPhrase.sql")),
  findWhereNoWord: loadSql(path.resolve(__dirname, "findWhereNoWord.sql")),
  clear: loadSql(path.resolve(__dirname, "clear.sql"))
};
