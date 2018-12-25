import { prompt } from "enquirer";
import singer from "../singers/getById";
import songs from "../songs/getByAlbum";
import print from "../helpers/printAlbum";

const questions = [
  {
    type: "select",
    name: "operation",
    message: "Choose operation",
    choices: [
      {
        name: "singer",
        message: "Show singer info"
      },
      {
        name: "songs",
        message: "Show songs from albums"
      },
      {
        name: "back",
        message: "Go back"
      }
    ]
  }
];

export default async function(album) {
  main: while (true) {
    print(album);
    if (!album) return;
    const { operation } = await prompt(questions);
    switch (operation) {
      case "singer":
        await singer(album.singer);
        break;
      case "songs":
        await songs(album.id);
        break;
      case "back":
        break main;
    }
  }
}
