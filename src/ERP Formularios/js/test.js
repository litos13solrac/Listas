"use strict";

/* 
Testeo del Store House.
*/
function testStoreHouse(){

	function testCategory(){
		console.log ("##### Testeo Category. ##### ");
		//Categoría cat1: Category: Categoría 1(Descripción categoría 1)
		console.log ("Categoría cat1: " + cat1.toString());
		//Categoría cat2: Category: Categoría 2(Descripción categoría 2)
		console.log ("Categoría cat2: " + cat2.toString());
		console.log ("##### Fin: Testeo Category. ##### ");
		console.log("");				
	}

	function showShops(){
		//Recorremos las tiendas.
		console.log ("##### Recorremos las tiendas. #####");
		var shops = store.shops;
		var shop = shops.next();
		while (shop.done !== true){
			console.log ("Tienda: " + shop.value.name);
			shop = shops.next();
		}
		console.log("");
	}

	function showCategories(){
		//Recorremos las categorías.
		console.log ("#####Recorremos las categorías. #####");
		var categories = store.categories;
		var category = categories.next();
		var cont =0;
		while (category.done !== true){
			//Category: title
			console.log ("Category: " + category.value.title);	
			category = categories.next();
		}	
		console.log("");	
	}

	function showProductsByCategory(category,type,des){
		var typeText = " y tipo: "+ des;
		if (type === null || type === undefined || type === ""){
			typeText ="";
	   	}
		console.log ("##### Productos por categoria: " + category.title + typeText);
		showProducts(store.getCategoryProducts(category,type));	
		console.log ("####### Fin: Productos por categoria. #######");	
		console.log("");
	}

	function showProductsByShop(shop,type,des){
		var typeText = " y tipo: "+ des;
		if (type === null || type === undefined || type === ""){
			typeText ="";
	  	 }
		console.log ("##### Productos por Tienda: " + shop.name + typeText);
		showProducts(store.getShopProducts(shop,type));	
		console.log ("####### Fin: Productos por Tienda. #######");	
		console.log("");
	}

	function showProducts(Product){
		var products =Product;
		var product = products.next();
		while (product.done !== true){
			console.log ("Producto: " + product.value.name + ", Stock: " + product.valStock );		
			product = products.next();
		}
	}
 
	//Creamos tiendas
    var t1 = new Tienda("T1","Juegomania", "666555321");
    var t2 = new Tienda("T2","Villagaming", "926303030");
    var t3 = new Tienda("T3","AlimentacionJesus", "666458555");

	//Creamos categorias
	var cat1 = new Category("Plataformas", "Intenta no caer");
    var cat2 = new Category("Lucha", "Derrota a tus enemigos");
    var cat3 = new Category("Deportes", "Se el mejor");	
	testCategory();

	//Creamos productos
	var pr1ps4 = new PS4("FIFA2018", "Juego de Futbol", 60, "SI");
    var pr2ps4 = new PS4("Tekken7", "Combates en 2D", 70, "SI");
    
    var pr1pc = new PC("DragonBallFighterZ", "Juego de Lucha", 45, "SI");
    var pr2pc = new PC("TheLastNight", "Juego de Plataformas", 20, "SI");
    
    var pr1sw = new Switch("SuperMarioOddisey", "Juego de plataformas", 50, 2);
    var pr2sw = new Switch("NBA2K18", "Juego de Baloncesto", 35, 2);

	//Creamos la instancia de store house
	console.log ("##### Testeo StoreHouse. ##### ");
	var store = StoreHouse.getInstance();
    
	//Añadimos las categorias
	console.log("Numero de categorias: "+store.addCategory(cat1));
	console.log("Numero de categorias: "+store.addCategory(cat2));
	console.log("Numero de categorias: "+store.addCategory(cat3));
	console.log("");

	//Añadimos tiendas
	console.log("Numero de tiendas: "+store.addShop(t1));
	console.log("Numero de tiendas: "+store.addShop(t2));
	console.log("Numero de tiendas: "+store.addShop(t3));
	console.log("");

	//Añadimos productos
	console.log("Numero de productos: "+store.addProduct(pr1sw,cat1));
	console.log("Numero de productos: "+store.addProduct(pr1pc));
	console.log("Numero de productos: "+store.addProduct(pr2pc,cat1));
	console.log("Numero de productos: "+store.addProduct(pr1ps4));
	console.log("Numero de productos: "+store.addProduct(pr2ps4 ,cat2));
	console.log("Numero de productos: "+store.addProduct(pr2sw, cat3));
	console.log("");
	
	//Añadimos stock de un producto a una tienda
	console.log("Añadimos stock a una tienda: "+store.addProductInShop(pr1sw,t2,5));
	console.log("Añadimos stock a una tienda: "+store.addProductInShop(pr1pc,t2,10));
	console.log("Añadimos stock a una tienda: "+store.addProductInShop(pr1ps4,t1,15));
	console.log("");
	
	

	showCategories();
	showShops();
	showProductsByCategory(store.defaultCategory);
	showProductsByCategory(cat1);
	showProductsByCategory(cat2);

	//Eliminamos productos
	console.log("##### Eliminamos el producto Mario Oddisey. #####");
	store.removeProduct(pr1sw);

	//Eliminamos la categoria electronica:
	console.log("##### Eliminamos la categoria Lucha. #####");
	store.removeCategory(cat2);

	showProductsByCategory(store.defaultCategory);
	showCategories();

	showProductsByShop(store.defaultShop);
	showProductsByShop(t1);
	showProductsByShop(t2);

	store.removeShop(t1);

	showProductsByShop(store.defaultShop);

	store.removeShop(t2);

	showProductsByShop(store.defaultShop);


} 
window.onload = testStoreHouse;


