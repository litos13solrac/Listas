"use strict";

function formPopulate(){
    limpiar();
    
    function crearForm(nombre, funcion){
        var a = $("<a></a>").attr({"href": "#","class": "list-group-item"});
        a.text(nombre);
        a.click(funcion());
        main.append(a);
    }
    
    var store = StoreHouse.getInstance();
    var main = $("#main").attr("class","container");
    
    document.getElementById("Acceso").innerHTML = "Cerrar Sesión";
    document.getElementById("Acceso").setAttribute("onclick", "cerrarSesion();")
    
    var p = $("<p></p>").text("Bienvenido, usuario: "+ getCookie("User"));
    main.append(p);
    
    var json = crearButton(grabar(), "Enviar JSon");
    main.append(json);
    
    p = $("<p></p>").attr("class","h3");
    p.text("Categorias: ");

    var sel = $("<select>").attr("id", "selCat");
    p.append(sel);
            
    var cats = store.categories;
    var items = cats.next;
    while(!items.done){
        var item = items.value;
        if(item != undefined){
            var opt = $("<option>").text(item);
            sel.append(opt);
        }
        items = cats.next();
    }
    
    main.append(p);
    
    crearForm("Añadir categoria", addCategoryForm);
    crearForm("Modificar categoria", updCategoryForm);
    crearForm("Eliminar categoria", delCategoryForm);
    
    p = $("<p></p>").attr("class","h3");
    p.text("Tiendas: ");
    
    var sel = $("<select>").attr("id", "selShop");
    p.append(sel);
            
    var shop = store.shops;
    var items = shop.next;
    while(!items.done){
        var item = items.value;
        if(item != undefined){
            var opt = $("<option>").text(item);
            sel.append(opt);
        }
        items = shop.next();
    }
    main.append(p);
    var map = crearButton(verMapa,"Ver en mapa");
    main.append(map);
    
    crearForm("Añadir tienda", addShopForm);
    crearForm("Modificar tienda", updShopForm);
    crearForm("Eliminar tienda", delShopForm);

    p = $("<p></p>").attr("class","h3");
    p.text("Productos: ");
    
    var sel = $("<select>").attr("id", "selProd");
    p.append(sel);
            
    var prod = store.products;
    var items = prod.next;
    while(!items.done){
        var item = items.value;
        if(item != undefined){
            var opt = $("<option>").text(item);
            sel.append(opt);
        }
        items = prod.next();
    }
    main.append(p);
    
    main.append(p);
    
    crearForm("Nuevo producto", addProForm);
    crearForm("Añadir producto a tienda", addToShopForm);
    crearForm("Eliminar producto", delProForm); 
}

function addCategoryForm(){
    function insCat(){
        return function(){
            var name = $('input[name="nomCat"]').val();
            var descr = $('input[name="descrip"]').val();
            var store = StoreHouse.getInstance();

            var cat = new Category(name, descr);
            store.addCategory(cat);
            formPopulate();
        }
    }
    return function(){
        limpiar();
        var main = $("#main").attr("class","container");

        var div = $("<div></div>");
        main.append(div);

        var formulario = $("<form>").attr({"id": "nuevaCat","class": "form-horizontal"});
        
        var nom = crearInput("Nombre", "nomCat", "text");
        formulario.append(nom);
        var desc = crearInput("Descripción", "descrip", "text");
        formulario.append(desc);
        var add = crearButton(insCat(), "Insertar");
        formulario.append(add);
        
        var back = crearButton(formPopulate, "Volver");
        formulario.append(back);
        div.append(formulario);
    }
}

function updCategoryForm(){
    function updCategory(){
        return function (){
            var store = StoreHouse.getInstance();
            var op = $('#selCat').val();
            var tit = $('input[name="name"]').val();
            var descr = $('input[name="descr"]').val();
            
            var cats = store.categories;
            var cate = cats.next();  
            while(cate.done !== true){
                var titu = cate.value.title;
                if(titu == op){
                    cate.value.title = tit;
                    cate.value.description = descr;
                    updateItem("categories", cate.value, titu);
                }
                cate = cats.next();
            }
            formPopulate();
        }  
    }
        
        return function (){
            limpiar();
            var store = StoreHouse.getInstance();
            var main = $("#main").attr("class","container");
            var div = $("<div></div>");
            main.append(div);
            
            var formulario = $("<form>").attr({"id": "UpdCat","class": "form-horizontal"});
            
            var lab = $("<label></label>");
            lab.text("Seleccione categoria");
            formulario.append(lab);
            var sel = $("<select>").attr("id", "selCat");
            formulario.append(sel);
            
            var cats = store.categories;
            var items = cats.next;
            while(!items.done){
                var item = items.value;
                if(item != undefined){
                    var opt = $("<option>").text(item);
                    sel.append(opt);
                }
                items = cats.next();
            }
            var name = crearInput("Nuevo nombre", "name", "text");
            formulario.append(name);
            var desc = crearInput("Nueva descripcion","descr","text");
            formulario.append(desc);
            var add = crearButton(updCategory(), "Actualizar");
            formulario.append(add);
                
            var back = crearButton(formPopulate, "Volver");
            formulario.append(back);
            div.append(formulario);
        }
}
            
