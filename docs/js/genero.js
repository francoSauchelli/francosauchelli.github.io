function cargarGenero(idGenero)
{   
    let genero = "";
    
    let idParseado = parseInt(idGenero);
    switch(idParseado)
    {
        case 1:
            {
                genero = "Niñas";
                break;
            }
        case 2:
            {
                genero = "Niños";
                break;
            }
        case 3:
            {
                genero = "Mujer";
                break;
            }
        case 4:
            {
                genero = "Hombre";
                break;
            }
        case 5:
            {
                genero = "Unisex";
                break;
            }
        default:
            {
                genero = idGenero;
                break;
            }
    }
    return genero;
}