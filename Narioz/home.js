// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js";
import { getDatabase, get, set, child, ref, update, remove } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBRBCagCOIVBSduqSBwPJdhjkzGJiUh9wU",
    authDomain: "thenaaristation.firebaseapp.com",
    databaseURL: "https://thenaaristation-default-rtdb.firebaseio.com",
    projectId: "thenaaristation",
    storageBucket: "thenaaristation.appspot.com",
    messagingSenderId: "459976345694",
    appId: "1:459976345694:web:3c07ee7a44a77240ff8ccf",
    measurementId: "G-ZMS9EYRNT4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const realdb = getDatabase();


    // import{getDatabase, ref, get, set, child, update, remove}
    // from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js"

    const db = getDatabase()

    var namebox = document.getElementById("Namebox");
    var rollbox = document.getElementById("Rollbox");
    var secbox = document.getElementById("Secbox");
    var genbox = document.getElementById("Genbox");

    var insBtn = document.getElementById("Inst");
    var selBtn = document.getElementById("Sel");
    var updtBtn = document.getElementById("Updt");
    var delBtn = document.getElementById("Del");
    var rand;
    //------------------Insert data fun.-------------------------//
    function randomNumber() {
      return Math.floor(Math.random() * 21);
    }

    function InsertData(){
      set(ref(db, "TheStudents/"+ rollbox.value),{
          NameOfStd: namebox.value,
          Rollno: rollbox.value,
          Section: secbox.value,
          Gender: genbox.value,
      })
      //-----------then promise------------//
      .then(()=>{
          alert("data stored successfully");
      })
      .catch(error=>{
          alert("Unsuccessful, error"+error);
      });
  }

  //------------------select data function------------//

      function SelectData(){
          const dbref = ref(db);

          get(child(dbref,"TheStudents/"+ rollbox.value))

          .then((snapshot)=>{
              if(snapshot.exists()){
                  namebox.value = snapshot.val().NameOfStd;
                  secbox.value = snapshot.val().Section;
                  genbox.value = snapshot.val().Gender;
              }

              else{
                  alert("No data found");
              }
          })
          .catch((error)=>{
              alert("Unsuccessful, error"+error); 
          });
          
      }

      function DelData(){
          const dbref = ref(db);
          remove(child(dbref,"TheStudents/"+ rollbox.value))

          .then(()=>{
          alert("data removed successfully");
      })
      .catch(error=>{
          alert("Unsuccessful, error"+error);
      });
      }

      function UpdateData(){
          const dbref = ref(db);
          remove(child(dbref,"TheStudents/"+ rollbox.value))
          set(ref(db, "TheStudents/"+ rollbox.value),{
          NameOfStd: namebox.value,
          Rollno: rollbox.value,
          Section: secbox.value,
          Gender: genbox.value,
      })
      /* function UpdateData(){
          
          update(ref(db, "TheStudents/"+ rollbox.value),{
          NameOfStd: namebox.value,
          Section: secbox.value,
          Gender: genbox.value,
      })
      //  //
      //-----------then promise------------//
      .then(()=>{
          alert("data updated successfully");
      })
      .catch(error=>{
          alert("Unsuccessful, error"+error);
      });
          
      }*/
      //-----------then promise------------//
      .then(()=>{
          alert("data updated successfully");
      })
      .catch(error=>{
          alert("Unsuccessful, error"+error);
      });
          
      }

      //--------------------------------------------------------------------------------
      var files = [];
var reader = new FileReader();

var imgnamebox = document.getElementById("imgnamebox");
var extlab = document.getElementById("extlab");
var myimg0 = document.getElementById("myimg0");
var myimg1 = document.getElementById("myimg1");
var myimg2 = document.getElementById("myimg2");
var myimg3 = document.getElementById("myimg3");
var myimg4 = document.getElementById("myimg4");
var myimg5 = document.getElementById("myimg5");
var myimg6 = document.getElementById("myimg6");
var myimg7 = document.getElementById("myimg7");
var myimg8 = document.getElementById("myimg8");


var proglab = document.getElementById("upprogress");
var SelBtn = document.getElementById("selbtn");
var UpBtn = document.getElementById("upbtn");
var DownBtn = document.getElementById("downbtn");

var input = document.createElement("input");
input.type = 'file';

input.onchange = e => {
  files = e.target.files;

  var extention = GetFileExt(files[0]);
  var name = GetFileName(files[0]);

  imgnamebox.value = name;
  extlab.innerHTML = extention;

  reader.readAsDataURL(files[0]);

}

reader.onload = function () {
  myimg0.src = reader.result;
  myimg1.src = reader.result;
  myimg2.src = reader.result;
  myimg3.src = reader.result;
  myimg4.src = reader.result;
  myimg5.src = reader.result;
  myimg6.src = reader.result;
  myimg7.src = reader.result;
  myimg8.src = reader.result;

}

SelBtn.onclick = function () {
  input.click();
}

function GetFileExt(file) {
  console.log()
  var temp = file.name.split('.');
  var ext = temp.slice((temp.length - 1), (temp.length));
  return '.' + ext[0];
}

function GetFileName(file) {
  var temp = file.name.split('.');
  var fname = temp.slice(0, -1).join('.');
  return fname;
}

