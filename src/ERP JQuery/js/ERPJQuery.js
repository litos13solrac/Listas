"use strict";

var ventana;
var windowArray = [];
var added = false;
function init(){
    setTimeout(function(){
        //crear();
        crearJson();
        //initPopulate();
    },50);
    addScript(added);
    
}

//Crea los objetos
function crear(){
    
    //Categorias
    var cat1 = new Category("Plataformas", "Intenta no caer");
    var cat2 = new Category("Lucha", "Derrota a tus enemigos");
    var cat3 = new Category("Deportes", "Conviertete en el mejor");
    
    //Productos
    var pr1ps4 = new PS4("NBA2K18", "Juego de Baloncesto", 60, "nba.jpg", "SI");
    var pr2ps4 = new PS4("Tekken7", "Combates en 2D", 70, "tekken.jpg", "SI");
    var pr1pc = new PC("DragonBallFighterZ", "Juego de Lucha", 45, "dbz.jpg", "SI");
    var pr1sw = new Switch("SuperMarioOddisey", "Juego de plataformas", 50,"mario.jpg", 2);
    var pr2sw = new Switch("FIFA2018", "Juego de Futbol", 49, "fifa.jpg", 2);
    
    //Tiendas
    var t1 = new Tienda("T1","Juegomania","Avenida Magica, 7", "666555321");
    var t2 = new Tienda("T2","Villagaming","Calle de la Piruleta, 22", "926303030");
    var t3 = new Tienda("T3","Alimentacion", "Paseo Juanola","666458555");
    
    //Añadimos tiendas y categorias
    var store = new StoreHouse.getInstance();
    store.addCategory(cat1);
    store.addCategory(cat2);
    store.addCategory(cat3);
    
    store.addShop(t1);
    store.addShop(t2);
    store.addShop(t3);
    
    //Añadimos productos a categorias
    store.addProduct(pr1ps4, cat3);
    store.addProduct(pr2ps4, cat2);
    store.addProduct(pr1pc);
    store.addProduct(pr1sw, cat1);
    store.addProduct(pr2sw, cat3);
    
    //Añadimos productos a tiendas
    store.addProductInShop(pr1ps4,t1);
    store.addProductInShop(pr2ps4,t2);
    store.addProductInShop(pr1pc,t2);
    store.addProductInShop(pr1sw,t3);
    
    //Añadimos stock
    store.addQuantityProductInShop(pr1ps4,t1,10);
    store.addQuantityProductInShop(pr1sw,t3,5);
    store.addQuantityProductInShop(pr1pc,t2,13);
    store.addQuantityProductInShop(pr2ps4,t2,2);
}

//Crea la página de inicio
function initPopulate(){
    limpiar();
    var main = $("#main").attr("class","container");

    var idDiv = $("<div></div>").attr("id","shops");
	main.append(idDiv);

    var containerDiv = $("<div></div>").attr("class","container");
	idDiv.append(containerDiv);

    var h2 = $("<h2></h2>").text("Tiendas");
	containerDiv.append(h2);

	var rowDiv = $("<div></div>").attr("class","row");
	containerDiv.append(rowDiv);

	var store =  StoreHouse.getInstance();
	var iterableShops = store.shops;
	var shops = iterableShops.next();

	while(!shops.done){
		var shop = shops.value;
		
		var thumbTitle = shop.name;
		var thumbText = shop.cif;
		var thumbImg = "imagenes/"+shop.name+".jpg";
		if(shop.name == "Default shop"){
			thumbTitle = "Almacen Central";
		}

        var colDiv = $("<div></div>").attr("class","col-md-3");
		rowDiv.append(colDiv);

		var thumbnailDiv = createThumbnail(thumbTitle,thumbText, thumbImg);
		thumbnailDiv.attr("class", "thumbnail thumb-custom thumb-shop-custom");
		colDiv.append(thumbnailDiv);

		thumbnailDiv.click(createFunctionShowShop(shop))	

		shops = iterableShops.next();

	}
}

