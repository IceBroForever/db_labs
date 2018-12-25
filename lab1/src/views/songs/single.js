import { prompt } from "enquirer";
import print from "../helpers/printSong";
import singers from "../singers/getBySong";
import albums from "../albums/getBySong";

const questions = [
  {
    type: "select",
    name: "operation",
    message: "Choose operation",
    choices: [
      {
        name: "albums",
        message: "Show albums with this song"
      },
      {
        name: "singers",
        message: "Show singers"
      },
      {
        name: "back",
        message: "Go back"
      }
    ]
  }
];

export default async function(song) {
  main: while (true) {
    print(song);
    if (!song) return;
    const { operation } = await prompt(questions);
    switch (operation) {
      case "albums":
        await albums(song.id);
        break;
      case "singers":
        await singers(song.id);
        break;
      case "back":
        break main;
    }
  }
}
