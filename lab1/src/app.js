import main from "./views/main";

main()
  .then(() => {
    console.log("Quiting...");
  })
  .catch(error => {
    console.error(error);
  });
