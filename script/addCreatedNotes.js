import { getNotes } from "./fireUtils.js";
import { note } from "./note.js";

async function addCreatedNotes(email) {
  let notas = await getNotes();
  notas.forEach((n) => {
    if (email == n.data().email) {
      console.log(n.id);
      note(n.data(), n.id);
    }
  });
}

export default addCreatedNotes;
