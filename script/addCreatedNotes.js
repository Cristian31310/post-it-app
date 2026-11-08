import { getNotes } from "./fireUtils.js";
import { note } from "./note.js";

async function addCreatedNotes() {
  let notas = await getNotes();
  notas.forEach((n) => {
    note(n.data());
  });
}

export default addCreatedNotes;
