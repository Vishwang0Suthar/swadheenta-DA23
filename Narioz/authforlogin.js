import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCaxDXZ7yHbDY6X2op98f-Tl9-sA_OaJUU",
  authDomain: "wedd-66ff7.firebaseapp.com",
  databaseURL: "https://wedd-66ff7-default-rtdb.firebaseio.com",
  projectId: "wedd-66ff7",
  storageBucket: "wedd-66ff7.appspot.com",
  messagingSenderId: "781349163439",
  appId: "1:781349163439:web:bb90844fc07a5012205f5a",
  measurementId: "G-FK8STGF2BX"
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
      window.open('./pageafterlogin.html')
      alert("success");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("failed");
      // M.toast({html: error.message,classes:"white"})
  })
  // email.value = "value"
  // password.value = "value"
  // M.Modal.getInstance(myModel[0]).close()
 });

  