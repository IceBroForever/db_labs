import Singers from "../../db/Singers";
import list from "./list";
import single from "./single";

export default async function() {
  const singers = await Singers.getAll();
  while (true) {
    const singer = await list(singers);
    if (singer === null) break;
    await single(singer);
  }
}
