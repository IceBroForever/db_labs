import { prompt } from "enquirer";

export default async function(albums = []) {
  if (!Array.isArray(albums) || albums.length === 0) {
    console.log("No albums");
    return null;
  }

  const choices = albums.map(album => ({
    name: album.id,
    message: album.name
  }));
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

  if (id === "back") return null;

  return albums.find(album => album.id === id);
}
