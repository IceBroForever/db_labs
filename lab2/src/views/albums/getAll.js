import Albums from "../../db/Albums";
import list from "./list";
import single from "./single";

export default async function() {
  while (true) {
    const album = await list((skip, limit) => {
      return Albums.getAll({ skip, limit });
    });
    if (album === null) break;
    await single(album);
  }
}
