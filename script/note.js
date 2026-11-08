// TODO:
// Añadir funcionalidad al boton de cerrar
// Cambiar fuente de texto
// Añadir funcionalidad al lugar donde se añade el contenido de la nota
// Cambiar el esquema de color de la nota dependiendo del c=olor que seleccione el usuario
// Cambiar la nota por una clase
// Generar id de forma dinamica cada vez que se cree una nota

import { noteMovement, doubleTap } from "./notemovement.js";

// const note = (id, name, content, color, position) => {
const note = (note) => {
  let id = note.id;
  let name = note.name;
  let content = note.content;
  let color = note.color;
  let position = note.position;

  let x = 0;
  let y = 1;
  let h3 = document.createElement("h3");
  let div = document.createElement("div");
  let header = document.createElement("div");
  let body = document.createElement("div");
  let bodyText = document.createElement("p");

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

  document.body.appendChild(div);

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
