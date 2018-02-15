"use strict";

var StoreHouse = (function(){
    var instancia; 
    //Iniciamos el Singleton
    function iniciar(){
        function StoreHouse(nombre){
            if(!(this instanceof StoreHouse)) throw new InvalidAccessConstructorException();
    
            var _nombre = nombre;
            Object.defineProperty(this, 'nombre', {
                get: function() {
                    return _nombre;
                },
                set: function(value) {
                    _nombre = value;
                }
            }); 
            
            var stock = 0;
            
            //Categorias
            var _categorias = []; //array de categorías.
            //Iterador de categorias
            Object.defineProperty(this, 'categorias', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _categorias.length ?
				               {value: _categorias[nextIndex++].categoria, done: false} :
				               {done: true};
				       }
				    }
				}	
			});
            
            //Añade Categoria
            this.addCat = function(cat){
                if(!(cat instanceof Categorias)) throw new NoCatException();
                var pos = getCatPos(cat);
                if(pos === -1){
                    _categorias.push(
                    {
                        categoria:cat,
                        prod:[]
                    });
                }else{
                    throw new CatExistException();
                }
                return _categorias.length;
            }
            
            //Elimina Categoria
            this.removeCat = function(cat){
                if(!(cat instanceof Categorias))throw new NoCatException();
                var pos = getCatPos(cat);
                if(pos !==-1){
                    if(cat.title !== _defaultCat.title){
                        _categorias.splice(pos,1);
                    }else{
                        throw new DefCatException(); 
                    }
                }else{
                    throw new CatNoExistException();
                }
                return _categorias.length;
            }
    
            //Devuelve la posicion en el array de categorias o -1 si no está.
            function getCatPos(cat){
                if(!(cat instanceof Categorias)){
                    throw new NoCatException();
                }
                function comparar(elem){
                    return (elem.categoria.title === cat.title)
                }
                return _categorias.findIndex(comparar);
            }
            
            //Categoria por defecto
            var _defaultCat = new Categorias("Otros","Categoria por defecto");
            this.addCat(_defaultCat);
            Object.defineProperty(this, 'defaultCat',{
                get:function(){
                    return _defaultCat;
                }
            });
            
            
            //Tiendas
            var _tiendas = []; //array de tiendas
            //Iterador de tiendas
            Object.defineProperty(this, 'tiendas',{
                get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _tiendas.length ?
				               {value: _tiendas[nextIndex++], done: false} :
				               {done: true};
				       }
				    }
				} 
            });
            
            //Añade Tienda
            this.addTienda = function(tienda){
                if(!(tienda instanceof Tienda)){
                    throw new NoTiendaException();
                }else{
                    var pos = getTiendaPos(tienda);
                    if(pos === -1){
                        _tiendas.push(tienda);
                    }else{
                        throw new TiendaExistException();
                    }
                    return _tiendas.length;
                }
            }
            
            //Elimina Tienda
            this.removeTienda = function(tienda){
                if(!(tienda instanceof Tienda)){
                    throw new NoTiendaException();
                }else{
                    var pos = getTiendaPos(tienda);
                    if(pos !==-1){
                        if(tienda.title !== _defTienda.title){
                            _tiendas.splice(pos,1);
                        }else{
                           throw new DefTiendaException(); 
                        }
                    }else{
                        throw new TiendaNoExistException();
                    }
                }
                return _tiendas.length;
            }
            
            //Devuelve la posicion de una tienda en el array. Devuelve -1 si no está
            function getTiendaPos(tienda){
                if(!(tienda instanceof Tienda)){
                    throw new NoTiendaException();
                }
                function comparar(elem){
                    return (elem.CIF === tienda.CIF)
                }
                return _tiendas.findIndex(comparar);
            }
            
            //Tienda por defecto
            var _defTienda = new Tienda("0000","Centralita","C/Falsa 123", "926926926", coord);
            this.addTienda(_defTienda);
            Object.defineProperty(this, 'defTienda',{
                get:function(){
                    return _defTienda;
                }
            });
            
            //Coordenadas de tienda por defecto
            var coord = new Coords();
            
            
            //Productos
            
            //Añadir productos
            this.addProd = function(prod, cat){
                if(!(prod instanceof Productos))throw new NoProdException();
                if(cat === null || cat === 'undefined' || cat === ''){
                    cat = this.defaultCat;
                }
                var catPos = getCatPos(cat);
                if(catPos === -1){
                    catPos = this.addCat(cat)-1;
                }
                var prodPos = getProdPos(prod, _categorias[catPos].prod);
                if(prodPos === -1){
                    _categorias[catPos].prod.push(
                    {
                        prod: prod
                    })
                } else {
                    throw new ProdExistException();
                }
                return _categorias[catPos].prod.length;
            }
            
            //Elimina producto de una categoria
            this.removeProd = function(prod, cat){
                if(!(prod instanceof Productos)) throw new NoProdException();
                if(!(cat instanceof Categorias)) throw new NoCatException();
                var catPos = getCatPos(cat);
                if(catPos !== -1){
                    var prodPos = getProdPos(prod, _categorias[catPos].prod);
                    if(prodPos !==-1){
                        _categorias[catPos].prod.splice(prodPos,1);
                    }else{
                        throw new NoProdException();
                    }
                }else {
                    throw new CatNoExistException();
                }
                return _categorias[catPos].prod.length;
            }
            
            //Elimina un producto
            this.removeProduct = function(prod){
                if(!(prod instanceof Productos)) throw new NoProdException();
                
                var i = _categorias.length-1, pos = -1;
                while(i>=0 && pos ===-1){
                    pos = getProdPos(prod, _categorias[i].prod);
                    i--;
                }
                if(pos !==-1){
                    _categorias[i+1].prod.splice(pos,1);
                } else {
                    throw new NoProdException();
                }
            }
            
            //Devuelve la posicion de un producto en el array. Devuelve -1 si no está
            function getProdPos(prod, cat){
                if(!(prod instanceof Productos)){
                    throw new NoProdException();
                }
                function comparar(elem){
                    return (elem.SerialNumber === prod.SerialNumber)
                }
                return cat.findIndex(comparar);
            }
            
            //Añadir producto a tienda
            this.addProductInShop = function(prod, tienda, stock){
                if (stock === 'undefined' || stock === '' || Number.isNaN(stock)) stock == 1;
                		
				if (tienda === null || tienda === 'undefined' || tienda === ''){
					tienda = this.defTienda;
				}	
				if (!(tienda instanceof Tienda)) { 
					throw new TiendaException ();
				}
                
                var tiendaPos = getTiendaPos(tienda);
                if(tiendaPos === -1){
                    tiendaPos = this.addTienda(tienda)-1;
                }
                
                var prodPos = getProdPos(prod);
                if(prodPos === -1){
                    _tiendas[tiendaPos].prod.push({
                        prod: prod,
                        stock: stock
                    });
                }else {
                    throw new ProdExistException();
                }
                return _tiendas[tiendaPos].prod.length;
            }
            
            //Devuelve todos los productos de una categoria
            this.getCategoryProducts = function(cat){
                if(!(cat instanceof Categorias)) throw new NoCatException();
                
                var catPos = getCatPos(cat);
                if(cat === -1) throw new CatNoExistException();
                var nextIndex = 0;
                return {
                    next: function(){
                        return nextIndex < _categorias[catPos].prod.length ? {
                            value: _categorias[catPos].prod[nextIndex++].prod, done:false} : {done:true};
                        }
                    }
                }
            
        }       
        StoreHouse.prototype = {};
        StoreHouse.prototype.constructor = StoreHouse;
        
        var instance = new StoreHouse();
        Object.freeze(instance);
        return instance;
    }
    return{
        getInstance: function(){
            if(!instancia){
                instancia = iniciar();
            }
            return instancia;
        }
    };
})();