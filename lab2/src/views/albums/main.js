import { prompt } from "enquirer";
import getById from "./getById";
import getAll from "./getAll";
import getBySinger from "./getBySinger";
import getBySong from "./getBySong";
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
        name: "getAll",
        message: "Get all"
      },
      {
        name: "getBySinger",
        message: "Get by singer"
      },
      {
        name: "getBySong",
        message: "Get by song"
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
      case "getAll":
        await getAll();
        break;
      case "findByGenre":
        await findByGenre();
        break;
      case "getBySinger":
        await getBySinger();
        break;
      case "getBySong":
        await getBySong();
        break;
      case "findByRating":
        await findByRating();
        break;
      case "back":
        break main;
    }
  }
}
