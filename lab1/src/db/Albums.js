import dbDriver from "../lib/dbDriver";
import queries from "./sql/albums";

export default class Albums {
  static create(data) {
    return dbDriver.one(queries.create, data, result => result.id);
  }

  static getById(id) {
    return dbDriver.oneOrNone(queries.getById, { id });
  }

  static getBySinger(id) {
    return dbDriver.any(queries.getBySinger, { id });
  }

  static getBySong(id) {
    return dbDriver.any(queries.getBySong, { id });
  }

  static addSong(album, song) {
    return dbDriver.none(queries.addSong, { album, song });
  }

  static findByGenre(genre) {
    return dbDriver.any(queries.findByGenre, { genre });
  }

  static findByRating(rating) {
    return dbDriver.any(queries.findByRating, { rating });
  }

  static clear() {
    return dbDriver.any(queries.clear);
  }
}
