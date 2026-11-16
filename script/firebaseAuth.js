import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const auth = getAuth();
const provider = new GoogleAuthProvider();

function logWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      document.getElementById("login").style.display = "none";
      document.getElementById("notes").style.display = "block";
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

function logWithEmail(emailUser, passwordUser) {
  console.log("email", emailUser.value);
  const email = emailUser.value;
  const password = passwordUser.value;

  console.log(email, password);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("login").style.display = "none";
      document.getElementById("notes").style.display = "block";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export { logWithGoogle, logWithEmail };
