const DB_NAME = "ERPIndexedDB";
const DB_VERSION = 2;
const CAT = "categories";
const SHOP = "shops";
const PROD = "products";

var indexedDB = window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var database = null;
function openDB(){
    console.log("Iniciando Base de Datos...");
    database = indexedDB.open(DB_NAME, DB_VERSION);
    database.onsuccess = function(e){
        
        console.log("Base de Datos iniciada");
    };
    database.onerror = function(e){
        console.error("ERROR AL INICIAR: ",e.target.errorCode);
    };
    database.onupgradeneeded = function(e){
        console.log("Actualizando...");
        var db = database.result;
        //Creo los tres tipos de objeto: categorias, tiendas y productos
        var store = db.createObjectStore(CAT, { keyPath: 'title', autoIncrement: true });
        
        var store = db.createObjectStore(SHOP, { keyPath: 'cif', autoIncrement: true });
        
        var store = db.createObjectStore(PROD, { keyPath: 'serialNumber', autoIncrement: true });
    }
}

function addItem(store, item){
    console.log("Añadiendo objeto "+store);
    var db = database.result;
    var st = db.transaction([store], "readwrite");
    var obj = st.objectStore(store);
    var req = obj.put(item);
    
    req.onsuccess = function(e){
        console.log("Objeto "+store+" añadido.");
    }
    
    req.onerror = function(e){
        console.error("ERROR al añadir OBJETO")
    }
}

function updateItem(store, item, key){
    console.log("Modificando objeto "+store)
    var db = database.result;
    var object = db.transaction([store],"readwrite").objectStore(store);

    var request = object.get(key);

    request.onsuccess = function(e){
        var data = request.result;
        data = item;
        var requestUpdate = object.put(data);

        requestUpdate.onerror = function(e) {
            console.log("ERROR AL ACTUALIZAR");
        };
        requestUpdate.onsuccess = function(event) {
            console.log("Objeto actualizado correctamente");
        };
    };
    request.onerror = function(event){
        console.log("ERROR");
    };
}

function deleteItem(store, key){
    console.log("Borrando objeto "+store);
    var db = database.result;
    var request = db.transaction([store],"readwrite").objectStore(store).delete(key);
    
    request.onsuccess = function(e){
        console.log("Objeto eliminado");
    }
    request.onerror = function(e){
        console.log("ERROR AL ELIMINAR");
    }
}
openDB();