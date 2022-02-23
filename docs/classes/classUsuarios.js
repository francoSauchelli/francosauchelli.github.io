class Usuarios
{
    constructor(nombre, documento, password, edad, residencia)
    {
        this.nombre = nombre; // agregar nombre de usuario
        this.documento = documento;
        this.password = password;
        this.edad = edad;
        this.residencia = residencia;
    }

    registrar(nombreIngresado, documentoIngresado, passwordIngresado, edadIngresada, residenciaIngresada)
    {
        const nuevoUsuario = new Usuarios
        (
            nombreIngresado,
            documentoIngresado,
            passwordIngresado,
            edadIngresada,
            residenciaIngresada
        )
        
        localStorage.setItem(`Documento#${documentoIngresado}`,
                            JSON.stringify(nuevoUsuario));
        alert(`Bienvenido, ${nombreIngresado}.\nEl registro se realizó correctamente.`)
        
        window.location.href="main.html"
    }
}