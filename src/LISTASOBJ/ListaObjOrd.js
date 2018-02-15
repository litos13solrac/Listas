"use strict";

//Errores
function Exception(){}
Exception.prototype = new Error();
Exception.prototype.constructor = Exception;
Exception.prototype.toString = function(){
    return this.name + ": " + this.message;
};

function ListaException(){
    this.name = "Lista Ordenada Exception";
    this.messaje = "ERROR";
}
ListaException.prototype = new Exception(); 
ListaException.prototype.constructor = ListaException;

function ListaVacia(){
    this.name = "Lista Vacia";
    this.messaje = "La lista está vacía";
}
ListaVacia.prototype = new ListaException(); 
ListaVacia.prototype.constructor = ListaVacia;

function ListaLlena(){
    this.name = "Lista Llena";
    this.messaje = "La lista esta llena";
}
ListaLlena.prototype = new ListaException(); 
ListaLlena.prototype.constructor = ListaLlena;

function IndexOut(){
    this.name = "Fuera de límites";
    this.message = "El indice está fuera del límite permitido";
}
IndexOut.prototype = new Exception();
IndexOut.prototype.constructor=IndexOut;



//Objeto Lista Ordenada
function ListaO(size=10) {
	if(!(this instanceof ListaO)) throw new ListaException();
		var _listaO = [];

		Object.defineProperty(this, 'listaO',{
			get:function(){
				return _listaO;
			}
		});

		Object.defineProperty(this, 'maxtam',{
			value:size,
			writeable:false,
			enumerable:false,
			configurable:false,
		});      
}

ListaO.prototype = {};
ListaO.prototype.constructor = ListaO;

Object.defineProperty(ListaO.prototype,'isEmpty',{
    get:function(){
        return(this.listaO.length === 0);
    }
});
    
Object.defineProperty(ListaO.prototype,'isFull',{
    get:function(){
            return(this.listaO.length === this.maxtam);
    }   
});

Object.defineProperty(ListaO.prototype, 'size',{
    get:function(){
        return this.listaO.length;
    }
});

Object.defineProperty(ListaO.prototype, 'capacity',{
    get:function(){
        return(this.maxtam);
    }
});
ListaO.prototype.add = function(elem){
    if(!(elem instanceof Persona)){
       throw new ListaException();
    } else {
        if(!this.isFull){
            this.listaO.push(elem);
        } else {
            throw new ListaLlena();
        }
    }
    this.listaO.sort(function (a, b) {
        if (a.surname > b.surname) {
            return 1;
        }else if (a.surname < b.surname) {
            return -1;
        } else {
           return 0; 
        }  
    });
	return this.size;
}

ListaO.prototype.get = function(pos){
	if(!this.isEmpty){
		if(0<=pos<this.size){
			return this.listaO[pos];
		}else{
            throw new IndexOut();
        }
	} else throw new ListaVacia();
}

ListaO.prototype.toString = function(){
	var objetos ="";
	if(!this.isEmpty){
		var length = this.size;
		for(var i=0; i<length-1;i++){
			objetos+=this.listaO[i]+" - ";
		}
		objetos+=this.listaO[i];
	}
	return objetos;
}

ListaO.prototype.indexOf = function(elem){
	if (!(elem instanceof Persona)){
        throw new ListaException();
    }else {
        var pos = -1;
        if(!this.isEmpty){
            pos = this.listaO.indexOf(elem);
        }
        return pos;
    }
}

ListaO.prototype.lastIndexOf = function(elem){
	var pos = -1;
	if(!this.isEmpty){
		pos = this.listaO.lastIndexOf(elem);
	}
	return this.size-pos;
}

ListaO.prototype.clear = function(){
	if(!this.isEmpty(this.listaO)){
		this.listaO.splice(0,this.listaO.length);
	}
}

ListaO.prototype.firstElement = function(){
	if(!this.isEmpty){
		return this.listaO[0];
	} else throw new ListaVacia();
}

ListaO.prototype.lastElement = function(){
	var fin = this.listaO.length-1;
	if(!this.isEmpty){
		return this.listaO[fin];
	} else throw new ListaVacia();
}

ListaO.prototype.remove = function(pos){
	if(pos>this.size){
        throw new IndexOut();
    }else{
        if(!this.isEmpty){
            if(0<=pos<this.size){
                var elem = this.listaO[pos];
                this.listaO.splice(pos,1);
                return elem;
            }
        }    
    } 
}

ListaO.prototype.removeElement = function(elem){
	if(!(elem instanceof Persona)){
        throw new ListaException();
    }else {
        if(!this.isEmpty){
            var pos = this.listaO.indexOf(elem);
            var num=this.listaO.splice(pos,1);
            if(num[0]!=='undefined'){
                return true;
            } else {
                return false;
            }
        }
    }
}
