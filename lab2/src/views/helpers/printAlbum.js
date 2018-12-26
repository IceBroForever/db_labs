export default function(album) {
  if (!album) {
    console.log("No album");
    return;
  }
  console.log(`Album ${album.name}:`);
  console.log(`\tid: ${album.id}`);
  console.log(`\tsinger: ${album.singer_id}`);
  if ("rating" in album) {
    console.log(`\trating: ${album.rating}`);
  }
  console.log(`\treleased: ${new Date(album.released).toDateString()}`);
}
