"use strict";

function formPopulate(){
    limpiar();
    
    function crearForm(nombre, funcion){
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("class", "list-group-item");
        a.appendChild(document.createTextNode(nombre));
        a.addEventListener("click", funcion());
        main.appendChild(a);
    }
    
    var main = document.getElementById("main");
    main.setAttribute("class", "container");
    
    document.getElementById("Acceso").innerHTML = "Cerrar Sesión";
    document.getElementById("Acceso").setAttribute("onclick", "cerrarSesion();")
    
    var p = document.createElement("h2"); 
    p.innerHTML = "Bienvenido, usuario: "+ document.cookie;
    main.appendChild(p);
    
    p = document.createElement("p");
    p.setAttribute("class", "h3"); 
    p.appendChild(document.createTextNode("Categorias"));
    main.appendChild(p);
    
    crearForm("Añadir categoria", addCategoryForm);
    crearForm("Modificar categoria", updCategoryForm);
    crearForm("Eliminar categoria", delCategoryForm);
    
    p = document.createElement("p");
    p.setAttribute("class", "h3");
    p.appendChild(document.createTextNode("Tiendas"));
    main.appendChild(p);
    
    crearForm("Añadir tienda", addShopForm);
    crearForm("Modificar tienda", updShopForm);
    crearForm("Eliminar tienda", delShopForm);

    p = document.createElement("p");
    p.setAttribute("class", "h3");
    p.appendChild(document.createTextNode("Productos"));
    main.appendChild(p);
    crearForm("Añadir producto", addProForm);
    crearForm("Eliminar producto", delProForm); 
}

function addCategoryForm(){
    function insCat(){
        return function(){
            var name = document.forms["nuevaCat"]["nomCat"].value;
            var descr = document.forms["nuevaCat"]["descrip"].value;
            var store = StoreHouse.getInstance();
            if (name == "" || descr == ""){
                throw new EmptyValueException();
            }else{
                var cat = new Category(name);
                cat.description = descr;
                store.addCategory(cat);
                formPopulate();
            }
        }
    }
    return function(){
        limpiar();
        var main = document.getElementById("main");
        var div = document.createElement("div");
        main.appendChild(div);

        var formulario = document.createElement("form");
        formulario.setAttribute("id", "nuevaCat");
        formulario.setAttribute("class", "form-horizontal");
        
        var nom = crearInput("Nombre", "nomCat", "text");
        formulario.appendChild(nom);
        var desc = crearInput("Descripción", "descrip", "text");
        formulario.appendChild(desc);
        var add = crearButton(insCat(), "Insertar");
        formulario.appendChild(add);
        
        div.appendChild(formulario);
    }
}

function updCategoryForm(){
    function updCategory(){
        return function (){
            var titleId = document.forms["updCat"]["titleId"].value;
            var title = document.forms["updCat"]["title"].value;
            var description = document.forms["updCat"]["descr"].value;

             if (title == "" || titleId == ""){
                  throw new EmptyValueException();
             } else {
                    var store = StoreHouse.getInstance();
                    var cs = store.categories;
                    var category = cs.next();
                    var aux = -1;

                  while (category.done !== true){
                    if (category.value.title === titleId ){
                        aux = category.value;
                    }
                    category = cs.next();
                  } 

                  if (aux !== -1){
                        aux.title = title;
                        aux.description = description;
                  } else {
                        throw new CatNoExistException();
                  }
             } 
        }  
    }
        
        return function (){
            limpiar();
            var main = document.getElementById("main");
            var div = document.createElement("div");
            main.appendChild(div);
                
            var formulario = document.createElement("form");
            formulario.setAttribute("name", "updCat");
            formulario.setAttribute("class", "form-horizontal");
            
            var tit = crearInput("Categoria a actualizar", "titleId", "text");
            formulario.appendChild(tit);
            var name = crearInput("Nombre", "name", "text");
            formulario.appendChild(name);
            var desc = crearInput("Descripcion","descr","text");
            formulario.appendChild(desc);
            var add = crearButton(updCategory(), "Actualizar");
            formulario.appendChild(add);
                
            div.appendChild(formulario);
        }
}
            
