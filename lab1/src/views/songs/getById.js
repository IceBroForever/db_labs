import { prompt } from "enquirer";
import Songs from "../../db/Songs";
import single from "./single";

const questions = [
  {
    type: "input",
    name: "id",
    message: "Write id of song"
  }
];

export default async function() {
  const { id } = await prompt(questions);
  const song = await Songs.getById(id);
  await single(song);
}
