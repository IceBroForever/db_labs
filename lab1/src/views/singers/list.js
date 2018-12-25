import { prompt } from "enquirer";

export default async function(singers = []) {
  if (!Array.isArray(singers) || singers.length === 0) {
    console.log("No singers");
    return null;
  }

  const choices = singers.map(singer => ({
    name: singer.id,
    message: singer.nickname
  }));
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

  if (id === "back") return null;

  return singers.find(singer => singer.id === id);
}
