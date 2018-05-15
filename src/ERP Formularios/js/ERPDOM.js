"use strict";

var ventana;
var windowArray = [];
function init(){
    crear();
    initPopulate();
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
	var main = document.getElementById("main");
    main.setAttribute("class", "container");

	var idDiv = document.createElement("div");
	idDiv.id = "shops";
	main.appendChild(idDiv);

	var containerDiv = document.createElement("div");
	containerDiv.setAttribute("class", "container");
	idDiv.appendChild(containerDiv);

	var h2 = document.createElement("h2");
	containerDiv.appendChild (h2);
	h2.appendChild(document.createTextNode("Tiendas:"));

	var rowDiv = document.createElement("div");
	rowDiv.setAttribute("class", "row");
	containerDiv.appendChild(rowDiv);

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

		var colDiv = document.createElement("div");
		colDiv.setAttribute("class", "col-md-3");
		rowDiv.appendChild(colDiv);

		var thumbnailDiv = createThumbnail(thumbTitle,thumbText, thumbImg);
		thumbnailDiv.setAttribute("class", "thumbnail thumb-custom thumb-shop-custom");
		colDiv.appendChild(thumbnailDiv);

		thumbnailDiv.addEventListener("click",createFunctionShowShop(shop))	

		shops = iterableShops.next();

	}
}

function shopPopulate(shop){
	var store =  StoreHouse.getInstance();
    
    limpiar();
	var idDiv = document.createElement("div");
	idDiv.id = "products";
	main.appendChild(idDiv);

	var containerDiv = document.createElement("div");
	containerDiv.setAttribute("class", "container");
	idDiv.appendChild(containerDiv);

	var rowParent = document.createElement("div");
	rowParent.setAttribute("class", "row");
	containerDiv.appendChild(rowParent);

	var colMenu = document.createElement("div");
	colMenu.setAttribute("class", "col-md-3");
	rowParent.appendChild(colMenu);

	var iterableShops = store.shops;
	MenuTiendas(colMenu, iterableShops, "Tiendas");
    
	var iterableCat = store.getCategoriesInShop(shop);
	MenuTiendas(colMenu, iterableCat, "Categorias", shop);

	var colContent = document.createElement("div");
	colContent.setAttribute("id", "colDerecha");
	colContent.setAttribute("class", "col-md-9");
	rowParent.appendChild(colContent);

	var h2 = document.createElement("h2");
	colContent.appendChild (h2);
	h2.appendChild(document.createTextNode("Productos:"));

	var rowDiv = document.createElement("div");
	rowDiv.setAttribute("class", "row");
	colContent.appendChild(rowDiv);

	var store=  StoreHouse.getInstance();
	var iterableProd = store.getShopProducts(shop);
	var prods = iterableProd.next();

	while(!prods.done){
		var prod = prods.value;
		var Title = prod.name;
		var Text = prod.price+" €";
		var Img = "imagenes/"+prod.images;

		var colDiv = document.createElement("div");
		colDiv.setAttribute("class", "col-md-4");
		rowDiv.appendChild(colDiv);

		var thumbnailDiv = createThumbnail(Title,Text,Img);
		colDiv.appendChild(thumbnailDiv);

		thumbnailDiv.addEventListener("click",createFunctionShowProduct(prod, prods.valStock));
		prods = iterableProd.next();

	}
}


function productsCategoryShopPopulate(category, shop){
	var store =  StoreHouse.getInstance();

	var colDerecha = document.getElementById("colDerecha");
	while(colDerecha.hasChildNodes()){
		colDerecha.removeChild(colDerecha.firstChild);
	}

	var h2 = document.createElement("h2");
	colDerecha.appendChild (h2);
	h2.appendChild(document.createTextNode("Productos:"));

	var rowDiv = document.createElement("div");
	rowDiv.setAttribute("class", "row");
	colDerecha.appendChild(rowDiv);

	var store=  StoreHouse.getInstance();
	var iterableProd = store.getProductsInShopCategory(shop, category);
	var prods = iterableProd.next();

	while(!prods.done){
		var prod = prods.value;
		var Title = prod.name;
		var Text = prod.price +"€";
		var Img = "imagenes/"+prod.images;

		var colDiv = document.createElement("div");
		colDiv.setAttribute("class", "col-md-4");
		rowDiv.appendChild(colDiv);

		var thumbnailDiv = createThumbnail(Title,Text,Img);
		colDiv.appendChild(thumbnailDiv);

		thumbnailDiv.addEventListener("click",createFunctionShowProduct(prod, prods.valStock))	

		prods = iterableProd.next();

	}
}

