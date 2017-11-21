"use strict";

var maxtam = 10;
function create(){
	var lista = [];
	for(var i=0;i<maxtam; i++){
		lista[i]=undefined;
	}
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
		for(var i=0;i<maxtam;i++){
			if(!isNaN(lista[i])){
				tam++;
			}
		}
	return tam;
}

function add(lista, elemento){
	if(!isFull(lista)){
		if(!isNaN(elemento)){
			lista[size(lista)] = elemento;
		}else{
			throw "El elemento no es un numero";
		}
	} else {
		throw "Lista llena";
	}
	return size(lista);
}

function addAt(lista, elemento, posicion){
	if(!isFull(lista)){
		if(!isNaN(elemento)){
			if(posicion<size(lista)){
				var aux;
				for(var i = 0; i<size(lista); i++){
					if(posicion == i){
						aux=lista[i];
						lista[i]=elemento;
						elemento = aux;
						posicion++;
					}
				}			
				add(lista,elemento);
			}else{
				throw "Posicion fuera de limites";
			}
		} else {
			throw "El elemento no es un numero";
		}
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
		for(var i=0;i<size(lista)-1;i++){
			cadena += lista[i] + " - ";
		}
		cadena += lista[i];
	}
	return cadena;
}

function indexOf(lista, elemento){
	if(!isNaN(elemento)){
		var buscando=true;
		var aux;
		for(var i=0;i<size(lista) && buscando; i++){
			if(elemento==lista[i]){
				buscando=false;
				aux=i;
			}
		}
		if(buscando==true){
			return -1;
		}else{
			return aux;
		}
	} else {
		throw "El elemento no es un numero";
	}	
}

function lastIndexOf(lista, elemento){
	if(!isNaN(elemento)){
		var buscando=true;
		var aux=size(lista);
		for(var i=size(lista);i>0 && buscando; i--){
			if(lista[i]==elemento){
				buscando=false;
				aux=aux-i-1;
			}
		}
		if(buscando==true){
			return -1;
		}else{
			return aux;
		}
	} else {
		throw "El elemento no es un numero";
	}
}

function capacity(lista){
	return maxtam;
}

function clear(lista){
	for(var i=0;i<size(lista);i++){
		lista[i]=undefined;
	}
}

function firstElement(lista){
	if(!isEmpty(lista)){
		return lista[0];
	}else{
		throw "La lista esta vacía";
	}	
}

function lastElement(lista){
	if(!isEmpty(lista)){
		return lista[size(lista)-1];
	}else{
		throw "La lista esta vacía";
	}
}

function remove(lista, posicion){
	if(posicion<size(lista)){
		var aux = lista[posicion];
		for(var i = posicion; i<size(lista); i++){		//Recorre la lista
			if(i==(size(lista)-1)){					//Si i es el último hueco lo rellena con undefined
				lista[i]=undefined;
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
	if(!isNaN(elemento)){
		var buscando = true;
		for(var i=0;i<size(lista) && buscando;i++){
			if(lista[i]==elemento){
				buscando=false;
				for(var j = i; j<size(lista); j++){		
					if(j==(size(lista)-1)){				
						lista[j]=undefined;
					}else{									
						lista[j]=lista[j+1];
					}
				}
			}
		}
		if(buscando==true){
			return false;
		}else{
			return true;
		}
	} else {
		throw "El elemento no es un numero";
	}
}

function set(lista, elemento, posicion){
	if(!isNaN(elemento)){
		if(posicion<size(lista)){
			var aux = lista[posicion];
			lista[posicion]=elemento;
			return aux;
		} else {
			throw "Posicion fuera de los limites";
		}
	} else {
		throw "El elemento no es un numero";
	}
}

function testlist(){
	var lista=create();
	console.log("Capacidad de lista: "+ capacity(lista));
	console.log("Está vacía: "+isEmpty(lista));
	console.log("Está llena: "+isFull(lista));
	console.log("Tamaño actual: "+size(lista));
	console.log("Añadiendo elemento 17. Tamaño actual: "+add(lista, 17));
	console.log("Añadiendo elemento 8. Tamaño actual: "+add(lista, 8));
	console.log("Añadiendo elemento 13. Tamaño actual: "+add(lista, 13));
	console.log("Añadiendo elemento 5 en la posición 2. Tamaño actual: "+addAt(lista,5,2));
	console.log("Lista completa: "+toString(lista));
	console.log("Tercer elemento de la lista: "+get(lista,2));
	console.log("¿Dónde hay un 13? En la posicion: "+indexOf(lista,13));
	console.log("¿Y empezando por el final? En la posicion: "+lastIndexOf(lista,13));
	console.log("Primer elemento de la lista: "+firstElement(lista));
	console.log("Último elemento de la lista: "+lastElement(lista));
	console.log("Quitamos el tercer elemento: "+remove(lista,2));
	console.log("Ahora quitamos el 17: "+removeElement(lista, 17));
	console.log("Lista actual: "+toString(lista));
	console.log("Para acabar, cambiamos un 6 por lo que estuviera en la posicion 1: "+set(lista,6,1));
	console.log("Lista final: "+toString(lista));
}
window.onload = testlist;