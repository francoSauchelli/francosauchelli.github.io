// template de Admin, pero específicamente en la sección de carga

function crearInput(nodoContenedor, filtro, opcionAgregarOtro)
{
    // flitro ingresado capitalizado para utilizar en adelante
    const primerCaracterFiltro = filtro.charAt(0).toUpperCase();
    const restoCadenaFiltro = filtro.slice(1);
    const nombreCapitalizado = primerCaracterFiltro + restoCadenaFiltro;
    
    const divInput = $("<div/>");
    divInput.attr("id", `divInput${nombreCapitalizado}`);
    divInput.html(`<label for="${filtro}">${nombreCapitalizado}:</label>`);

    let opcionesSelect = $("<select/>")
    opcionesSelect.attr("id", `seleccion${nombreCapitalizado}`);

    // agrega clasificiación predefinida
    agregarFiltroPredefinidos(filtro, opcionesSelect)

    // agregar datos ingresados por el administrador
    const opcionesAdmin = obtenerFiltros(nombreCapitalizado);
    if(opcionesAdmin.length!==0)
    {
        agregarFiltrosAdmin(opcionesAdmin, opcionesSelect);
    }

    // agregar opción select "otro", para agregar por el admin
    if(opcionAgregarOtro===true)
    {
        agregarOpcionOtra(filtro, opcionesSelect);
    }

    divInput.append(opcionesSelect);
    nodoContenedor.append(divInput);

    crearOpcionFiltro(divInput, nombreCapitalizado, opcionesSelect);
}

function agregarFiltroPredefinidos(filtro, opcionesSelect)
{
    // crea <select/>
    const numeroOpciones = cargarFiltro(filtro, 0);  // se agrega 0 porque el segundo parámetro es el n° de iteración
    for(let i=1; i<=numeroOpciones[0]; i++)
    {
        const seleccion = cargarFiltro(filtro, i);
        opcionesSelect.append(`<option value="${i}">${seleccion[1]}</option>`)
    }
}

function agregarFiltrosAdmin(opcionesAdmin, opcionesSelect)
{
    // agrega opciones en <select/> que dió de alta el admin
    for(let i=0;i<opcionesAdmin.length;i++)
    {
        const valorLS = JSON.parse(opcionesAdmin[i]).valor;
        const opcionLS = valorLS.toLowerCase();
        opcionesSelect.append(`<option value="${opcionLS}">
                                    ${valorLS}
                                </option>`)
    }
}

function agregarOpcionOtra(filtro, opcionesSelect)
{
    /* agrega opción para que el admin ingrese un valor.
    distinto a los predefinidos */
    let opcionOtra = "Otra";
    if(filtro==="talle")
    {
        opcionOtra = "Talle Calzado"
    }

    opcionesSelect.append(`<option value="otra">
                            - ${opcionOtra} -
                        </option>`)
    
}

function crearOpcionFiltro(divInput, nombreCapitalizado, opcionesSelect)
{
    // si selecciona la opción "otra", reemplaza <select/> por <input/>
    opcionesSelect.change(function(){
        if($(this).val()==="otra"){
            cambiarInputFiltro(divInput, nombreCapitalizado);
        }
    })
}

function cambiarInputFiltro(divInput, nombreCapitalizado)
{
    $(`#seleccion${nombreCapitalizado}`).remove();

    const inputOtroFiltro = $("<input/>");
    inputOtroFiltro.attr("id", `inputNew${nombreCapitalizado}`);

    const botonOtroFiltro = $("<button/>");
    botonOtroFiltro.attr("id", `agregar${nombreCapitalizado}`);
    botonOtroFiltro.html("Agregar");

    botonOtroFiltro.click(()=>{
        if(inputOtroFiltro.val()!=="")
        {
            cargarFiltroIngresado(divInput, nombreCapitalizado)}
    })

    divInput.append(inputOtroFiltro);
    divInput.append(botonOtroFiltro);
}

