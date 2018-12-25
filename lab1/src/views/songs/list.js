import { prompt } from "enquirer";

export default async function(songs = []) {
  if (!Array.isArray(songs) || songs.length === 0) {
    console.log("No songs");
    return null;
  }

  const choices = songs.map(song => ({
    name: song.id,
    message: song.name
  }));
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

  if (id === "back") return null;

  return songs.find(song => song.id === id);
}
