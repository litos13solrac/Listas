//Excepción genérica del Store House.
function StoreHouseException() {
	this.name = "StoreHouseException";
	this.message = "Error: Store House Generic Exception.";
}
StoreHouseException.prototype = new BaseException(); //Heredamos de BaseException
StoreHouseException.prototype.constructor = StoreHouseException;

//Excepción genérica de Category del Store House.
function  CategoryStoreHouseException() {
	this.name = "CategoryStoreHouseException";
	this.message = "Error: Category Store House Generic Exception.";
}
CategoryStoreHouseException.prototype = new StoreHouseException(); 
CategoryStoreHouseException.prototype.constructor = CategoryStoreHouseException;

//Excepción genérica de Shop del Store House.
function  ShopStoreHouseException() {
	this.name = "ShopStoreHouseException";
	this.message = "Error: Shop Store House Generic Exception.";
}
ShopStoreHouseException.prototype = new StoreHouseException(); 
ShopStoreHouseException.prototype.constructor = ShopStoreHouseException;

//Excepción genérica de Product del Store House.
function  ProductStoreHouseException() {
	this.name = "ProductStoreHouseException";
	this.message = "Error: Product Store House Generic Exception.";
}
ProductStoreHouseException.prototype = new StoreHouseException(); 
ProductStoreHouseException.prototype.constructor = ProductStoreHouseException;

//Excepción de eliminacion de la categoria por defecto.
function DefaultCategoryStoreHouseException() {
	this.name = "DefaultCategoryStoreHouseException";
	this.message = "Error: The Default Category cannot be removed.";
}
DefaultCategoryStoreHouseException.prototype = new CategoryStoreHouseException(); 
DefaultCategoryStoreHouseException.prototype.constructor = DefaultCategoryStoreHouseException;

//Excepción de categoria existente.
function CategoryExixtsStoryHouseException() {
	this.name = "CategoryExixtsStoryHouseException";
	this.message = "Error: The Category already exists in Store House.";
}
CategoryExixtsStoryHouseException.prototype = new CategoryStoreHouseException(); 
CategoryExixtsStoryHouseException.prototype.constructor = CategoryExixtsStoryHouseException;

//Excepción de tienda existente.
function ShopExixtsStoryHouseException() {
	this.name = "ShopExixtsStoryHouseException";
	this.message = "Error: The Shop already exists in Store House.";
}
ShopExixtsStoryHouseException.prototype = new ShopStoreHouseException(); 
ShopExixtsStoryHouseException.prototype.constructor = ShopExixtsStoryHouseException;

//Excepción de tienda no existente.
function ShopDoesntExixtsStoryHouseException() {
	this.name = "ShopDoesntExixtsStoryHouseException";
	this.message = "Error: The Shop doesnt exists in Store House.";
}
ShopDoesntExixtsStoryHouseException.prototype = new ShopStoreHouseException(); 
ShopDoesntExixtsStoryHouseException.prototype.constructor = ShopDoesntExixtsStoryHouseException;

//Excepción de producto no existente.
function ProductDoesntExixtsStoryHouseException() {
	this.name = "ProductDoesntExixtsStoryHouseException";
	this.message = "Error: The Product doesnt exists in Store House.";
}
ProductDoesntExixtsStoryHouseException.prototype = new ProductStoreHouseException(); 
ProductDoesntExixtsStoryHouseException.prototype.constructor = ProductDoesntExixtsStoryHouseException;