function cargarFiltroIngresado(divInput, nombreCapitalizado)
{
    /* crea nuevo filtro ingreasdo, guardando en localStorage 
    dándole la numeración con Date.now, para que no se pisen */
    const dateNow = Date.now().toString();
    const idFiltro = dateNow.slice(7)
    
    const valorIDNodo = $(`#inputNew${nombreCapitalizado}`).val();
    const valorFiltro = formatearDato(valorIDNodo);
    const objetFiltro = crearObjetoFiltro(nombreCapitalizado, valorFiltro);

    localStorage.setItem(`${nombreCapitalizado}#${idFiltro}`,
                        JSON.stringify(objetFiltro));
    
    $(`#inputNew${nombreCapitalizado}`).remove();
    $(`#agregar${nombreCapitalizado}`).remove();
    
    // agrega nuevo filtro en donde estaba el input
    const mostrarNuevoFiltro = $("<span/>");
    mostrarNuevoFiltro.attr(`seleccion${nombreCapitalizado}`)
    mostrarNuevoFiltro.html(valorFiltro);
    divInput.append(mostrarNuevoFiltro);
}

function formatearDato(nombreCapitalizado)
{
    // da formato al valor ingresado por el admin, por prolijidad
    const palabrasFiltro = nombreCapitalizado.split(" ");

    const arrayCadena = [];
    palabrasFiltro.forEach(palabra => {
        primerCaracter = palabra.charAt(0).toUpperCase();
        restoCadena = palabra.toLowerCase().slice(1);
        nuevaCadena = primerCaracter + restoCadena;
        arrayCadena.push(nuevaCadena);
    });
    
    return arrayCadena.join(" ");
}

function crearObjetoFiltro(nombreCapitalizado, valorFiltro)
{
    const objeto = 
        nombreCapitalizado === "Categoria" ? new Categoria(valorFiltro) :
        nombreCapitalizado === "Marca" ? new Marca(valorFiltro) :
        nombreCapitalizado === "Talle" ? new Talle(valorFiltro) :
        mostrarError("Ocurrió un error inesperado.");
        
    return objeto
}

function obtenerFiltros(nombreCapitalizado)
{
    // recupera filtros guardados en localStorage
    const arrayFiltros = [];
    for(let i=0; i<localStorage.length; i++)
    {
        llaveLS = localStorage.key(i);
        indexLlave = llaveLS.indexOf("#")
        llaveFiltro = llaveLS.slice(0, indexLlave)

        if(llaveFiltro===`${nombreCapitalizado}`)
        {
            nuevoFiltro = localStorage.getItem(llaveLS);
            arrayFiltros.push(nuevoFiltro);
        }
    }
    return arrayFiltros;
}

function crearInputNombreProd(nodoContenedor)
{
    const divNombreProd = $("<div/>");
    divNombreProd.attr("id", "divInputNombreProd");

    const labelNombreProd = $("<label/>");
    labelNombreProd.html("Nombre del Producto:");

    const inputNombreProd = $("<input/>");
    inputNombreProd.attr("id", "inputNombreProd");

    divNombreProd.append(labelNombreProd);
    divNombreProd.append(inputNombreProd);
    nodoContenedor.append(divNombreProd);
}

function crearInputPrecio(nodoContenedor)
{
    const divInputPrecio = $("<div/>");
    divInputPrecio.attr("id", "divInputPrecio");

    const labelPrecio = $("<label/>");
    labelPrecio.html("Precio (sin IVA):");

    const inputPrecio = $("<input/>");
    inputPrecio.attr("id", "inputPrecio");
    inputPrecio.attr("type", "number");

    divInputPrecio.append(labelPrecio);
    divInputPrecio.append(inputPrecio);
    nodoContenedor.append(divInputPrecio);
}