function delCategoryForm(){
    
    function delCategory(){
        return function (){
             
            var store = StoreHouse.getInstance();
            var op = $('#selCat').val();
            var tit;
            
            var cats = store.categories;
            var cate = cats.next();  
            while(cate.done !== true){
                var titu = cate.value.title;
                if(titu == op){
                    tit = cate.value.title;
                    store.removeCategory(cate.value);  
                }
                cate = cats.next();
            }
            deleteItem("categories",tit);
            formPopulate();
        }   
    }

        return function (){
           limpiar();
            var store = StoreHouse.getInstance();
            var main = $("#main").attr("class","container");
            var div = $("<div></div>");
            main.append(div);
            
            var formulario = $("<form>").attr({"id": "UpdCat","class": "form-horizontal"});
            
            var lab = $("<label></label>");
            lab.text("Seleccione categoria");
            formulario.append(lab);
            var sel = $("<select>").attr("id", "selCat");
            formulario.append(sel);
            
            var cats = store.categories;
            var items = cats.next;
            while(!items.done){
                var item = items.value;
                if(item != undefined){
                    var opt = $("<option>").text(item);
                    sel.append(opt);
                }
                items = cats.next();
            }
            var add = crearButton(delCategory(), "Eliminar");
            formulario.append(add);
                
            var back = crearButton(formPopulate, "Volver");
            formulario.append(back);
            div.append(formulario);
        }
}

function addShopForm(){
    function insShop(){
        return function(){
            var cif = $('input[name="cifShop"]').val();
            var name = $('input[name="nomShop"]').val();
            var dir = $('input[name="dirShop"]').val();
            var tel = $('input[name="telShop"]').val();
            var cd = new Coords(lat,lng);
            var store = StoreHouse.getInstance();
            var t = new Tienda(cif, name, dir, tel, cd);
            store.addShop(t);
            formPopulate();
        }
    }
    return function(){
        limpiar();
        var main = $("#main").attr("class","container");

        var div = $("<div></div>");
        main.append(div);

        var formulario = $("<form>").attr({"id": "nuevaShop","class": "form-horizontal"});
        
        var nom = crearInput("CIF", "cifShop", "text");
        formulario.append(nom);
        var desc = crearInput("Nombre", "nomShop", "text");
        formulario.append(desc);
        var dir = crearInput("Dirección", "dirShop", "text");
        formulario.append(dir);
        var tel = crearInput("Teléfono", "telShop", "number");
        formulario.append(tel);
        var lab = $("<label></label>").text("Ubicacion: ");
        formulario.append(lab);
        var map = document.createElement("div");
        map.setAttribute("style","width:50%;height:400px;");
        formulario.append(map);
        mapForm(map);
        
        var add = crearButton(insShop(), "Insertar");
        formulario.append(add);
        
        var back = crearButton(formPopulate, "Volver");
        formulario.append(back);
        div.append(formulario);
    }
}

function updShopForm(){
    function actShop(){
        var store = StoreHouse.getInstance();
        var op = $('#selShop').val();
        var cif = $('input[name="cifShop"]').val();
        var name = $('input[name="nomShop"]').val();
        var dir = $('input[name="dirShop"]').val();
        var tel = $('input[name="telShop"]').val();
        
        var shop = store.shops;
        var t = shop.next();  
         
        while(t.done !== true){
            var ci = t.value.cif + ": "+ t.value.name;
            if(ci == op){
                var sh = t.value.cif;
                sh = cif;
                t.value.name = name;
                t.value.direction = dir;
                t.value.tel = tel;
                t.value.coords.latitude = lat;
                t.value.coords.longitude = lng;
                updateItem("shops", t.value, sh);
            }
            t = shop.next();
        }
        formPopulate();   
      }    
        
      return function (){

        limpiar();
        var store = StoreHouse.getInstance();
        var main = $("#main").attr("class","container");
        var div = $("<div></div>");
        main.append(div);
        var formulario = $("<form>").attr({"id": "actShop","class": "form-horizontal"});
            
        var lab = $("<label></label>");
        lab.text("Seleccione categoria");
        formulario.append(lab);
        var sel = $("<select>").attr("id", "selShop");
        formulario.append(sel);

        var shop = store.shops;
        var items = shop.next;
        while(!items.done){
            var item = items.value;
            if(item != undefined){
                var opt = $("<option>").text(item);
                sel.append(opt);
            }
            items = shop.next();
        }

        formulario.append(sel);
        var cif = crearInput("Nuevo CIF", "cif", "text");
        formulario.append(cif);
        var name = crearInput("Nuevo nombre", "name", "text");
        formulario.append(name);
        var dir = crearInput("Nueva direccion", "dir", "text"); 
        formulario.append(dir);
        var tel = crearInput("Nuevo telefono", "tel", "number"); 
        formulario.append(tel);
          
        var lab = $("<label></label>");
        lab.text("Nueva Ubicación: ");
        lab.append(formulario);
        var map = document.createElement("div");
        map.setAttribute("style","width:50%;height:400px;");
        formulario.append(map);
        mapForm(map);
          
        var but = crearButton(actShop, "Actualizar");
        formulario.append(but);
        var back = crearButton(formPopulate, "Volver");
        formulario.append(back);
        div.append(formulario);
    }  
}