var StoreHouse = (function(){

    var instantiated;

    function init(){

        function StoreHouse(){

            if(!(this instanceof StoreHouse)){
                throw new InvalidAccessConstructorException();
            }

            /* Definicion del atributo title de StoreHouse*/
			var _title = "StoreHouseDefault";
			Object.defineProperty(this, 'title', {
				get:function(){
					return _title;
				},
				set:function(title){
					_title = validate.empty(title,"title of StoreHouse");
				}		
			});	

            var _shops = [];
            var _categories = [];
            var _products = [];


            //Propiedades de las categorias

            Object.defineProperty(this, "categories", {
                get:function(){
                    var nextIndex = 0;
                    return{
                        next: function(){
                            return nextIndex < _categories.length ? 
                            {value: _categories[nextIndex++].category, done: false} :
                            {done: true};
                        }
                    }
                }
            });

            this.addCategory = function(category){
                //Utilizamos una funcion para comprobar si category es una instancia de Category.
                //La funcion se encuentra al final del fichero.
                isCategory(category);

                var position = getCategoryPosition(category);
                if(position === -1){
                    _categories.push(
                        {
                            category: category,
                            idProducts:[]
                        }
                    );
                }else{
                    throw new CategoryExixtsStoryHouseException();
                }
                addItem("categories",category.getObject());
                return _categories.length;
            }

            //Elimina una categoría pasando los productos a la categoria por defecto.
			this.removeCategory = function(category){

                isCategory(category);
                		
                var position = getCategoryPosition(category);
                var defaultPos = getCategoryPosition(_defaultCategory);
				if (position !== -1){
					if (category.title !== _defaultCategory.title){
                        //Utilizamos apply para pasar un array entero como parametro.
                        //Filtramos el array de la categoria a eliminar para obtener un array que solamente contenga los elementos que no se encuentren en la categoria por defecto.
                        //Añadimos el array de elementos nuevos a la categoria por defecto y eliminamos la categoria seleccionada.
                        _categories[defaultPos].idProducts.push.apply( _categories[defaultPos].idProducts,  _categories[position].idProducts.filter(elem => notInArray(_categories[defaultPos].idProducts,elem)));
                        _categories.splice(position, 1);
					} else{
						throw new DefaultCategoryStoreHouseException();
					}					
				} else{
					throw new CategoryNotExistsStoreHouseException();
                }	
				return _categories.length;
			}

            this.getCategoryProducts = function(category, type){
                isCategory(category);

                var categoryPosition = getCategoryPosition(category); 
                if (categoryPosition === -1){ throw new CategoryNotExistsStoreHouseException();}
                var typeReceived = true;
                if (type === null || type === undefined || type === ""){
					 typeReceived = false;
                }

                var nextIndex = 0;
                var prod;
                var stock;

                if(typeReceived === true){
                    return {
                        next: function(){
    
                            while (nextIndex < _categories[categoryPosition].idProducts.length){
                                prod = _products[getProductById(_categories[categoryPosition].idProducts[nextIndex])];
                                if(prod instanceof type){
                                    stock = getStock(prod);
                                    nextIndex++;
                                    return {value: prod , valStock: stock , done: false}
                                }
                                nextIndex++;
                            }
                                 
                                return {done: true};
                        }
    
                }
                }else{
                    return {
                        next: function(){

                            while (nextIndex < _categories[categoryPosition].idProducts.length){
                                prod = _products[getProductById(_categories[categoryPosition].idProducts[nextIndex])];
                                stock = getStock(prod);
                                nextIndex++;
                                return {value: prod , valStock: stock , done: false}
                            }
                                
                                return {done: true};
                        }

                }
            }
        }

            function getCategoryPosition(category){
                return _categories.findIndex(elem => elem.category.title === category.title);
            }

            var _defaultCategory = new Category("Default category");
            this.addCategory(_defaultCategory);

            //Devuelve la categoria por defecto.
            Object.defineProperty(this, "defaultCategory", {
				get:function(){
					return _defaultCategory;
				}	
			});	
            

            //Propiedades de las tiendas.

            Object.defineProperty(this, "shops", {
                get:function(){
                    var nextIndex = 0;
                    return{
                        next: function(){
                            return nextIndex < _shops.length ? 
                            {value: _shops[nextIndex++].shop, done:false} :
                            {done:true};
                        }
                    }
                }
            });

            this.addShop = function(shop){
                isShop(shop);
                var position = getShopPosition(shop);
                if(position === -1){
                    _shops.push(
                        {
                            shop: shop,
                            sProducts:[]
                        }
                    );
                }else{
                    throw new ShopStoreHouseException();
                }
                addItem("shops",shop.getObject());
                return _shops.length;
            }

            function getShopPosition(shop){
                isShop(shop);

                return _shops.findIndex(elem => elem.shop.cif === shop.cif);
            }

            //Elimina una tienda pasando el stock de los productos a la tienda por defecto.
            //El ERP esta diseñado de tal manera que la tienda por defecto siempre contiene al menos una unidad de cada producto existente, por tanto
            //en lugar de añadir productos a la tienda por defecto al eliminar una tienda, se añade el stock de la tienda eliminada a la tienda por defecto. 
			this.removeShop = function(shop){
                isShop(shop);
                		
                var position = getShopPosition(shop);
                var defaultPos = getShopPosition(_defaultShop);
				if (position !== -1){
					if (shop.cif !== _defaultShop.cif){
                        _shops[position].sProducts.forEach(function(item){
                            var prodPosition = getProductInShopPosition(_products[getProductById(item.idProduct)],_defaultShop);
                            if(prodPosition !== -1){
                                _shops[defaultPos].sProducts[prodPosition].stock += item.stock;
                            }
                        });
                        _shops.splice(position, 1);
					} else{
						throw new DefaultShopStoreHouseException();
					}					
				} else{
					throw new ShopNotExistsStoreHouseException();
                }	
				return _shops.length;
			}
            
            var _defaultShop = new Tienda( "00000001","Default shop");
            this.addShop(_defaultShop);

            //Devuelve la tienda por defecto.
            Object.defineProperty(this, "defaultShop", {
				get:function(){
					return _defaultShop;
				}	
			});	

            //Propiedades de los productos.

            Object.defineProperty(this, "products", {
                get:function(){
                    var nextIndex = 0;
                    return{
                        next: function(){
                            return nextIndex < _products.length ? 
                            {value: _products[nextIndex++], done:false} :
                            {done:true};
                        }
                    }
                }
            });

            this.addProduct = function(product, ...categories){
                isProduct(product);
                
                if (categories.length === 0){
					categories.push(this.defaultCategory);
                }

                categories.forEach(function(value){
                    isCategory(value);
                });
                
                var shop = this.defaultShop;
                var shopPosition = getShopPosition(shop);
                
                //Añadimos el producto en su array individual y recogemos su posicion.
                var position = fAddProduct(product);
               

                categories.forEach(function(category){
                    //Comprobamos que la categoria existe, si no, la añadimos.
                    var categoryPosition = getCategoryPosition(category); 
				    if (categoryPosition === -1){
					categoryPosition = this.addCategory(category)-1;
                    }
                    //Añadimos a la categoria el numero de serie del producto.
                    _categories[categoryPosition].idProducts.push(product.serialNumber);
                });
                
                //Dado que se pide que cada producto pertenezca al menos a una tienda, y desde esta 
                //funcion no se especifica la misma, añadiremos el producto a la tienda por defecto
                //con un stock de 1 unidad.
                _shops[shopPosition].sProducts.push(
                    {
                        idProduct: product.serialNumber,
                        stock: 1
                    });
                addItem("products",product.getObject());
                return _products.length;
            }

            //Añadimos un producto ya creado a una tienda y su stock.
            this.addProductInShop = function(product, shop, stock){
                isProduct(product);
                isShop(shop);

                if (stock === null || stock === "undefined" || stock === ""){
					stock = 1;
				}	

                //Compropbamos si la tienda existe, si no, genera excepcion.
                var shopPosition = getShopPosition(shop); 
				if (shopPosition === -1){
					throw new ShopDoesntExixtsStoryHouseException();
				}

                //Comprobamos si el producto existe, si no, genera excepcion.
                var productPosition = getProductPosition(product);
                if(productPosition === -1){
                   throw new ProductDoesntExixtsStoryHouseException();
                }

                //Añadimos a la tienda el numero de serie del producto y el stock.
                _shops[shopPosition].sProducts.push(
                    {
                        idProduct: _products[productPosition].serialNumber,
                        stock: stock
                    }
                );

                return  _shops[shopPosition].sProducts.length;
            }

            this.addQuantityProductInShop = function(product, shop, stock){
                isProduct(product);
                isShop(shop);

                if (stock === null || stock === "undefined" || stock === ""){
					stock = 1;
                }	
                
                //Comprobamos si la tienda existe, si no, genera excepcion.
                var shopPosition = getShopPosition(shop); 
				if (shopPosition === -1){
					throw new TiendaNoExistException();
                }
                
                //Comprobamos si el producto existe en la tienda, si no, genera excepcion.
                var productPosition = getProductInShopPosition(product, shop);
                
                if(productPosition === -1){
                   throw new ProdNoExistException();
                }
                
                //Añadimos a la tienda el numero de serie del producto y el stock.
                _shops[shopPosition].sProducts[productPosition].stock += stock;

                return  _shops[shopPosition].sProducts[productPosition].stock;
            }

            this.getShopProducts = function(shop, type){
                isShop(shop);

                var shopPosition = getShopPosition(shop); 
                if (shopPosition === -1){ throw new TiendaNoExistException();}

                var typeReceived = true;
                if (type === null || type === undefined || type === ""){
					 typeReceived = false;
                }
               
                var nextIndex = 0;
                var prod;
                var stock;

                if(typeReceived === true){
                    return {
                        next: function(){
    
                            while (nextIndex < _shops[shopPosition].sProducts.length){
                                prod = _products[getProductById(_shops[shopPosition].sProducts[nextIndex].idProduct)];
                                if(prod instanceof type){
                                    stock =_shops[shopPosition].sProducts[nextIndex].stock;
                                    nextIndex++;
                                    return {value: prod , valStock: stock , done: false}
                                }
                                nextIndex++;
                            }
                                 
                                return {done: true};
                        }
    
                }
                }else{
                    return {
                        next: function(){
                            
                            while (nextIndex <_shops[shopPosition].sProducts.length){
                                
                                prod = _products[getProductById(_shops[shopPosition].sProducts[nextIndex].idProduct)];
                                stock =_shops[shopPosition].sProducts[nextIndex].stock;
                                nextIndex++;
                                return {value: prod , valStock: stock , done: false}
                            }
                                
                                return {done: true};
                        }

                    }
                }
            }

            

            this.getCategoriesInShop = function(shop){
                var shopPosition = getShopPosition(shop);
                var catInShop = [];

                _categories.forEach(function(cat){
                        _shops[shopPosition].sProducts.forEach(
                            function(prod){
                            if(cat.idProducts.includes(prod.idProduct)){
                                if(notInArray(catInShop, cat.category)){
                                    catInShop.push(cat.category);
                                }
                            }
                        }) }
                    
                );

                var nextIndex = 0;
                return{
                    next: function(){
                        return nextIndex < catInShop.length ? 
                        {value: catInShop[nextIndex++], done: false} :
                        {done: true};
                    }
                }
            }

            this.getProductsInShopCategory = function(shop, category){
                
                isCategory(category);
                var shopPosition = getShopPosition(shop);
                var catPosition = getCategoryPosition(category);
                var prodInShopCat = [];
                var product;

                        _shops[shopPosition].sProducts.forEach(
                            
                            function(prod){
                            if(_categories[catPosition].idProducts.includes(prod.idProduct)){
                                product = _products[getProductById(prod.idProduct)];
                                if(notInArray(prodInShopCat, product)){
                                    prodInShopCat.push(product);
                                }
                            }
                        });

                var nextIndex = 0;
                return{
                    next: function(){
                        return nextIndex < prodInShopCat.length ? 
                        {value: prodInShopCat[nextIndex++], done: false} :
                        {done: true};
                    }
                }
            }

            this.getProductsCategory = function(prod){
                isProduct(prod);
                var prodPosition = getProductPosition(prod);
                var prodInCat = [];

                    _categories.forEach(function(cat){
                            if(cat.idProducts.includes(prod.serialNumber)){
                                if(notInArray(prodInCat, cat.category)){
                                    prodInCat.push(cat.category);
                                }
                            }
                        } 
                    );

                var nextIndex = 0;
                return{
                    next: function(){
                        return nextIndex < prodInCat.length ? 
                        {value: prodInCat[nextIndex++], done: false} :
                        {done: true};
                    }
                }
            }

            //Elimina un producto junto con todas sus relaciones con los demas objetos.
			this.removeProduct = function(product){
                isProduct(product);

                var position = getProductPosition(product);
                var prodInShopPos = -1;
                var prodInCatPos = -1;

                _shops.forEach(function(shop){
                    prodInShopPos = getProductInShopPosition(product,shop.shop);
                    if(prodInShopPos != -1){
                        shop.sProducts.splice(prodInShopPos, 1);
                    }
                });

                _categories.forEach(function(cat){
                    prodInCatPos = cat.idProducts.findIndex(elem => elem === product.serialNumber);
                    if(prodInCatPos != -1){
                        cat.idProducts.splice(prodInCatPos, 1);
                    }
                });
				return _products.length;
            }
            
            this.getProdById = function(id){
                var prodPos=getProductById(id);
                return _products[prodPos];  
            }

            this.getShopByCif = function(cif){
                var shopPos = _shops.findIndex(elem => elem.shop.cif === cif);
                return _shops[shopPos].shop;
            }

            this.getCategoryByTitle=function(title){
                var catPos = _categories.findIndex(elem => elem.category.title === title);
                return _categories[catPos].category;
            }

            this.getTotalStock = function(product){
                return getStock(product);  
            }

            function fAddProduct(product){
                //Comprobamos si el producto existe, si no, lo añadimos.
                var position = getProductPosition(product);
                if(position === -1){
                    _products.push(product);
                }else{
                    throw new ProductExixtsStoryHouseException();
                }
                
                return getProductPosition(product);
            }
            
            function getStock(product){
                isProduct(product);

                var index = 0;
                var totalStock = 0;
                var productPosition;
                        while (index < _shops.length){  
                            productPosition = getProductInShopPosition(product, _shops[index].shop);
                            if(productPosition !== -1){
                                totalStock += _shops[index].sProducts[productPosition].stock;
                            }
                            index++;
                        }
                return totalStock;
            }

            function getProductPosition(product){
                isProduct(product);

                return _products.findIndex(elem => elem.serialNumber === product.serialNumber);
            }

            function getProductById(id){
                return _products.findIndex(elem => elem.serialNumber === id);
            }

            function getProductInShopPosition(product, shop){
                isProduct(product);
                isShop(shop);

                var shopPosition = getShopPosition(shop);
                function compareElements(elem){
                    return (elem.idProduct === product.serialNumber);  
                }

                return _shops[shopPosition].sProducts.findIndex(compareElements);
            }

            //Funciones utilizadas en varios objetos
            
            function isProduct(product){
                if(!(product instanceof Product)){
                    throw new ProductStoreHouseException();
                }
            };

            function isCategory(category){
                if(!(category instanceof Category)){
                    throw new CategoryStoreHouseException();
                }
            };

            function isShop(shop){
                if(!(shop instanceof Tienda)){
                    throw new ShopStoreHouseException();
                }
            }

            //Comprueba si un elemento existe dentro de un array, si no existe lo devuelve, si existe no devuelve nada
            function notInArray(arr1, val1){
                if(arr1.every(elem => elem !== val1)){
                    return val1;
                }
            };

            function isInArray(arr1, val1){
                if(!(arr1.every(elem => elem !== val1))){
                    return true;
                }
            };

        }
        StoreHouse.prototype={};
        StoreHouse.prototype.constructor = StoreHouse;

        var instance = new StoreHouse();
        Object.freeze(instance);
        return instance;

    }//Fin Singleton
    return{
        getInstance: function(){
            if(!instantiated){
                instantiated = init();
            }
            return instantiated;
        }
    };

})();