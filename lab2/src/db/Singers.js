import { Model } from "objection";

export default class Singers extends Model {
  static tableName = "singers";

  static idColumn = "id";

  static jsonSchema = {
    type: "object",
    required: ["nickname"],
    properties: {
      id: { type: "integer" },
      nickname: {
        type: "string",
        minLength: 1,
        maxLength: 65
      },
      name: {
        type: ["string", "null"],
        minLength: 1,
        maxLength: 32
      },
      surname: {
        type: ["string", "null"],
        minLength: 1,
        maxLength: 32
      },
      birth: {
        type: ["string", "null"],
        format: "date-time"
      }
    }
  };

  static relationMappings = {
    songs: {
      relation: Model.ManyToManyRelation,
      modelClass: __dirname + "/Songs",
      join: {
        from: "singers.id",
        through: {
          from: "singers_songs.singer_id",
          to: "singers_songs.song_id"
        },
        to: "songs.id"
      }
    },
    albums: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + "/Albums",
      join: {
        from: "singers.id",
        to: "albums.singer_id"
      }
    }
  };

  getSongs({ trx, skip, limit } = { skip: 0, limit: null }) {
    return this.$relatedQuery("songs", trx)
      .offset(skip)
      .limit(limit);
  }

  getAlbums({ trx, skip, limit } = { skip: 0, limit: null }) {
    return this.$relatedQuery("albums", trx)
      .offset(skip)
      .limit(limit);
  }

  addSong(id, { trx } = {}) {
    return this.$relatedQuery("songs", trx).relate(id);
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

  static getBySong(id, { trx, skip, limit } = { skip: 0, limit: null }) {
    return this.query(trx)
      .joinRelation("songs")
      .where("songs.id", id)
      .offset(skip)
      .limit(limit);
  }

  static getByAlbum(id, { trx } = {}) {
    return this.query(trx)
      .joinRelation("albums")
      .where("albums.id", id);
  }

  static find(input, { trx, skip, limit } = { skip: 0, limit: null }) {
    return this.query(trx)
      .whereRaw(
        "singers_make_tsvector(nickname, name, surname) @@ plainto_tsquery(?)",
        [input]
      )
      .offset(skip)
      .limit(limit);
  }

  static clear({ trx } = {}) {
    return this.query(trx).delete();
  }
}
