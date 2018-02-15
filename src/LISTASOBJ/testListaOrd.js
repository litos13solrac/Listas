"use strict";

function testListaO(){
    var lista = new ListaO(5);
    console.log("Lista ordenada por apellido creada.")
    console.log("Capacidad de lista: " + lista.capacity);
    console.log("¿Está vacía? -> " + lista.isEmpty);
    console.log("Tamaño actual: "+ lista.size);
    
    var p1 = new Persona("Carlos","Hipolito");
    var p2 = new Persona("Jose","Antonio");
    var p3 = new Persona("Edu","Martinez");
    var p4 = new Persona("Pablo","Picasso");
    
    console.log("Añadimos una persona a la lista: "+p1.toString()+". Tamaño actual: " + lista.add(p1));
    console.log("Añadimos una segunda persona: "+p2.toString()+". Tamaño actual: " + lista.add(p2));
    console.log("Lista actual:");
    console.log(lista.toString());
    console.log("Añadimos una tercera persona: "+p4.toString()+". Tamaño actual: "+lista.add(p4));
    console.log("Lista actual:");
    console.log(lista.toString());
    console.log("Añadimos la cuarta persona: "+p3.toString()+". Tamaño actual: "+lista.add(p3));
    console.log("Lista actual:");
    console.log(lista.toString());
    console.log("¿Se ha llenado la lista? -> " + lista.isFull);
    console.log("¿Quién está en la posición 1? -> " + lista.get(1));
    console.log("¿En qué posición está Jose? -> " + lista.indexOf(p2));
    console.log("¿Y empezando desde el final? -> " + lista.lastIndexOf(p2));
    console.log("¿Quién es el primero de la lista? -> " + lista.firstElement());
    console.log("¿Y el último? -> " + lista.lastElement());
    console.log("Vamos a eliminar al que esté en tercera posición. Eliminado: " + lista.remove(2));
    console.log("Lista actual:");
    console.log(lista.toString());
    console.log("Y ahora vamos a eliminar a Pablo Picasso. ¿Puedo? -> " + lista.removeElement(p4));
    console.log("Lista actual:");
    console.log(lista.toString());
}

window.onload = testListaO;