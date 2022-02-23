function cargarCategoria(idCategoria)
{
    let categoria = "";

    let idParseado = parseInt(idCategoria);
    switch(idParseado)
    {
        case 1:
            {
                categoria = "Buzos/Camperas";
                break;
            }
        case 2:
            {
                categoria = "Remeras/Musculosas";
                break;
            }
        case 3:
            {
                categoria = "Pantalones/Shorts";
                break;
            }
        case 4:
            {
                categoria = "Calzado";
                break;
            }
        default:
            {
                categoria = idCategoria;
                break;
            }
    }
    return categoria
}