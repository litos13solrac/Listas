"use strict";

function formPopulate(){
    limpiar();
    
    function crearForm(nombre, funcion){
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("class", "list-group-item");
        a.appendChild(document.createTextNode(nombre));
        a.addEventListener("click", funcion());
        main.appendChild(a);
    }
    
    var store = StoreHouse.getInstance();
    var main = document.getElementById("main");
    main.setAttribute("class", "container");
    
    document.getElementById("Acceso").innerHTML = "Cerrar Sesión";
    document.getElementById("Acceso").setAttribute("onclick", "cerrarSesion();")
    
    var p = document.createElement("h2"); 
    p.innerHTML = "Bienvenido, usuario: "+ getCookie("User");
    main.appendChild(p);
    
    var json = crearButton(grabar(), "Enviar JSon");
    main.appendChild(json);
    
    p = document.createElement("p");
    p.setAttribute("class", "h3"); 
    p.appendChild(document.createTextNode("Categorias: "));
    
    var selC = document.createElement("select");
    selC.setAttribute("id", "selCat");
    p.appendChild(selC);

    var cats = store.categories;
    var items = cats.next;
    while(!items.done){
        var item = items.value;
        if(item != undefined){
            var opt = document.createElement("option");
            opt.text = item;
            selC.add(opt);
        }
        items = cats.next();
    }

    main.appendChild(p);
    
    crearForm("Añadir categoria", addCategoryForm);
    crearForm("Modificar categoria", updCategoryForm);
    crearForm("Eliminar categoria", delCategoryForm);
    
    p = document.createElement("p");
    p.setAttribute("class", "h3");
    p.appendChild(document.createTextNode("Tiendas: "));
    
    var selT = document.createElement("select");
    selT.setAttribute("id", "selShop");
    p.appendChild(selT)

    var shop = store.shops;
    var items = shop.next;
    while(!items.done){
        var item = items.value;
        if(item != undefined){
            var opt = document.createElement("option");
            opt.text = item;
            selT.add(opt);
        }
        items = shop.next();
    }
    main.appendChild(p);
    var map = crearButton(verMapa,"Ver en mapa");
    main.appendChild(map);
    
    crearForm("Añadir tienda", addShopForm);
    crearForm("Modificar tienda", updShopForm);
    crearForm("Eliminar tienda", delShopForm);

    p = document.createElement("p");
    p.setAttribute("class", "h3");
    p.appendChild(document.createTextNode("Productos: "));
    
    var sel = document.createElement("select");
    sel.setAttribute("id", "selProd");
    p.appendChild(sel);

    var prod = store.products;
    var items = prod.next;
    while(!items.done){
        var item = items.value;
        if(item != undefined){
            var opt = document.createElement("option");
            opt.text = item;
            sel.add(opt);
        }
        items = prod.next();
    }
    main.appendChild(p);
    
    
    main.appendChild(p);
    
    crearForm("Nuevo producto", addProForm);
    crearForm("Añadir producto a tienda", addToShopForm);
    crearForm("Eliminar producto", delProForm); 
}

function addCategoryForm(){
    function insCat(){
        return function(){
            var name = document.forms["nuevaCat"]["nomCat"].value;
            var descr = document.forms["nuevaCat"]["descrip"].value;
            var store = StoreHouse.getInstance();

            var cat = new Category(name, descr);
            store.addCategory(cat);
            formPopulate();
        }
    }
    return function(){
        limpiar();
        var main = document.getElementById("main");
        var div = document.createElement("div");
        main.appendChild(div);

        var formulario = document.createElement("form");
        formulario.setAttribute("id", "nuevaCat");
        formulario.setAttribute("class", "form-horizontal");
        
        var nom = crearInput("Nombre", "nomCat", "text");
        formulario.appendChild(nom);
        var desc = crearInput("Descripción", "descrip", "text");
        formulario.appendChild(desc);
        var add = crearButton(insCat(), "Insertar");
        formulario.appendChild(add);
        
        var back = crearButton(formPopulate, "Volver");
        formulario.appendChild(back);
        div.appendChild(formulario);
    }
}

