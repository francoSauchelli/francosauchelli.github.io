function buscarEnLocalStorage()
{   
    /* llama a dos funciones para crear arrays correspondientes a 
    productos cargados y borrados en localStorage,
    para utilizarlos más adelante */
    const arrayProdsCargados = buscarProdsLS();
    const arrayProdsBorrados = buscarProdsBorrados();

    return [arrayProdsCargados, arrayProdsBorrados];
}

function buscarProdsLS()
{
    /* busca en el localSotrage los productos guardados como "Producto"
     y lo vuelve a convertir a objeto de js para poder manipularlo */
    let id = "";
    let categoria = "";
    let marca = "";
    let nombreProducto = "";
    let genero = "";
    let talle = "";
    let precio = "";
    let stock = "";
    let imagen = "";
    const arrayProductos = [];

    for(i=0; i<localStorage.length; i++)
    {
        let llaveLS = localStorage.key(i)
        if(llaveLS.slice(0, 8)==="Producto")
        {
            let objetoLS = JSON.parse(localStorage.getItem(llaveLS));
            id = objetoLS.id;
            categoria = objetoLS.categoria;
            marca = objetoLS.marca;
            nombreProducto =objetoLS.nombreProducto;
            genero = objetoLS.genero;
            talle = objetoLS.talle;
            precio = objetoLS.precio;
            stock = objetoLS.stock;
            imagen = objetoLS.imagen;
            
            const objetoProducto = new Productos(id,
                categoria,
                marca,
                nombreProducto,
                genero,
                talle,
                precio,
                stock,
                imagen)
            arrayProductos.push(objetoProducto);
        }
    }
    return arrayProductos;
}

function buscarProdsBorrados()
{
    /* busca los productos guardados en localStorage como "borrados"
    para identificar a los productos eliminados.
    Esta función es necesaria, sobre todo para que no se devuelvan productos
    cargados en el archivo externo, si es que el administrador los eliminó */
    const arrayBorrados = [];

    for(i=0; i<localStorage.length; i++)
    {
        let llaveLS = localStorage.key(i)
        if(llaveLS.slice(0, 7)==="borrado")
        {
            arrayBorrados.push(llaveLS.substring(8));
        }
    }
    return arrayBorrados;
}

function calcularIva(netoSinIva)
{
    let iva = netoSinIva * 0.21
    return iva.toFixed(2);        
}