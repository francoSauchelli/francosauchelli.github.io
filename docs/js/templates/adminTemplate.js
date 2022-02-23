function cargarAdmBTNS()
{
    const nodoBotones = document.getElementById("formLogDown"); 
    nodoBotones.innerHTML = "";  // borra en caso de haber información
    
    const nodoFormLog = document.getElementById("formLog");
    nodoFormLog.innerHTML = "";

    nodoBotones.innerHTML = `<hr>
                            <button class="botonLog" id="btnListarUsuarios">
                                Listar Usuarios
                            </button>
                            <button class="botonLog" id="btnListarProductos">
                                Listar Productos
                            </button>
                            <button class="botonLog" id="btnCargarProd">
                                Editar Productos
                            </button>`;
    
    agregarEstiloBotones();  // para que los botones cambien de color "onmouseover"
    agregarAccionCargarProd(); 
    agregarEventoListarProds();
    agregarAccionListarUsuarios();
}

function agregarAccionListarUsuarios()
{
    // EVENTOS: botones Admin:
    // botón "Listar Usuarios"
    const botonListar = document.getElementById("btnListarUsuarios");
    botonListar.onclick = ()=>{
        $("#btnCargarProd").html("Editar Productos")
        obtenerUsuarios();
    }
}

function agregarAccionCargarProd()
{
    // botón "Cargar Productos" (declarada en adminTemplate)
    const btnCargaProd = document.getElementById("btnCargarProd");
    btnCargaProd.onclick = ()=>{
        cargarFormProds();
    }
}



function cargarFormProds()
{
    const nodoContenedor = $("#formLog");
    nodoContenedor.empty();

    $("#btnCargarProd").html("Reiniciar Carga");

    const nodoFormulario = $("<div/>");
    nodoFormulario.attr("id", "divFormulario");
    crearIDRadioBTN(nodoFormulario);
    crearInput(nodoFormulario, "categoria", true);
    crearInput(nodoFormulario, "marca", true);
    crearInputNombreProd(nodoFormulario);
    crearInput(nodoFormulario, "talle", true);
    crearInput(nodoFormulario, "genero", false);
    crearInputPrecio(nodoFormulario);
    crearInputStock(nodoFormulario);
    crearInputImagen(nodoFormulario);
    crearBotonesCargar(nodoFormulario);

    nodoContenedor.prepend(nodoFormulario);
}



function crearBotonesCargar(nodoContenedor)
{
    const nodoBotones = $("<div/>");
    nodoBotones.attr("id", "botonesDiv");

    const cancelarBTN = $("<button/>");
    cancelarBTN.attr("id", "botonCancelar");
    cancelarBTN.html("Cancelar");

    const aceptarBTN = $("<button/>");
    aceptarBTN.attr("id", "botonAceptar");
    aceptarBTN.html("Aceptar");

    const borrarBTN = $("<button/>");
    borrarBTN.attr("id", "botonBorrar");
    borrarBTN.html("borrar");
    borrarBTN.hide();

    nodoBotones.append(cancelarBTN);
    nodoBotones.append(aceptarBTN);
    nodoBotones.append(borrarBTN);

    nodoContenedor.append(nodoBotones);

    agregarEventoBotonesCarga(cancelarBTN, aceptarBTN, borrarBTN);
}

function agregarEventoBotonesCarga(cancelarBTN, aceptarBTN, borrarBTN)
{
    cancelarBTN.click(()=>{
        cargarAdmBTNS();
    })

    aceptarBTN.click(()=>{
        recibirValoresProds()
    })

    borrarBTN.click(()=>{
        borrarRegistro();
    })
}

function agregarEventoListarProds()
{   const botonListarProds = $("#btnListarProductos");
    botonListarProds.click(()=>{
        $("#btnCargarProd").html("Editar Productos")
        obtenerProductos("", "listarAdmin");
    })
}

function listarProductos(productos)
{
    const nodoDivTabla = $("<div/>");
    nodoDivTabla.attr("id", "divTabla");

    const nodoTabla = $("<table/>");
    nodoTabla.attr("id", "tablaID");


    crearEncabezadoTabla(productos[0], nodoTabla);
    completarFilas(productos, nodoTabla);

    nodoDivTabla.append(nodoTabla);
    $("#formLog").append(nodoDivTabla);
}

function crearEncabezadoTabla(producto, nodoTabla)
{   
    const filaEncabezado = $("<tr/>");
    for(const propSinFormato in producto)
    {
        if(propSinFormato!=="iva")
        {
            const propiedad = formatearDato(propSinFormato);
            const encabezado = $("<th/>").html(propiedad);
            filaEncabezado.append(encabezado);
        }
    }

    nodoTabla.append(filaEncabezado)
}

function completarFilas(productos, nodoTabla)
{
    productos.forEach((prod)=>{
        const fila = $("<tr/>");
        for(let propiedad in prod)
        {
            if(propiedad!=="iva" && propiedad!=="imagen")
            {
                const dato = $("<td/>").html(prod[propiedad]);
                fila.append(dato);
            }
            else if(propiedad==="imagen")
            {
                const imagenTag = $("<img/>");
                imagenTag.attr("src", prod[propiedad]);
                imagenTag.attr("width", "150");
                imagenTag.attr("height", "150");
                const celda = $("<td/>").append(imagenTag);
                fila.append(celda);   
            }
        }
        nodoTabla.append(fila);
    })
}

function listarUsuarios(usuarios)
{    
    crearTablaUsuarios(usuarios);
}

function crearTablaUsuarios(usuarios)
{
    $("#formLog").empty();
    const nodoDivTabla = $("<div/>");
    if($("#divTabla").length==1)
    {
        $("#divTabla").empty();
    }
    else{
        nodoDivTabla.attr("id", "divTabla");
    }

    const nodoTabla = $("<table/>");
    nodoTabla.attr("id", "tablaID");

    crearEncabezadoUsuarios(nodoDivTabla, nodoTabla);
    completarFilasUsuarios(nodoDivTabla, nodoTabla, usuarios);
}

function crearEncabezadoUsuarios(nodoDivTabla, nodoTabla)
{
    const titulosEncabezado = ["ID", "Nombre", "Dirección", "Tel.", "Mail.", "Username"];

    const filaEncabezado = $("<tr/>");

    titulosEncabezado.forEach((titulo)=>{
        const encabezado = $("<th/>");
        encabezado.html(titulo);
        filaEncabezado.append(encabezado);
    })

    nodoTabla.append(filaEncabezado);
    nodoDivTabla.append(nodoTabla);
    $("#formLog").append(nodoDivTabla);
}

function completarFilasUsuarios(nodoDivTabla, nodoTabla, usuarios)
{
    usuarios.forEach((user)=>{
        const fila = $("<tr/>");
        const id = $("<td/>").html(user.id);
        const name = $("<td/>").html(user.name);
        const address = $("<td/>").html(user.address.city);
        const phone = $("<td/>").html(user.phone);
        const email = $("<td/>").html(user.email);
        const username = $("<td/>").html(user.username);

        fila.append(id);
        fila.append(name);
        fila.append(address);
        fila.append(phone);
        fila.append(email);
        fila.append(username);

        nodoTabla.append(fila);
    })

    nodoDivTabla.append(nodoTabla);
}