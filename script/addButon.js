import {
  noteMovement,
  calculateWindowCenter,
  haveBeenMove,
} from "./notemovement.js";

import { note } from "./note.js";

import { postNote } from "./fireUtils.js";

let divColor = "white";
let inputTitleText = "";
let inputBodyText = "";

const addButon = () => {
  let div = document.createElement("div");
  let p = document.createElement("p");

  div.setAttribute("class", "addButon");
  div.addEventListener("touchend", (e) => createNoteGUI(e));
  p.innerText = "+";

  div.appendChild(p);
  p.setAttribute("id", "add");
  document.body.appendChild(div);

  calculateWindowCenter(div);
  noteMovement(div);
};

function createNoteGUI(e) {
  if (!haveBeenMove) {
    // centrar la posicion con un offset
    let header = document.createElement("div");
    let inputTitle = document.createElement("input");
    let bodyText = document.createElement("textarea");
    let colorSelector = document.createElement("div");
    let confirm = document.createElement("div");
    let discard = document.createElement("div");
    let confirmSection = document.createElement("div");
    let confirmIcon = document.createElement("p");
    let discardIcon = document.createElement("p");

    confirmIcon.innerText = "✓";
    discardIcon.innerText = "X";
    let div = e.currentTarget;
    let divStyles = div.style;
    let p = e.target;

    // Cause the dispear the create card gui whet you click
    if (p.tagName == "P") p.style.display = "none";

    divStyles.width = "130px";
    divStyles.height = "180px";
    divStyles.borderRadius = "15px";
    divStyles.cursor = "default";
    // cambiarlo por un blanco menos puro
    divStyles.backgroundColor = "white";
    // poner un maximo al texto total
    inputTitle.setAttribute("type", "text");
    // centrar y hacer bonito el placeholder (cambiar tamaño...)
    inputTitle.setAttribute("placeholder", "Titulo");
    inputTitle.setAttribute("maxlength", "6");
    bodyText.setAttribute(
      "placeholder",
      "Aquí puede poner el texto de la nota.",
    );
    // bodyText.setAttribute("type",)
    header.setAttribute("class", "addButonHeader");
    colorSelector.setAttribute("class", "colorSelector");
    confirmSection.setAttribute("class", "confirmSection");
    confirm.addEventListener("touchstart", () => {
      comfirmCreateNewNote(div);
    });

    discard.addEventListener("touchstart", () => {
      cancelCreateNewNote(div);
    });

    div.style.backgroundColor = divColor;
    inputTitle.style.backgroundColor = divColor;
    bodyText.style.backgroundColor = divColor;

    inputTitle.value = inputTitleText;
    bodyText.value = inputBodyText;

    inputTitle.addEventListener("keyup", () => {
      inputTitleText = inputTitle.value;
    });

    bodyText.addEventListener("keyup", () => {
      inputBodyText = bodyText.value;
    });

    createColorDivs(colorSelector, div);

    header.appendChild(inputTitle);

    confirm.appendChild(confirmIcon);
    discard.appendChild(discardIcon);
    confirmSection.appendChild(confirm);
    confirmSection.appendChild(discard);
    div.appendChild(header);
    div.appendChild(bodyText);
    div.appendChild(colorSelector);
    div.appendChild(confirmSection);
  }
}

function createColorDivs(div) {
  let colors = [
    "#F54927",
    "#FF7400",
    "#FFE100",
    "#21CC24",
    "#2199CC",
    "#9C3BED",
    "#E3449E",
  ];

  colors.forEach((color) => {
    createSideBarColorPalet(color, div);
  });
}

function createSideBarColorPalet(color, div) {
  let divColor = document.createElement("div");
  div.appendChild(divColor);
  divColor.style.backgroundColor = color;
  // señalar de forma visual (en la barra, no solo mostrando el color en la targeta)cual color se a eligido
  divColor.addEventListener("touchend", (e) => {
    e.preventDefault();
    changeNoteColor(color);
  });
}

function changeNoteColor(color) {
  divColor = color;
}

// En casa terminar estas dos funciones
// Crea una nueva nota en el documento y lo añade a firebase
// de tal manera que parezca que el menu y la nueva nota sean iguales
function comfirmCreateNewNote(div) {
  // TODO:

  let id = Date.now();
  let objNote = {
    id: id,
    name: inputTitleText,
    content: inputBodyText,
    color: divColor,
    position: [div.style.left, div.style.top],
  };

  note(objNote);
  postNote(objNote);

  deleteCreateNoteGui(div);
  // todo lo de la nota subirlo a firebase
}

function cancelCreateNewNote(div) {
  deleteCreateNoteGui(div);
}

function deleteCreateNoteGui(div) {
  div.innerHTML = "";
  let p = document.createElement("p");
  p.innerText = "+";

  div.style.width = "50px";
  div.style.height = "50px";
  div.style.borderRadius = "60px";
  div.style.backgroundColor = "#ffa100";
  div.appendChild(p);
  p.setAttribute("id", "add");
}

export { addButon, createColorDivs };
