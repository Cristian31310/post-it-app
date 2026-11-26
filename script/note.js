// TODO:
// Cambiar la nota por una clase

import { noteMovement, doubleTap } from "./notemovement.js";

// const note = (id, name, content, color, position) => {
const note = (note, id) => {
  let name = note.name;
  let content = note.content;
  let color = note.color;
  let position = note.position;
  let email = note.email;

  let x = 0;
  let y = 1;
  let h3 = document.createElement("h3");
  let div = document.createElement("div");
  let header = document.createElement("div");
  let body = document.createElement("div");
  let bodyText = document.createElement("p");
  let notesView = document.getElementById("notes");

  h3.innerText = name;
  bodyText.innerText = content;

  header.setAttribute("class", "noteHeader");
  body.setAttribute("class", "bodyNote");
  div.setAttribute("class", "note");
  div.setAttribute("id", id);

  header.appendChild(h3);
  body.appendChild(bodyText);
  div.appendChild(header);
  div.appendChild(body);

  notesView.appendChild(div);
  if (!color) div.style.backgroundColor = "#FFE100";

  div.style.backgroundColor = color;

  if (position) {
    div.style.top = position[y];
    div.style.left = position[x];
  }

  noteMovement(div);
  doubleTap(div);
};

export { note };
