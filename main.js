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
let usuarios = [
    {
        id: 1,
        nombre: "Patricio",
        apellido: "Gallo",
        user: "pato090",
        pass: "Limpiatuerca08",
        gen: "m"
    },
    {
        id: 2,
        nombre: "Adriana",
        apellido: "Correa Zeballos",
        user: "adricorrea",
        pass: "1422",
        gen: "f"
    }
];

//Variables iniciales
let body = document.getElementById("body");
let valor_login = localStorage.getItem("valor_login");

if(valor_login == 1){
    web_inicio();
}else{
    web_login();
}

function web_login(){
    //Inicio body en login
    body.innerHTML = `
        <header>
        <div class="left_container">
            <h1>Smart House</h1>
        </div>
        </header>
        <div class="cuerpo_general">
            <div class="cuerpo_login">
                <div class="formulario_login">
                    <form id="login_form">
                        <label for="user">Usuario</label>
                        <input type="text" id="user" name="user" placeholder="Usuario...">
                    
                        <label for="pass">Contraseña</label>
                        <input type="password" id="pass" name="pass" placeholder="Contraseña...">

                        <input type="submit" value="Enviar">
                        
                        <div class="error_login"> 
                            <p id="e_login"></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <footer>
            <div class="container_footer">
                <p>Copyright © 2023. Designed by</p>
                <a href="">Patricio Gallo</a>
            </div>
        </footer>
    `;

    let login_form = document.getElementById("login_form");
    let e_login = document.getElementById("e_login");
    login_form.addEventListener("submit",validarFormulario);

    function validarFormulario(e){
        e.preventDefault();
        let user = document.getElementById("user").value;
        let pass = document.getElementById("pass").value;
        for(const usuario of usuarios){
            if(user == usuario.user){
                if(pass == usuario.pass){
                    localStorage.setItem("usuario",user);
                    localStorage.setItem("nombre",usuario.nombre);
                    localStorage.setItem("apellido",usuario.apellido);
                    localStorage.setItem("gen",usuario.gen);
                    localStorage.setItem("valor_login",1);
                    web_inicio();
                } else{
                    e_login.innerText = "Contrseña incorrecta, intente nuevamente";
                }
            } else {
                e_login.innerText = "Usuario incorrecto, intente nuevamente";
            }
        }
    }
}
//Web inicio
function web_inicio(){
    
    body.innerHTML= `
    <header>
        <div class="left_container">
            <h1>Smart House</h1>
        </div>
        <div class="right_container">
            <h1>Bienevenido: </h1>
            <h2>${localStorage.getItem("nombre")}</h2>
            <button id="btn_salir">Salir</button>
        </div>
    </header>

    <div class="cuerpo_general">
        <div class="pre_cuerpo_anterior">
            <div class="pre_cuerpo">
                <div class="temperatura">
                    <h1 id="temp">Temperatura: °C</h1>
                </div>
                <div class="boton_alarma">
                    <button id="alarma_boton"><img src="media/boton_alarma_off.png" alt=""></button>
                </div>
                <div class="texto_alarma">
                    <p id="alarma_texto" class="texto_verde"></p>
                </div>
            </div>
        </div>
        <div class="cuerpo_general_row">
            <div class="first_border">
                <div class="second_border">

                    <!-- Dormitorio -->
                    <div class="dormitorio">
                        <div class="dor_cama">
                            <div class="second_dor_cama">
                                <div class="aire_acondicionado">
                                    <button id="aire_acondicionado"><img src="media/aa_apagado.png" alt=""></button>
                                </div>
                                <div class="texto_container_dor"><h1>Dormitorio</h1></div>
                            </div>
                            <div class="tercer_dom_cama">

                            </div>
                        </div>
                        <div class="pasillo">
                            <button id="luz_dormitorio"><img src="media/luz_apagada.png" alt=""></button>
                        </div>
                    </div>

                    <!-- Baño -->
                    <div class="bano">
                        <div class="bano_entero">
                            <div class="second_bano">
                                <div class="hinodoro">
                                    <div class="Hinodoro_interno">
                                        <div class="texto_hinodoro"><h1>Baño</h1></div>
                                        <div class="imagen_luz"><button id="luz_bano"><img src="media/luz_apagada.png" alt=""></button></div>
                                    </div>
                                    <div class="hinodoro_interno_2">
                                    </div>
                                </div>
                            </div>
                            <div class="tercer_hinodoro">
                            </div>
                        </div>
                        <div class="pasillo_hinodoro">
                            <div class="primera_parte_pasillo">
                                <div class="izq_pasillo">
                                    <div class="imagen_puerta_pasillo"><button id="puerta1"><img src="media/campana_apagada.png" alt=""></button></div>
                                    <div class="texto_puerta"><p id="texto_puerta1">Puerta Cerrada</p></div>
                                </div>
                                <div class="puerta_pasillo"></div>
                            </div>
                            <div class="segunda_parte_pasillo">
                                <div class="imagen_luz_pasillo"><button id="luz_pasillo"><img src="media/luz_apagada.png" alt=""></button></div>
                            </div>
                        </div>
                    </div>

                    <!-- Cocina -->
                    <div class="cocina">
                        <div class="cocina_entera">
                            <div class="cocina_lavaropas">
                                <div class="cocina_lavaropas_interno">
                                    <div class="luz_bacha"><button id="luz_cocina_lavarropa"><img src="media/luz_apagada.png" alt=""></button></div>
                                </div>
                                <div class="cocina_lavaropas_pared"></div>                            
                            </div>
                            <div class="cocina_bacha">
                                <div class="bacha_interna">
                                    <div class="texto_bacha"><h1>Cocina</h1></div>
                                    <div class="luz_bacha"><button id="luz_cocina"><img src="media/luz_apagada.png" alt=""></button></div>
                                </div>
                                <div class="bacha_pared"></div>
                            </div>
                        </div>
                        <div class="pasillo_cocina">

                        </div>
                    </div>

                    <!-- Living -->
                    <div class="living">
                        <div class="balcon">
                            <div class="texto_balcon_1"><h1>Balcon</h1></div>
                            <div class="luz_balcon"><button id="luz_balcon2"><img src="media/luz_apagada.png" alt=""></button></div>
                        </div>
                        <div class="living_entero">
                            <div class="living_interno">
                                <div class="living_mesa">
                                    <div class="text_living"><h1>Living</h1></div>
                                    <div class="luz_living"><button id="luz_living"><img src="media/luz_apagada.png" alt=""></button></div>
                                </div>
                                <div class="living_medio">
                                    <div class="box_puerta">
                                        <div class="imagen_puerta"><button id="puerta2"><img src="media/campana_apagada.png" alt=""></button></div>
                                        <div class="texto_puerta">
                                            <p id="texto_puerta2"></p>
                                            <p id="horas_puerta2"></p>
                                            <p id="fecha_puerta2"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="living_derecha">
                                    <div class="living_puerta"></div>
                                </div>
                            </div>
                            <div class="balcon_primario">
                                <div class="balcon_pimario_interno">
                                    <div class="texto_balcon"><h1>Balcon</h1></div>
                                    <div class="luz_balcon_interno"><button id="luz_balcon"><img src="media/luz_apagada.png" alt=""></button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Fin living -->
                </div>
            </div>
        </div>
    </div>
    <footer>
        <div class="container_footer">
            <p>Copyright © 2023. Designed by</p>
            <a href="">Patricio Gallo</a>
        </div>
    </footer>

    `;
    
    let btn_salir = document.getElementById("btn_salir");
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
    let temp = document.getElementById("temp");
    let alarma_boton = document.getElementById("alarma_boton");
    let alarma_texto = document.getElementById("alarma_texto");
    let horas_puerta2 = document.getElementById("horas_puerta2");
    let fecha_puerta2 = document.getElementById("fecha_puerta2");

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
    let temp_dato =0 ;
    let alarma_boton_on = 0;
    let hora_puerta2 =0;
    let minutos_puerta2 = 0;
    let dia_puerta2 = 0;
    let mes_puerta2 = 0;
    let ano_puerta2 = 0;

    //Agrego eventos de lecturas de cada componente en firebase
    //Luz dormitorio
    onValue(ref(db, '/luz_dormitorio/estado'), (snapshot) => { 
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
    //temperatura 
    onValue(ref(db, 'ESP32_TFT/temperatura'), (snapshot) => {
        temp_dato = snapshot.val();
        cambio_temperatura();
    });
    //boton de alarma 
    onValue(ref(db, 'llave_living/puerta2/boton_alarma'), (snapshot) => {
        alarma_boton_on = snapshot.val();
        cambio_boton_alarma();
    });
    //hora de apertura de puerta2 
    onValue(ref(db, 'llave_living/puerta2/hora'), (snapshot) => {
        hora_puerta2 = snapshot.val();
        cambio_puerta2();
    });
    //minutos de apertura de puerta2 
    onValue(ref(db, 'llave_living/puerta2/minutos'), (snapshot) => {
        minutos_puerta2 = snapshot.val();
        cambio_puerta2();
    });
    //dia de apertura de puerta2  
    onValue(ref(db, 'llave_living/puerta2/dia'), (snapshot) => {
        dia_puerta2 = snapshot.val();
        cambio_puerta2();
    });
    //mes de apertura de puerta2 
    onValue(ref(db, 'llave_living/puerta2/mes'), (snapshot) => {
        mes_puerta2 = snapshot.val();
        cambio_puerta2();
    });
    //ano de apertura de puerta2 
    onValue(ref(db, 'llave_living/puerta2/ano'), (snapshot) => {
        ano_puerta2 = snapshot.val();
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
    alarma_boton.addEventListener("click",respuesta_boton_alarma);
    btn_salir.addEventListener("click",respuesta_boton_salir);

    //Funciones
    function respuesta_luz_dormitorio(){
        if(l_dormitorio == 0){
            set(ref(db, '/luz_dormitorio'), { 
                estado: 1,
            });
        } else if (l_dormitorio == 1){ 
            set(ref(db, '/luz_dormitorio'), {
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
            set(ref(db, 'llave_living/luz_balcon'), {
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
            set(ref(db, 'llave_living/luz_living'), {
                estado: 0,
            });
        } 
    }

    function respuesta_boton_alarma(){
        if(alarma_boton_on == 0){
            set(ref(db, 'llave_living/puerta2/boton_alarma'),1);
        } else if (alarma_boton_on == 1){ 
            set(ref(db, 'llave_living/puerta2/boton_alarma'),0);
        }  
    }

    //EMPIEZAN LOS CAMBIOS
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
            if(alarma_boton_on == 1){
                texto_puerta1.innerText = "PUERTA ABIERTA CON ALARMA";
                alarma_texto.className = "texto_rojo";
                alarma_texto.innerText = "ATENCION: PUERTA ABIERTA!!";
            } else if (alarma_boton_on == 0){
                texto_puerta1.innerText = "Puerta Abierta";
            }
        }  
    }

    function cambio_puerta2(){
        if(puerta2_on == 0){
            puerta2.innerHTML = "<img src=\"media/campana_apagada.png\">";
            texto_puerta2.innerText = "Puerta Cerrada";
            if(minutos_puerta2 < 10){
                horas_puerta2.innerText = `${hora_puerta2}:0${minutos_puerta2}`;
            } else{
                horas_puerta2.innerText = `${hora_puerta2}:${minutos_puerta2}`;
            }
            fecha_puerta2.innerText = `${dia_puerta2}/${mes_puerta2}/${ano_puerta2}`;
        } else if (puerta2_on == 1){ 
            puerta2.innerHTML = "<img src=\"media/campana_encendida.png\">";
            if(alarma_boton_on == 1){
                texto_puerta2.innerText = "PUERTA ABIERTA CON ALARMA";
                alarma_texto.className = "texto_rojo";
                alarma_texto.innerText = "ATENCION: PUERTA ABIERTA!!";
                horas_puerta2.innerText = "";
                fecha_puerta2.innerText = "";
            } else if (alarma_boton_on == 0){
                texto_puerta2.innerText = "Puerta Abierta";
                horas_puerta2.innerText = "";
                fecha_puerta2.innerText = "";
            }
        }  
    }

    function cambio_temperatura(){
        temp.innerText = `Temperatura: ${temp_dato}°C`;
    }

    function cambio_boton_alarma(){
        if(alarma_boton_on == 0){
            alarma_boton.innerHTML = "<img src=\"media/boton_alarma_off.png\">";
            alarma_texto.innerText = "";
            if(puerta2_on == 1){
                alarma_texto.className = "texto_rojo";
                alarma_texto.innerText = "ATENCION: PUERTA ABIERTA CON ALARMA!!";
            } else if (puerta2_on == 0){
                alarma_texto.innerText = "";
            }
        } else if (alarma_boton_on == 1){ 
            alarma_boton.innerHTML = "<img src=\"media/boton_alarma_on.png\">";
            if(puerta2_on == 1){
                alarma_texto.className = "texto_rojo";
                alarma_texto.innerText = "ATENCION: PUERTA ABIERTA CON ALARMA!!";
            } else if (puerta2_on == 0){
                alarma_texto.className = "texto_verde";
                alarma_texto.innerText = "ALARMA ENCENDIDA";
            }
        }  
    }

    function respuesta_boton_salir(){
        localStorage.clear();
        web_login();
    }
}//fin web de inicio  

