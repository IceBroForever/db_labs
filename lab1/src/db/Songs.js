import dbDriver from "../lib/dbDriver";
import queries from "./sql/songs";
import asyncForEach from "../utils/asyncForEach";

export const GENRES = [
  "afro",
  "avant-garde",
  "blues",
  "caribbean",
  "comedy",
  "country",
  "easy listening",
  "electronic",
  "folk",
  "hip-pop",
  "jazz",
  "latin",
  "pop",
  "r&b",
  "soul",
  "rock"
];

export default class Songs {
  static async create(data) {
    const { id } = await dbDriver.one(queries.create, data);
    if ("singers" in data && Array.isArray(data.singers)) {
      await asyncForEach(data.singers, async singer => {
        await dbDriver.none(queries.addSinger, {
          singer,
          song: id
        });
      });
    }
    return id;
  }

  static getById(id) {
    return dbDriver.oneOrNone(queries.getById, { id });
  }

  static getByAlbum(id) {
    return dbDriver.any(queries.getByAlbum, { id });
  }

  static getBySinger(id) {
    return dbDriver.any(queries.getBySinger, { id });
  }

  static addSingers(song, singer) {
    return dbDriver.manyOrNone(queries.addSinger, { song, singer });
  }

  static getSingers(id) {
    return dbDriver.any(queries.getSingers, { id });
  }

  static findByPhrase(phrase) {
    return dbDriver.any(queries.findByPhrase, { phrase });
  }

  static findWhereNoWord(word) {
    return dbDriver.any(queries.findWhereNoWord, { word });
  }

  static clear() {
    return dbDriver.any(queries.clear);
  }
}
