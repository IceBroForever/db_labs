import dotenv from "dotenv";
import faker from "faker";
import Knex from "knex";
import { Model, transaction } from "objection";
import Albums from "./db/Albums";
import Singers from "./db/Singers";
import Songs, { GENRES } from "./db/Songs";
import asyncForEach from "./utils/asyncForEach";

dotenv.config();

const knex = Knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
});

Model.knex(knex);

const MIN_NUMBER_OF_SINGERS = 10;
const MAX_NUMBER_OF_SINGERS = 20;

const MIN_NUMBER_OF_SONGS_PER_SINGER = 20;
const MAX_NUMBER_OF_SONGS_PER_SINGER = 50;

const MIN_NUMBER_OF_ALBUMS_PER_SINGER = 2;
const MAX_NUMBER_OF_ALBUMS_PER_SINGER = 5;

async function fill() {
  let trx;
  try {
    trx = await transaction.start(Model.knex());

    await Singers.clear({ trx });
    await Albums.clear({ trx });
    await Songs.clear({ trx });

    const numberOfSingers = faker.random.number({
      min: MIN_NUMBER_OF_SINGERS,
      max: MAX_NUMBER_OF_SINGERS
    });

    const singers = [];

    for (let i = 0; i < numberOfSingers; i++) {
      const name = faker.name.firstName();
      const surname = faker.name.lastName();
      const nickname =
        faker.random.number({ min: 0, max: 1 }) === 1
          ? name + " " + surname
          : faker.internet.userName();
      const birth = faker.date
        .between(new Date(1900, 0), new Date(2010, 0))
        .toISOString();

      const singer = await Singers.create(
        {
          nickname,
          name,
          surname,
          birth
        },
        { trx }
      );

      console.log("Inserted singer with id " + singer.id);

      singers.push(singer);
    }

    await asyncForEach(singers, async singer => {
      const albums = [];

      let numberOfAlbums = faker.random.number({
        min: MIN_NUMBER_OF_ALBUMS_PER_SINGER,
        max: MAX_NUMBER_OF_ALBUMS_PER_SINGER
      });

      for (let i = 0; i < numberOfAlbums; i++) {
        const album = await Albums.create(
          {
            name: faker.random.words().slice(0, 64),
            singer_id: singer.id,
            released: faker.date.past().toISOString()
          },
          { trx }
        );

        console.log(`Singer ${singer.id}: created album ${album.id}`);
        albums.push(album);
      }

      let numberOfSongs = faker.random.number({
        min: MIN_NUMBER_OF_SONGS_PER_SINGER,
        max: MAX_NUMBER_OF_SONGS_PER_SINGER
      });

      for (let i = 0; i < numberOfSongs; i++) {
        const anotherSingers = [];
        const numberOfSingers = faker.random.number({
          min: 0,
          max: singers.length > 10 ? 5 : 1
        });
        anotherSingers.push(singer.id);
        for (let i = 1; i < numberOfSingers; i++) {
          let anotherSingerId;
          do {
            anotherSingerId =
              singers[
                faker.random.number({
                  min: 0,
                  max: singers.length - 1
                })
              ].id;
          } while (
            anotherSingerId === singer.id ||
            anotherSingers.indexOf(anotherSingerId) !== -1
          );
          anotherSingers.push(anotherSingerId);
        }

        const song = await Songs.create(
          {
            name: faker.random.words().slice(0, 64),
            duration: faker.random.number({ min: 90, max: 600 }),
            rating: faker.random.number({ min: 0, max: 5 }),
            genre:
              GENRES[faker.random.number({ min: 0, max: GENRES.length - 1 })],
            released: faker.date.past().toISOString(),
            lyrics: faker.lorem.text()
          },
          { trx }
        );

        await asyncForEach(anotherSingers, async anotherSingerId => {
          await song.addSinger(anotherSingerId, { trx });
        });

        if (faker.random.number({ min: 0, max: 2 }) === 0) {
          const album =
            albums[faker.random.number({ min: 0, max: albums.length - 1 })];
          await album.addSong(song.id, { trx });
          console.log(
            `Singer ${singer.id}: added song ${song.id} to album ${album.id}`
          );
        } else {
          console.log(`Singer ${singer.id}: added song ${song.id}`);
        }
      }
    });

    await trx.commit();
  } catch (error) {
    if (trx) await trx.rollback(error);
    throw error;
  }
}

fill()
  .then(() => {
    console.log("Database succesfully filled in with random data");
    setImmediate(() => {
      process.exit(0);
    });
  })
  .catch(error => {
    console.log("Error while filling in database:");
    console.log(error);
    setImmediate(() => {
      process.exit(1);
    });
  });
