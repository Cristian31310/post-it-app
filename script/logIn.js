import {
  logWithGoogle,
  logWithEmail,
  signInWithEmail,
} from "./firebaseAuth.js";
function logIn() {
  const button = document.getElementById("logInButton");
  const buttonEmail = document.getElementById("loginEmailBut");
  const buttonEmailSign = document.getElementById("signEmailBut");
  const inputEmail = document.getElementById("inEmail");
  const inputPass = document.getElementById("inPassword");

  button.addEventListener("click", () => {
    logWithGoogle();
  });

  buttonEmail.addEventListener("click", () => {
    logWithEmail(inputEmail, inputPass);
  });

  buttonEmailSign.addEventListener("click", () => {
    signInWithEmail(inputEmail.value, inputPass.value);
  });
}

export { logIn };
