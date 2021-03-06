
function Product(name, description, price, img, tax){

    if(!(this instanceof Product)){
			throw new InvalidAccessConstructorException();
		}

		tax = typeof tax !== 'undefined' ? tax : Product.IVA;

		var _serialNumber = counter();
		var _name = validate.empty(name,"name");	
		var _description = description;
		var _price =validate.empty(price,"price");	
		var _tax = tax ;
		//temporal
		var _image = img;
		//var _images = [];


		Object.defineProperty(this, "serialNumber", {
			get:function(){
				return _serialNumber;
			}
		});

		Object.defineProperty(this, "name", {
			get:function(){
				return _name;
			},
			set:function(value){
				_name = validate.empty(value,"name");
			}
		});

		Object.defineProperty(this, "price", {
			get:function(){
				return _price;
			},
			set:function(value){
				_price = validate.empty(value,"price");
			}
		});

		Object.defineProperty(this, "description", {
			get:function(){
				return _description;
			},
			set:function(value){
				//descripcion puede estar vacio.
				_description = value;
			}
		});

		//temporal
		Object.defineProperty(this, "images", {
			get:function(){
				return _image;
			},
			set:function(value){
				_image = value;
			}
		});
		}

	
	Product.prototype = {};
	Product.prototype.constructor = Product;
	Object.defineProperty(Product, 'IVA', {
		value:21,
		writable:false,
		enumerable:true,
		configurable:false
});  

//Objetos Subproductos: heredan de Productos
function PS4 (name, description, price, img, tax, internet){
    Product.call(this, name, description, price, img, tax)
    var _internet = internet;

    Object.defineProperty(this, 'internet', {
        get: function() {
            return _internet;
        },
        set: function(value) {
            _internet = value;
        }
    });
}
PS4.prototype = Object.create(Product.prototype);
PS4.prototype.constructor = PS4;
PS4.prototype.toString = function(){
    return Productos.prototype.toString.call(this) + "Juego de PS4. Requiere Internet: "+this.internet;
}


function PC (name, description, price, img, tax, mando){
    Product.call(this, name, description, price, img, tax)
    var _mando = mando;

    Object.defineProperty(this, 'teclado', {
        get: function() {
            return _mando;
        },
        set: function(value) {
            _mando = value;
        }
    });
}
PC.prototype = Object.create(Product.prototype);
PC.prototype.constructor = PC;
PS4.prototype.toString = function(){
    return Productos.prototype.toString.call(this) + "Juego de PC. Requiere mando: "+this.mando;
}

function Switch (name, description, price, img, tax, numjugadores){
    Product.call(this, name, description, price, img, tax)
    var _num = numjugadores;

    Object.defineProperty(this, 'numjugadores', {
        get: function() {
            return _num;
        },
        set: function(value) {
            _num = value;
        }
    });
}
Switch.prototype = Object.create(Product.prototype);
Switch.prototype.constructor = Switch;
Switch.prototype.toString = function(){
    return Productos.prototype.toString.call(this) + "Juego de Nintendo Switch. Numero de jugadores: "+this.numjugadores;
}

//Objeto Categorias
function Category (title, description){
    if(!(this instanceof Category))
       throw new InvalidAccessConstructorException();

    var _title = title;
    var _description = description;

    Object.defineProperty(this, 'title', {
        get: function() {
            return _title;
        },
        set: function(value) {
            _title = value;
        }
    });

    Object.defineProperty(this, 'description', {
        get: function() {
            return _description;
        },
        set: function(value) {
            _description = value;
        }
    });
}
Category.prototype = {};
Category.prototype.constructor = Category;
Category.prototype.toString = function(){
    return this.title +": "+ this.description;
}



//Objeto Coordenadas
function Coords(latitud = 0, longitud = 0){
	if (!(this instanceof Coords)) 
        throw new InvalidAccessConstructorException();

	latitud = typeof latitud !== 'undefined' ? Number(latitud).valueOf() : 0;
	if (Number.isNaN(latitud)  || latitud < -90 || latitud > 90) 
		throw new InvalidValueException("latitud", latitud);
	longitud = typeof longitud !== 'undefined' ? Number(longitud).valueOf() : 0;
	if (Number.isNaN(longitud)  || longitud < -180 || longitud > 180) 
		throw new InvalidValueException("longitud", longitud);

	var _latitud = latitud;
	var _longitud = longitud;

	Object.defineProperty(this, 'latitud', {
		get:function(){
			return _latitud;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -90 || value > 90) 
				throw new InvalidValueException("latitud", value);
			_latitud = value;
		}		
	});		

	Object.defineProperty(this, 'longitud', {
		get:function(){
			return _longitud;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -180 || value > 180) 
				throw new InvalidValueException("latitude", value);
			_longitud = value;
		}		
	});		

}
Coords.prototype = {};
Coords.prototype.constructor = Coords;
Coords.prototype.toString = function(){
    return "Latitud: " + this.latitud + "; Longitud: " + this.longitud;
}

//Objeto Tienda
function Tienda(cif, name, direction, tel){
    if(!(this instanceof Tienda))
       throw new InvalidAccessConstructorException();

    
    var _cif = validate.empty(cif,"cif");	
    var _name = validate.empty(name,"name");	
    var _tel = tel;
    var _coords = null;
    
    Object.defineProperty(this, "cif", {
			get:function(){
				return _cif;
			},
		set: function(value) {
			_cif = value;
		}
	});
    
    Object.defineProperty(this, "name", {
			get:function(){
				return _name;
			},
		set: function(value) {
			_name = value;
		}
	});
    
    Object.defineProperty(this, 'direction', {
		get: function() {
			return _direction;
		},
		set: function(value) {
			_direction = value;
		}
	});
    
    Object.defineProperty(this, 'tel', {
		get: function() {
			return _tel;
		},
		set: function(value) {
			_tel = value;
		}
	});
    
    Object.defineProperty(this, 'coords', {
		get:function(){
			return _coords;
		},
		set:function(value){
			if (value === 'undefined' || value == null) throw new EmptyValueException("coords");	
			if (!value instanceof Coords) throw new InvalidValueException("coords", value);		
			_coords = value;
		}		
	});	
}
Tienda.prototype = {};
Tienda.prototype.constructor = Tienda;
Tienda.prototype.toString = function(){
    return "Tienda " + this.CIF + ": " + this.name + " - " + this.direction + " - " + this.tel + " - Coordenadas: " + this.coords;
}

var counter = (function (){
	var counter = 00000;
	return (function (){
		return ++counter;
	})
})();

var validate = (function(){

	var valueEmpty = function(value,type){
		value = typeof value !== "undefined" ? value : "";
		if (value === "") {throw new EmptyValueException(type);}
		return value;
	};

	return{
		empty: function(value,type){
			return valueEmpty(value,type);
		}
	}

})();