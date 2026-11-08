import { updateNote } from "./fireUtils.js";

let titleText = "";
let textBody = "";
let divColor = "";
let note;
function createEditGUI() {
  const editGUI = document.createElement("div");
  const colors = document.createElement("div");
  const divTitle = document.createElement("div");
  const divTextarea = document.createElement("div");
  const h1 = document.createElement("h1");
  const h2Title = document.createElement("h2");
  const h2Textarea = document.createElement("h2");
  const titleInput = document.createElement("input");
  const textarea = document.createElement("textarea");
  const buttons = document.createElement("div");
  const bConfirm = document.createElement("button");
  const bCancel = document.createElement("button");
  h1.innerText = "Modificar Nota";
  bConfirm.innerText = "✓";
  bCancel.innerText = "X";
  h2Title.innerText = "Note Title";
  h2Textarea.innerText = "Note Content";

  editGUI.setAttribute("class", "editGUI");
  editGUI.setAttribute("id", "editGUI");
  buttons.setAttribute("class", "editButtons");
  colors.setAttribute("class", "colorGUISelector");

  divTitle.setAttribute("class", "editTitle");
  divTextarea.setAttribute("class", "editTextarea");

  createColorDivs(colors);

  buttons.appendChild(bConfirm);
  buttons.appendChild(bCancel);

  divTitle.appendChild(h2Title);
  divTitle.appendChild(titleInput);

  divTextarea.appendChild(h2Textarea);
  divTextarea.appendChild(textarea);

  editGUI.appendChild(h1);
  editGUI.appendChild(divTitle);
  editGUI.appendChild(divTextarea);
  editGUI.appendChild(colors);
  editGUI.appendChild(buttons);

  document.body.appendChild(editGUI);

  titleInput.addEventListener("keyup", (e) => {
    titleText = e.target.value;
  });

  textarea.addEventListener("keyup", (e) => {
    textBody = e.target.value;
  });

  bCancel.addEventListener("touchend", () => {
    document.getElementById("editGUI").style.display = "none";
  });
  bConfirm.addEventListener("touchend", () => {
    if (titleText) note.childNodes[0].childNodes[0].innerText = titleText;
    if (textBody) note.childNodes[1].childNodes[0].innerText = textBody;
    if (divColor) note.style.backgroundColor = divColor;
    document.getElementById("editGUI").style.display = "none";

    updateNote({
      id: note.attributes[1].value,
      title: titleText,
      content: textBody,
      color: divColor,
    });
    titleInput.value = "";
    textarea.value = "";
  });
}

function editNote(editNote) {
  note = editNote;
  document.getElementById("editGUI").style.backgroundColor =
    editNote.style.backgroundColor;
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
  document.getElementById("editGUI").style.backgroundColor = divColor;
}
export { createEditGUI, editNote };
