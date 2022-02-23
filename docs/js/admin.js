function cargarFiltro(filtro, iteracion)
{
    let opciones = 0;
    let filtroPrecargado = "";

    switch(filtro)
    {
        case "categoria":
            {
                opciones = 4;
                if(iteracion!==0)
                {
                    filtroPrecargado = cargarCategoria(iteracion)
                }
                break;
            }
        case "marca":
            {
                opciones = 4;
                if(iteracion!==0)
                {
                    filtroPrecargado = cargarMarca(iteracion)
                }
                break;
            }
        case "talle":
            {
                opciones = 6;
                if(iteracion!==0)
                {
                    filtroPrecargado = cargarTalle(iteracion)
                }
                break;
            }
        case "genero":
            {
                opciones = 5;
                if(iteracion!==0)
                {
                    filtroPrecargado = cargarGenero(iteracion)
                }
                break;
            }
    }
    return [opciones, filtroPrecargado]
}

function recibirValoresProds()
{
    /* recibe valores ingresados en los <input/> por el administrador.
    si no se ingresan, pero se trata de una modificación, toma el valor anterior */
    const idGenerado = crearID();  // crea ID
    const idProducto = $("#selectIDRadioBTN").val()
                        || idGenerado;

    const categSinFormato = $("#seleccionCategoria").val()
                            || $("#divInputCategoria > span").text();
    // le da formato de primera letra mayúscula
    const categIngresada = formatearValorFiltro(categSinFormato);               

    const marcaSinFormato = $("#seleccionMarca").val()
                            || $("#divInputMarca > span").text();
    // le da formato de primera letra mayúscula
    const marcaIngresada = formatearValorFiltro(marcaSinFormato);

    const nombreSinFormato = $("#inputNombreProd").val()
                            || $("#divInputNombreProd > span").text();
    // le da formato de primera letra mayúscula
    const nombreIngresado = formatearValorFiltro(nombreSinFormato);

    const generoIngresado = $("#seleccionGenero").val()
                            || $("#divInputGenero");

    const talleIngresado = $("#seleccionTalle").val()
                            || $("#divInputTalle").val();

    const precioIngresado = document.getElementById("inputPrecio").value
                            || $("#divInputPrecio > span").text();
                            
    const stockIngresado = document.getElementById("inputStock").value
                            || $("#divInputStock > span").text();
    const imagenIngresada = $("#inputImagen").val()
                            || $("#divInputImagen span").text();

    if(categIngresada!=="" &&
        marcaIngresada!=="" &&
        nombreIngresado!=="" &&
        generoIngresado!=="" &&
        talleIngresado!=="" &&
        precioIngresado!=="" &&
        stockIngresado!=="" &&
        imagenIngresada!=="")
        {
            cargarProdsBD(idProducto,
                categIngresada,
                marcaIngresada,
                nombreIngresado,
                generoIngresado,
                talleIngresado,
                precioIngresado,
                stockIngresado,
                imagenIngresada)

                mostrarInfoCarga(idProducto,
                                nombreIngresado,
                                precioIngresado,
                                stockIngresado,
                                imagenIngresada);
        }
        else{
            mostrarMensajeError();
        }
};

function mostrarMensajeError()
{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Algo salió mal!',
        footer: 'Debe completar todos los campos para agregar.'
    })
}

function mostrarInfoCarga(id, nombreProd, precio, stock, imagen)
{
    Swal.fire({
        title: `Carga completa: Producto#${id}`,
        text: `stock: ${stock}`,
        imageUrl: imagen,
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Imagen Producto',
    })
}

function crearID()
{
    const dateNow = Date.now().toString();
    return dateNow.slice(7)
}

function cargarProdsBD(id, categoria, marca, nombre, genero, talle, precio, stock, imagen)
{   
    const nuevoPorducto = new Productos(
                                id,
                                categoria, 
                                marca,
                                nombre,
                                genero,
                                talle, 
                                precio, 
                                stock,
                                imagen);

    localStorage.setItem(`Producto#${id}`, JSON.stringify(nuevoPorducto));
}


function formatearValorFiltro(valor)
{
    // carga producto en localStorage
    const palabrasFiltro = valor.split(" ");

    const arrayCadena = [];
    palabrasFiltro.forEach(palabra => {
        primerCaracter = palabra.charAt(0).toUpperCase();
        restoCadena = palabra.toLowerCase().slice(1);
        nuevaCadena = primerCaracter + restoCadena;
        arrayCadena.push(nuevaCadena);
    });
    
    return arrayCadena.join(" ");
}

function borrarRegistro()
{
    // valor del ID seleccionado
    const valorSelectID = $("#selectIDRadioBTN").val();

    const llaveItem = localStorage.getItem(`Producto#${valorSelectID}`);
    
    localStorage.setItem(`borrado#${valorSelectID}`, "Item archivo JSON borrado por el administrador.");
    
    if(llaveItem!==null)
    {
        localStorage.removeItem(`Producto#${valorSelectID}`);
    }
}

function listarBorrados()
{
    /* no los mostrará en pantalla, pero debe recuperarlos para verificar si
    un producto fue eliminado y, en ese caso, no mostrarlo */
    const idBorrado = [];
    for(let i=0; i<localStorage.length; i++)
    {
        const llave = localStorage.key(i);
        if(llave.slice(0, 7)==="borrado")
        {
            idBorrado.push(llave.slice(8));
        }
    }
    return idBorrado
}