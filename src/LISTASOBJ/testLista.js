"use strict";

function testLista(){
    var lista = new Lista(5);
    console.log("Lista creada.")
    console.log("Capacidad de lista: " + lista.capacity);
    console.log("¿Está vacía? -> " + lista.isEmpty);
    console.log("Tamaño actual: "+ lista.size);
    
    var p1 = new Persona("Carlos","Hipolito");
    var p2 = new Persona("Jose","Antonio");
    var p3 = new Persona("Edu","Martinez");
    var p4 = new Persona("Pablo","Picasso");
    var p5 = new Persona("Luis","Algo");
    var p6 = new Persona("Alberto", "Pringao");
    
    console.log("Añadimos una persona a la lista: "+p1.toString()+". Tamaño actual: " + lista.add(p1));
    console.log("Añadimos una segunda persona: "+p2.toString()+". Tamaño actual: " + lista.add(p2));
    console.log("Lista actual:");
    console.log(lista.toString());
    console.log("Añadimos una tercera persona entre las dos primeras: "+p3.toString()+". Tamaño actual: "+lista.addAt(p3,1));
    console.log("Lista actual:");
    console.log(lista.toString());
    console.log("Añadimos la cuarta persona al final: "+p4.toString()+". Tamaño actual: "+lista.add(p4));
    console.log("Y la quinta persona, "+p5.toString()+", en medio de todas. Tamaño actual: "+lista.addAt(p5,2));
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
    console.log("Y, por último, vamos a añadir una sexta persona, "+p6.toString()+", por quien se encuentre en la tercera posición. Eliminado: " + lista.set(p6,2));
    console.log("Lista actual:");
    console.log(lista.toString());
}

window.onload = testLista;