function delShopForm(){
    function delShop(){
        var store = StoreHouse.getInstance();
        var op = $('#selShop').val();

        var shop = store.shops;
        var t = shop.next();
        while(!t.done){
            var ci = t.value.cif + ": "+ t.value.name;
            if(ci == op){
                store.removeShop(t.value);
            }
            t = shop.next();
        }
        formPopulate();   
    }
    
    return function (){
        limpiar();
        var store = StoreHouse.getInstance();
        var main = $("#main").attr("class","container");
        var div = $("<div></div>");
        main.append(div);
            
        var formulario = $("<form>").attr({"id": "delShop","class": "form-horizontal"});
            
        var lab = $("<label></label>");
        lab.text("Seleccione categoria");
        formulario.append(lab);
        var sel = $("<select>").attr("id", "selShop");
        formulario.append(sel);

        var shop = store.shops;
        var items = shop.next;
        while(!items.done){
            var item = items.value;
            if(item != undefined){
                var opt = $("<option>").text(item);
                sel.append(opt);
            }
            items = shop.next();
        }

        var del = crearButton(delShop, "Eliminar");
        formulario.append(del);

        var back = crearButton(formPopulate, "Volver");
        formulario.append(back);
        div.append(formulario);
    }
}

function addProForm(){
    function insProd(){
        var store = StoreHouse.getInstance();
        var name = $('input[name="nameProd"]').val();
        var descr = $('input[name="descProd"]').val();
        var price = $('input[name="precioProd"]').val();
        var img = $('input[name="imgProd"]').val();
        
        var categoria = $('#selCat').val(); 
        var cats = store.categories;
        var cate = cats.next();  
        while(cate.done !== true){
            if(cate.value == categoria){
                var cat = cate.value;
            }
            cate = cats.next();
        }
        
        var tipo = $('#tipoProd').val();
        if(tipo == "PlayStation 4"){
            var int = $('input[name="int"]').prop('checked');
            if(int == true){
                var inter = "SI";
            }else {
                var inter = "NO";
            }
            var pr = new PS4(name, descr, price, img, 0.21, inter);
            store.addProduct(pr, cat);
        }else if(tipo == "PC"){
            var man = $('input[name="mando"]').prop('checked');
            if(man == true){
                var mando = "SI";
            }else {
                var mando = "NO";
            }
            var pr = new PC(name, descr, price, img, 0.21, mando);
            store.addProduct(pr, cat);
        }else{
            var num = $('input[name="numJ"]').val();
            var pr = new Switch(name, descr, price, img, 0.21, num);
            store.addProduct(pr, cat);
        }
        formPopulate();
    }
    return function(){
        limpiar();
        var store = StoreHouse.getInstance();
        var main = $("#main").attr("class","container");

        var div = $("<div></div>");
        main.append(div);

        var formulario = $("<form>").attr({"id": "nuevo","class": "form-horizontal"});
        
        var nom = crearInput("Nombre", "nameProd", "text");
        formulario.append(nom);
        var desc = crearInput("Descripcion", "descProd", "text");
        formulario.append(desc);
        var price = crearInput("Precio", "precioProd", "number");
        formulario.append(price);
        var img = crearInput("Imagen", "imgProd", "file");
        formulario.append(img);
        
        var lab = $("<label></label>");
        lab.text("Seleccione categoria");
        formulario.append(lab);
        var sel = $("<select>").attr("id", "selCat");
        formulario.append(sel);
            
        var cats = store.categories;
        var items = cats.next;
        while(!items.done){
            var item = items.value;
            if(item != undefined){
                var opt = $("<option>").text(item);
                sel.append(opt);
            }
            items = cats.next();
        }
        var t = $("<label></label>").text("Plataforma: ")
        formulario.append(t);
        var tipo = $("<select>").attr("id", "tipoProd");
        var op1 = $("<option>").text("PlayStation 4");
        tipo.append(op1);
        var op2 = $("<option>").text("PC");
        tipo.append(op2);
        var op3 = $("<option>").text("Nintendo Switch");
        tipo.append(op3);

        formulario.append(tipo);
        var internet = crearInput("¿Requiere Internet? (SOLO PS4)", "int", "checkbox");
        formulario.append(internet);
        var mando = crearInput("¿Requiere Mando? (SOLO PC)", "mando", "checkbox");
        formulario.append(mando);
        var num = crearInput("Número de jugadores (SOLO SWITCH)", "numJ", "number");
        formulario.append(num);
              
        var add = crearButton(insProd, "Insertar");
        formulario.append(add);
        
        var back = crearButton(formPopulate, "Volver");
        formulario.append(back);
        div.append(formulario);
    }
}

