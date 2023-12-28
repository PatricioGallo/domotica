//CONEXION CON FIREBASE
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue , set} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

//Variables
let luz_dormitorio = document.getElementById("luz_dormitorio");
let aire_acondicionado = document.getElementById("aire_acondicionado");
let luz_pasillo = document.getElementById("luz_pasillo");
let luz_bano = document.getElementById("luz_bano");
let luz_cocina = document.getElementById("luz_cocina");
let luz_cocina_lavarropa = document.getElementById("luz_cocina_lavarropa");
let luz_balcon = document.getElementById("luz_balcon");
let luz_balcon2 = document.getElementById("luz_balcon2");
let luz_living = document.getElementById("luz_living");
let puerta1 = document.getElementById("puerta1");
let puerta2 = document.getElementById("puerta2");
let texto_puerta1 = document.getElementById("texto_puerta1");
let texto_puerta2 = document.getElementById("texto_puerta2");


let l_dormitorio = 0;
let on_aa = 0;
let l_pasillo = 0;
let l_bano = 0;
let l_cocina = 0;
let l_cocina_l = 0;
let l_balcon = 0;
let l_balcon2 = 0;
let l_living = 0;
let puerta1_on = 0;
let puerta2_on = 0;

//Agrego eventos de lecturas de cada componente en firebase

//Luz dormitorio
onValue(ref(db, '/ESP32_TFT/estado'), (snapshot) => { //TODO original /luz_dormitorio/estado
    l_dormitorio = snapshot.val(); 
    cambio_luz_dormitorio();
});
//aire acondicionado 
onValue(ref(db, '/aire_acondicionado/estado'), (snapshot) => {
    on_aa = snapshot.val();
    cambio_aire_acondicionado();
});
//Luz cocina 
onValue(ref(db, 'llave_cocina/luz_cocina/estado'), (snapshot) => {
    l_cocina = snapshot.val();
    cambio_luz_cocina();
});
//Luz cocina lavarropas
onValue(ref(db, 'llave_cocina/luz_cocina_lavarropa/estado'), (snapshot) => {
    l_cocina_l = snapshot.val();
    cambio_luz_cocina_lavaropa();
});
//l_balcon
onValue(ref(db, 'llave_living/luz_balcon/estado'), (snapshot) => {
    l_balcon = snapshot.val();
    cambio_luz_balcon();
});
//l_balcon2 
onValue(ref(db, 'llave_cocina/luz_balcon2/estado'), (snapshot) => {
    l_balcon2 = snapshot.val();
    cambio_luz_balcon2();
});
//l_living 
onValue(ref(db, 'llave_living/luz_living/estado'), (snapshot) => {
    l_living = snapshot.val();
    cambio_luz_living();
});
//puerta1_on 
onValue(ref(db, '/puerta1/estado'), (snapshot) => {
    puerta1_on = snapshot.val();
    cambio_puerta1();
});
//puerta2_on 
onValue(ref(db, 'llave_living/puerta2/estado'), (snapshot) => {
    puerta2_on = snapshot.val();
    cambio_puerta2();
});

//Llamdao a funciones
luz_dormitorio.addEventListener("click",respuesta_luz_dormitorio);
aire_acondicionado.addEventListener("click",respuesta_aire_acondicionado);
luz_pasillo.addEventListener("click",respuesta_luz_pasillo);
luz_bano.addEventListener("click",respuesta_luz_bano);
luz_cocina.addEventListener("click",respuesta_luz_cocina);
luz_cocina_lavarropa.addEventListener("click",respuesta_luz_cocina_lavarropa);
luz_balcon.addEventListener("click",respuesta_luz_balcon);
luz_balcon2.addEventListener("click",respuesta_luz_balcon2);
luz_living.addEventListener("click",respuesta_luz_living);
puerta1.addEventListener("click",respuesta_puerta1);
puerta2.addEventListener("click",respuesta_puerta2);


//Funciones
function respuesta_luz_dormitorio(){
    if(l_dormitorio == 0){
        set(ref(db, '/ESP32_TFT'), { // TODO original /luz_dormitorio
            estado: 1,
          });
    } else if (l_dormitorio == 1){ 
        set(ref(db, '/ESP32_TFT'), {
            estado: 0,
          });
    }
}

function respuesta_aire_acondicionado(){
    if(on_aa == 0){
        set(ref(db, '/aire_acondicionado'), {
            estado: 1,
          });
    } else if (on_aa == 1){ 
        set(ref(db, '/aire_acondicionado'), {
            estado: 0,
          });
    }
}

function respuesta_luz_pasillo(){
    if(l_pasillo == 0){
        luz_pasillo.innerHTML = "<img src=\"media/luz_encendida.png\">";
        l_pasillo = 1;
    } else if (l_pasillo == 1){ 
        luz_pasillo.innerHTML = "<img src=\"media/luz_apagada.png\">";
        l_pasillo = 0;
    }
}

function respuesta_luz_bano(){
    if(l_bano == 0){
        luz_bano.innerHTML = "<img src=\"media/luz_encendida.png\">";
        l_bano = 1;
    } else if (l_bano == 1){ 
        luz_bano.innerHTML = "<img src=\"media/luz_apagada.png\">";
        l_bano = 0;
    } 
}

