import { prompt } from "enquirer";
import Songs from "../../db/Songs";
import list from "./list";
import single from "./single";

const questions = [
  {
    type: "input",
    name: "phrase",
    message: "Type the phrase you want to find"
  }
];

export default async function() {
  const { phrase } = await prompt(questions);
  const songs = await Songs.findByPhrase(phrase);
  while (true) {
    const song = await list(songs);
    if (song === null) break;
    await single(song);
  }
}
