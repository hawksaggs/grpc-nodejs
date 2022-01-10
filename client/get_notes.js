const client = require("./client");

client.list({}, (error, notes) => {
  if (error) {
    console.error(error);
  }

  console.log("Successfully fetch List notes");
  console.log(notes);
});
