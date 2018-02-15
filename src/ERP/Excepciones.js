function BaseException() {}
BaseException.prototype = new Error();
BaseException.prototype.constructor = BaseException; 
BaseException.prototype.toString = function(){
	return this.name + ": " + this.message;
};

//Excepciones de validación de parámetros
function ParameterValidationException() {
	this.name = "ParameterValidationException";
	this.message = "Error: Parameter Validation Exception.";
}
ParameterValidationException.prototype = new BaseException(); //Heredamos de BaseException
ParameterValidationException.prototype.constructor = ParameterValidationException;

//Excepción personalizada para indicar valores vacios.
function EmptyValueException(param) {
	this.name = "EmptyValueException";
	this.message = "Error: El parámetro está vacío.";
}
EmptyValueException.prototype = new ParameterValidationException();
EmptyValueException.prototype.constructor = EmptyValueException;

//Excepción de valor inválido
function InvalidValueException(param, value) {
	this.name = "InvalidValueException";
	this.message = "Error: El parámetro no tiene un valor válido. (" + param + ": " + value + ")";
}
InvalidValueException.prototype = new ParameterValidationException();
InvalidValueException.prototype.constructor = InvalidValueException;

//Excepción acceso inválido a constructor
function InvalidAccessConstructorException() {
	this.name = "InvalidAccessConstructorException";
	this.message = "El constructor no puede ser llamado como una función.";
}
InvalidAccessConstructorException.prototype = new BaseException(); 
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;

//Excepción no se ha introducido una categoria
function NoCatException(){
    this.name= "NoCategoryException";
    this.message = "El objeto introducida no es una categoria";
}
NoCatException.prototype = new BaseException();
NoCatException.prototype.constructor = NoCatException;

//Excepción categoria ya existe
function CatExistException(){
    this.name= "CategoriaExistenteException";
    this.message = "La categoria introducida ya existe";
}
CatExistException.prototype = new BaseException();
CatExistException.prototype.constructor = CatExistException;

//Excepción categoria no existe
function CatNoExistException(){
    this.name= "CategoriaNoExistenteException";
    this.message = "La categoria buscada no existe";
}
CatNoExistException.prototype = new BaseException();
CatNoExistException.prototype.constructor = CatNoExistException;

//Excepcion al intentar eliminar categoria por defecto
function DefCatException(){
    this.name = "DefaultCategoryException";
    this.message = "La categoría por defecto no puede ser eliminada";
}
DefCatException.prototype = new BaseException();
DefCatException.prototype.constructor = DefCatException;

//Excepcion al añadir producto sin categoria
function CategoryException() {
	this.name = "CategoryProductException";
	this.message = "Se requiere una categoria para añadir producto";
}
CategoryException.prototype = new BaseException();
CategoryException.prototype.constructor = CategoryException;

//Excepcion no se ha introducido tienda
function NoTiendaException(){
    this.name= "NoTiendaException";
    this.message = "El objeto introducida no es una tienda";
}
NoTiendaException.prototype = new BaseException();
NoTiendaException.prototype.constructor = NoTiendaException;

//Excepcion tienda ya existe
function TiendaExistException(){
    this.name= "TiendaExistenteException";
    this.message = "La tienda introducida ya existe";
}
TiendaExistException.prototype = new BaseException();
TiendaExistException.prototype.constructor = TiendaExistException;

//Excepcion tienda no existe
function TiendaNoExistException(){
    this.name= "TiendaNoExistenteException";
    this.message = "La tienda buscada no existe";
}
TiendaNoExistException.prototype = new BaseException();
TiendaNoExistException.prototype.constructor = TiendaNoExistException;

//Excepcion al intentar eliminar tienda por defecto
function DefTiendaException(){
    this.name = "DefaultCategoryException";
    this.message = "La tienda por defecto no puede ser eliminada";
}
DefTiendaException.prototype = new BaseException();
DefTiendaException.prototype.constructor = DefTiendaException;

//Excepcion al crear producto sin tienda
function TiendaException() {
	this.name = "TiendaProductException";
	this.message = "Se necesita una tienda para el producto";
}
TiendaException.prototype = new BaseException();
TiendaException.prototype.constructor = TiendaException;

//Excepcion no se ha introducido producto
function NoProdException(){
    this.name= "NoProductoException";
    this.message = "El objeto introducida no es un producto";
}
NoProdException.prototype = new BaseException();
NoProdException.prototype.constructor = NoProdException;

//Excepcion Prod ya existe
function ProdExistException(){
    this.name= "ProductoExistenteException";
    this.message = "El producto introducida ya existe";
}
ProdExistException.prototype = new BaseException();
ProdExistException.prototype.constructor = ProdExistException;

//Excepcion producto no existe
function ProdNoExistException(){
    this.name= "ProductoNoExistenteException";
    this.message = "El producto buscada no existe";
}
ProdNoExistException.prototype = new BaseException();
ProdNoExistException.prototype.constructor = ProdNoExistException;