import { prompt } from "enquirer";

export default async function(albums = []) {
  if (!Array.isArray(albums) || albums.length === 0) {
    console.log("No albums");
    return null;
  }

  let page = 0;

  while (true) {
    const choices = albums.slice(page, page + 10).map(album => ({
      name: album.id,
      message: album.name
    }));

    if (page != 0) {
      choices.push({
        name: "prev",
        message: "Previous page"
      });
    }

    if (page + 10 < albums.length) {
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
      message: "Choose album",
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
        return albums.find(album => album.id === id);
    }
  }
}
