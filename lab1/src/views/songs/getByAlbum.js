import { prompt } from "enquirer";
import Songs from "../../db/Songs";
import list from "./list";
import single from "./single";

const questions = [
  {
    type: "input",
    name: "id",
    message: "Write id of album"
  }
];

export default async function(id = null) {
  if (id === null) {
    id = (await prompt(questions)).id;
  }
  const songs = await Songs.getByAlbum(id);
  while (true) {
    const song = await list(songs);
    if (song === null) break;
    await single(song);
  }
}
