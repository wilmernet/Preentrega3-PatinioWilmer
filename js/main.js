let sidebar = document.querySelector(".sidebar");
let tablero = document.querySelector(".tablero");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
//------ inicio de sesión
let sesionOnBtn= document.getElementById("sesionOnBtn");
let nombUsuario= document.getElementById("nombUsuario");
let passbUsuario= document.getElementById("passUsuario");
let campoPassword= document.getElementById("entradaPass");
let tituloInicioSesion= document.getElementById("tituloInicioSesion");
let formInicioSesion=document.getElementById("formInicioSesion");
//------- Donantes
let listadoDonantes= document.getElementById("listadoDonantes");
let textoTotalDonantes=document.getElementById("textoTotalDonantes");
//------- Donaciones
let listaDonaciones= document.getElementById("listaDonaciones");
let detalleDonacion= document.getElementById("detalleDonacion");
let textoTotal=document.getElementById("textoTotalAportes");
//------- Donar
let listaDesplegableAnimales= document.getElementById("listaDesplegableAnimales");
let nuevaDonacionBtn= document.getElementById("nuevaDonacionBtn");
//------- Animales
let animalesActivos= document.getElementById("animalesActivos");
//------- secciones del menú desplegable
let menuItem = document.getElementsByClassName("menuItem");
let seccion = document.getElementsByClassName("seccion");
let opcionSegunRol = document.getElementsByClassName("opcionSegunRol");


// ==================================  cargar las secciones del menú de opciones ==================================
for (let index = 0; index < menuItem.length; index++) {  
  menuItem[index].addEventListener("click", (event) => {
    //hace invisible todas las secciones
    for (let i = seccion.length-1; i >= 0; i--) {
      seccion[i].classList.replace("visible", "invisible");                 
    }
    //se enciede la sección sobre la que se hizo click
    seccion[index].classList.contains("visible")?seccion[index].classList.replace("visible", "invisible"):seccion[index].classList.replace("invisible", "visible");          
  });    
}
menuItem[0].click(); // muestra la presentación de la aplicación (opción inicio)

// ----------- opciones del menú según el rol
let activarOpMenu=(itemDelMenuHabilitadas)=>{
  //apaga todos los items del menu
  for (let index = 0; index < opcionSegunRol.length; index++) {
    const element = opcionSegunRol[index];
    element.classList.replace("visible","invisible");
  }
  //enciende solo los requeridos
  for (let index = 0; index < itemDelMenuHabilitadas.length; index++) {
    const element = opcionSegunRol[itemDelMenuHabilitadas[index]];
    element.classList.replace("invisible","visible");
  }
};

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  tablero.classList.toggle("open");
  menuBtnChange(); //Función que se ejecuta al hacer click en buscar
});

searchBtn.addEventListener("click", () => {
  // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  tablero.classList.toggle("open");
  menuBtnChange(); //Función que se ejecuta al hacer click en buscar
});

//  ---------- FUNCIONES INVOCADAS EN EL MENU ---------------
function menuBtnChange() {
  sidebar.classList.contains("open")?closeBtn.classList.replace("bx-menu", "bx-left-indent"):closeBtn.classList.replace("bx-left-indent", "bx-menu");  
}

// ================================== cargar datos iniciales en el STORAGE ==================================

class Donacion{
  constructor(id, fecha, cantidad){
      this.id=id || 0;                // identificador del animal al que dona si el identificador es 0 será para cualquier animal
      this.fecha=fecha || new Date();  // fecha de la donación
      this.cantidad=cantidad || "0";  // cantidad de dinero 
  }
}

class animal{
  constructor(info){
    this.id=info.id;
    this.nombreComun=info.nombreComun;
    this.especie= info.especie;        
    this.sexo= info.sexo;
    this.edad= info.edad;        
    this.img= info.img;        
  }

