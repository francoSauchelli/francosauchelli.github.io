function cargarLogin()
{   
    if(sessionStorage.getItem("admin#1234"))
    {
        cargarAdmBTNS();
    }
    else{
        mostrarMsjProfesor();
        cargarNoLogueado();
    }
};

function mostrarMsjProfesor()
{
    Swal.fire({
        title: '¡Para Evaluar!',
        icon: 'info',
        html:
        `Si ingresa documento: "1234" y clave: "admin",
        se accede a la funcionalidad de administrador.`,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> ¡Entendido!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
    })
}

function cargarNoLogueado()
{
    const limpiaNodo = document.getElementById("formLogDown"); 
    limpiaNodo.innerHTML = "";  // borra en caso de haber información
    
    const nodoFormLog = $("#formLog");
    nodoFormLog.html(`<label for="documento">Número de documento:</label>
                    <input id="inputDocumento" type="number" name="documento">
                    <br><br>
                    <label for="password">Clave de ingreso:</label>
                    <input id="inputPassword" type="password" name="password">
                    <br><br>`)

    const nodoContBTN = document.getElementById("containerBTNS");
    nodoContBTN.innerHTML = `<hr>
                            <button class="botonLog" id="botonIngresar">
                                Ingresar
                            </button>
                            <button class="botonLog" id="botonRegistrar">
                                Registrarme
                            </button>`;
    
    agregarAccionIngresarBTN();
    agregarAccionRegistrarBTN();
    agregarEstiloBotones();  // para que los botones cambien de color "onmouseover"
}


function crearCamposRegistro()
{   
    // eliminar botón "Registrarme"
    const nodoContBTN = $("#containerBTNS");
    const registrarBTN = $("#botonRegistrar")

    registrarBTN.hide();

    // modificar texto de botón "Ingresar" a "Aceptar"
    const aceptarBTN = document.getElementById("botonIngresar");
    aceptarBTN.innerHTML = "Aceptar";

    // crear botón "Cancelar"
    const cancelarBTN = document.createElement("button");
    cancelarBTN.setAttribute("class", "botonLog");
    cancelarBTN.setAttribute("id", "cancelarLog");
    cancelarBTN.innerHTML = "Cancelar";

    nodoContBTN.append(cancelarBTN);
    
    definirEventos();  // para que los botones cambien de color "onmouseover"

    // cargar campos para registro
    const nodoRegistroLogin = document.getElementById("formLog");

        nodoRegistroLogin.innerHTML += 
        `<label for="nombre">Nombre de usuario:</label>
        <input id="inputNombre" type="text" name="nombre">
        <br><br>
        <label for="edad">Edad:</label>
        <input id="inputEdad" type="number" name="edad">
        <br><br>            
        <label for="residencia">País de residencia: </label>
        <input id="inputResidencia" type="text" name="residencia">
        <br><br>`;

    return siRegistra = true;
};

let siRegistra = false;  /* se define esta variable para condición de
registro en "recibirValoresLog" */

function animarBotonUser()
{
    $("#botonUser").hover(
        function(){$(this).css({
            "transform": "scale(1.25)",
            "color": "#355C7D"
            })},

        function(){$(this).css({
            "transform": "scale(1)",
            "border-style": "none",
            "color": "black"})},
    );
}

function abrirCuentaAdministrador()
{
    const estadoLogTag = $("#estadoLog")[0];
    estadoLogTag.innerHTML = `<h4>cuenta ADMIN</h4>`
    $("#boton2Navbar").html("Opciones Admin")
}

function mostrarError(mensajeError)
{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensajeError,
    })
}

// cambia el estado si el usuario/admin está logueado o no
function cambiarEstadoLog()
{
    if(sessionStorage.getItem("logueado"))
    {
        abrirCuentaUsuario();
    }
    else if(sessionStorage.getItem("admin#1234"))
    {
        abrirCuentaAdministrador();
    }
    else{
        const userButton = $("<button></button>");
        userButton.attr("id", "botonUser")
        userButton.html(`<i class="far fa-user-circle"></i>`);

        const estadoLogTag = $("#estadoLog");
        estadoLogTag.append(userButton)
    }
    animarBotonUser();
}

function abrirCuentaUsuario()
{
    const nombreSession = sessionStorage.getItem("logueado");
    const estadoLogTag = $("#estadoLog")[0];
    estadoLogTag.innerHTML = `<h4>¡Hola, ${nombreSession}!</h4>`
    $("#boton2Navbar").attr("disabled", true);
}