function delCategoryForm(){
    
        function delCategory(){
            return function (){
                
                var titleId = document.forms["delCat"]["titleId"].value;

                if (titleId == ""){
                    throw new EmptyValueException();
                } else {
                    var store = StoreHouse.getInstance();
                    var cs = store.categories;
                    var category = cs.next();
                    var aux = -1;

                    while (category.done !== true){
                        if (category.value.title === titleId ){
                            aux = category.value;
                        }
                        category = cs.next();
                    } 
                    if (aux !== -1){
                        store.removeCategory(aux);
                    } else {   
                         throw new CatNoExistException();
                    }
                }
            }   
        }

        return function (){
            limpiar();
            var main = document.getElementById("main");
            var div = document.createElement("div");
            main.appendChild(div);

            var form = document.createElement("form");
            form.setAttribute("name", "delCat");
            form.setAttribute("class", "form-horizontal");
            
            var tit = crearInput("Titulo de la categoria a eliminar", "titleId", "text");
            form.appendChild(tit);
            var del = crearButton(delCategory, "Eliminar");
            form.appendChild(del);

            div.appendChild(form);
        }
}

function addShopForm(){
    function insShop(){
        return function(){
            var cif = document.forms["nuevaShop"]["cifShop"].value;
            var name = document.forms["nuevaShop"]["nomShop"].value;
            var store = StoreHouse.getInstance();
            if (cif == "" || name == ""){
                throw new EmptyValueException();
            }else{
                var t = new Tienda(cif);
                t.name = name;
                store.addShop(t);
                formPopulate();
            }
        }
    }
    return function(){
        limpiar();
        var main = document.getElementById("main");
        var div = document.createElement("div");
        main.appendChild(div);

        var formulario = document.createElement("form");
        formulario.setAttribute("id", "nuevaShop");
        formulario.setAttribute("class", "form-horizontal");
        
        var nom = crearInput("CIF", "cifShop", "text");
        formulario.appendChild(nom);
        var desc = crearInput("Nombre", "nomShop", "text");
        formulario.appendChild(desc);
        var add = crearButton(insShop(), "Insertar");
        formulario.appendChild(add);
        
        
        div.appendChild(formulario);
    }
}

function updShopForm(){
      function updShop(){
          return function (){
                 
                 var cifId = document.forms["updShop"]["cifId"].value;
                 var cif = document.forms["updShop"]["CIF"].value;
                 var name = document.forms["updShop"]["Name"].value;
                 var direction = document.forms["updShop"]["Direction"].value;
                 var phone = document.forms["updShop"]["Phone"].value;

                 if (cif == "" || cifId == ""){  
                      throw new EmptyValueException();
                 } else {
                     var store = StoreHouse.getInstance();
                      var sp = store.shops;
                      var shop = sp.next();
                      var aux = -1;

                      while (shop.done !== true){
                         if (shop.value.cif == cifId ){
                             aux = shop.value;
                          }
                          shop = sp.next();
                      }

                      if (aux !== -1){
                            aux.cif = cif;
                            aux.name = name;
                            aux.direction = direction;
                            aux.phone = phone;
                            formPopulate();
                      } else {
                            throw new TiendaNoExistException();
                      }
                 } 
          }  
    }    
        
      return function (){

            limpiar();
            var main = document.getElementById("main");
            var div = document.createElement("div");
            main.appendChild(div);
                
            var form = document.createElement("form");
            form.setAttribute("name", "updShop");
            form.setAttribute("class", "form-horizontal");
            
            var cifAct = crearInput("CIF de la tienda a actualizar", "cifId", "text");
            form.appendChild(cifAct);
            var cif = crearInput("CIF", "CIF", "text");
            form.appendChild(cif);
            var name = crearInput("Nombre", "Name", "text");
            form.appendChild(name);
            var dir = crearInput("Direccion", "Direction", "text"); 
            form.appendChild(dir);
            var tel = crearInput("Telefono", "Phone", "text"); 
            form.appendChild(tel);
            var upd = crearButton(updShop, "Actualizar");
            form.appendChild(upd);
                
            div.appendChild(form);
        }  
}

function delShopForm(){
        function delShop(){
            return function (){
                var cifId = document.forms["delShop"]["cifId"].value;

                if (cifId == ""){
                    throw new EmptyValueException();
                } else {
                    var store = StoreHouse.getInstance();
                    var sp = store.shops;
                    var shop = sp.next();
                    var aux = -1;

                    while (shop.done !== true){
                        if (shop.value.cif == cifId ){
                            aux = shop.value;
                        }
                         shop = sp.next();
                    }

                    if (aux !== -1){
                        store.removeShop(aux);
                        formPopulate();
                    } else {
                         throw new TiendaNoExistException();
                    }
                }
            }   
        }
    
        return function (){
            limpiar();
            var main = document.getElementById("main");
            var div = document.createElement("div");
            main.appendChild(div);
                
            var form = document.createElement("form");
            form.setAttribute("name", "delShop");
            form.setAttribute("class", "form-horizontal");
            
            var cif = crearInput("CIF de la tienda a eliminar", "cifId");
            form.appendChild(cif);
            var del = crearButton(delShop, "Eliminar");
            form.appendChild(del);
                
            div.appendChild(form);
        }
}

