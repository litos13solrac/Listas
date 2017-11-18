"use strict";

var maxtam = 10;
function create(){
	var lista = [];
	return lista;
}

function isEmpty(lista){
	if(lista.length === 0){
		return true;
	} else {
		return false;
	}
}

function isFull(lista){
	if(lista.length === maxtam){
		return true;
	} else {
		return false;
	}
}

function size(lista){
	return lista.length;
}

function add(lista, elemento){
	if(isFull(lista) == false){
		lista[lista.length] = elemento;
	} else {
		throw "Lista llena";
	return size(lista);
}

function addAt(lista, elemento, posicion){
	if(isFull(lista) == false){
		var aux;
		for(i = 0; i<lista.length; i++){
			if(posicion == i){
				aux=lista[i];
				lista[i]=elemento;
				elemento = aux;
				posicion++;
			}
		}			
		add(lista,elemento);
	} else {
		throw "Lista llena";
	}
	return size(lista);
}

function get(lista, posicion){
	if(posicion<(size(lista))){
		return lista[posicion];
	} else {
		throw "Posicion incorrecta";
	}
}

function toString(lista){
	var cadena = "";
	if(!isEmpty(lista)){
		for(i=0;i<lista.length-1;i++){
			cadena += lista[i] + " - ";
		}
		cadena += lista[i];
	}
	return cadena;
}

function indexOf(lista, elemento){
	var encontrado=false;
	for(i=0;i<lista.lenght && encontrado; i++){
		if(lista[i]==elemento){
			encontrado=true;
			return i;
		}else{
			return -1;
		}
	}
}

function lastIndexOf(lista, elemento){
	var encontrado=false;
	for(i=size(lista);i>0 && encontrado; i--){
		if(lista[i]==elemento){
			encontrado=true;
			return i;
		}else{
			return -1;
		}
	}
}

function capacity(lista){
	return maxtam;
}

function clear(lista){
	for(i=0;i<size(lista);i++){
		lista[i]=null;
	}
}

function firstElement(lista){
	return lista[0];
}

function lastElement(lista){
	return lista[size(lista)-1];
}

function remove(lista, posicion){
	if(posicion<size(lista)){
		var aux = lista[posicion];
		for(i = posicion; i<lista.length; i++){		//Recorre la lista
			if(i==(lista.length-1)){				//Si i es el último hueco lo rellena con null
				lista[i]=null;
			}else{									//Si no lo es, le asigna la siguiente posicion
				lista[i]=lista[i+1];
			}
		}	
	return aux;
	} else {
		throw "Posicion incorrecta";
	}
}

function removeElement(lista, elemento){
	var encontrado = false;
	for(i=0;i<size(lista) && encontrado;i++){
		if(lista[i]==elemento){
			encontrado=true;
			for(j = i; j<lista.length; j++){		
				if(j==(lista.length-1)){				
					lista[j]=null;
				}else{									
					lista[j]=lista[j+1];
				}
			}
		}
	}
	return encontrado;
}

function set(lista, elemento, posicion){
	var aux = lista[posicion];
	lista[posicion]=elemento;
	return aux;
}