function crearInputStock(nodoContenedor)
{
    const divInputStock = $("<div/>");
    divInputStock.attr("id", "divInputStock");

    const labelStock = $("<label/>");
    labelStock.html("Stock:");

    const inputStock = $("<input/>");
    inputStock.attr("id", "inputStock");
    inputStock.attr("type", "number");

    divInputStock.append(labelStock);
    divInputStock.append(inputStock);
    nodoContenedor.append(divInputStock);
}

function crearInputImagen(nodoContenedor)
{
    const divInputImagen = $("<div/>");
    divInputImagen.attr("id", "divInputImagen");

    const labelImagen = $("<label/>");
    labelImagen.html("Imagen: (url)");

    const inputImagen = $("<input/>");
    inputImagen.attr("id", "inputImagen");
    // inputImagen.attr("type", "file");

    divInputImagen.append(labelImagen);
    divInputImagen.append(inputImagen);
    nodoContenedor.append(divInputImagen);
}

function crearIDRadioBTN(nodoContenedor)
{
    const nodoDiv = $("<div/>");
    nodoDiv.attr("id", "divIDRadioBTN");

    // Radio button id nuevo
    const nodoDivNuevo = $("<div/>");
    nodoDivNuevo.attr("id", "divRadioNuevo");
    const labelNuevoID = $("<label/>");
    labelNuevoID.html("ID Nuevo:")
    const nuevoRadioBTN = $("<input/>");
    nuevoRadioBTN.attr("id", "idNuevoRadioBTN");
    nuevoRadioBTN.attr("type", "radio");
    nuevoRadioBTN.attr("checked", true);
    nuevoRadioBTN.attr("name", "idProducto");
    nuevoRadioBTN.attr("value", "nuevoID");

    // Radio button id nuevo
    const nodoDidvExiste = $("<div/>");
    nodoDidvExiste.attr("id", "divRadioExiste");
    const labelExisteID = $("<label/>");
    labelExisteID.html("ID Existente:")
    const existeRadioBTN = $("<input/>");
    existeRadioBTN.attr("id", "idExisteRadioBTN");
    existeRadioBTN.attr("type", "radio");
    existeRadioBTN.attr("name", "idProducto");
    existeRadioBTN.attr("value", "existeID");


    // se pegan los radio buttons
    nodoDivNuevo.append(labelNuevoID);
    nodoDivNuevo.append(nuevoRadioBTN);
    nodoDiv.append(nodoDivNuevo);

    nodoDivNuevo.append(labelExisteID);
    nodoDivNuevo.append(existeRadioBTN);
    nodoDiv.append(nodoDidvExiste);

    nodoContenedor.append(nodoDiv);

    agregarEventoExistenteID(existeRadioBTN, nuevoRadioBTN);
}

function agregarEventoExistenteID(existeIDRadioBTN, nuevoIDRadioBTN)
{
    /* agrega el comportamiento según se seleccione el radioButton 
    de ID existente o nuevo */
    existeIDRadioBTN.click(()=>{
        obtenerProductos("", "radioButton");
    })

    nuevoIDRadioBTN.click(()=>{
        $("#divSelecID").remove();
    })
}

function mostrarIDCargados(respuesta)
{
    // si se seleciona que el ID existe, muestra deplegable con las opciones cargadas
    const arrayID = [];

    const arrayLocalstorage = buscarEnLocalStorage();  // busca en Localstorage si se agregaró algo

    respuesta.forEach((prod)=>{
        arrayID.push(prod.id);
    })

    if(arrayLocalstorage.length!==0)
    {
        arrayID.concat(arrayLocalstorage);
    }

    // este if es para que no genere otro select si ya existe uno
    if(!($("#divSelecID").length))
    {
        const divIDexist = $("<div/>");
        divIDexist.attr("id", "divSelecID");

        const selectID = $("<select/>");
        selectID.attr("id", "selectIDRadioBTN")

        // agrega una primera opción que sólo indique que se trata de IDs
        const optionDisabled = $("<option/>");
        optionDisabled.attr("selected", true);
        optionDisabled.attr("disabled", true);
        optionDisabled.html("ID")
        selectID.append(optionDisabled);

        arrayID.forEach((idExistente)=> 
        {
                const optionID = $("<option/>");
                optionID.attr("value", `${idExistente}`);
                optionID.html(`${idExistente}`);

                selectID.append(optionID);
        })

        divIDexist.append(selectID);
        $("#divIDRadioBTN").append(divIDexist);

        agregarEventoSelectID(selectID, respuesta);
    }
}

