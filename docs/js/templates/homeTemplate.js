// se agregan productos al array para poder manipular entre distintas funciones.
let arrayProductos = [];

function mostrarProductos(productosObtenidos, admin=false)
{     
    $("#containerBTNS").empty();  // limpia por si hay información previ
    const nodoProductos = $("#formLog")[0]; 
    nodoProductos.innerHTML = "";  // limpia por si hay información previ

        if(!admin)
        {
            productosObtenidos.forEach((prod) => {
                crearTemplateProd(prod, nodoProductos);
            })
        }
        else if(admin==="listarAdmin")
        {
            listarProductos(productosObtenidos);
        }
    
    cambiarEstiloItems();
}

function filtrarBuscador(filtro="")
{
    const filtroMinusc = filtro.toLocaleLowerCase();

    prodsBuscados = [];

    arrayProductos.forEach(prod => {
        nombreProd = prod.nombreProducto.toLocaleLowerCase();
        marca = prod.marca.toLocaleLowerCase();
        categoria = prod.categoria.toLocaleLowerCase();

        /* verifica si la palabra ingresada (al tipear) existe y,
        en ese caso, devuelve el producto */
        if(nombreProd.includes(filtroMinusc)
        || marca.includes(filtroMinusc)
        || categoria.includes(filtroMinusc)
        || filtro==="")
        {
            prodsBuscados.push(prod)
        }
    });
    mostrarProductos(prodsBuscados);
}

function crearTemplateProd(prod, nodoProductos)
{
    let iva = calcularIva(prod.precio);

        // Mostrar producto y el detalle
        let item = document.createElement("div");
        item.setAttribute("class", "itemDiv")
        item.innerHTML += `<hr>
                            <img src="${prod.imagen}" alt="imagen">
                            <h5>${prod.nombreProducto}</h5>
                            <h6>$${prod.precio} + <i>IVA ($${iva})</i></h6>
                            `;
        
        nodoProductos.appendChild(item);
        
        // Mostrar contador de cantidad
        let iCantidad = 1

        const botonMenos = document.createElement("button");
        botonMenos.setAttribute("id", "botonMenos");
        botonMenos.innerHTML = "-";
        botonMenos.onclick = ()=>{
            if(iCantidad>1)
            {    
            iCantidad--
            nodoNumero.innerHTML = `${iCantidad}`
            }
        }

        const botonMas = document.createElement("button");
        botonMas.setAttribute("id", "botonMas");
        botonMas.innerHTML = "+";
        botonMas.onclick = ()=>{
            if(iCantidad<5 && iCantidad<prod.stock)
            {
                iCantidad++
                nodoNumero.innerHTML = `${iCantidad}`
            }
        }

        const nodoNumero = document.createElement("h5");
        nodoNumero.setAttribute("id" , "nodoNum");
        nodoNumero.innerHTML = `${iCantidad}`

        // Mostrar botón carrito de compra
        const carritoBTN = document.createElement("button");
        carritoBTN.setAttribute("class", "classCarrito");
        carritoBTN.setAttribute("id", "carritoBTN");

        carritoBTN.innerHTML = `<i id="carritoBTN" class="fas fa-shopping-cart"></i>`

        carritoBTN.onclick = (()=>{
        let cantidadSeleccionada = nodoNumero.innerHTML

        const carrito = new Carrito(prod, cantidadSeleccionada);
        carrito.cargarCarrito(carrito);
        })
        // agregan nodos
        item.appendChild(botonMas);
        item.appendChild(botonMenos);
        item.appendChild(nodoNumero);
        item.appendChild(carritoBTN);
}

function crearArrayProductos(prodsApi, prodsLocalStorage)
{
    const arrayApiIDs = verificarIDs(prodsApi, prodsLocalStorage);
    const arrayConcatenado = prodsLocalStorage[0].concat(arrayApiIDs);

    const productosVisibles = [];

    arrayConcatenado.forEach((prod)=>{
        for(let propiedad in prod){
            if(propiedad==="categoria")
            {
                prod["categoria"] = cargarCategoria(prod["categoria"])
            }
            if(propiedad==="marca")
            {
                prod["marca"] = cargarMarca(prod["marca"])
            }
            if(propiedad==="genero")
            {
                prod["genero"] = cargarGenero(prod["genero"])
            }
            if(propiedad==="talle")
            {
                prod["talle"] = cargarTalle(prod["talle"])
            }
        }

        if(prod.stock>0)
        {
            productosVisibles.push(prod);
        }
    })
    return productosVisibles;
}

function verificarIDs(prodsApi, prodsLocalStorage)
{
    // array IDs modificados
    const idsModificados = [];
    prodsLocalStorage[0].forEach((producto)=>{
        idsModificados.push(Number(producto.id));
    });

    // array IDs borrados
    const idsBorrados = [];
    prodsLocalStorage[1].forEach((borrado)=>{
        idsBorrados.push(Number(borrado));
    });

    const arrayIDs = idsModificados.concat(idsBorrados);

    // verifica que no estén modificados ni borrados
    const arrayLocalStorage = []
    prodsApi.forEach((producto)=>{
        const idProducto = producto.id;
        /* verificar si el id de los productos de la api se encuentran
        en localStorage, para saber si se ha modificado la información */
        if(arrayIDs.indexOf(idProducto)==-1)
        {
            arrayLocalStorage.push(producto)
        }
    })
    return arrayLocalStorage;
}