function updCategoryForm(){
    function updCategory(){
        return function (){
            var store = StoreHouse.getInstance();
            var op = document.forms["updCat"]["selCat"].selectedIndex;
            var tit = document.forms["updCat"]["name"].value;
            var descr = document.forms["updCat"]["descr"].value;
            
            var cats = store.categories;
            var cate = cats.next();  
            var count = 0;
            while(cate.done !== true){
                if(count == op){
                    var titu = cate.value.title;
                    cate.value.title = tit;
                    cate.value.description = descr;
                    updateItem("categories", cate.value, titu);
                }
                count++;
                cate = cats.next();
            }
            formPopulate();
        }  
    }
        
        return function (){
            limpiar();
            var store = StoreHouse.getInstance();
            var main = document.getElementById("main");
            var div = document.createElement("div");
            main.appendChild(div);
            var formulario = document.createElement("form");
            formulario.setAttribute("name", "updCat");
            formulario.setAttribute("class", "form-horizontal");
            
            var lab = document.createElement("label");
            lab.appendChild(document.createTextNode("Seleccione categoria"));
            formulario.appendChild(lab);
            var sel = document.createElement("select");
            sel.setAttribute("id", "selCat");
            formulario.appendChild(sel);
            
            var cats = store.categories;
            var items = cats.next;
            while(!items.done){
                var item = items.value;
                if(item != undefined){
                    var opt = document.createElement("option");
                    opt.text = item;
                    sel.add(opt);
                }
                items = cats.next();
            }
            var name = crearInput("Nuevo nombre", "name", "text");
            formulario.appendChild(name);
            var desc = crearInput("Nueva descripcion","descr","text");
            formulario.appendChild(desc);
            var add = crearButton(updCategory(), "Actualizar");
            formulario.appendChild(add);
                
            var back = crearButton(formPopulate, "Volver");
            formulario.appendChild(back);
            div.appendChild(formulario);
        }
}
            
function delCategoryForm(){
    
    function delCategory(){
        return function (){
                
            var store = StoreHouse.getInstance();
            var op = document.forms["delCat"]["selCat"].selectedIndex;
            var tit;
            
            var cats = store.categories;
            var cate = cats.next();  
            var count = 0;
            while(cate.done !== true){
                if(count == op){
                    tit = cate.value.title;
                    store.removeCategory(cate.value);
                }
                count++;
                cate = cats.next();
            }
            deleteItem("categories",tit);
            formPopulate();
        }   
    }

        return function (){
           limpiar();
            var store = StoreHouse.getInstance();
            var main = document.getElementById("main");
            var div = document.createElement("div");
            main.appendChild(div);
            var formulario = document.createElement("form");
            formulario.setAttribute("name", "delCat");
            formulario.setAttribute("class", "form-horizontal");
            
            var lab = document.createElement("label");
            lab.appendChild(document.createTextNode("Seleccione categoria"));
            formulario.appendChild(lab);
            var sel = document.createElement("select");
            sel.setAttribute("id", "selCat");
            formulario.appendChild(sel);
            
            var cats = store.categories;
            var items = cats.next;
            while(!items.done){
                var item = items.value;
                if(item != undefined){
                    var opt = document.createElement("option");
                    opt.text = item;
                    sel.add(opt);
                }
                items = cats.next();
            }
            var add = crearButton(delCategory(), "Eliminar");
            formulario.appendChild(add);
                
            var back = crearButton(formPopulate, "Volver");
            formulario.appendChild(back);
            div.appendChild(formulario);
        }
}

