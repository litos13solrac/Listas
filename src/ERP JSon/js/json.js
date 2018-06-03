var categories = [];
var shops = [];
var products = [];

function crearJson(){
    cargarCat();
    cargarTien();
    cargarProd();
    setTimeout(initPopulate(),3000);
}

function cargarCat(){
    function crearCat(cat){
        var store = StoreHouse.getInstance();
        for(var i=0; i<cat.length; i++){
            var item = new Category(cat[i]["title"]);
            item.description = cat[i]["description"];
            categories.push(item);
            store.addCategory(item);
        }
    }
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var data = JSON.parse(xhttp.response);
            crearCat(data);
        }
    };
    xhttp.open("POST", "json/cat.json", true);
    xhttp.send();
}

function cargarTien(){
    function crearTien(t){
        var store = StoreHouse.getInstance();
        for(var i=0; i<t.length; i++){
            var item = new Tienda(t[i]["cif"],t[i]["name"], t[i]["direction"], t[i]["tel"]);
            shops.push(item);
            store.addShop(item);
        }
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200){
        var data = JSON.parse(xhttp.response);
        crearTien(data);
      }
    };
    xhttp.open("POST", "json/shop.json", true);
    xhttp.send();
}

function cargarProd(){
    function crearProd(prod){
        var store = StoreHouse.getInstance();
        for(var i=0; i<prod.length;i++){
            var title = prod[i]["cat"];
            var cat = store.getCategoryByTitle(title);
            if(prod[i]["tipo"] == "PS4"){
                var item = new PS4(prod[i]["name"], prod[i]["description"], prod[i]["price"], prod[i]["image"], prod[i]["tax"], prod[i]["internet"]);
            } else if(prod[i]["tipo"] == "PC"){
                var item = new PC(prod[i]["name"], prod[i]["description"], prod[i]["price"], prod[i]["image"], prod[i]["tax"], prod[i]["mando"]);
            } else if(prod[i]["tipo"] == "NS"){
                var item = new Switch(prod[i]["name"], prod[i]["description"], prod[i]["price"], prod[i]["image"], prod[i]["tax"], prod[i]["num"]);
            }
            products.push(item);
            store.addProduct(item, cat);
        }
    }
    function prodATienda(){
        var store = StoreHouse.getInstance();
        store.addProductInShop(products[0], shops[0]);
        store.addProductInShop(products[1], shops[1]);
        store.addProductInShop(products[2], shops[1]);
        store.addProductInShop(products[3], shops[2]);
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200){
        var data = JSON.parse(xhttp.response);
        crearProd(data);
        prodATienda();
      }
    };
    xhttp.open("POST", "json/prod.json", true);
    xhttp.send();
}

function grabar(){
    var store = StoreHouse.getInstance();
    var products = store.products;
    var prod = products.next();
    var user = getCookie("User");
    var items = "Productos: [";
    while(!prod.done){
        items+=JSON.stringify(prod.value.getObject());
        prod = products.next();
        if(!prod.done){
            items+="; ";
        }
    }
    items += "], Tiendas: [";
    
    var shops = store.shops;
    var shop = shops.next();
        while(!shop.done){
            items+=JSON.stringify(shop.value.getObject());
            shop = shops.next();
            if(!shop.done){
                items+="; ";
            }
        }
    items += "], Categorias: [";

    var categories = store.categories;
    var category = categories.next();
    while(!category.done){
        items+=JSON.stringify(category.value.getObject());
        category = categories.next();
        if(!category.done){
            items+=",";
        }
    }
    items += "]";
    //console.log(items);
    enviar(items, user);
}

function enviar(item,user){
    var xhttp = new XMLHttpRequest();
 
    xhttp.open("POST", "json.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("x="+item+"&usu="+user);
}