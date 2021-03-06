"use strict";

function test(){
    function testCat(){
        console.log("*** Probando objeto Categoria ***");
        console.log("Categoria 1: "+cat1.toString());
        console.log("Categoria 2: "+cat2.toString());
        console.log("Categoria 3: "+cat3.toString());
    }
    
    function testProd(){
        console.log("*** Probando objetos Producto ***");
        console.log("Objeto 1 Tipo PS4: "+prps4.toString());
        console.log("Objeto 2 Tipo PC: "+prpc.toString());
        console.log("Objeto 3 Tipo Switch: "+prsw.toString());
    }
    
    function testTiend(){
        console.log("*** Probando objetos Tienda ***");
        console.log("Tienda 1: "+t1.toString());
        console.log("Tienda 2: "+t2.toString());
        console.log("Tienda 3: "+t3.toString());
    }
    
    function verTiendas(){
        console.log("*** Lista de tiendas ***");
        var tiendas = store.tiendas;
        var shop = tiendas.next();
        while(shop.done !== true){
            console.log("Tienda: "+shop.value.name);
            shop = tiendas.next();
        }
    }
    
    function verCategorias(){
        console.log("*** Lista de categorias ***");
        var cat = store.categorias;
        var cate = cat.next();
        while (cate.done !== true){
            console.log("Categoria: "+cate.value.title);
            cate = cat.next();
        }
    }
    
    function verProductos(prod){
        var producto = prod.next();
        while(producto.done !== true){
            console.log("Producto: "+producto.value.name);
            producto = prod.next();
        }
    }
    
    function verProdCate(cat){
        console.log("*** Productos por Categoria: "+ cat.title +" ***");
        verProductos(store.getCategoryProducts(cat));
    }
    
    function verProdTienda(shop){
        console.log("*** Productos por tienda: "+ shop.name + " ***");
        verProductos(store.getTiendaProducts(shop));
    }
    
    function verTodos(){
        console.log("*** TODOS LOS PRODUCTOS POR CATEGORIAS ***");
        var cat = store.categorias;
        var cate = cat.next();
        while (cate.done !== true){
            console.log("- Categoria: "+cate.value.title);
            verProductos(store.getCategoryProducts(cate.value));
            cate = cat.next();
        }
    }
    
    var cat1 = new Categorias("Plataformas", "Intenta no caer");
    var cat2 = new Categorias("Lucha", "Derrota a tus enemigos");
    var cat3 = new Categorias("Deportes", "Se el mejor");
    
    var pr1ps4 = new PS4("PS4J1", "FIFA2018", "Juego de Futbol", 60, "SI");
    var pr2ps4 = new PS4("PS4J2", "Tekken7", "Combates en 2D", 70, "SI");
    var pr1pc = new PC("PCJ1", "DragonBallFighterZ", "Juego de Lucha", 45, "SI");
    var pr2pc = new PC("PCJ2", "TheLastNight", "Juego de Plataformas", 20, "SI");
    var pr1sw = new Switch("NSWJ1", "SuperMarioOddisey", "Juego de plataformas", 50, 2);
    var pr2sw = new Switch("NSWJ2", "NBA2K18", "Juego de Baloncesto", 35, 2);
    
    var c1 = new Coords(50,25);
    var c2 = new Coords(37,66);
    var c3 = new Coords(85,2);
    
    var t1 = new Tienda("T1","Juegomania","Avenida Magica, 7", "666555321", c1);
    var t2 = new Tienda("T2","Villagaming","Calle de la Piruleta, 22", "926303030", c2);
    var t3 = new Tienda("T3","AlimentacionJesus", "Paseo Juanola","666458555", c3);
    
    
    console.log("---- Probando StoreHouse ----");
    var store = StoreHouse.getInstance();
    store.nombre = "Almacen";
    console.log("---- Instancia StoreHouse: "+store.nombre);
    
    store.addTienda(t1);
    store.addTienda(t2);
    store.addTienda(t3);
    verTiendas();
    
    store.addCat(cat1);
    store.addCat(cat2);
    store.addCat(cat3);
    verCategorias();
    
    console.log("*** Probando a agregar productos ***");
    console.log("Nuevo producto: "+pr1ps4.name+". Total en categoria "+cat3.title+": " + store.addProd(pr1ps4, cat3));
    console.log("Nuevo producto: "+pr2ps4.name+". Total en categoria "+cat2.title+": " + store.addProd(pr2ps4, cat2));
    console.log("Nuevo producto: "+pr1pc.name+". Total en categoria "+cat2.title+": " + store.addProd(pr1pc, cat2));
    console.log("Nuevo producto: "+pr2pc.name+". Total en categoria "+cat1.title+": " + store.addProd(pr2pc, cat1));
    console.log("Nuevo producto: "+pr1sw.name+". Total en categoria "+cat1.title+": " + store.addProd(pr1sw, cat1));
    console.log("Nuevo producto: "+pr2sw.name+". Total en categoria "+cat3.title+": " + store.addProd(pr2sw, cat3));
    verProdCate(cat3);
    verTodos();
    
    console.log("Eliminando categoria "+cat2.name);
    store.removeCat(cat2);
    verCategorias();
    verTodos();
    
    console.log("*** Probando a agregar productos a tiendas ***");
    console.log("Añadir producto "+pr1ps4.name+" a tienda "+t1.name+". Total productos: "+store.addProductInShop(pr1ps4,t1));
    console.log("Añadir producto "+pr2ps4.name+" a tienda "+t2.name+". Total productos: "+store.addProductInShop(pr2ps4,t2));
    console.log("Añadir producto "+pr1pc.name+" a tienda "+t2.name+". Total productos: "+store.addProductInShop(pr1pc,t2));
    console.log("Añadir producto "+pr2pc.name+" a tienda "+t3.name+". Total productos: "+store.addProductInShop(pr2pc,t3));
    verProdTienda(t2);
    
    console.log("*** Aumentando stock ***");
    console.log("Recibidos 13 "+pr1pc.name+" en tienda "+t2.name+". Stock total: "+store.addQuantityProductInShop(pr1pc,t2,13));
    
    //testCat();
    //testTiend();
    //testProd();
    
    
    
}
window.onload = test;