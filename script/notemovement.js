// TODO:
// Solucionar: scroll se desplaza al desplazar la nota hacia abajo
// La nota que cojes debe de super ponerse al resto de ojas
// Cuando suelte, actualizar cordenadas en firebase

import { updateNote } from "./fireUtils.js";
import { editNote } from "./editModal.js";

let start = [0, 0];
let end = [0, 0];
let offsetX = 0;
let offsetY = 0;
let isMoving = false;
let haveBeenMove = false;
let lastTouch = 0;
function noteMovement(note) {
  let isTouch = false;

  note.addEventListener("touchstart", (e) => {
    isTouch = true;
    haveBeenMove = false;
    offsetX = note.offsetLeft - e.touches[0].clientX;
    offsetY = note.offsetTop - e.touches[0].clientY;
  });

  note.addEventListener("touchend", (e) => {
    isTouch = false;
    if (target.className == "note")
      updateNote({ id: note.id, position: [note.style.left, note.style.top] });
  });

  window.addEventListener("touchmove", (e) => {
    isMoving = true;
    if (isTouch && isMoving) {
      haveBeenMove = true;
      let touch = e.touches[0];

      note.style.top = touch.clientY + offsetY + "px";
      note.style.left = touch.clientX + offsetX + "px";

      isMoving = false;
    }
  });

  // gesture(note);
}

// poner gesture en otro fichero
function gesture(note) {
  // Como detectar los gestos
  // Medir la variación de altura, si el poco ponerlo como gesto
  // Medir la velocidad del movimiento, si es rápido darlo como bueno
  // Si el desplazamiento es menor de un minimo es gesto, si no es desplazamiento

  let isTouch = false;
  note.addEventListener("touchstart", (e) => {
    isTouch = true;
    start[0] = e.touches[0].clientX;
    start[1] = e.touches[0].clientY;
  });

  note.addEventListener("touchend", (e) => {
    isTouch = false;
    end[0] = e.changedTouches[0].clientX;
    end[1] = e.changedTouches[0].clientY;

    let diff = [start[0] - end[0], start[1] - end[1]];
    // let diffX = [0];
    // let diffY = [1];

    if (diff[0] > 30) console.log("Izquierda: " + diff[0]);
    if (diff[1] < 30) console.log("Derecha: " + diff[1]);
  });
}

function calculateWindowCenter(div) {
  div.style.top = window.innerHeight / 2 - div.offsetTop + "px";
  div.style.left = window.innerWidth / 2 - div.offsetLeft + "px";
}

function doubleTap(note) {
  note.addEventListener("touchend", (e) => {
    const currentTime = new Date().getTime();
    const diffTime = currentTime - lastTouch;

    if (diffTime < 300 && diffTime > 0) {
      document.getElementById("editGUI").style.display = "flex";
      editNote(note);
    }

    lastTouch = currentTime;
  });
}

export {
  doubleTap,
  noteMovement,
  calculateWindowCenter,
  isMoving,
  haveBeenMove,
};
