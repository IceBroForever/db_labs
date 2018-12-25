import { prompt } from "enquirer";
import Albums from "../../db/Albums";
import single from "./single";

const questions = [
  {
    type: "input",
    name: "id",
    message: "Write id of album"
  }
];

export default async function() {
  const { id } = await prompt(questions);
  const album = await Albums.getById(id);
  await single(album);
}
