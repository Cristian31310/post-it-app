import { logWithGoogle, logWithEmail } from "./firebaseAuth.js";
function logIn() {
  const button = document.getElementById("logInButton");
  const buttonEmail = document.getElementById("loginEmailBut");
  const inputEmail = document.getElementById("inEmail");
  const inputPass = document.getElementById("inPassword");

  button.addEventListener("click", () => {
    console.log("owo", logWithGoogle());
  });

  buttonEmail.addEventListener("click", () =>
    logWithEmail(inputEmail, inputPass),
  );
}

export { logIn };
