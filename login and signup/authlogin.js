import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBRBCagCOIVBSduqSBwPJdhjkzGJiUh9wU",
    authDomain: "thenaaristation.firebaseapp.com",
    projectId: "thenaaristation",
    storageBucket: "thenaaristation.appspot.com",
    messagingSenderId: "459976345694",
    appId: "1:459976345694:web:3c07ee7a44a77240ff8ccf",
    measurementId: "G-ZMS9EYRNT4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const database= getDatabase();



 //.......login........//
 document.getElementById("login").addEventListener("click",(e)=>{
    e.preventDefault();

    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      alert("success");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("failed");

    });
    
  });