function addShopForm(){
    function insShop(){
        return function(){
            var cif = document.forms["nuevaShop"]["cifShop"].value;
            var name = document.forms["nuevaShop"]["nomShop"].value;
            var dir = document.forms["nuevaShop"]["dirShop"].value;
            var tel = document.forms["nuevaShop"]["telShop"].value;
            var cd = new Coords(lat,lng);
            var store = StoreHouse.getInstance();
            var t = new Tienda(cif, name, dir, tel, cd);
            store.addShop(t);
            formPopulate();
        }
    }
    return function(){
        limpiar();
        var main = document.getElementById("main");
        var div = document.createElement("div");
        main.appendChild(div);

        var formulario = document.createElement("form");
        formulario.setAttribute("id", "nuevaShop");
        formulario.setAttribute("class", "form-horizontal");
        
        var nom = crearInput("CIF", "cifShop", "text");
        formulario.appendChild(nom);
        var desc = crearInput("Nombre", "nomShop", "text");
        formulario.appendChild(desc);
        var dir = crearInput("Dirección", "dirShop", "text");
        formulario.appendChild(dir);
        var tel = crearInput("Teléfono", "telShop", "number");
        formulario.appendChild(tel);
        var lab = document.createElement("label");
        lab.appendChild(document.createTextNode("Ubicación: "));
        formulario.appendChild(lab);
        var map = document.createElement("div");
        map.setAttribute("style","width:50%;height:400px;");
        formulario.appendChild(map);
        mapForm(map);
        
        var add = crearButton(insShop(), "Insertar");
        formulario.appendChild(add);
        
        var back = crearButton(formPopulate, "Volver");
        formulario.appendChild(back);
        div.appendChild(formulario);
    }
}

function updShopForm(){
    function actShop(){
        var store = StoreHouse.getInstance();
        var op = document.forms["actShop"]["selShop"].selectedIndex;
        var cif = document.forms["actShop"]["cif"].value;
        var name = document.forms["actShop"]["name"].value;
        var dir = document.forms["actShop"]["dir"].value;
        var tel = document.forms["actShop"]["tel"].value;
        
        var shop = store.shops;
        var t = shop.next();  
        var count = 0;

        while(t.done !== true){
            if(count == op){
                var sh = t.value.cif;
                sh = cif;
                t.value.name = name;
                t.value.direction = dir;
                t.value.tel = tel;
                t.value.coords.latitude = lat;
                t.value.coords.longitude = lng;
                updateItem("shops", t.value, sh);
            }
            count++;
            t = shop.next();
        }
        formPopulate();   
      }    
        
      return function (){

        limpiar();
        var store = StoreHouse.getInstance();
        var main = document.getElementById("main");
        var div = document.createElement("div");
        main.appendChild(div);
        var formulario = document.createElement("form");
        formulario.setAttribute("name", "actShop");
        formulario.setAttribute("class", "form-horizontal");

        var lab = document.createElement("label");
        lab.appendChild(document.createTextNode("Seleccione tienda"));
        formulario.appendChild(lab);
        var sel = document.createElement("select");
        sel.setAttribute("id", "selShop");

        var shop = store.shops;
        var items = shop.next;
        while(!items.done){
            var item = items.value;
            if(item != undefined){
                var opt = document.createElement("option");
                opt.text = item;
                sel.add(opt);
            }
            items = shop.next();
        }

        formulario.appendChild(sel);
        var cif = crearInput("Nuevo CIF", "cif", "text");
        formulario.appendChild(cif);
        var name = crearInput("Nuevo nombre", "name", "text");
        formulario.appendChild(name);
        var dir = crearInput("Nueva direccion", "dir", "text"); 
        formulario.appendChild(dir);
        var tel = crearInput("Nuevo telefono", "tel", "number"); 
        formulario.appendChild(tel);
          
        var lab = document.createElement("label");
        lab.appendChild(document.createTextNode("Nueva ubicación: "));
        formulario.appendChild(lab);
        var map = document.createElement("div");
        map.setAttribute("style","width:50%;height:400px;");
        formulario.appendChild(map);
        mapForm(map);
          
        var but = crearButton(actShop, "Actualizar");
        formulario.appendChild(but);
        var back = crearButton(formPopulate, "Volver");
        formulario.appendChild(back);
        div.appendChild(formulario);
    }  
}

