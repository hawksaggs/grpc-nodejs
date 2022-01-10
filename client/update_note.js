const client = require("./client");

let updateNote = {
  id: "1",
  title: "1",
  content: "1",
};

client.update(updateNote, (error, note) => {
  if (error) {
    console.log(error);
  }

  console.log("Note updated successfully: ", note);
});