function addProForm(){
    function insProd(tipo){
        return function(){
            var name = document.forms["nuevoProd"]["name"].value;
            var descr = document.forms["nuevoProd"]["descProd"].value;
            var price = document.forms["nuevoProd"]["precio"].value;
            var store = StoreHouse.getInstance();
            if (name == "" || descr == "" || price == ""){
                throw new EmptyValueException();
            }else{
                switch(tipo){
                    case "PS4":
                        var pr = new PS4(name);
                        pr.description = descr;
                        pr.price = price;
                        store.addProduct(pr);
                    break;
                    case "PC":
                        var pr = new PC(name);
                        pr.description = descr;
                        pr.price = price;
                        store.addProduct(pr);
                    break;
                    case "NintendoSwitch":
                        var pr = new Switch(name);
                        pr.description = descr;
                        pr.price = price;
                        store.addProduct(pr);
                    break;
                }
            }
            formPopulate();
        }
    }
    return function(){
        limpiar();
        var main = document.getElementById("main");
        var div = document.createElement("div");
        main.appendChild(div);

        var formulario = document.createElement("form");
        formulario.setAttribute("id", "nuevoProd");
        formulario.setAttribute("class", "form-horizontal");
        
        
        var tipo = document.createElement("select");
        var op1 = document.createElement("option");
        op1.text = "PS4";
        tipo.add(op1);
        var op2 = document.createElement("option");
        op2.text = "PC";
        tipo.add(op2);
        var op3 = document.createElement("option");
        op3.text = "NintendoSwitch";
        tipo.add(op3);
        formulario.appendChild(tipo);
        
        var plat = tipo.value;
        var nom = crearInput("Nombre", "name", "text");
        formulario.appendChild(nom);
        var desc = crearInput("Descripcion", "descProd", "text");
        formulario.appendChild(desc);
        var price = crearInput("Precio", "precio", "number");
        formulario.appendChild(price);
        var add = crearButton(insProd(plat), "Insertar");
        formulario.appendChild(add);
        
        div.appendChild(formulario);
    }
}

function delProForm(){
       function delPro(){
        return function (){
            function compareElements(element){
                 return (element.name == serial)
            }

            var serial = document.forms["delProd"]["name"].value;
            var store = StoreHouse.getInstance();
            if (serial == ""){
                throw new EmptyValueException();
            } else {
                
                index = store.products.findIndex(compareElements);

                if (index != -1){
                    store.removeProduct(store.products[index]);
                }else{
                    throw new ProdNoExistException();
                }
            }
        }   
    }     
    
    return function (){
            limpiar();
            var main = document.getElementById("main");
            var div = document.createElement("div");
            main.appendChild(div);
                
            var form = document.createElement("form");
            form.setAttribute("name", "delProd");
            form.setAttribute("class", "form-horizontal");
           
            var prod = crearInput("Nombre del producto a eliminar", "name", "text");
            form.appendChild(prod);
            var del = crearButton(delPro, "Eliminar");
            form.appendChild(del);
            div.appendChild(form);
      }
}

function crearInput(label, nombre, tipo){
    var div = document.createElement("div");
    div.setAttribute("class", "form-group");
        
    var lab = document.createElement("label");
    lab.setAttribute("for", nombre);
    lab.appendChild(document.createTextNode(label));
    div.appendChild(lab);
                
    var input = document.createElement("input");
    input.setAttribute("type", tipo);
    input.setAttribute("class", "form-control");
    input.setAttribute("name", nombre);
    div.appendChild(input);
    
    return div;
}

function crearButton(click, texto){
    var button = document.createElement("button");
    button.addEventListener("click",click);
    button.appendChild(document.createTextNode(texto));
    return button;
}

function cerrarSesion(){
    document.getElementById("Acceso").innerHTML = "Acceso";
    document.getElementById("Acceso").setAttribute("onclick", "formAcceso();")
    initPopulate();
    return function (){
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
     }
}