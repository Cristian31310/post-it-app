import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import addCreatedNotes from "./addCreatedNotes.js";

const auth = getAuth();
let emailUser = "";
const provider = new GoogleAuthProvider();
function logWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      document.getElementById("login").style.display = "none";
      document.getElementById("notes").style.display = "block";
      emailUser = user.email;
      addCreatedNotes(emailUser);
      return user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorMessage);
      // ...
    });
}

function getEmail() {
  return emailUser;
}
function logWithEmail(emailUser, passwordUser) {
  const email = emailUser.value;
  const password = passwordUser.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("login").style.display = "none";
      document.getElementById("notes").style.display = "block";
      emailUser = user.email;
      addCreatedNotes(emailUser);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

function signInWithEmail(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("login").style.display = "none";
      document.getElementById("notes").style.display = "block";
      emailUser = user.email;
      addCreatedNotes(emailUser);
    })
    .catch((error) => {
      console.error("Error:", error.code, error.message);
    });
}

export { logWithGoogle, logWithEmail, getEmail, signInWithEmail };
