import { prompt } from "enquirer";
import singers from "./singers/main";
import songs from "./songs/main";
import albums from "./albums/main";

const questions = [
  {
    type: "select",
    name: "point",
    message: "Choose point",
    choices: [
      {
        name: "singers",
        message: "Singers"
      },
      {
        name: "albums",
        message: "Albums"
      },
      {
        name: "songs",
        message: "Songs"
      },
      {
        name: "quit",
        message: "Quit"
      }
    ]
  }
];

export default async function() {
  main: while (true) {
    const { point } = await prompt(questions);
    switch (point) {
      case "singers":
        await singers();
        break;
      case "albums":
        await albums();
        break;
      case "songs":
        await songs();
        break;
      case "quit":
        break main;
    }
  }
}
