"use strict";

//Comprueba la existencia y validez de los parámetros obligatorios
function Comprobar(parametro){   
    if (parametro === 'undefined' || parametro === ''){
        throw new EmptyValueException("parametro");
    }else if (/^[a-zA-Z][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]*)*[a-zA-Z0-9]$/.test (parametro) !== true){
        throw new InvalidValueException("parametro", parametro);
    }else{
        return parametro;
    }
}

//Comprueba la existencia y validez de los parámetros obligatorios numéricos
function ComprobarNum(parametro){
    if (parametro === 'undefined' || parametro === ''){
        throw new EmptyValueException("parametro");
    }else if (Number.isNaN(parametro)){ 
		throw new InvalidValueException("parametro", parametro);
    }else{
        return parametro;
    }
}

//Objeto Categorias
function Categorias (title, description){
    if(!(this instanceof Categorias))
       throw new InvalidAccessConstructorException();
    Comprobar(title);
    
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
Categorias.prototype = {};
Categorias.prototype.constructor = Categorias;
Categorias.prototype.toString = function(){
	return this.title +": "+ this.description;
}

//Objeto Productos
function Productos(SerialNumber, name, description, price, tax){
    if(!(this instanceof Productos))
       throw new InvalidAccessConstructorException();
    Comprobar(SerialNumber);
    Comprobar(name);
    ComprobarNum(price);
    
    var _serial = SerialNumber;
    var _name = name;
    var _description = description;
    var _price = price;
    var _tax = tax;
    
    Object.defineProperty(this, 'SerialNumber', {
		get: function() {
			return _serial;
		},
		set: function(value) {
			_serial = value;
		}
	});
    
    Object.defineProperty(this, 'name', {
        get: function() {
            return _name;
        },
        set: function(value) {
            _name = value;
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
    
	Object.defineProperty(this, 'price', {
		get: function() {
			return _price;
		},
		set: function(value) {
			_price = value;
		}
	});
    
    Object.defineProperty(this, 'tax', {
		get: function() {
			return _tax;
		},
		set: function(value) {
			_tax = value;
		}
	});  
}
Productos.prototype = {};
Productos.prototype.constructor = Productos;
Productos.prototype.toString = function(){
	return "Producto " + this.SerialNumber +": " + this.name +" - " + this.description + " - Precio: " + this.price + "€. Impuestos(%): " + this.tax;
}

//Objetos Subproductos: heredan de Productos
function PS4 (SerialNumber, name, description, price, internet){
    Productos.call(this, SerialNumber, name, description, price)
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
PS4.prototype = Object.create(Productos.prototype);
PS4.prototype.constructor = PS4;

function PC (SerialNumber, name, description, price, teclado){
    Productos.call(this, SerialNumber, name, description, price)
    var _teclado = teclado;
    
    Object.defineProperty(this, 'teclado', {
		get: function() {
			return _teclado;
		},
		set: function(value) {
			_teclado = value;
		}
	});
}
PC.prototype = Object.create(Productos.prototype);
PC.prototype.constructor = PC;

function Switch (SerialNumber, name, description, price, numjugadores){
    Productos.call(this, SerialNumber, name, description, price)
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
Switch.prototype = Object.create(Productos.prototype);
Switch.prototype.constructor = Switch;

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
function Tienda(CIF, name, direction, tel, coords){
    if(!(this instanceof Tienda))
       throw new InvalidAccessConstructorException();
    Comprobar(name);
    
    var _cif = CIF;
    var _name = name;
    var _direction = direction;
    var _tel = tel;
    var _coords = null;
    
    Object.defineProperty(this, 'CIF', {
		get: function() {
			return _cif;
		},
		set: function(value) {
			_cif = value;
		}
	});
    
    Object.defineProperty(this, 'name', {
		get: function() {
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
