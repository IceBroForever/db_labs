import { prompt } from "enquirer";
import showSongs from "../songs/getBySinger";
import showAlbums from "../albums/getBySinger";
import print from "../helpers/printSinger";

const questions = [
  {
    type: "select",
    name: "operation",
    message: "Choose operation",
    choices: [
      {
        name: "albums",
        message: "Show albums of singer"
      },
      {
        name: "songs",
        message: "Show songs of singer"
      },
      {
        name: "back",
        message: "Go back"
      }
    ]
  }
];

export default async function(singer) {
  main: while (true) {
    print(singer);
    if (!singer) return;
    const { operation } = await prompt(questions);
    switch (operation) {
      case "albums":
        await showAlbums(singer.id);
        break;
      case "songs":
        await showSongs(singer.id);
        break;
      case "back":
        break main;
    }
  }
}