function shopPopulate(shop){
	var store =  StoreHouse.getInstance();
    
    limpiar();
	var idDiv =$("<div></div>").attr("id","products");
	$("#main").append(idDiv);

	var containerDiv = $("<div></div>").attr("class","container");
	idDiv.append(containerDiv);

	var rowParent = $("<div></div>").attr("class","row");
	containerDiv.append(rowParent);

	var colMenu = $("<div></div>").attr("class","col-md-3");
	rowParent.append(colMenu);

	var iterableShops = store.shops;
	MenuTiendas(colMenu, iterableShops, "Tiendas");
    
	var iterableCat = store.getCategoriesInShop(shop);
	MenuTiendas(colMenu, iterableCat, "Categorias", shop);

	var colContent =  $("<div></div>").attr({"id": "colDerecha","class": "col-md-9"});
	rowParent.append(colContent);

	var h2 =$("<h2></h2>").text("Productos:");
	colContent.append (h2);

	var rowDiv =  $("<div></div>").attr("class", "row");
	colContent.append(rowDiv);

	var store=  StoreHouse.getInstance();
	var iterableProd = store.getShopProducts(shop);
	var prods = iterableProd.next();

	while(!prods.done){
		var prod = prods.value;
		var Title = prod.name;
		var Text = prod.price+" €";
		var Img = "imagenes/"+prod.images;

		var colDiv =$("<div></div>").attr("class", "col-md-4");
		rowDiv.append(colDiv);

		var thumbnailDiv = createThumbnail(Title,Text,Img);
		colDiv.append(thumbnailDiv);

		thumbnailDiv.click(createFunctionShowProduct(prod, prods.valStock));
		prods = iterableProd.next();

	}
}


function productsCategoryShopPopulate(category, shop){
	var store =  StoreHouse.getInstance();

	var colDerecha = $("#colDerecha");
	colDerecha.empty();

	var h2 = $("<h2></h2>").text("Productos:");
	colDerecha.append (h2);

	var rowDiv =  $("<div></div>").attr("class", "row");
	colDerecha.append(rowDiv);

	var store=  StoreHouse.getInstance();
	var iterableProd = store.getProductsInShopCategory(shop, category);
	var prods = iterableProd.next();

	while(!prods.done){
		var prod = prods.value;
		var Title = prod.name;
		var Text = prod.price +"€";
		var Img = "imagenes/"+prod.images;

		var colDiv =  $("<div></div>").attr("class", "col-md-4");
		rowDiv.append(colDiv);

		var thumbnailDiv = createThumbnail(Title,Text,Img);
		colDiv.append(thumbnailDiv);

		thumbnailDiv.click(createFunctionShowProduct(prod, prods.valStock))	

		prods = iterableProd.next();

	}
}

