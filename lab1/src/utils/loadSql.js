import { QueryFile } from "pg-promise";

export default function(path) {
  return new QueryFile(path, { minify: true });
}
