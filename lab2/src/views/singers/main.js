import { prompt } from "enquirer";
import getById from "./getById";
import getBySong from "./getBySong";
import getAll from "./getAll";
import find from "./find";

const questions = [
  {
    type: "select",
    name: "point",
    message: "Choose point for singers",
    choices: [
      {
        name: "getById",
        message: "Get by id"
      },
      {
        name: "getBySong",
        message: "Get by song"
      },
      {
        name: "getAll",
        message: "Get all"
      },
      {
        name: "find",
        message: "Find"
      },
      {
        name: "back",
        message: "Go back"
      }
    ]
  }
];

export default async function() {
  main: while (true) {
    const { point } = await prompt(questions);
    switch (point) {
      case "getById":
        await getById();
        break;
      case "getBySong":
        await getBySong();
        break;
      case "getAll":
        await getAll();
        break;
      case "find":
        await find();
        break;
      case "back":
        break main;
    }
  }
}