function respuesta_luz_cocina(){
    if(l_cocina == 0){
        set(ref(db, 'llave_cocina/luz_cocina'), {
            estado: 1,
          });
    } else if (l_cocina == 1){ 
        set(ref(db, 'llave_cocina/luz_cocina'), {
            estado: 0,
          });
    } 
}

function respuesta_luz_cocina_lavarropa(){
    if(l_cocina_l == 0){
        set(ref(db, 'llave_cocina/luz_cocina_lavarropa'), {
            estado: 1,
          });
    } else if (l_cocina_l == 1){ 
        set(ref(db, 'llave_cocina/luz_cocina_lavarropa'), {
            estado: 0,
          });
    } 
}

function respuesta_luz_balcon(){
    if(l_balcon == 0){
        set(ref(db, 'llave_living/luz_balcon'), {
            estado: 1,
          });
    } else if (l_balcon == 1){ 
        set(ref(db, '/luz_balcon'), {
            estado: 0,
          });
    } 
}

function respuesta_luz_balcon2(){
    if(l_balcon2 == 0){
        set(ref(db, 'llave_cocina/luz_balcon2'), {
            estado: 1,
          });
    } else if (l_balcon2 == 1){ 
        set(ref(db, 'llave_cocina/luz_balcon2'), {
            estado: 0,
          });
    } 
}

function respuesta_luz_living(){
    if(l_living == 0){
        set(ref(db, 'llave_living/luz_living'), {
            estado: 1,
          });
    } else if (l_living == 1){ 
        set(ref(db, '/luz_living'), {
            estado: 0,
          });
    } 
}

function respuesta_puerta1(){
    if(puerta1_on == 0){
        set(ref(db, '/puerta1'), {
            estado: 1,
          });
    } else if (puerta1_on == 1){ 
        set(ref(db, '/puerta1'), {
            estado: 0,
          });
    }  
}

function respuesta_puerta2(){
    if(puerta2_on == 0){
        set(ref(db, 'llave_living/puerta2'), {
            estado: 1,
          });
    } else if (puerta2_on == 1){ 
        set(ref(db, 'llave_living/puerta2'), {
            estado: 0,
          });
    }  
}

function cambio_luz_dormitorio(){
    if(l_dormitorio == 0){
        luz_dormitorio.innerHTML = "<img src=\"media/luz_apagada.png\">";
    } else if (l_dormitorio == 1){ 
        luz_dormitorio.innerHTML = "<img src=\"media/luz_encendida.png\">";
    }
}

function cambio_aire_acondicionado(){
    if(on_aa == 0){
        aire_acondicionado.innerHTML = "<img src=\"media/aa_apagado.png\">";
    } else if (on_aa == 1){ 
        aire_acondicionado.innerHTML = "<img src=\"media/aa_encendido.png\">";
    }
}

function cambio_luz_cocina(){
    if(l_cocina == 0){
        luz_cocina.innerHTML = "<img src=\"media/luz_apagada.png\">";
    } else if (l_cocina == 1){ 
        luz_cocina.innerHTML = "<img src=\"media/luz_encendida.png\">";
   } 
}

function cambio_luz_cocina_lavaropa(){
    if(l_cocina_l == 0){
        luz_cocina_lavarropa.innerHTML = "<img src=\"media/luz_apagada.png\">";
    } else if (l_cocina_l == 1){ 
        luz_cocina_lavarropa.innerHTML = "<img src=\"media/luz_encendida.png\">";
   } 
}

function cambio_luz_balcon(){
    if(l_balcon == 0){
        luz_balcon.innerHTML = "<img src=\"media/luz_apagada.png\">";
    } else if (l_balcon == 1){ 
        luz_balcon.innerHTML = "<img src=\"media/luz_encendida.png\">";
    } 
}

function cambio_luz_balcon2(){
    if(l_balcon2 == 0){
        luz_balcon2.innerHTML = "<img src=\"media/luz_apagada.png\">";
    } else if (l_balcon2 == 1){ 
        luz_balcon2.innerHTML = "<img src=\"media/luz_encendida.png\">";
    } 
}

function cambio_luz_living(){
    if(l_living == 0){
        luz_living.innerHTML = "<img src=\"media/luz_apagada.png\">";
    } else if (l_living == 1){ 
        luz_living.innerHTML = "<img src=\"media/luz_encendida.png\">";
    } 
}

function cambio_puerta1(){
    if(puerta1_on == 0){
        puerta1.innerHTML = "<img src=\"media/campana_apagada.png\">";
        texto_puerta1.innerText = "Puerta Cerrada";
    } else if (puerta1_on == 1){ 
        puerta1.innerHTML = "<img src=\"media/campana_encendida.png\">";
        texto_puerta1.innerText = "Puerta Abierta";
    }  
}

function cambio_puerta2(){
    if(puerta2_on == 0){
        puerta2.innerHTML = "<img src=\"media/campana_apagada.png\">";
        texto_puerta2.innerText = "Puerta Cerrada";
    } else if (puerta2_on == 1){ 
        puerta2.innerHTML = "<img src=\"media/campana_encendida.png\">";
        texto_puerta2.innerText = "Puerta Abierta";
    }  
}