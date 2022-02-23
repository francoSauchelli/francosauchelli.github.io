class Productos
{
    constructor(id, 
        categoria, 
        marca, 
        nombreProducto, 
        genero, 
        talle,
        precio, 
        stock, 
        imagen)
    {
        this.id = id;
        this.categoria = categoria;
        this.marca = marca;
        this.nombreProducto = nombreProducto;
        this.genero = genero;
        this.talle = talle;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.iva = parseInt(precio) * 0.21;
    }

    actualizarStock(productosVendidos)
    {
        productosVendidos.forEach((prod)=>{
            const stockAnterior = Number(prod.objProducto.stock);
            const cantidadVendida = Number(prod.cantidad);
            this.stockActualizado = stockAnterior - cantidadVendida;

            cargarProdsBD(prod.objProducto.id,
                        prod.objProducto.categoria,
                        prod.objProducto.marca,
                        prod.objProducto.nombreProducto,
                        prod.objProducto.genero,
                        prod.objProducto.talle,
                        prod.objProducto.precio,
                        this.stockActualizado,
                        prod.objProducto.imagen)
        })
    }
}