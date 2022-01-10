const grpc = require("grpc");
const uuidv1 = require("uuid").v1;

const notesProto = grpc.load("notes.proto");
const notes = [
  { id: "1", title: "Note 1", content: "Content 1" },
  { id: "2", title: "Note 2", content: "Content 2" },
];

const server = new grpc.Server();
server.addService(notesProto.NoteService.service, {
  list: (_, callback) => {
    callback(null, notes);
  },
  insert: (call, callback) => {
    let note = call.request;
    note.id = uuidv1();
    notes.push(note);
    callback(null, note);
  },
  delete: (call, callback) => {
    let existingNoteIndex = notes.findIndex(
      (item) => item.id == call.request.id
    );
    if (existingNoteIndex != -1) {
      notes.splice(existingNoteIndex, 1);
      callback(null, {});
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },
  update: (call, callback) => {
    let existingNote = notes.find((item) => item.id == call.request.id);
    if (existingNote) {
      existingNote.title = call.request.title;
      existingNote.content = call.request.content;
      callback(null, existingNote);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },
  get: (call, callback) => {
    let note = notes.find((item) => item.id == call.request.id);
    if (note) {
      callback(null, note);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Not found",
      });
    }
  },
});

server.bind("127.0.0.1:8080", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:8080");

server.start();
