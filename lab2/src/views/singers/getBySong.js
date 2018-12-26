import { prompt } from "enquirer";
import Singers from "../../db/Singers";
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
  while (true) {
    const singer = await list((skip, limit) => {
      return Singers.getBySong(id, { skip, limit });
    });
    if (singer === null) break;
    await single(singer);
  }
}
