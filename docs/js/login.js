function recibirValoresLog()
{
    /* recibe valores cargados en los <inputs/>, dependiendo si se cargan
    como logueo o registro de usuario */
    const docIngresado = document.getElementById("inputDocumento").value;
    const passIngresado = document.getElementById("inputPassword").value;

    /* verifica si es registro para buscar valores de los nuevos <inputs/>,
    sino habría un error por valor indefinido */
    if(siRegistra===true)
    {   
        const nombreIngresado = document.getElementById("inputNombre").value;
        const edadIngresada = document.getElementById("inputEdad").value;
        const residIngresada = document.getElementById("inputResidencia").value;

        validarRegistro(docIngresado,
                        passIngresado,
                        nombreIngresado,
                        edadIngresada,
                        residIngresada);
    }
    else
    {
        procesarValores(docIngresado, passIngresado);
    } 
}

// funciones de logueo
function procesarValores(documento, password)
{
    // verifica si se loguea el administrador
    if(documento==1234 && password==="admin")
    {
        $("#containerBTNS").empty();
        cargarAdmBTNS();
        iniciarSesion(documento);
    }
    else{
        pasarDatosLogin(documento, password);
    }
}

function pasarDatosLogin(documento, password)
{
    /* en caso de logueo, valida la información con la base de datos.
    Si encuentra coincidencia, inicia sesión; sino muestrar modal con error. */
    const docLocalStorage = buscarDocLocalStorage(documento);
    const passLocalStorage = buscarPassLocalStorage(password);
    
    if(docLocalStorage!==null && passLocalStorage!==undefined)
    {
        iniciarSesion(documento);
        window.location.href="main.html"

    }else if(docLocalStorage===null)
    {
        const mensajeError = `El documento ingresado "${documento} no existe."`;
        mostrarError(mensajeError);
        
    }else if(docLocalStorage!==null && passLocalStorage===undefined)
    {
        const MensajeError = `La contraseña ingresada es incorrecta.`;
        mostrarError(MensajeError);
    }
}

function buscarDocLocalStorage(documento)
{
    /* si encuentra documento en localStorage, lo devuelve;
    sino el valor es "undefined" */
    return localStorage.getItem(`Documento#${documento}`);
}

function buscarPassLocalStorage(password)
{
    /* si encuentra password en localStorage, lo devuelve;
    sino el valor es "undefined" */
    let arrayPasswords = [];
    for(let i=0; i<localStorage.length; i++)
    {
        let llave = localStorage.key(i);
        if(llave.slice(0, 9)==="Documento")
        {
            let objectoParseado = JSON.parse(localStorage.getItem(llave));
            arrayPasswords.push(objectoParseado.password)
        }
    }
    return arrayPasswords.find(e=>e == password)
}


// funciones de registro
function validarRegistro(doc, pass, nombre, edad, residencia)
{
    // array de nombres de usuario
    const arrayNombresIngresados = crearArrayNombres();  

    // si encuentra el nombre lo guarda, sino queda "undefined"
    const validaNombre = arrayNombresIngresados.find(e=>e === nombre)  

    if(localStorage.getItem(`Documento#${doc}`)===null &&
                            validaNombre===undefined)
    {
        mensajeError.innerHTML = "";
        const instanciaUsuario = new Usuarios("", "", "", "", "")
        instanciaUsuario.registrar(nombre, 
                                    doc, 
                                    pass, 
                                    edad, 
                                    residencia);
        iniciarSesion(doc);

    }else if(localStorage.getItem(`Documento#${doc}`)!==null)
    {
        mensaje = `El documento: "${doc}" ya se encuentra registrado.`
        mostrarError(mensaje);

    }else if(validaNombre!==undefined)
    {
        mensaje = `El nombre de usuario: "${nombre}" ya se encuentra registrado.`
        mostrarError(mensaje);
    }
}

function crearArrayNombres()
{
    //crea un array de nombres de usuario, para verificar si existe antes de registrar
    const arrayNombres = [];
    for(let i=0; i<localStorage.length;i++)
    {
        let llave = localStorage.key(i)
        if(llave.slice(0, 9)==="Documento")
        {
            let jsonParseado = JSON.parse(localStorage.getItem(llave));
            arrayNombres.push(jsonParseado.nombre)  
        }
    }
    return arrayNombres
}

// para cargar usuario logueado en sesion storage
function iniciarSesion(documento)
{
    if(documento!=="1234")
    {
        const usuarioLogueado = 
        JSON.parse(localStorage.getItem(`Documento#${documento}`));

        sessionStorage.setItem("logueado", usuarioLogueado.nombre);
        cambiarEstadoLog()
    }
    else{
        sessionStorage.setItem(`admin#${documento}`, `cuenta administrador`);
        cambiarEstadoLog();
    }
}