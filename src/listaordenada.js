"use strict";

var maxtam = 10;

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
		for(var i=0;i<maxtam;i++){
			if(!isNaN(lista[i])){
				tam++;
			}
		}
	return tam;
}

function add(lista,elem){
	if(!isFull(lista)){
		if(!isNaN(elem)){
			var aux;
			var ordenado=false;
			if(isEmpty(lista)){
				lista[0]=elem;
			}else{
				for(var i=0;i<size(lista)&&ordenado==false;i++){
					if(elem<lista[i]){
						aux=lista[i];
						lista[i]=elem;
						lista[i+1]=aux;
						elem=aux;
					}
				}
			}
		}else{
			throw "El elemento no es un numero";
		}
	} else {
		throw "Lista llena";
	}
	return size(lista);
}

function get(lista,posicion){
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

function indexOf(lista, elem){
	if(!isNaN(elem)){
		var buscando=true;
		var aux;
		for(var i=0;i<size(lista) && buscando; i++){
			if(elem==lista[i]){
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

function lastIndexOf(lista, elem){
	if(!isNaN(elem)){
		var buscando=true;
		var aux=size(lista);
		for(var i=size(lista);i>0 && buscando; i--){
			if(lista[i]==elem){
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
			if(i==(size(lista)-1)){						//Si i es el último hueco lo rellena con undefined
				lista[i]=undefined;
			}else{										//Si no lo es, le asigna la siguiente posicion
				lista[i]=lista[i+1];
			}
		}	
		return aux;
	} else {
		throw "Posicion incorrecta";
	}
}

function removeElement(lista, elem){
	if(!isNaN(elem)){
		var buscando = true;
		for(var i=0;i<size(lista) && buscando;i++){
			if(lista[i]==elem){
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

function testlist(){
	var lista=create();
	console.log("Capacidad de lista ordenada: "+ capacity(lista));
	console.log("Está vacía: "+isEmpty(lista));
	console.log("Está llena: "+isFull(lista));
	console.log("Tamaño actual: "+size(lista));
	console.log("Añadiendo elemento 17. Tamaño actual: "+add(lista, 17));
	console.log("Lista completa: "+toString(lista));
	console.log("Añadiendo elemento 8. Tamaño actual: "+add(lista, 8));
	console.log("Lista completa: "+toString(lista));
	console.log("Añadiendo elemento 13. Tamaño actual: "+add(lista, 13));
	console.log("Lista completa: "+toString(lista));
	console.log("¿Dónde hay un 13? En la posicion: "+indexOf(lista,13));
	console.log("¿Dónde hay un 13? Empezando por el final en la posicion: "+lastIndexOf(lista,13));
	console.log("Primer elemento de la lista: "+firstElement(lista));
	console.log("Último elemento de la lista: "+lastElement(lista));
	console.log("Quitamos el segundo elemento: "+remove(lista,1));
	console.log("Lista actual: "+toString(lista));
	console.log("Ahora quitamos el 17: "+removeElement(lista, 17));
	console.log("Lista final: "+toString(lista));
}
window.onload = testlist;