function crearBuscador()
{
    const nodoBuscador = $("#divBuscador");
    nodoBuscador.empty()
    
    const iconBuscador = $("<span/>");
    iconBuscador.attr("id", "iconBuscar")
    iconBuscador.html(`<i class="fas fa-search"></i>`);

    const inputBuscador = $("<input/>");
    inputBuscador.attr("id", "inputBuscador")

    nodoBuscador.append(inputBuscador);
    nodoBuscador.append(iconBuscador);

    agregarEventoInput(); 
}

function crearMenuFiltro()
{
    // const objetosProductos = convertirObjProd(data);
    const divFiltroProductos = $("#formLogDown");
    divFiltroProductos.empty();
    const listaFiltroProds = $("<ul/>");

    const arrayOpcionesFiltro = ["Categoria", "Marca", "Genero", "Talle"];

    // divide al array de opciones por palabra
    arrayOpcionesFiltro.forEach((opcion)=>{
        const filtro = $("<li/>");
        filtro.attr("id", `li${opcion}`);

         // a cada palabra la separa por carácter y la envuelve en un <span/>
        caracteresOpcion = opcion.split("");
        let opcionPorCaracter = "";
        i=0;
        caracteresOpcion.forEach((caracter)=>{
            opcionPorCaracter += `<span class="spanCaracter${i}">${caracter}</span>`
            i++
        })
        filtro.attr("class", "itemFiltro");
        
        filtro.html(opcionPorCaracter);
        listaFiltroProds.append(filtro)
    })
    divFiltroProductos.append(listaFiltroProds);

    animarOpcionesFiltro(arrayOpcionesFiltro)
    agregarEventoFiltro(arrayOpcionesFiltro);
}

function agregarEventoFiltro(arrayOpcionesFiltro)
{

    arrayOpcionesFiltro.forEach((opcion) =>{
        opcionFiltro = $(`#li${opcion}`)
        opcionFiltro.hover(
            function(){buscarOpciones(opcion)},
    
            function(){$(".itemsFiltro").hide()},
        )
    }
)}

function buscarOpciones(opcion)
{
    const opcionElegida = opcion.toLowerCase();
    const arrayOpciones = [];

    arrayProductos.forEach((prod)=>{
        /* a aquellas opciones tengan equivalencia numérica, transforma en string.
        Además devuelve los las opciones disponibles para el filtro seleccionado.*/
        const valorDevuelto = buscarEquivalentes(opcion, prod[opcionElegida])

        if(!(arrayOpciones.includes(valorDevuelto)))
        {
            arrayOpciones.push(valorDevuelto)
        }
    })
    desplegarOpcionesFiltro(opcion, arrayOpciones);
}

function buscarEquivalentes(opcion, productoObjeto)
{
    let valor = "";

    switch(opcion)
        {
            case "Categoria":
                {
                    valor = cargarCategoria(productoObjeto);
                    break;
                }
            case "Marca":
                {
                    valor = cargarMarca(productoObjeto);
                    break;
                }
            case "Genero":
                {
                    valor = cargarGenero(productoObjeto);
                    break;
                }
            case "Talle":
                {
                    valor = cargarTalle(productoObjeto);
                    break;
                }
        }
    return valor;
}

function desplegarOpcionesFiltro(opcion, arrayOpciones)
{   
    arrayOpciones.forEach((elemento)=>{
        const item = $("<li/>");
        item.attr("class", "itemsFiltro");
        item.html(elemento);
        $(`#li${opcion}`).append(item);
    })

    agregarEventoOpcionesFiltro();
}

function agregarEventoOpcionesFiltro()
{
    $(".itemsFiltro").click((event)=>{
        filtrarBuscador(event.target.innerHTML)
    })
}

function animarOpcionesFiltro(opciones)
{
    let spansFiltro = $(".itemFiltro span")
    spansFiltro.hide();
    for(let i=0;i<spansFiltro.length; i++)
    {
        $(`.spanCaracter${0}`).delay(100).fadeIn(200, ()=>{
            $(`.spanCaracter${i}`).delay(500).fadeIn(3000, ()=>{
                $(`.spanCaracter${i}`).css({"color":"#C06C84"},"1000").delay(1, ()=>{
                    $(`.spanCaracter${i}`).css({"color":"#6C5B7B"},"1000")
                })
            })
        })
    }
}

function cambiarEstiloItems()
{
    $("#formLog").css('display', 'flex');
    $(".itemDiv").hover(
        function(){$(this).css({
            "transform": "scale(1.25)"})},

        function(){$(this).css({
            "transform": "scale(1)"})},
    );
}