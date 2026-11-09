// TODO:
// La nota que cojes debe de super ponerse al resto de ojas

import { updateNote, deleteNota } from "./fireUtils.js";
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

  let timeTouch;
  let timeMovement;
  note.addEventListener("touchstart", (e) => {
    isTouch = true;
    haveBeenMove = false;
    timeTouch = new Date().getTime();
    offsetX = note.offsetLeft - e.touches[0].clientX;
    offsetY = note.offsetTop - e.touches[0].clientY;
  });

  note.addEventListener("touchend", () => {
    isTouch = false;
    if (note.className == "note")
      updateNote({
        id: note.id,
        position: [note.style.left, note.style.top],
      });
  });

  window.addEventListener("touchmove", (e) => {
    isMoving = true;
    timeMovement = new Date().getTime();
    const diffTime = timeMovement - timeTouch;
    if (diffTime > 150) {
      if (isTouch) {
        haveBeenMove = true;
        let touch = e.touches[0];

        note.style.top = touch.clientY + offsetY + "px";
        note.style.left = touch.clientX + offsetX + "px";
      }
      isMoving = false;
    }
  });

  gesture(note);
}

function gesture(note) {
  let timeTouch;
  let timeTouchEnd;
  let isTouch = false;
  note.addEventListener("touchstart", (e) => {
    isTouch = true;
    timeTouch = new Date().getTime();
    start[0] = e.touches[0].clientX;
    start[1] = e.touches[0].clientY;
  });

  note.addEventListener("touchend", (e) => {
    isTouch = false;
    timeTouchEnd = new Date().getTime();
    end[0] = e.changedTouches[0].clientX;
    end[1] = e.changedTouches[0].clientY;
    if (isMoving) {
      if (timeTouchEnd - timeTouch < 300) {
        let diff = [start[0] - end[0], start[1] - end[1]];

        if ((diff[0] > 30 || diff[1] < 30) && note.className == "note") {
          if (confirm("Eliminar nota")) {
            note.remove();
            deleteNota(note);
          }
        }
      }
    }
  });
}

function calculateWindowCenter(div) {
  div.style.top = window.innerHeight / 2 - div.offsetTop + "px";
  div.style.left = window.innerWidth / 2 - div.offsetLeft + "px";
  return [window.innerWidth / 2 + "px", window.innerHeight / 2 + "px"];
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
