import { prompt } from "enquirer";
import Singers from "../../db/Singers";
import single from "./single";

const questions = [
  {
    type: "input",
    name: "id",
    message: "Write id of singer"
  }
];

export default async function(id = null) {
  if (id === null) {
    id = (await prompt(questions)).id;
  }
  const album = await Singers.getById(id);
  await single(album);
}
