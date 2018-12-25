import { prompt } from "enquirer";

export default async function(songs = []) {
  if (!Array.isArray(songs) || songs.length === 0) {
    console.log("No songs");
    return null;
  }

  let page = 0;

  while (true) {
    const choices = songs.slice(page, page + 10).map(song => ({
      name: song.id,
      message: song.name
    }));

    if (page != 0) {
      choices.push({
        name: "prev",
        message: "Previous page"
      });
    }

    if (page + 10 <= songs.length) {
      choices.push({
        name: "next",
        message: "Next page"
      });
    }

    choices.push({
      name: "back",
      message: "Go back"
    });

    const questions = {
      type: "select",
      name: "id",
      message: "Choose song",
      choices
    };

    const { id } = await prompt(questions);

    switch (id) {
      case "prev":
        page--;
        break;
      case "next":
        page++;
        break;
      case "back":
        return null;
      default:
        return songs.find(song => song.id === id);
    }
  }
}
