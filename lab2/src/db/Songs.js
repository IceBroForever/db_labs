import { Model } from "objection";

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

export default class Songs extends Model {
  static tableName = "songs";

  static idColumn = "id";

  static jsonSchema = {
    type: "object",
    required: ["name", "duration", "rating", "genre", "lyrics"],
    properties: {
      id: { type: "integer" },
      name: {
        type: "string",
        minLength: 1,
        maxLength: 64
      },
      duration: {
        type: "integer",
        min: 1
      },
      rating: {
        type: "number",
        min: 0,
        max: 5
      },
      genre: { type: "string" },
      lyrics: { type: "string" },
      released: {
        type: ["string", "null"],
        format: "date-time"
      }
    }
  };

  static relationMappings = {
    singers: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + "/Singers",
      join: {
        from: "songs.id",
        through: {
          from: "singers_songs.song_id",
          to: "singers_songs.singer_id"
        },
        to: "singers.id"
      }
    },
    albums: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + "/Albums",
      join: {
        from: "songs.id",
        through: {
          from: "albums_songs.song_id",
          to: "albums_songs.album_id"
        },
        to: "albums.id"
      }
    }
  };

  getAlbums({ trx, skip, limit } = { skip: 0, limit: null }) {
    return this.$relatedQuery("albums", trx)
      .offset(skip)
      .limit(limit);
  }

  getSingers({ trx, skip, limit } = { skip: 0, limit: null }) {
    return this.$relatedQuery("singers", trx)
      .offset(skip)
      .limit(limit);
  }

  addSinger(id, { trx } = {}) {
    return this.$relatedQuery("singers", trx).relate(id);
  }

  addAlbum(id, { trx } = {}) {
    return this.$relatedQuery("albums", trx).relate(id);
  }

  static create(data, { trx } = {}) {
    return this.query(trx)
      .insert(data)
      .returning("*")
      .first();
  }

  static getById(id, { trx } = {}) {
    return this.query(trx).findById(id);
  }

  static getAll({ trx, skip, limit } = { skip: 0, limit: null }) {
    return this.query(trx)
      .offset(skip)
      .limit(limit);
  }

  static getByAlbum(id, { trx, skip, limit } = { skip: 0, limit: null }) {
    return this.query(trx)
      .joinRelation("albums")
      .where("albums.id", id)
      .offset(skip)
      .limit(limit);
  }

  static getBySinger(id, { trx, skip, limit } = { skip: 0, limit: null }) {
    return this.query(trx)
      .joinRelation("singers")
      .where("singers.id", id)
      .offset(skip)
      .limit(limit);
  }

  static find(input, { trx, skip, limit } = { skip: 0, limit: null }) {
    return this.query(trx)
      .whereRaw("songs_make_tsvector(name, lyrics) @@ plainto_tsquery(?)", [
        input
      ])
      .offset(skip)
      .limit(limit);
  }

  static findWhereNoWord(
    input,
    { trx, skip, limit } = { skip: 0, limit: null }
  ) {
    return this.query(trx)
      .whereRaw("songs_make_tsvector(name, lyrics) @@ to_tsquery(?)", [
        "!" + input
      ])
      .offset(skip)
      .limit(limit);
  }

  static clear({ trx } = {}) {
    return this.query(trx).delete();
  }
}
