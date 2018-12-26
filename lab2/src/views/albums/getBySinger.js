import { prompt } from "enquirer";
import Albums from "../../db/Albums";
import list from "./list";
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
  while (true) {
    const album = await list((skip, limit) => {
      return Albums.getBySinger(id, { skip, limit });
    });
    if (album === null) break;
    await single(album);
  }
}
