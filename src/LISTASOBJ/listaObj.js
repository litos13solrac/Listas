"use strict";

//Errores
function Exception(){}
Exception.prototype = new Error();
Exception.prototype.constructor = Exception;
Exception.prototype.toString = function(){
    return this.name + ": " + this.message;
};

function ListaException(){
    this.name = "Lista Exception";
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



//Objeto Lista
function Lista(size=10) {
	if(!(this instanceof Lista)) throw new ListaException();
		var _lista = [];

		Object.defineProperty(this, 'lista',{
			get:function(){
				return _lista;
			}
		});

		Object.defineProperty(this, 'maxtam',{
			value:size,
			writeable:false,
			enumerable:false,
			configurable:false,
		});      
}

Lista.prototype = {};
Lista.prototype.constructor = Lista;

Object.defineProperty(Lista.prototype,'isEmpty',{
    get:function(){
        return(this.lista.length === 0);
    }
});
    
Object.defineProperty(Lista.prototype,'isFull',{
    get:function(){
            return(this.lista.length === this.maxtam);
    }   
});

Object.defineProperty(Lista.prototype, 'size',{
    get:function(){
        return this.lista.length;
    }
});

Object.defineProperty(Lista.prototype, 'capacity',{
    get:function(){
        return this.maxtam;
    }
});

Lista.prototype.add = function(elem){
	if(!(elem instanceof Persona)){
       throw new ListaException();
    } else {
        if(!this.isFull){
            this.lista.push(elem);
        } else {
            throw new ListaLlena();
        }
        return this.size;
    }

}
Lista.prototype.addAt = function(elem, pos){
    if(!(elem instanceof Persona)){
        throw new ListaException();
    }else {
        if(pos>this.size){
            throw new IndexOut();
        } else {
            if(!this.isFull){
                this.lista.splice(pos,0,elem);
            } else throw new ListaLlena();
            return this.size;
        }
    }
}

Lista.prototype.get = function(pos){
	if(!this.isEmpty){
		if(0<=pos<this.size){
			return this.lista[pos];
		}else{
            throw new IndexOut();
        }
	} else throw new ListaVacia();
}

Lista.prototype.toString = function(){
	var objetos ="";
	if(!this.isEmpty){
		var length = this.size;
		for(var i=0; i<length-1;i++){
			objetos+=this.lista[i]+" - ";
		}
		objetos+=this.lista[i];
	} else throw new ListaVacia();
	return objetos;
}

Lista.prototype.indexOf = function(elem){
	if (!(elem instanceof Persona)){
        throw new ListaException();
    }else {
        var pos = -1;
        if(!this.isEmpty){
            pos = this.lista.indexOf(elem);
        }
        return pos;
    }
}

Lista.prototype.lastIndexOf = function(elem){
	if (!(elem instanceof Persona)){
        throw new ListaException();
    }else {
        var pos = -1;
        if(!this.isEmpty){
            pos = this.lista.lastIndexOf(elem);
        }
        return this.size-pos;
    }
}

Lista.prototype.clear = function(){
	if(!this.isEmpty(this.lista)){
		this.lista.splice(0,this.lista.length);
	}
}

Lista.prototype.firstElement = function(){
	if(!this.isEmpty){
		return this.lista[0];
	} else throw new ListaVacia();
}

Lista.prototype.lastElement = function(){
	var fin = this.lista.length-1;
	if(!this.isEmpty){
		return this.lista[fin];
	} else throw new ListaVacia();
}

Lista.prototype.remove = function(pos){
	if(pos>this.size){
        throw new IndexOut();
    }else{
        if(!this.isEmpty){
            if(0<=pos<this.size){
                var elem = this.lista[pos];
                this.lista.splice(pos,1);
                return elem;
            }
        }    
    } 
}

Lista.prototype.removeElement = function(elem){
	if(!(elem instanceof Persona)){
        throw new ListaException();
    }else {
        if(!this.isEmpty){
            var pos = this.lista.indexOf(elem);
            var num=this.lista.splice(pos,1);
            if(num[0]!=='undefined'){
                return true;
            } else {
                return false;
            }
        }
    }
}

Lista.prototype.set = function(elem, pos){
	if(!(elem instanceof Persona)){
        throw new ListaException();
    }else{
        if(pos>this.size){
            throw new IndexOut();
        } else {
            return this.lista.splice(pos,1,elem);
        }
    }
}