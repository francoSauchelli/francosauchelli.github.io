function obtenerUsuarios()
{
    const url = `https://jsonplaceholder.typicode.com/users`
    $.get(url, (respuesta, estado)=>{
        if(estado==="success")
        {
            listarUsuarios(respuesta);
        }
        else{
            const mensajeError = `No se pudo conectar a la base de datos de usuarios.`;
            mostrarError(mensajeError);
        }
    })
}