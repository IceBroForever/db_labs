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
  while (true) {
    const album = await list((skip, limit) => {
      return Albums.findByRating(rating, { skip, limit });
    });
    if (album === null) break;
    await single(album);
  }
}