function productPopulate(prod, stock, parentNode){
	var rowDiv1 =  $("<div></div>");
	
	if(parentNode != " " && typeof parentNode != 'undefined'){
		rowDiv1.attr("class", "row");
		rowDiv1.appendTo(parentNode);
	}else{
		var parentNode = $("#colDerecha");
        
        parentNode.empty();

		rowDiv1.attr("class", "row");
		rowDiv1.appendTo(parentNode);
	}

	var store = StoreHouse.getInstance();

	//Columna1: imagen
	var colDiv1 =  $("<div></div>").attr("class", "col-md-6");
    rowDiv1.append(colDiv1);

    var thumbnailDiv =  $("<div></div>").attr("class", "thumbnail prod-thumb-custom");
    colDiv1.append(thumbnailDiv);

    var img = $("<img>");
    img.attr({"src": "imagenes/"+prod.images+"","class": "prod-img-thumb"});
    thumbnailDiv.append(img);

	//Columna 2: datos
	var colDiv2 =  $("<div></div>").attr("class", "col-md-6 prod-data-container-custom");
    rowDiv1.append(colDiv2);

    var dataContainer =  $("<div></div>").attr("class", "data-container-div");
    colDiv2.append(dataContainer);

    var titleDiv =  $("<div></div>").attr("class", "prod-data-div prod-data-title");
    dataContainer.append(titleDiv);
    var h3 = $("<h3></h3>").attr("class", "prod-title-custom").text(prod.name);
    titleDiv.append(h3);

    var stockDiv =  $("<div></div>").attr("class", "prod-data-div");
    dataContainer.append(stockDiv);
    var p = $("<p></p>").text("Stock: "+stock);
    stockDiv.append(p);

    var priceDiv =  $("<div></div>").attr("class", "prod-data-div");
    dataContainer.append(priceDiv);
    
    var p = $("<p></p>").attr("class", "price-custom").text(prod.price+"€");
    priceDiv.append(p);

    var buttonDiv =  $("<div></div>").attr("class", " prod-data-button");
    colDiv2.append(buttonDiv);

    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn");
   
    var button = $("<button></button>").attr({"type": "button","class": "btn"});
    button.text("Comprar");
    buttonDiv.append(button);

    var button2 = $("<button></button>").attr({"type": "button","class": "btn"});
    button2.text("Ficha Técnica");
    buttonDiv.append(button2);
    button2.click(createFunctionAbrirVentana(prod));

    var divTab = $("<div></div>");
    divTab.appendTo(parentNode);
    createProductTab(divTab, prod);

}

function MenuTiendas(menuCont, iterable, name, currentShop){
	var store =  StoreHouse.getInstance();

	var panGroup =  $("<div></div>").attr("class", "panel-group");
	menuCont.append(panGroup);

	var panel =  $("<div></div>").attr("class", "panel panel-default");
	panGroup.append(panel);

	var panHead =  $("<div></div>").attr("class", "panel-heading");
	panel.append(panHead);

	var h4 = $("<h4></h4>").attr("class", "panel-title");
	panHead.append(h4);

	//El enlace en el titulo
	var aTitle = $("<a></a>").attr({"data-toggle": "collapse","href": "#"+name});
	
	h4.append(aTitle);
	aTitle.text(name);

	var listDiv =  $("<div></div>").attr({"id": name,"class": "panel-collapse collapse in"});
	panel.append(listDiv);

	var ul = $("<ul></ul>").attr("class", "list-group ul-custom");
	listDiv.append(ul);

	
	var items = iterable.next();

	while(!items.done){
		var item = items.value;
		var li = $("<li></li>").attr("class", "list-group-item li-custom");
		if(item instanceof Category){
			li.text(item.title);
		}
		if(item instanceof Tienda){
			li.text(item.name);
		}
		ul.append(li);
        
		if(item instanceof Tienda){
			li.click(createFunctionShowShop(item));
		}else if(item instanceof Category){
			li.click(createFunctionShowProductCategory(item, currentShop))
		}
		items = iterable.next();
	}
}

function createProductTab(container, prod){
	var ul = $("<ul></ul>").attr("class", "nav nav-tabs");
	ul.appendTo(container);

	var li = $("<li></li>");
	ul.append(li);

	var li = $("<li></li>");
	ul.append(li);

	var divContent = $("<div></div>").attr("class", "tab-content tab-content-custom");
	container.append(divContent);

	var divTab = $("<div></div>").attr({"id":"descripcion", "class":"tab-pane fade in active"});
	divContent.append(divTab);
}

function createFunctionShowShop(shop){
	return function(){
		return shopPopulate(shop);
	}
}

function createFunctionShowProduct(product, stock){
	return function(){
		return productPopulate(product, stock);
	}
}

function createFunctionShowProductCategory(category, shop){
	return function(){
		return productsCategoryShopPopulate(category, shop);
	}
}

function createThumbnail(title, text, image){
    var thumbnailDiv =  $("<div></div>").attr("class", "thumbnail thumb-custom");

    var img = $("<img>").attr("src", image);
    thumbnailDiv.append(img);

    var caption =  $("<div></div>").attr("class", "caption text-center");
    thumbnailDiv.append(caption);

    var h3 = $("<h3></h3>");
    caption.append(h3);
    h3.text(title);

    var p = $("<p></p>");
    p.text(text);
    caption.append(p);

    var button = $("<button></button>").attr("class", "btn btn-thumb-custom");
    button.text("Entrar");
    caption.append(button);

    return thumbnailDiv;
}