function delShopForm(){
    function delShop(){
        var store = StoreHouse.getInstance();
        var op = document.forms["delShop"]["selShop"].selectedIndex;

        var shop = store.shops;
        var items = shop.next;
        var count = 0;
        while(!items.done){
            if(count == op){
                store.removeShop(items.value);
            }
            count++;
            items = shop.next();
        }
        formPopulate();   
    }
    
    return function (){
        limpiar();
        var store = StoreHouse.getInstance();
        var main = document.getElementById("main");
        var div = document.createElement("div");
        main.appendChild(div);

        var formulario = document.createElement("form");
        formulario.setAttribute("name", "delShop");
        formulario.setAttribute("class", "form-horizontal");

        var lab = document.createElement("label");
        lab.appendChild(document.createTextNode("Seleccione tienda"));
        formulario.appendChild(lab);
        var sel = document.createElement("select");
        sel.setAttribute("id", "selShop");
        formulario.appendChild(sel);

        var shop = store.shops;
        var items = shop.next;
        while(!items.done){
            var item = items.value;
            if(item != undefined){
                var opt = document.createElement("option");
                opt.text = item;
                sel.add(opt);
            }
            items = shop.next();
        }
        formulario.appendChild(sel);

        var del = crearButton(delShop, "Eliminar");
        formulario.appendChild(del);

        var back = crearButton(formPopulate, "Volver");
        formulario.appendChild(back);
        div.appendChild(formulario);
    }
}

function addProForm(){
    function insProd(){
        var name = document.forms["nuevoProd"]["nameProd"].value;
        var descr = document.forms["nuevoProd"]["descProd"].value;
        var price = document.forms["nuevoProd"]["precioProd"].value;
        var img = document.forms["nuevoProd"]["imgProd"].value;
        var cat = document.forms["nuevoProd"]["selCat"].selectedIndex;
        var categoria = getCat(cat);
        var tipo = document.forms["nuevoProd"]["tipoProd"].selectedIndex;
        var store = StoreHouse.getInstance();
        if(tipo == 0){
            var int = document.forms["nuevoProd"]["int"].checked;
            if(int == true){
                var inter = "SI";
            }else {
                var inter = "NO";
            }
            var pr = new PS4(name, descr, price, 0.21, img, inter);
            store.addProduct(pr, categoria);
        }else if(tipo == 1){
            var man = document.forms["nuevoProd"]["mando"].checked;
            if(man == true){
                var mando = "SI";
            }else {
                var mando = "NO";
            }
            var pr = new PC(name, descr, price, 0.21, img, mando);
            store.addProduct(pr, categoria);
        }else{
            var num = document.forms["nuevoProd"]["numJ"].value;
            var pr = new Switch(name, descr, price, 0.21, img, num);
            store.addProduct(pr, categoria);
        }
        formPopulate();
    }
    return function(){
        limpiar();
        var main = document.getElementById("main");
        var div = document.createElement("div");
        main.appendChild(div);

        var formulario = document.createElement("form");
        formulario.setAttribute("id", "nuevoProd");
        formulario.setAttribute("class", "form-horizontal");
        
        var nom = crearInput("Nombre", "nameProd", "text");
        formulario.appendChild(nom);
        var desc = crearInput("Descripcion", "descProd", "text");
        formulario.appendChild(desc);
        var price = crearInput("Precio", "precioProd", "number");
        formulario.appendChild(price);
        var img = crearInput("Imagen", "imgProd", "file");
        formulario.appendChild(img);
        
        var lab = document.createElement("label");
        lab.appendChild(document.createTextNode("Categoria:"));
        formulario.appendChild(lab);
        
        var sel = document.createElement("select");
        sel.setAttribute("id", "selCat");
        
        var store = StoreHouse.getInstance();
        var cats = store.categories;
        var items = cats.next;
        
        while(!items.done){
            var item = items.value;
            if(item != undefined){
                var opt = document.createElement("option");
                opt.text = item;
                sel.add(opt);
            }
            items = cats.next();
        }
        
        formulario.appendChild(sel);
        var p = document.createElement(p);
        formulario.appendChild(p);
        
        var tipo = document.createElement("select");
        tipo.setAttribute("id","tipoProd");
        var op1 = document.createElement("option");
        op1.text = "PlayStation 4";
        tipo.add(op1);
        var op2 = document.createElement("option");
        op2.text = "PC";
        tipo.add(op2);
        var op3 = document.createElement("option");
        op3.text = "Nintendo Switch";
        tipo.add(op3);

        formulario.appendChild(tipo);
        var internet = crearInput("¿Requiere Internet? (SOLO PS4)", "int", "checkbox");
        formulario.appendChild(internet);
        var mando = crearInput("¿Requiere Mando? (SOLO PC)", "mando", "checkbox");
        formulario.appendChild(mando);
        var num = crearInput("Número de jugadores (SOLO SWITCH)", "numJ", "number");
        formulario.appendChild(num);
              
        var add = crearButton(insProd, "Insertar");
        formulario.appendChild(add);
        
        var back = crearButton(formPopulate, "Volver");
        formulario.appendChild(back);
        div.appendChild(formulario);
    }
}