function agregarEventoSelectID(selectID, respuesta)
{
    selectID.on("change", ()=>{
        const prodID = buscarProductoSelID(respuesta);
        enviarObjetoIDSelec(prodID);
        $("#botonAceptar").html("Modificar");
        $("#botonBorrar").show();
    });
}

function buscarProductoSelID(respuesta)
{   
    // busca los valores relacionados al ID seleccionado

    // valor del ID seleccionado
    const valorSelectID = $("#selectIDRadioBTN").val();

    // busca si existe ID en api
    const matchAPI  = respuesta.filter(function(element){
        return element.id == valorSelectID;
    })
    
    // busca si existe ID en LocalStorage
    const arrayProdsLocalStorage = buscarEnLocalStorage();
    const matchLocalStorage = arrayProdsLocalStorage.filter(function(element){
        return element.id == valorSelectID;
    })

    let objetoSeleccionado = []
    // valida dónde encontró el ID
    if(matchAPI.length===1)
    {
        objetoSeleccionado = matchAPI[0];
        return objetoSeleccionado;
    }
    else if(matchLocalStorage.length===1)
    {
        objetoSeleccionado = matchLocalStorage[0];
        return objetoSeleccionado;
    }

}

function enviarObjetoIDSelec(objetoSeleccionado)
{       
    // control de error
    if(objetoSeleccionado!==undefined)
    {
        mostrarDatosIDCargado(objetoSeleccionado);
    }
    else{
        const mensajeError = `No se pudieron recuperar los datos del ID seleccionado`;
        mostrarError(mensajeError);
    } 

}

function mostrarDatosIDCargado(objeto)
{
    // nodos de los labels donde se mostrarán los valores cargados
    const divCategoria = $("#divInputCategoria");
    const divMarca = $("#divInputMarca");
    const divInputNombre = $("#divInputNombreProd");
    const divInputGenero = $("#divInputGenero");
    const divInputTalle = $("#divInputTalle");
    const divInputPrecio = $("#divInputPrecio");
    const divInputStock = $("#divInputStock");
    const divInputImagen = $("#divInputImagen");
    const arrayDivsProps = [divCategoria,
                            divMarca,
                            divInputNombre,
                            divInputTalle,
                            divInputGenero,
                            divInputPrecio,
                            divInputStock,
                            divInputImagen]
    
    const arrayPropiedades = crearArrayPropiedades(objeto);

    // agrega cada "span" al div correspondiente
    let iProps = 0;
    arrayPropiedades.forEach((propiedad)=>{
        if($(`#spanProp${iProps}`)!==undefined)
        {
            $(`#spanProp${iProps}`).remove();
        }
        const spanPropiedad = $("<span/>");
        spanPropiedad.attr("id", `spanProp${iProps}`);
        spanPropiedad.html(arrayPropiedades[iProps]);
        arrayDivsProps[iProps].append(spanPropiedad);
        iProps++
    })
}

function crearArrayPropiedades(objeto)
{
    // necesario para vincular la propiedad a cada valor
    const categoria = cargarCategoria(objeto.categoria);
    const marca = cargarMarca(objeto.marca);
    const nombreProd = objeto.nombreProducto;
    const talle = cargarTalle(objeto.talle);
    const genero = cargarGenero(objeto.genero);
    const precio = objeto.precio;
    const stock = objeto.stock;
    const imagen = objeto.imagen;

    return [categoria,
            marca,
            nombreProd,
            talle,
            genero,
            precio,
            stock,
            imagen]
}