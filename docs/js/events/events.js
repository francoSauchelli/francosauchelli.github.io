function definirEventos()
{
    // EVENTO: para darle color a los botones de la navbar
    // para botón "home"
    const botonHome = document.getElementById("boton1Navbar");

    botonHome.onmouseover = ()=>{   
        botonHome.style.backgroundColor="#6C5B7B";
        botonHome.style.color="white";
        botonHome.style.borderBlockColor= "white";
    }

    botonHome.onmouseout = ()=>{
        botonHome.style.backgroundColor="#C06C84";
        botonHome.style.color="#41252d";
        botonHome.style.borderBlockColor= "#41252d";
    }

    // para botones "admin" y "login" (navbar)
    const botonesNavbar = $(".botonesNavbar");

    botonesNavbar.hover(
        function(){$(this).css({
            "transform": "scale(1.25)",
            "border-style": "inset",
            "color": "crimson",
            "border-color": "crimson"})},

        function(){$(this).css({
            "transform": "scale(1)",
            "border-style": "none",
            "color": "black"})},
    );
        
    const botonesCarrito = document.getElementsByClassName("classCarrito");
    for(i=0;i<botonesCarrito.length;i++)
    {
        let indiceBoton = i  /* se define el valor de i en otra variable dentro del bucle, 
        porque al ser una función asincrónica, no toma el valor en cada iteración cuando se ejecuta la llamada */
        botonesCarrito[indiceBoton].onmouseover = ()=>{   
            botonesCarrito[indiceBoton].style.backgroundColor="rgb(35, 156, 35)";
        }

        botonesCarrito[indiceBoton].onmouseout = ()=>{
            botonesCarrito[indiceBoton].style.backgroundColor="white";
        }
    }

    // EVENTOS: botones navbar
    // incono user
    const userBTN = $("#botonUser")[0];
    if(userBTN!==undefined)
    {
        userBTN.onclick = ()=>{
            cargarLogin();
        }
    }

    // botón "Home"
    const homeBTN = document.getElementById("boton1Navbar");
    homeBTN.onclick = ()=>{
        obtenerProductos();
        crearMenuFiltro();  // crear el filtro latearl por marca, genero, etc (homeTemplate)
    }

    // botón "Login"
    const loginBTN = document.getElementById("boton2Navbar");
    loginBTN.onclick = ()=>{
        cargarLogin();
    }

    // EVENTOS: botones Login
    // botón "Cancelar" (en login)
        const cancelarBTN = document.getElementById("cancelarLog");
    if(cancelarBTN!==null)
    {
        cancelarBTN.onclick = ()=>{
            cargarLogin();
            siRegistra = false;  /* vuelve a darle valor "false", para que la función
            recibirValoresLog() no busque datos de Registro, sino de login */
        }
    };

    // botón "Cancelar" (en carga de productos - Admin)
    const cancelProdBTN = document.getElementById("cancelCargaProd");
    if(cancelProdBTN!==null)
    {
        cancelProdBTN.onclick = ()=>{
            cargarAdmBTNS();
        }
    };

    // botón "Agregar"
    const agregarBTN = document.getElementById("agregarProd");
    if(agregarBTN!==null)
    {
        agregarBTN.onclick = ()=>{
            recibirValoresProds();
        }
    };   
}

function agregarEventosObjDinamicos()
{ 
    // se agregan eventos a los tags creados dinámicamente
    const nodoBody = $("#bodyTag");
    nodoBody.on("click", function (event){

        const condicionQUitar = event.target.id.substring(0,11)
        if(condicionQUitar==="botonQuitar")
        {
            const idItemQuitado = event.target.id.substring(11)
            const carrito = new Carrito("", "");
            carrito.quitarItemCarrito(idItemQuitado);
        }
        // Crea evento del botón del carrito del usuario
        else if(event.target.id==="menuCarrito" || event.target.id==="menuCarritoImg")
        {   
            const carrito = new Carrito("", "");
            const precioTotal = carrito.totalizarPrecioCarrito(carritoDeCompra);
            actualizarCarrito(carritoDeCompra, precioTotal);
        }
    })
}    

function agregarEstiloBotones()
{
    // EVENTO: para darle color a los botones
    const botonesLog = document.getElementsByClassName("botonLog");

    for(i=0;i<botonesLog.length;i++)
    {
        let indiceBoton = i  /* se define el valor de i en otra variable dentro del bucle, 
        porque al ser una función asincrónica, no toma el valor en cada iteración cuando se ejecuta la llamada */
        botonesLog[indiceBoton].onmouseover = ()=>{   
            botonesLog[indiceBoton].style.backgroundColor="#6C5B7B";
            botonesLog[indiceBoton].style.color="white";
        }

        botonesLog[indiceBoton].onmouseout = ()=>{
            botonesLog[indiceBoton].style.backgroundColor="white";
            botonesLog[indiceBoton].style.color="black";
        }
    }
}

function agregarAccionIngresarBTN()
{
   // botón "Ingresar" / "Aceptar"
    const ingresarBTN = document.getElementById("botonIngresar");
    ingresarBTN.onclick = ()=>{
        recibirValoresLog();
    }
}

function agregarAccionRegistrarBTN()
{
    // botón "Registrar"
    const registrarBTN = document.getElementById("botonRegistrar");
    registrarBTN.onclick = ()=>{
        crearCamposRegistro();
    }
}

function agregarEventoBuscadorBTN()
{   
    const buscadorBTN = $("#botonBusc");
    buscadorBTN.click(()=> {
        const valorInputBusc = $("#inputBuscador").val();
        obtenerProductos(valorInputBusc);
    })
}

function agregarEventoInput()
{
    const buscadorInput = $("#inputBuscador");
    buscadorInput.keyup(()=>{
        const valorInputBusc = buscadorInput.val();
        filtrarBuscador(valorInputBusc);
    })
}