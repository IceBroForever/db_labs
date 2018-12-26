import Songs from "../../db/Songs";
import list from "./list";
import single from "./single";

export default async function(id = null) {
  while (true) {
    const song = await list((skip, limit) => {
      return Songs.getAll({ skip, limit });
    });
    if (song === null) break;
    await single(song);
  }
}
