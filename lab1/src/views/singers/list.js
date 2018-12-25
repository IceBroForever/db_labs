import { prompt } from "enquirer";

export default async function(singers = []) {
  if (!Array.isArray(singers) || singers.length === 0) {
    console.log("No singers");
    return null;
  }

  let page = 0;

  while (true) {
    const choices = singers.slice(page, page + 10).map(singer => ({
      name: singer.id,
      message: singer.nickname
    }));

    if (page != 0) {
      choices.push({
        name: "prev",
        message: "Previous page"
      });
    }

    if (page + 10 <= singers.length) {
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
      message: "Choose singer",
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
        return singers.find(singer => singer.id === id);
    }
  }
}