// upload process
async function uploadProcess() {
  var ImgToUpload = files[0];

  var ImgName = imgnamebox.value + extlab.innerHTML;

  const metaData = {
    contentType: ImgToUpload.type
  }

  const storage = getStorage();

  const storageRef = sRef(storage, "Images/" + ImgName);
  const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);
  UploadTask.on('state-changed', (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    proglab.innerHTML = "upload " + progress + "%";
  },
  (error)=>{
      alert("error: Image not uploaded");
  },
  ()=>{
    getDownloadURL(UploadTask.snapshot.ref)
    .then((downloadURL)=>{
      SaveURLtoRealtimeDB(downloadURL);
    });
  }
  );

}

// realtime database
function SaveURLtoRealtimeDB(URL){
  var name = imgnamebox.value;   
  var ext = extlab.innerHTML;
  set(ref(realdb, "ImagesLinks/"+rollbox.value),{
    ImageName: (name+ext),
    ImgURL: URL
  });
}

function doSomethingWithRandomNumber(number) {
  console.log("The random number is: " + number);
}


function GetURLfromRealtimeDB0(URL){
  var name = imgnamebox.value;   
  const dbRef = ref(realdb);
  let rand = randomNumber();
  console.log(rand)
  get(child(dbRef,"ImagesLinks/"+rand)).then((snapshot)=>{
    if(snapshot.exists()){
      myimg_0.src = snapshot.val().ImgURL;
    }
  })
}

function GetURLfromRealtimeDB1(URL){
    var name = imgnamebox.value;   
    const dbRef = ref(realdb);
    let rand = randomNumber();
    console.log(rand)
    get(child(dbRef,"ImagesLinks/"+rand)).then((snapshot)=>{
      if(snapshot.exists()){
        myimg_1.src = snapshot.val().ImgURL;
      }
    })
  }
  function GetURLfromRealtimeDB2(URL){
    var name = imgnamebox.value;   
    const dbRef = ref(realdb);
    let rand = randomNumber();
    console.log(rand)
    get(child(dbRef,"ImagesLinks/"+rand)).then((snapshot)=>{
      if(snapshot.exists()){
        myimg_2.src = snapshot.val().ImgURL;
      }
    })
  }
  function GetURLfromRealtimeDB3(URL){
    var name = imgnamebox.value;   
    const dbRef = ref(realdb);
    let rand = randomNumber();
    console.log(rand)
    get(child(dbRef,"ImagesLinks/"+rand)).then((snapshot)=>{
      if(snapshot.exists()){
        myimg_3.src = snapshot.val().ImgURL;
      }
    })
  }
  function GetURLfromRealtimeDB4(URL){
    var name = imgnamebox.value;   
    const dbRef = ref(realdb);
    let rand = randomNumber();
    console.log(rand)
    get(child(dbRef,"ImagesLinks/"+rand)).then((snapshot)=>{
      if(snapshot.exists()){
        myimg_4.src = snapshot.val().ImgURL;
      }
    })
  }
  function GetURLfromRealtimeDB5(URL){
    var name = imgnamebox.value;   
    const dbRef = ref(realdb);
    let rand = randomNumber();
    console.log(rand)
    get(child(dbRef,"ImagesLinks/"+rand)).then((snapshot)=>{
      if(snapshot.exists()){
        myimg_5.src = snapshot.val().ImgURL;
      }
    })
  }
  function GetURLfromRealtimeDB6(URL){
    var name = imgnamebox.value;   
    const dbRef = ref(realdb);
    let rand = randomNumber();
    console.log(rand)
    get(child(dbRef,"ImagesLinks/"+rand)).then((snapshot)=>{
      if(snapshot.exists()){
        myimg_6.src = snapshot.val().ImgURL;
      }
    })
  }
  function GetURLfromRealtimeDB7(URL){
    var name = imgnamebox.value;   
    const dbRef = ref(realdb);
    let rand = randomNumber();
    console.log(rand)
    get(child(dbRef,"ImagesLinks/"+rand)).then((snapshot)=>{
      if(snapshot.exists()){
        myimg_7.src = snapshot.val().ImgURL;
      }
    })
  }
  function GetURLfromRealtimeDB8(URL){
    var name = imgnamebox.value;   
    const dbRef = ref(realdb);
    let rand = randomNumber();
    console.log(rand)
    get(child(dbRef,"ImagesLinks/"+rand)).then((snapshot)=>{
      if(snapshot.exists()){
        myimg_8.src = snapshot.val().ImgURL;
      }
    })
  }
UpBtn.onclick = uploadProcess;
onload =  GetURLfromRealtimeDB0;
onload =  GetURLfromRealtimeDB1;
onload =  GetURLfromRealtimeDB2;
onload =  GetURLfromRealtimeDB3;
onload =  GetURLfromRealtimeDB4;
onload =  GetURLfromRealtimeDB5;
onload =  GetURLfromRealtimeDB6;
onload =  GetURLfromRealtimeDB7;
onload =  GetURLfromRealtimeDB8;

      //-----------------assign events to btns----------------//
      insBtn.addEventListener('click',InsertData);
      selBtn.addEventListener('click',SelectData);
      updtBtn.addEventListener('click',UpdateData);
      delBtn.addEventListener('click',DelData);
