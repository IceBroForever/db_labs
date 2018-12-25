import { prompt } from "enquirer";
import Albums from "../../db/Albums";
import list from "./list";
import single from "./single";

const questions = [
  {
    type: "input",
    name: "genre",
    message: "Write genre"
  }
];

export default async function() {
  const { genre } = await prompt(questions);
  const albums = await Albums.findByGenre(genre);
  while (true) {
    const album = await list(albums);
    if (album === null) break;
    await single(album);
  }
}
