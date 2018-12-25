export default function(song) {
  if (!song) {
    console.log("No song");
    return;
  }
  console.log(`Song ${song.name}:`);
  console.log(`\tid: ${song.id}`);
  console.log(`\tduration: ${song.duration}`);
  console.log(`\trating: ${song.rating}`);
  console.log(`\tgenre: ${song.genre}`);
  console.log(`\treleased: ${new Date(song.released).toDateString()}`);
  console.log(`\tlyrics: ${song.lyrics}`);
}