  toString(){
    return `ID: ${this.id} - ${this.especie} - ${(this.sexo?"macho":"hembra")} - ${this.edad} años`;      
  }
  
}
const cargarDatos=()=>{
  const listadoAnimales=[
    new animal({id:1,nombreComun:"Danta", especie: "TapirusTerrestris",  sexo:true, edad:1, img:"./img/danta1.webp"}),
    new animal({id:2,nombreComun:"Danta", especie: "TapirusTerrestris",  sexo:true, edad:2, img:"./img/danta2.jpeg"}),
    new animal({id:3,nombreComun:"Danta", especie: "TapirusTerrestris",  sexo:true, edad:3, img:"./img/danta3.jpeg"}),
    new animal({id:4,nombreComun:"Mono ahuyador", especie: "Alouatta Seniculus", sexo:false, edad:1, img:"./img/monoAhuyador1.jpeg"}),
    new animal({id:5,nombreComun:"Mono ahuyador", especie: "Alouatta Seniculus", sexo:false, edad:3, img:"./img/monoAhuyador2.jpeg"}),
    new animal({id:6,nombreComun:"Jaguar", especie: "Panthera Onca", sexo:true, edad:2, img:"./img/jaguar1.jpeg"}),
    new animal({id:7,nombreComun:"Jaguar", especie: "Panthera Onca", sexo:true, edad:4, img:"./img/jaguar2.jpeg"}),
    new animal({id:8,nombreComun:"Guacamaya Bandera", especie: "Ara Macao", sexo:false, edad:3, img:"./img/guacamayaBandera1.jpeg"}),
    new animal({id:9,nombreComun:"Guacamaya Bandera", especie: "Ara Macao", sexo:true, edad:6, img:"./img/guacamayaBandera2.jpeg"}),
    new animal({id:10,nombreComun:"Guacamaya Bandera", especie: "Ara Macao", sexo:true, edad:5, img:"./img/guacamayaBandera3.jpeg"}),
    new animal({id:11,nombreComun:"Charapa", especie: "Podocnemis Xpansa",sexo:true, edad:1, img:"./img/charapa1.jpeg"}),
    new animal({id:12,nombreComun:"Charapa", especie: "Podocnemis Xpansa",sexo:true, edad:2, img:"./img/charapa2.jpeg"}),
    new animal({id:13,nombreComun:"Charapa", especie: "Podocnemis Xpansa",sexo:true, edad:3, img:"./img/charapa3.avif"}),
    new animal({id:14,nombreComun:"Charapa", especie: "Podocnemis Xpansa",sexo:true, edad:4, img:"./img/charapa4.jpeg"}),
  ];
  
  const usuarios=[
    {user:"wilmer", pass:"123abc",nombres:"Wilmer Arley",apellidos:"Patiño Perdomo" ,cel:"3118121696", email:"wilmer@mail.com",donaciones:[new Donacion(1,"2023-11-13",150),new Donacion(2,"2023-10-13",120)]},
    {user:"emmy", pass:"124abc",nombres:"Emmy Johanna",apellidos:"Cruz Trujillo" ,cel:"3100001213", email:"emmy@mail.com",donaciones:[]},
    {user:"stefania", pass:"125abc",nombres:"Stefanía",apellidos:"Patiño Cruz" ,cel:"3134325657", email:"stefania@mail.com",donaciones:[]},
    {user:"salome", pass:"126abc",nombres:"Salomé",apellidos:"Patiño Cruz" ,cel:"3126547890", email:"salome@mail.com",donaciones:[]},
    {user:"santiago", pass:"127abc",nombres:"Santiago",apellidos:"Patiño Cruz" ,cel:"3100001232", email:"santiago@mail.com",donaciones:[]}
  ]
  localStorage.clear();
  localStorage.setItem("animales", JSON.stringify(listadoAnimales));
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("logueado",0);
};

window.addEventListener('load', ()=>{
  cargarDatos()
  activarOpMenu([1,2]);
});


//  ============== FUNCIONES DE LA APLICACIÓN ===================

// ------- ABRIR y CERRAR sesión -----------
const sesion = (log) => {
  if (log != 0) {
    if (confirm("   === SESIÓN ACTIVA ===  \n¿Desea CERRAR la Sesión?")) {      
      activarOpMenu([1,2]);      
      return 0;
    }else{
      activarOpMenu([0,1,2,3,4,6]);      
      return localStorage.getItem("logueado");
    }
  } else {      
    let usuarioIngresado = nombUsuario.value;
    let passIngresado = passbUsuario.value;
    let usuariosCargados=JSON.parse(localStorage.getItem("usuarios"));
    let user = usuariosCargados.find((element) => element.user == usuarioIngresado);
    if (user) {
      if (passIngresado == user.pass) {
        alert("<<< SESION INICIADA CON ÉXITO >>>");
        cargarDonaciones(user.user);        
        cargarDonantes();
        cargarAnimales();
        activarOpMenu([0,1,2,3,4,6]);        
        return user.user;
      } else {
        alert("ERROR al validar la contraseña");
      }
    } else {
      alert("ERROR al validar el usuario");
    }
    activarOpMenu([1,2]);
    return 0;
  }
};

sesionOnBtn.addEventListener("click", (event) => {
  let loginOnOff=localStorage.getItem("logueado");  
  loginOnOff=sesion(loginOnOff);  
  localStorage.setItem("logueado",loginOnOff);
  if(loginOnOff!=0){
    sesionOnBtn.innerHTML="Cerrar Sesión";
    campoPassword.classList.add("invisible");
    tituloInicioSesion.innerHTML="SESIÓN INICIADA";    
  }else{
    sesionOnBtn.innerHTML="Iniciar Sesión";
    tituloInicioSesion.innerHTML="INICIAR SESIÓN";
    campoPassword.classList.remove("invisible");    
    formInicioSesion.reset();
  }
});

// ------------ VER DONACIONES --------------

