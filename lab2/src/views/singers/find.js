import { prompt } from "enquirer";
import Singers from "../../db/Singers";
import list from "./list";
import single from "./single";

const questions = [
  {
    type: "input",
    name: "input",
    message: "Write nickname"
  }
];

export default async function() {
  const { input } = await prompt(questions);
  while (true) {
    const singer = await list((skip, limit) => {
      return Singers.find(input, { skip, limit });
    });
    if (singer === null) break;
    await single(singer);
  }
}