function addToShopForm(){
    function addToShop(){
        var store = StoreHouse.getInstance();
        var s = $('#selShop').val();
        var sh = store.shops;
        var tien = sh.next();  
        while(tien.done !== true){
            if(tien.value == s){
                var shop = tien.value;
            }
            tien = sh.next();
        }
        
        var p =  $('#selProd').val();
        var pr = store.products;
        var pro = pr.next();  
        while(pro.done !== true){
            if(pro.value == p){
                var prod = pro.value;
            }
            pro = pr.next();
        }
        store.addProductInShop(prod,shop);
        formPopulate();
    }
    return function (){
        limpiar();
        var store = StoreHouse.getInstance();
        var main = $("#main").attr("class","container");
        var div = $("<div></div>");
        main.append(div);
            
        var formulario = $("<form>").attr({"id": "ProdShop","class": "form-horizontal"});
           
        var p = $("<p></p>").text("Seleccione producto:");
        var selP = $("<select>").attr("id", "selProd");
        p.append(selP);
            
        var prod = store.products;
        var items = prod.next;
        while(!items.done){
            var item = items.value;
            if(item != undefined){
                var opt = $("<option>").text(item);
                selP.append(opt);
            }
            items = prod.next();
        }
        formulario.append(p);
        
        var t = $("<p></p>").text("Seleccione tienda: ");
    
        var selT = $("<select>").attr("id", "selShop");
        t.append(selT);
            
        var shop = store.shops;
        var items = shop.next;
        while(!items.done){
            var item = items.value;
            if(item != undefined){
                var opt = $("<option>").text(item);
                selT.append(opt);
            }
            items = shop.next();
        }
        formulario.append(t);
        var del = crearButton(addToShop, "Añadir");
        formulario.append(del);
        
        var back = crearButton(formPopulate, "Volver");
        formulario.append(back);
        div.append(formulario);
      }
}

function delProForm(){
    function delPro(){
        var store = StoreHouse.getInstance();
        var op = $('#selProd').val();

        var prod = store.products;
        var p = prod.next();
        while(!p.done){
            var pr = p.value.name;
            if("PS4: "+p.value.name == op || "PC: "+p.value.name == op || "Nintendo Switch: "+p.value.name == op ){
                store.removeProduct(p.value);
            }
            p = prod.next();
        }
        formPopulate();    
    }     
    
    return function (){
        limpiar();
        var store = StoreHouse.getInstance();
        var main = $("#main").attr("class","container");

        var div = $("<div></div>");
        main.append(div);

        var formulario = $("<form>").attr({"id": "delProd","class": "form-horizontal"});
           
        var p = $("<p></p>").text("Seleccione producto:");
        var selP = $("<select>").attr("id", "selProd");
        p.append(selP);
            
        var prod = store.products;
        var items = prod.next;
        while(!items.done){
            var item = items.value;
            if(item != undefined){
                var opt = $("<option>").text(item);
                selP.append(opt);
            }
            items = prod.next();
        }
        formulario.append(p);

        var del = crearButton(delPro, "Eliminar");
        formulario.append(del);
        
        var back = crearButton(formPopulate, "Volver");
        formulario.append(back);
        div.append(formulario);
      }
}

function verMapa(){
    limpiar();
    var main = $("#main").attr("class","container");
    var h2 = $("<h2></h2>").text("Mapa de Tiendas");
    main.append(h2);
    
    var div = $("<div></div>").attr({"id":"divMap","style":"width:50%;height:400px; padding-left:25%;"});
    main.append(div);
      
    var mapScript = document.createElement("script");
	mapScript.setAttribute("src","https://maps.googleapis.com/maps/api/js?key=AIzaSyCw-ZE53qX7B6SZD84YwOMhIxUGGYkVdwg&callback=getActualPos");
	document.body.appendChild(mapScript);
    var back = crearButton(formPopulate, "Volver");
    main.append(back);
    
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