import faker from "faker";
import Albums from "./db/Albums";
import Singers from "./db/Singers";
import Songs, { GENRES } from "./db/Songs";
import asyncForEach from "./utils/asyncForEach";

const MIN_NUMBER_OF_SINGERS = 10;
const MAX_NUMBER_OF_SINGERS = 20;

const MIN_NUMBER_OF_SONGS_PER_SINGER = 20;
const MAX_NUMBER_OF_SONGS_PER_SINGER = 50;

const MIN_NUMBER_OF_ALBUMS_PER_SINGER = 2;
const MAX_NUMBER_OF_ALBUMS_PER_SINGER = 5;

async function fill() {
  await Singers.clear();
  await Albums.clear();
  await Songs.clear();

  let numberOfSingers = faker.random.number({
    min: MIN_NUMBER_OF_SINGERS,
    max: MAX_NUMBER_OF_SINGERS
  });
  const singersIds = [];

  for (let i = 0; i < numberOfSingers; i++) {
    const name = faker.name.firstName();
    const surname = faker.name.lastName();
    const nickname =
      faker.random.number({ min: 0, max: 1 }) === 1
        ? name + " " + surname
        : faker.internet.userName();
    const birth = faker.date.between(new Date(1900, 0), new Date(2010, 0));

    const id = await Singers.create({
      nickname,
      name,
      surname,
      birth
    });
    singersIds.push(id);

    console.log("Inserted singer with id " + id);
  }

  await asyncForEach(singersIds, async singerId => {
    const albums = [];

    let numberOfAlbums = faker.random.number({
      min: MIN_NUMBER_OF_ALBUMS_PER_SINGER,
      max: MAX_NUMBER_OF_ALBUMS_PER_SINGER
    });

    for (let i = 0; i < numberOfAlbums; i++) {
      const id = await Albums.create({
        name: faker.random.words().slice(0, 64),
        singer: singerId,
        released: faker.date.past()
      });

      console.log(`Singer ${singerId}: created album ${id}`);
      albums.push(id);
    }

    let numberOfSongs = faker.random.number({
      min: MIN_NUMBER_OF_SONGS_PER_SINGER,
      max: MAX_NUMBER_OF_SONGS_PER_SINGER
    });
    for (let i = 0; i < numberOfSongs; i++) {
      const singers = [];
      const numberOfSingers = faker.random.number({ min: 1, max: 5 });
      for (let i = 0; i < numberOfSingers; i++) {
        let anotherSingerId;
        do {
          anotherSingerId =
            singersIds[
              faker.random.number({
                min: 0,
                max: singersIds.length - 1
              })
            ];
        } while (
          anotherSingerId === singerId ||
          singers.indexOf(anotherSingerId) !== -1
        );
        singers.push(anotherSingerId);
      }

      const id = await Songs.create({
        name: faker.random.words().slice(0, 64),
        duration: faker.random.number({ min: 90, max: 600 }),
        rating: faker.random.number({ min: 0, max: 5 }),
        genre: GENRES[faker.random.number({ min: 0, max: GENRES.length - 1 })],
        released: faker.date.past(),
        lyrics: faker.lorem.text(),
        singers
      });

      if (faker.random.number({ min: 0, max: 2 }) === 0) {
        const albumId =
          albums[faker.random.number({ min: 0, max: albums.length - 1 })];
        await Albums.addSong(albumId, id);
        console.log(`Singer ${singerId}: added song ${id} to album ${albumId}`);
      } else {
        console.log(`Singer ${singerId}: added song ${id}`);
      }
    }
  });
}

fill()
  .then(() => {
    console.log("Database succesfully filled in with random data");
  })
  .catch(error => {
    console.log("Error while filling in database:");
    console.log(error);
  });
