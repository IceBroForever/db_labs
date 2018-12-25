import { prompt } from "enquirer";
import Albums from "../../db/Albums";
import list from "./list";
import single from "./single";

const questions = [
  {
    type: "input",
    name: "rating",
    message: "Write minimal rating"
  }
];

export default async function() {
  const { rating } = await prompt(questions);
  const albums = await Albums.findByRating(rating);
  while (true) {
    const album = await list(albums);
    if (album === null) break;
    await single(album);
  }
}
