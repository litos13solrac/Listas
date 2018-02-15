"use strict";

function Persona(name, surname){
    var _name = name;
    var _surname = surname;
    
    Object.defineProperty(this, 'name', {
		get: function() {
			return _name;
		},
		set: function(value) {
			_name = value;
		}
	});

	Object.defineProperty(this, 'surname', {
		get: function() {
			return _surname;
		},
		set: function(value) {
			_surname = value;
		}
	});
}

Persona.prototype = {};
Persona.prototype.constructor = Persona;
Persona.prototype.toString = function(){
	return this.name +" "+ this.surname;
}