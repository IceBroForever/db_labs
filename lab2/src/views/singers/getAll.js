import Singers from "../../db/Singers";
import list from "./list";
import single from "./single";

export default async function() {
  while (true) {
    const singer = await list((skip, limit) => {
      return Singers.getAll({ skip, limit });
    });
    if (singer === null) break;
    await single(singer);
  }
}
