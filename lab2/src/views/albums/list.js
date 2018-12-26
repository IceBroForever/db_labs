import { prompt } from "enquirer";

export default async function(cb) {
  let page = 0;

  while (true) {
    const albums = await cb(page * 10, 10);

    const choices = albums.map(album => ({
      name: album.id,
      message: album.name
    }));

    if (page != 0) {
      choices.push({
        name: "prev",
        message: "Previous page"
      });
    }

    if (
      (page === 0 && choices.length === 10) ||
      (page !== 0 && choices.length === 11)
    ) {
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