function productPopulate(prod, stock, parentNode){
	var rowDiv1 = document.createElement("div");
	
	if(parentNode != " " && typeof parentNode != 'undefined'){
		rowDiv1.setAttribute("class", "row");
		parentNode.appendChild(rowDiv1);
	}else{
		var parentNode = document.getElementById("colDerecha");
        
        while(parentNode.hasChildNodes()){
            parentNode.removeChild(parentNode.firstChild);
		}

		rowDiv1.setAttribute("class", "row");
		parentNode.appendChild(rowDiv1);
	}

	var store = StoreHouse.getInstance();

	//Columna1: imagen
	var colDiv1 = document.createElement("div");
    colDiv1.setAttribute("class", "col-md-6");
    rowDiv1.appendChild(colDiv1);

    var thumbnailDiv = document.createElement("div");
    thumbnailDiv.setAttribute("class", "thumbnail prod-thumb-custom");
    colDiv1.appendChild(thumbnailDiv);

    var img = document.createElement("img");
    img.setAttribute("src", "imagenes/"+prod.images+"");
    img.setAttribute("class", "prod-img-thumb");
    thumbnailDiv.appendChild(img);

	//Columna 2: datos
	var colDiv2 = document.createElement("div");
    colDiv2.setAttribute("class", "col-md-6 prod-data-container-custom");
    rowDiv1.appendChild(colDiv2);

    var dataContainer = document.createElement("div");
    dataContainer.setAttribute("class", "data-container-div");
    colDiv2.appendChild(dataContainer);


    var titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "prod-data-div prod-data-title");
    dataContainer.appendChild(titleDiv);
    var h3 = document.createElement("h3");
    h3.setAttribute("class", "prod-title-custom");
    titleDiv.appendChild(h3);
    h3.appendChild(document.createTextNode(prod.name));

    var stockDiv = document.createElement("div");
    stockDiv.setAttribute("class", "prod-data-div");
    dataContainer.appendChild(stockDiv);
    var p = document.createElement("p");
    p.appendChild(document.createTextNode("Stock: "+stock));
    stockDiv.appendChild(p);

    var priceDiv = document.createElement("div");
    priceDiv.setAttribute("class", "prod-data-div");
    dataContainer.appendChild(priceDiv);
    var p = document.createElement("p");
    p.setAttribute("class", "price-custom");
    p.appendChild(document.createTextNode(prod.price+"€"));
    priceDiv.appendChild(p);

    var buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", " prod-data-button");
    colDiv2.appendChild(buttonDiv);

    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn");
    button.appendChild(document.createTextNode("Comprar"));
    buttonDiv.appendChild(button);

    var button2 = document.createElement("button");
    button2.setAttribute("type", "button");
    button2.setAttribute("class", "btn");
    button2.appendChild(document.createTextNode("Ficha Técnica"));
    buttonDiv.appendChild(button2);
    button2.addEventListener("click",createFunctionAbrirVentana(prod));

    var divTab = document.createElement("div");
    parentNode.appendChild(divTab);
    createProductTab(divTab, prod);

}

function MenuTiendas(menuCont, iterable, name, currentShop){
	var store =  StoreHouse.getInstance();

	var panGroup = document.createElement("div");
	panGroup.setAttribute("class", "panel-group");
	menuCont.appendChild(panGroup);

	var panel = document.createElement("div");
	panel.setAttribute("class", "panel panel-default");
	panGroup.appendChild(panel);

	var panHead = document.createElement("div");
	panHead.setAttribute("class", "panel-heading");
	panel.appendChild(panHead);

	var h4 = document.createElement("h4");
	h4.setAttribute("class", "panel-title");
	panHead.appendChild(h4);

	//El enlace en el titulo
	var aTitle = document.createElement("a");
	aTitle.setAttribute("data-toggle", "collapse");
	aTitle.setAttribute("href", "#"+name);
	h4.appendChild(aTitle);
	aTitle.appendChild(document.createTextNode(name));

	var listDiv = document.createElement("div");
	listDiv.setAttribute("id", name);
	listDiv.setAttribute("class", "panel-collapse collapse in");
	panel.appendChild(listDiv);

	var ul = document.createElement("ul");
	ul.setAttribute("class", "list-group ul-custom");
	listDiv.appendChild(ul);

	
	var items = iterable.next();

	while(!items.done){
		var item = items.value;
		var li = document.createElement("li");
		li.setAttribute("class", "list-group-item");
		if(item instanceof Category){
			li.appendChild(document.createTextNode(item.title));
		}
		
		if(item instanceof Tienda){
			li.appendChild(document.createTextNode(item.name));
		}
		
		ul.appendChild(li);
		if(item instanceof Tienda){
			li.addEventListener("click", createFunctionShowShop(item));
		}else if(item instanceof Category){
			li.addEventListener("click", createFunctionShowProductCategory(item, currentShop));
		}
		items = iterable.next();
	}
}

function createProductTab(container, prod){
	var ul = document.createElement("ul");
	ul.setAttribute("class", "nav nav-tabs");
	container.appendChild(ul);

	var li = document.createElement("li");
	ul.appendChild(li);

	var li = document.createElement("li");
	ul.appendChild(li);

	var divContent = document.createElement("div");
	divContent.setAttribute("class", "tab-content tab-content-custom");
	container.appendChild(divContent);

	var divTab = document.createElement("div");
	divTab.setAttribute("id", "descripcion");
	divTab.setAttribute("class", "tab-pane fade in active");
	divContent.appendChild(divTab);
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
    var thumbnailDiv = document.createElement("div");
    thumbnailDiv.setAttribute("class", "thumbnail thumb-custom");

    var img = document.createElement("img");
    img.setAttribute("src", image);
    thumbnailDiv.appendChild(img);

    var caption = document.createElement("div");
    caption.setAttribute("class", "caption text-center");
    thumbnailDiv.appendChild(caption);

    var h3 = document.createElement("h3");
    caption.appendChild(h3);
    h3.appendChild(document.createTextNode(title));

    var p = document.createElement("p");
    p.appendChild(document.createTextNode(text));
    caption.appendChild(p);

    var button = document.createElement("button");
    button.setAttribute("class", "btn btn-thumb-custom");
    button.appendChild(document.createTextNode("Entrar"));
    caption.appendChild(button);

    return thumbnailDiv;
}

function limpiar(){
    var main = document.getElementById("main");
	while(main.hasChildNodes()){
		main.removeChild(main.firstChild);
	} 
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

window.onload = init;
