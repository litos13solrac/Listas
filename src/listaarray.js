"use strict"

var maxtam=10;
function create(){
	var lista = new Array();
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
	if(lista === maxtam){
		return true;
	} else {
		return false;
	}
}

function size(lista){
	return lista.length;
}

function add(lista, elem){
	if(!isFull(lista)){
		if(!isNaN(elem)){
			return lista.push(elem);
		}else{
			throw "El elemento no es un numero";
		}
	} else {
		throw "Lista llena";
	}
}

function addAt(lista, elem, pos){
	if(!isFull(lista)){
		if(!isNaN(elem)){
			if(pos<size(lista)){
				return lista.splice(pos,0,elem);
			}else{
				throw "Posicion fuera de limites";
			}
		} else {
			throw "El elemento no es un numero";
		}
	} else {
		throw "Lista llena";
	}
}

function get(lista, posicion){
	if(posicion<lista.length){
		return lista[posicion];
	} else {
		throw "Posicion incorrecta";
	}
}

function toString(lista){
	var cadena = "";
	if(!isEmpty(lista)){
		for(var i=0;i<lista.length-1;i++){
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
		for(var i=0;i<lista.length && buscando; i++){
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
		var aux=lista.length;
		for(var i=lista.length;i>0 && buscando; i--){
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
	return lista.splice(0,lista.length-1);
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
		return lista.length-1;
	}else{
		throw "La lista esta vacía";
	}
}

function remove(lista,pos){
	if(pos<lista.length){
		var aux=lista[pos];
		lista.splice(pos,1);
		return aux;
	} else {
		throw "Posicion incorrecta";
	}
}

function removeElement(lista, elem){
	if(!isNaN(elem)){
		var pos=indexOf(lista,elem);
		if(pos<=0){
			lista.splice(pos,1);
			return true;
		}else{
			return false;
		}
	} else {
		throw "El elemento no es un numero";
	}
}

function set(lista, elemento, posicion){
	if(!isNaN(elemento)){
		if(posicion<lista.length){
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