function addToShopForm(){
    function addToShop(){
        var s = document.forms["ProdShop"]["selShop"].selectedIndex;
        var shop = getShop(s);
        var p = document.forms["ProdShop"]["selProd"].selectedIndex;
        var prod = getProd(p);
        var store = StoreHouse.getInstance();
        store.addProductInShop(prod,shop);
        formPopulate();
    }
    return function (){
        limpiar();
        var store = StoreHouse.getInstance();
        var main = document.getElementById("main");
        var div = document.createElement("div");
        main.appendChild(div);

        var formulario = document.createElement("form");
        formulario.setAttribute("name", "ProdShop");
        formulario.setAttribute("class", "form-horizontal");
           
        var lab = document.createElement("p");
        lab.appendChild(document.createTextNode("Seleccione producto:"));
        formulario.appendChild(lab);
        var selP = document.createElement("select");
        selP.setAttribute("id", "selProd");
        formulario.appendChild(selP);

        var prod = store.products;
        var items = prod.next;
        while(!items.done){
            var item = items.value;
            if(item != undefined){
                var opt = document.createElement("option");
                opt.text = item;
                selP.add(opt);
            }
            items = prod.next();
        }
        
        var labT = document.createElement("p");
        labT.appendChild(document.createTextNode("Seleccione tienda:"));
        formulario.appendChild(labT);
        var selT = document.createElement("select");
        selT.setAttribute("id", "selShop");
        formulario.appendChild(selT);

        var shop = store.shops;
        var items = shop.next;
        while(!items.done){
            var item = items.value;
            if(item != undefined){
                var opt = document.createElement("option");
                opt.text = item;
                selT.add(opt);
            }
            items = shop.next();
        }
        var esp = document.createElement("p");
        esp.appendChild(document.createTextNode(" "));
        formulario.appendChild(esp);
        var del = crearButton(addToShop, "Añadir");
        formulario.appendChild(del);
        
        var back = crearButton(formPopulate, "Volver");
        formulario.appendChild(back);
        div.appendChild(formulario);
      }
}

