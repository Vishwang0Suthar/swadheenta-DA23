import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { set,ref,getDatabase} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
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
  const database= getDatabase();
  const auth = getAuth();





//....... signup......//
document.getElementById("signup").addEventListener("click",(e)=>{
    e.preventDefault();

    var email = document.getElementById("signupEmail").value;
    var password = document.getElementById("signupPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  
    const user = userCredential.user;

        set(ref(database, "users/" + user.uid),
    {
      email: email,
    })

    alert("success");
    
  })

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   
    alert("failed");
  });
});