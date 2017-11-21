"use strict";

var maxtam = 10;

function ordenar(lista,elem){
	var aux;
	for(i=0;i<size(lista);i++){
		if(elem<lista[i]){
			aux=lista[i];
			lista[i]=elem;
			elem=aux;
		}else if(lista[i]==undefined){
			lista[i]=elem;
		}
	}
}

function create(){
	var lista = [];
	return lista;
}

function isEmpty(lista){
	if(size(lista) === 0){
		return true;
	} else {
		return false;
	}
}

function isFull(lista){
	if(size(lista) === maxtam){
		return true;
	} else {
		return false;
	}
}

function size(lista){
	var tam=0;
		for(i=0;i<maxtam;i++){
			if(!isNan(lista[i])){
				tam++;
			}
		}
	return tam;
}

function add(lista,elem){
	ordenar(lista,elem);
	return size(lista);
}

function get(lista,posicion){
	return lista[posicion];
}

function toString(lista){
	var cadena = "";
	if(!isEmpty(lista)){
		for(var i=0;i<size(lista)-1;i++){
			cadena += lista[i] + " - ";
		}
		cadena += lista[i];
	}
	return cadena;
}

function indexOf(lista, elem){
	var encontrado=false;
	for(var i=0;i<size(lista) && encontrado; i++){
		if(lista[i]==elem){
			encontrado=true;
			return i;
		}else{
			return -1;
		}
	}
}

function lastIndexOf(lista, elem){
	for(var i=size(lista);i>0 && encontrado; i--){
		if(lista[i]==elem){
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

function clear{
	for(var i=0;i<size(lista);i++){
		lista[i]=undefined;
	}
}

function firstElement(lista){
	return lista[0];	
}

function lastElement(lista){
	return lista[size(lista)-1];
}

function remove(lista, posicion){
	var aux = lista[posicion];
	for(var i = posicion; i<size(lista); i++){		//Recorre la lista
		if(i==(size(lista)-1)){						//Si i es el último hueco lo rellena con undefined
			lista[i]=undefined;
		}else{										//Si no lo es, le asigna la siguiente posicion
			lista[i]=lista[i+1];
		}
	}	
	return aux;
}

function removeElement(lista, elemento){
	var encontrado = false;
	for(var i=0;i<size(lista) && encontrado;i++){
		if(lista[i]==elemento){
			encontrado=true;
			for(var j = i; j<size(lista); j++){		
				if(j==(size(lista)-1)){				
					lista[j]=undefined;
				}else{									
					lista[j]=lista[j+1];
				}
			}
		}
	}
	return encontrado;
}
