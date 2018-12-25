import { prompt } from "enquirer";
import Songs from "../../db/Songs";
import list from "./list";
import single from "./single";

const questions = [
  {
    type: "input",
    name: "word",
    message: "Type the word you want to exclude from search"
  }
];

export default async function() {
  const { word } = await prompt(questions);
  const songs = await Songs.findWhereNoWord(word);
  while (true) {
    const song = await list(songs);
    if (song === null) break;
    await single(song);
  }
}
