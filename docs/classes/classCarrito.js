class Carrito
{
    constructor(objProducto, cantidad)
    {
            this.objProducto = objProducto;
            this.cantidad = cantidad;
    }

    cargarCarrito(nuevoObjeto)
    {   
        const idProdcuto = nuevoObjeto.objProducto.id;
        const indexProd = carritoDeCompra.findIndex(elem =>
                            elem.objProducto.id == idProdcuto);
        
        if(indexProd!=-1)
        {
            carritoDeCompra[indexProd].cantidad = 
                                        Number(carritoDeCompra[indexProd].cantidad) +
                                        Number(nuevoObjeto.cantidad);
        }
        else
        {    
            carritoDeCompra.push(nuevoObjeto);  
        }
        let precioTotal = this.totalizarPrecioCarrito(carritoDeCompra);
        actualizarCarrito(carritoDeCompra, precioTotal);
    }  

    quitarItemCarrito(idQuitar)
    {   
        carritoDeCompra.forEach((elem)=>{
            let iteracion = 0;
            if(elem.objProducto.id==idQuitar)
            {
                if(elem.cantidad>1)
                {
                    elem.cantidad-=1
                }
                else
                {
                    const indexItem = carritoDeCompra.indexOf(elem)
                    carritoDeCompra.splice(indexItem, 1);
                    Swal.close()
                }
            }
            iteracion+=1
        })
        let precioTotal = this.totalizarPrecioCarrito(carritoDeCompra);
        actualizarCarrito(carritoDeCompra, precioTotal);
    }

    vaciarCarrito()
    {
        carritoDeCompra = [];
    }
    
    totalizarPrecioCarrito(carritoActualizado)
    {   
        let total = 0;
        const carritoCompra = carritoDeCompra;
        carritoCompra.forEach((element)=>
        {
            total+= element.objProducto.precio * element.cantidad;
        })
        return total
    }
};

let carritoDeCompra = [];