// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { 
    apiKey: "AIzaSyDDBZb7bdQUdV4U07HNa5fcLsb69s609lI",
    authDomain: "domotica-f5797.firebaseapp.com",
    databaseURL: "https://domotica-f5797-default-rtdb.firebaseio.com",
    projectId: "domotica-f5797",
    storageBucket: "domotica-f5797.appspot.com",
    messagingSenderId: "294667936119",
    appId: "1:294667936119:web:45bd9156c81864a794c172",
    measurementId: "G-QPCQ29YBJY"
  };
//IMPORTANTE
//Para toda escritura y lectura se utilizo la guia de firebase RealTime Database https://firebase.google.com/docs/database/web/read-and-write?hl=es-419

// Initialize Firebase
const app = initializeApp(firebaseConfig); //inicializo la app con la configuracion extraida de firebase
const db = getDatabase(app); //creo la base de datos
let data = 0;

const ref_db = ref(db, '/ESP32_TFT/estado'); //referencia de mi base de datos
onValue(ref_db, (snapshot) => {
    data = snapshot.val();
    //console.log(data);
});