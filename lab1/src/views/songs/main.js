import { prompt } from "enquirer";
import getById from "./getById";
import getByAlbum from "./getByAlbum";
import getBySinger from "./getBySinger";
import findByPhrase from "./findByPhrase";
import findWhereNoWord from "./findWhereNoWord";

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
        name: "getByAlbum",
        message: "Get by album id"
      },
      {
        name: "getBySinger",
        message: "Get by singer id"
      },
      {
        name: "findByPhrase",
        message: "Find by phrase"
      },
      {
        name: "findWhereNoWord",
        message: "Find where no word"
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
      case "getByAlbum":
        await getByAlbum();
        break;
      case "getBySinger":
        await getBySinger();
        break;
      case "findByPhrase":
        await findByPhrase();
        break;
      case "findWhereNoWord":
        await findWhereNoWord();
        break;
      case "back":
        break main;
    }
  }
}
