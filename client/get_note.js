const client = require("./client");

client.get({ id: "3" }, (error, note) => {
  if (error) {
    console.error(error);
  }

  console.log(note);
});
