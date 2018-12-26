export default function(singer) {
  if (!singer) {
    console.log("No singer");
    return;
  }
  console.log(`Singer ${singer.nickname}:`);
  console.log(`\tid: ${singer.id}`);
  console.log(`\tname: ${singer.name}`);
  console.log(`\tsurname: ${singer.surname}`);
  console.log(`\tbirth: ${new Date(singer.birth).toDateString()}`);
}
