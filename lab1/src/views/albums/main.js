import { prompt } from "enquirer";
import getById from "./getById";
import getBySinger from "./getBySinger";
import findByGenre from "./findByGenre";
import findByRating from "./findByRating";

const questions = [
  {
    type: "select",
    name: "point",
    message: "Choose point for songs",
    choices: [
      {
        name: "getById",
        message: "Get by id"
      },
      {
        name: "getBySinger",
        message: "Get by singer"
      },
      {
        name: "findByGenre",
        message: "Find by genre"
      },
      {
        name: "findByRating",
        message: "Get by rating"
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
      case "findByGenre":
        await findByGenre();
        break;
      case "getBySinger":
        await getBySinger();
        break;
      case "findByRating":
        await findByRating();
        break;
      case "back":
        break main;
    }
  }
}
