function actualizarCarrito(carritoDeCompra, precioTotal)
{   
    let nodoItemsCarrito = "";

    if(precioTotal!==0)
    {
        let arrayCarrito = carritoDeCompra

        arrayCarrito.forEach((el=>
            {
                iva = calcularIva(el.objProducto.precio)
                nodoItemsCarrito += `<button id="botonQuitar${el.objProducto.id}">-</button><br>
                                    <img width="130px" src="${el.objProducto.imagen}" alt="imagen">
                                <h5>${el.objProducto.nombreProducto} - ${el.cantidad} un.</h5>\n
                                <h6>$${el.objProducto.precio} + <i>IVA ($${iva})</i></h6>`
            }));

        nodoItemsCarrito += `<hr/>
                        <h5>Total de esta Compra: $${precioTotal.toFixed(2)}</h5>
                        <br>
                        <button id="botonFinalizarCompra">
                            Finalizar Compra    
                        </button>`;
        
    }
    else
    {
        nodoItemsCarrito += `<i id="sadEmoji" class="far fa-sad-tear"></i>
                            <h5>Aún no has agregado productos a tu carrito.</h5>`
    }

    // RIGHT SIDEBAR
    Swal.fire({
        title: 'Tu Carrito:',
        html: nodoItemsCarrito,
        position: 'top-end',
        showClass: {
        popup: `
            animate__animated
            animate__fadeInRight
            animate__faster
        `
        },
        hideClass: {
        popup: `
            animate__animated
            animate__fadeOutRight
            animate__faster
        `
        },
        grow: 'column',
        width: 300,
        showConfirmButton: false,
        showCloseButton: false,
    })

    agregarFuncionComprar(carritoDeCompra);
}

function agregarFuncionComprar(carritoDeCompra)
{
    $("#botonFinalizarCompra").click(()=>{
        confirmarCompra(carritoDeCompra);
        const carrito = new Carrito("", "");
        carrito.vaciarCarrito();
    })
}

function confirmarCompra(carritoDeCompra)
{
    mostrarModalCompra();
    const classProducto = new Productos();
    classProducto.actualizarStock(carritoDeCompra);
}

function mostrarModalCompra()
{
    Swal.fire(
        '¡Gracias por la compra!',
        'Tu compra fue aprobada.',
        'success'
    )  
}

function crearMenuCarrito()
{
    const nodoFormLog = $("#formLog");
    const divCarrito = $("<div></div>");
    divCarrito.attr("id", "divMenuCarrito");
    
    const menuCarritoBTN = $("<button/>")
    menuCarritoBTN.attr("id", "menuCarrito")
    menuCarritoBTN.html(`<i id="menuCarritoImg" class="fas fa-shopping-cart"></i>`);

    divCarrito.append(menuCarritoBTN);

    nodoFormLog.prepend(divCarrito);

    animarMenuCarrito();
}

function animarMenuCarrito()
{
    $("#menuCarrito").hover(
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
}
