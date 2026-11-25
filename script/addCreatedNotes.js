import { getNotes } from "./fireUtils.js";
import { note } from "./note.js";
import { getEmail } from "./firebaseAuth.js";

async function addCreatedNotes(email) {
  let notas = await getNotes();
  notas.forEach((n) => {
    console.log("info nota");
    if (email == n.data().email) {
      note(n.data());
    }
  });
}

export default addCreatedNotes;
