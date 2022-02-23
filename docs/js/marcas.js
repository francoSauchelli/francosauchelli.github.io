function cargarMarca(idMarca)
{   
    /* función que verifica el valor equivalente a la marca
    Si se selecciona "otra", agregará el nuevo valor por default */
    let marca = "";
    
    let idParseado = parseInt(idMarca);
    switch(idParseado)
    {
        case 1:
            {
                marca = "Adidas";
                break;
            }
        case 2:
            {
                marca = "Nike";
                break;
            }
        case 3:
            {
                marca = "Puma";
                break;
            }
        case 4:
            {
                marca = "Under Armour";
                break;
            }
        default:
            {
                marca = idMarca;
                break;
            }
    }
        
    return marca
}