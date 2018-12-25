import { prompt } from "enquirer";
import Albums from "../../db/Albums";
import list from "./list";
import single from "./single";

const questions = [
  {
    type: "input",
    name: "id",
    message: "Write id of song"
  }
];

export default async function(id = null) {
  if (id === null) {
    id = (await prompt(questions)).id;
  }
  const albums = await Albums.getBySong(id);
  while (true) {
    const album = await list(albums);
    if (album === null) break;
    await single(album);
  }
}
