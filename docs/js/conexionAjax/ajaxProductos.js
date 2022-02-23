function obtenerProductos(filtro="", soloDatos=false)
{
    // obtenerProductos conexión API - Ajax
    $.get("data/dataBaseProductos.json", (respuesta, estado)=>{
        if(estado==="success"){
            
            const respuestaAjax = respuesta.data;
    
            // concatena productos de LocalStorage
            const prodsLocalStorage = buscarEnLocalStorage();  // busca en Localstorage si se agregaró algo
            arrayProductos = crearArrayProductos(respuestaAjax, prodsLocalStorage);

            if(soloDatos==="radioButton")
            {
                mostrarIDCargados(arrayProductos);
            }
            else if(soloDatos==="listarAdmin")
            {
                mostrarProductos(arrayProductos, soloDatos);
            }
            else{
                mostrarProductos(arrayProductos);
                crearMenuCarrito();
            }
        }
        else{
            const mensajeError = `Se produjo un error inesperado. Intenta más tarde.`;
            mostrarError(mensajeError);
        }
    })
}

    