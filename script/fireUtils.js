import { db, notesCollection } from "./firebase.js";
import {
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function postNote(note) {
  try {
    const docRef = await addDoc(notesCollection, note);
  } catch (error) {
    console.error("ERROR DEL FIREBISE" + error);
  }
}

async function getNotes() {
  try {
    const query = await getDocs(notesCollection);
    let notes = [];
    query.forEach((doc) => {
      notes.push(doc);
    });
    return notes;
  } catch (error) {
    console.error("ERROR DEL FIREBISE " + error);
  }
}

async function updateNote(note) {
  try {
    await updateDoc(doc(db, "notes", await getNoteId(note)), note);
  } catch (error) {
    console.error("ERROR DEL FIREBISE " + error);
  }
}

async function getNoteId(note) {
  const notes = await getNotes();
  const arrNoteId = notes.filter((n) => {
    if (n.data().id == note.id) return n.data().id;
  });
  return arrNoteId[0].id;
}

async function deleteNota(note) {
  try {
    await deleteDoc(doc(db, "notes", await getNoteId(note)), note);
  } catch (error) {
    console.error("ERROR DEL FIREBISE " + error);
  }
}

export { postNote, getNotes, updateNote, deleteNota };
