"use strict";

function formAcceso(corr = true){
    limpiar();
    if(document.cookie){
        formPopulate();
    } else {
        var main = document.getElementById("main");
        main.setAttribute("class", "container");

        var divForm = document.createElement("div");
        divForm.setAttribute("id", "divForm");
        main.appendChild(divForm);

        var formulario = document.createElement("form");
        formulario.setAttribute("name", "acceso");
        formulario.setAttribute("class", "form-horizontal");
        divForm.appendChild(formulario);

        var user = crearInput("Usuario", "user", "text", formulario);
        formulario.appendChild(user);
        var pass = crearInput("Contraseña", "pass", "password", formulario);
        formulario.appendChild(pass);

        var comp = crearButton(acceso(),"Acceder");
        formulario.appendChild(comp);

        var p = document.createElement("p");
        p.setAttribute("id", "salida");
        p.setAttribute("class", "h3");
        if(corr == false){
            p.setAttribute("style", "color:red");
            p.innerHTML = "Usuario o contraseña incorrectos.";
        }
        formulario.appendChild(p); 
    }
}
function acceso(){
    return function(){
        var user = document.forms["acceso"]["user"].value;
        var pass = document.forms["acceso"]["pass"].value;
        var p = document.getElementById("salida");
        var corr = false;
         
        if (user === "prueba" && pass === "prueba"){
            document.cookie = "username="+user;
            formPopulate();
        }else{
            formAcceso(corr);
        } 
    }   
}

function formPopulate(){
    limpiar();
    
    var main = document.getElementById("main");
    main.setAttribute("class", "container");
    
    document.getElementById("Acceso").innerHTML = "Cerrar Sesión";
    document.getElementById("Acceso").setAttribute("onclick", "cerrarSesion();")
    
    var p = document.createElement("h2"); 
    p.innerHTML = "Bienvenido, usuario: "+ document.cookie;
    main.appendChild(p);
    
    
}

function crearInput(label, nombre, tipo){
    var div = document.createElement("div");
    div.setAttribute("class", "form-group");
        
    var lab = document.createElement("label");
    lab.setAttribute("for", nombre);
    lab.appendChild(document.createTextNode(label));
    div.appendChild(lab);
                
    var input = document.createElement("input");
    input.setAttribute("type", tipo);
    input.setAttribute("class", "form-control");
    input.setAttribute("name", nombre);
    div.appendChild(input);
    
    return div;
}

function crearButton(click, texto){
    var button = document.createElement("button");
    button.addEventListener("click",click);
    button.appendChild(document.createTextNode(texto));
    return button;
}

function cerrarSesion(){
    document.getElementById("Acceso").innerHTML = "Acceso";
    document.getElementById("Acceso").setAttribute("onclick", "formAcceso();")
    initPopulate();
    return function (){
        document.cookie = "username=; max-age=0";
     }
}