function delProForm(){
    function delPro(){
        var store = StoreHouse.getInstance();
        var op = document.forms["delProd"]["selProd"].selectedIndex;
        var prod = store.products;
        var items = prod.next;
        var count = 0;
        while(!items.done){
            if(count == op){
                store.removeProduct(items.value);
            }
            count++;
            items = prod.next();
        }
        formPopulate();   
    }     
    
    return function (){
        limpiar();
        var store = StoreHouse.getInstance();
        var main = document.getElementById("main");
        var div = document.createElement("div");
        main.appendChild(div);

        var formulario = document.createElement("form");
        formulario.setAttribute("name", "delProd");
        formulario.setAttribute("class", "form-horizontal");
           
        var lab = document.createElement("label");
        lab.appendChild(document.createTextNode("Seleccione producto: "));
        formulario.appendChild(lab);
        var sel = document.createElement("select");
        sel.setAttribute("id", "selProd");
        formulario.appendChild(sel);

        var prod = store.products;
        var items = prod.next;
        while(!items.done){
            var item = items.value;
            if(item != undefined){
                var opt = document.createElement("option");
                opt.text = item;
                sel.add(opt);
            }
            items = prod.next();
        }
        formulario.appendChild(sel);

        var del = crearButton(delPro, "Eliminar");
        formulario.appendChild(del);
        
        var back = crearButton(formPopulate, "Volver");
        formulario.appendChild(back);
        div.appendChild(formulario);
      }
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

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(name, val){
    document.cookie = name + "=" + val + ";" + "expires=Sun, 01 Jul 2018 00:00:00 UTC; path=/";
}

function deleteCookie(name){
    document.cookie = name +"=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;";
}

function cerrarSesion(){
    deleteCookie("User");
    deleteCookie("Pass");
    document.getElementById("Acceso").innerHTML = "Acceso";
    document.getElementById("Acceso").setAttribute("onclick", "formAcceso();")
    initPopulate();
}

function getCat(index){
    var store = StoreHouse.getInstance();
    var cat = store.categories;
    var cate = cat.next();
    var count = 0;
    while(!cate.done){
        if(count == index){
            return cate.value;
        }
        cate = cat.next();
        count++;
    }
}
function getShop(index){
    var store = StoreHouse.getInstance();
    var shop = store.shops;
    var t = shop.next();
    var count = 0;
    while(!t.done){
        if(count == index){
            return t.value;
        }
        t = shop.next();
        count++;
    }
}
function getProd(index){
    var store = StoreHouse.getInstance();
    var prod = store.products;
    var pro = prod.next();
    var count = 0;
    while(!pro.done){
        if(count == index){
            return pro.value;
        }
        pro = prod.next();
        count++;
    }
}

function verMapa(){
    limpiar();
    var main = document.getElementById("main");
    var h2 = document.createElement("h2");
    h2.appendChild(document.createTextNode("Mapa de Tiendas"));
    main.appendChild(h2);
    
    var div = document.createElement("div");
    div.setAttribute("id","divMap");
    div.setAttribute("style","width:50%;height:400px; padding-left:25%;");
    main.appendChild(div);
      
    var mapScript = document.createElement("script");
	mapScript.setAttribute("src","https://maps.googleapis.com/maps/api/js?key=AIzaSyCw-ZE53qX7B6SZD84YwOMhIxUGGYkVdwg&callback=getActualPos");
	document.body.appendChild(mapScript);
    var back = crearButton(formPopulate, "Volver");
    main.appendChild(back);
    
}
var lat;
var lng;
function mapForm(mapa){
    var mapForm = new google.maps.Map(mapa, {
        center: {lat: 38.988628, long: -3.917201}, zoom:14
    });
    
    var infoWindow = new google.maps.InfoWindow({map: mapForm});
    
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
           var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            mapForm.setCenter(pos);
 
          }, function() {
            handleLocationError(true, infoWindow, mapForm.getCenter());
          });
     } else {
          handleLocationError(false, infoWindow, mapForm.getCenter());
     }
    var marker = new google.maps.Marker({
                position: {lat: 38.988628, lng: -3.917201},
                map: mapForm,
                draggable: true,               
    });            
    google.maps.event.addListener(marker, "position_changed", function() {

         lat = marker.getPosition().lat();
         lng = marker.getPosition().lng();
   });
}