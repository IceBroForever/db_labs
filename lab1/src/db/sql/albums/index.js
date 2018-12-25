import path from "path";
import loadSql from "../../../utils/loadSql";

export default {
  create: loadSql(path.resolve(__dirname, "create.sql")),
  getById: loadSql(path.resolve(__dirname, "getById.sql")),
  getBySinger: loadSql(path.resolve(__dirname, "getBySinger.sql")),
  getBySong: loadSql(path.resolve(__dirname, "getBySong.sql")),
  addSong: loadSql(path.resolve(__dirname, "addSong.sql")),
  findByGenre: loadSql(path.resolve(__dirname, "findByGenre.sql")),
  findByRating: loadSql(path.resolve(__dirname, "findByRating.sql")),
  clear: loadSql(path.resolve(__dirname, "clear.sql"))
};