let cargarDonaciones= idUser=>{    
  let donacionesCargadas=buscarDonaciones(idUser);
  //borrar todos los li de la lista
  let itemsDonaciones=listaDonaciones.children;
  for (let index = itemsDonaciones.length-1; index >= 0; index--) {
    listaDonaciones.removeChild(itemsDonaciones[index]);    
  }
  //cargar los li en la lista según las donaciones guardadas
  for (let donacion of donacionesCargadas) {            
    let animalesEncontrado=buscarAnimal(donacion.id);
    let createOption= document.createElement("option");
    createOption.innerHTML=`${animalesEncontrado.nombreComun} (ID:${animalesEncontrado.id}) - ${donacion.fecha} COP$${donacion.cantidad}`;  
    listaDonaciones.appendChild(createOption);
  }
  //totalizar las donaciones
  let totalAportes= donacionesCargadas.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0);  
  textoTotal.innerHTML=totalAportes;
  detalleDonacion.innerHTML="";
};

document.getElementById('listaDonaciones').addEventListener('change', function(event) {
  var select = this;
  var selectedIndex = select.selectedIndex;
  var selectedOption = select.options[selectedIndex];
  var selectedText = selectedOption.text;
  // console.log('Selected text:', selectedText);
  // console.log('Selected text:', selectedOption);
  // console.log('Selected text:', selectedIndex);
  let createOption= document.createElement("option");
  let usuarioLogueado=localStorage.getItem("logueado");  
  let donado=buscarDonaciones(usuarioLogueado);
  let itemSeleccionado=donado[selectedIndex];
  let animal=buscarAnimal(itemSeleccionado.id);  
  detalleDonacion.innerHTML=`Aporte realizado el ${itemSeleccionado.fecha} por la suma de $${itemSeleccionado.cantidad} con destino a atender: ${animal.nombreComun} identificada con ID:${animal.id}`;
});

// ------------ VER DONANTES --------------

let cargarDonantes= ()=>{    
  let donantesCargados=JSON.parse(localStorage.getItem("usuarios"));
  //borrar todos los li de la lista
  let itemsDonantes=listadoDonantes.children;
  for (let index = itemsDonantes.length-1; index >= 0; index--) {
    listadoDonantes.removeChild(itemsDonantes[index]);    
  }
  //cargar los li en la lista según las donaciones guardadas
  for (let donante of donantesCargados) {            
    let createOption= document.createElement("option");
    createOption.innerHTML=`Donante: ${donante.nombres} ${donante.apellidos} - Celular: ${donante.cel} - Correo electrónico: ${donante.email}`;  
    listadoDonantes.appendChild(createOption);
  }
  //totalizar las donaciones
  let totalDonantes= donantesCargados.reduce((contador, elemento) => contador + 1, 0);  
  textoTotalDonantes.innerHTML=totalDonantes; 
};

// ------- DONAR  -----------

let cargarListaAnimales= ()=>{    
  let animalesCargados=JSON.parse(localStorage.getItem("animales"));
  //borrar todos los li de la lista
  let itemsAnimales=listaDesplegableAnimales.children;
  for (let index = itemsAnimales.length-1; index >= 0; index--) {
    listaDesplegableAnimales.removeChild(itemsAnimales[index]);    
  }
  //cargar los li en la lista según las donaciones guardadas
  for (let animal of animalesCargados) {            
    let createOption= document.createElement("option");
    createOption.innerHTML=`${animal.nombreComun} (ID:${animal.id})`;  
    listaDesplegableAnimales.appendChild(createOption);
  }
};


let cargarAnimales=()=>{
  let animales=JSON.parse(localStorage.getItem("animales"));
  
  for (let index = 0; index < animales.length; index++) {
    let nuevoAnimal= document.createElement("div");
    nuevoAnimal.innerHTML=`<p>${animales[index].nombreComun}</p> 
    <p><b>ID: ${animales[index].id}</b></p> 
    <p>Especie: ${animales[index].especie}</p>
    <p>Sexo: ${(animales[index].sexo)?"Macho":"Hembra"}</p>
    <p>Edad: ${animales[index].edad} años</p>
    <img class="imgAnimal" src="${animales[index].img}">`;
    nuevoAnimal.className="contenedorAnimalNuevo";
    animalesActivos.appendChild(nuevoAnimal);
  }
};

// ------------ filtros ------------
const buscarAnimal=(id)=>{
  let animales=JSON.parse(localStorage.getItem("animales"));
  return animales.find((element)=>element.id==id);
};

const buscarUsuario=(user)=>{
  let usuariosCargados=JSON.parse(localStorage.getItem("usuarios"));
  let encontrados=usuariosCargados.find((element) => element.user == user);  
  return encontrados;
};

const buscarDonaciones=(idUser)=>{
  let encontrados=buscarUsuario(idUser);
  return encontrados.donaciones;
}