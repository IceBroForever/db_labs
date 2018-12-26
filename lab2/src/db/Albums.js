import { Model } from "objection";

export default class Albums extends Model {
  static tableName = "albums";

  static idColumn = "id";

  static jsonSchema = {
    type: "object",
    required: ["name", "singer_id"],
    properties: {
      id: { type: "integer" },
      name: {
        type: "string",
        minLength: 1,
        maxLength: 64
      },
      singer_id: { type: "integer" },
      released: {
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
        from: "albums.id",
        through: {
          from: "albums_songs.album_id",
          to: "albums_songs.song_id"
        },
        to: "songs.id"
      }
    },
    singer: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + "/Singers",
      join: {
        from: "albums.singer_id",
        to: "singers.id"
      }
    }
  };

  getSinger({ trx } = {}) {
    return this.$relatedQuery("singer", trx);
  }

  getSongs({ trx, skip, limit } = { skip: 0, limit: null }) {
    return this.$relatedQuery("songs", trx)
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

  static getBySinger(id, { trx, skip, limit } = { skip: 0, limit: null }) {
    return this.query(trx)
      .joinRelation("singer")
      .where("singer.id", id)
      .offset(skip)
      .limit(limit);
  }

  static findByGenre(genre, { trx, skip, limit } = { skip: 0, limit: null }) {
    return this.query(trx)
      .distinct()
      .joinRelation("songs")
      .where("songs.genre", genre)
      .offset(skip)
      .limit(limit);
  }

  static findByRating(
    minRating,
    { trx, skip, limit } = { skip: 0, limit: null }
  ) {
    return this.query(trx)
      .select(this.raw("albums.*, avg(songs.rating) as rating"))
      .joinRelation("songs")
      .whereRaw("rating", ">=", minRating)
      .groupBy("albums.id")
      .offset(skip)
      .limit(limit);
  }

  static clear({ trx } = {}) {
    return this.query(trx).delete();
  }
}
