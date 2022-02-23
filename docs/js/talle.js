function cargarTalle(idTalle)
{
    /* función que verifica el valor equivalente al talle
    Si se selecciona "otra" (para calzado), agregará el nuevo valor por default */
    let talle = "";

    let idParseado = parseInt(idTalle);
    switch(idParseado)
    {
        case 1:
            {
                talle = "XS";
                break;
            }
        case 2:
            {
                talle = "S";
                break;
            }
        case 3:
            {
                talle = "M";
                break;
            }
        case 4:
            {
                talle = "L";
                break;
            }
        case 5:
            {
                talle = "XL";
                break;
            }
        case 6:
            {
                talle = "2XL";
                break;
            }
        default:
            {
                talle = idTalle;
                break;
            }
}
    return talle
}