function limpiar(){
    $("#main").empty();
}

function createFunctionAbrirVentana(product, stock){
	return function(){
		return abrirVentana(product, stock);
	}
}

function abrirVentana(prod, stock){
	ventana = window.open("ficha.html",prod.name,"toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=1000,height=900");
	windowArray.push(ventana);
	ventana.focus();
	setTimeout(function() { //Quitar
		var winNode = ventana.document.getElementById("main");
		productPopulate(prod, stock ,winNode);
	}, 100);
	           
}

function cerrarVentanas(){
	windowArray.forEach(ventana => {
		ventana.close();
	});
}

function formAcceso(corr = true){
    limpiar();
    if(document.cookie){
        formPopulate();
    } else {
        var main = $("#main").attr("class","container");

        var divForm = $("<div></div>").attr("id", "divForm");
        main.append(divForm);

        var formulario = $("<form></form>").attr({"name": "acceso","class": "form-horizontal"});
        divForm.append(formulario);

        var user = crearInput("Usuario", "user", "text", formulario);
        formulario.append(user);
        var pass = crearInput("Contraseña", "pass", "password", formulario);
        formulario.append(pass);

        var comp = crearButton(acceso(),"Acceder");
        formulario.append(comp);

        var p = $("<p></p>").attr({"id": "salida","class": "h3"});
        if(corr == false){
            p.setAttribute("style", "color:red");
            p.innerHTML = "Usuario o contraseña incorrectos.";
        }
        formulario.append(p); 
    }
}

function acceso(){
    return function(){
        var user = document.forms["acceso"]["user"].value;
        var pass = document.forms["acceso"]["pass"].value;
        var corr = false;
         
        if (user === "prueba" && pass === "prueba"){
            setCookie("User",user);
            setCookie("Pass",pass);
            formPopulate();
        }else{
            formAcceso(corr);
        } 
    }   
}

function crearInput(label, nombre, tipo){
    var div = $("<div></div>").attr("class", "form-group");
        
    var lab = $("<label></label>").attr("for", nombre);
    lab.text(label);
    div.append(lab);
                
    var input = $("<input></input>").attr({"type": tipo,"class": "form-control","name": nombre});
    div.append(input);
    
    return div;
}

function crearButton(click, texto){
    var button = $("<button></button>");
    button.click(click);
    button.text(texto);
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

function getActualPos(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPos, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPos(position) {

	var myCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var mapCanvas = document.getElementById("divMap");
	var mapOptions = {center: myCenter, zoom: 15};
	var map = new google.maps.Map(mapCanvas, mapOptions);
	var store =  StoreHouse.getInstance();
	var shops = store.shops;
    var shop = shops.next();

    while (shop.done !== true){
		if(shop.value.coords!=undefined){
			var contentString = shop.value.name;
			
			var mark = new google.maps.LatLng(parseFloat(shop.value.coords.latitude),parseFloat(shop.value.coords.longitude));
			var marker = new google.maps.Marker({position:mark});
			marker.addListener('click', createFunctionInfowindow(map,marker, contentString));
			
			marker.setMap(map);
		
		}
        shop = shops.next();
}
}

function infoWindow(map,marker,contentString){
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	  });
	  infowindow.open(map, marker);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function createFunctionInfowindow(map,marker,contentString){
	return function(){
		return infoWindow(map,marker,contentString);
	}
}

function addScript(added){
    if(added == false){
        var mapScript = document.createElement("script");
        mapScript.setAttribute("src","https://maps.googleapis.com/maps/api/js?key=AIzaSyCw-ZE53qX7B6SZD84YwOMhIxUGGYkVdwg&callback=getActualPos");
        document.body.appendChild(mapScript);
        added == true;
    }
}
    
window.onload = init;