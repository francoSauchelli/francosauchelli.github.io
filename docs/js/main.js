$(document).ready(()=>
{   
    // se separa en una función distinta para que quede más legible
    inicializarFunciones();
});

function inicializarFunciones()
{
    // inicializa funciones importantes al abrir la aplicación
    crearLogo();
    mostrarMain();
    crearBuscador();  // crea input y botón de filtro (homeTemplate)
    agregarEventosObjDinamicos();
}

function crearLogo()
{
    // logo principal de la página
    const nodoBody = $("#divBody");
    const nodoLogo = $("<div/>");
    nodoLogo.attr("id", "nodoLogo");

    agregarImagen(nodoLogo);
    agregarTexto(nodoLogo)    

    nodoBody.prepend(nodoLogo);

    animarLogo();
}

function agregarImagen(nodoLogo)
{
    const nodoDiv = $("<div/>");
    nodoDiv.attr("id", "divImagenLogo");

    const nodoImg = $("<img/>");    
    nodoImg.attr("src", "imgs/logo/logo_main.png");
    nodoImg.attr("id", "logoImg");
    nodoImg.hide()

    nodoDiv.append(nodoImg);
    nodoLogo.append(nodoDiv);
}

function agregarTexto(nodoLogo)
{
    const nodoDiv = $("<div/>");
    nodoDiv.attr("id", "divTextoLogo");

    const nodoTexto = $("<h1/>");
    nodoTexto.attr("id", "h1Titulo");
    nodoTexto.html("Sports Now");
    nodoTexto.hide()

    nodoDiv.append(nodoTexto);
    nodoLogo.append(nodoDiv);
}

function animarLogo()
{
    const imagenLogo = $("#logoImg");
    imagenLogo.click(()=>mostrarMain())

    const textoLogo = $("#h1Titulo");
    textoLogo.click(()=>mostrarMain())

    imagenLogo.fadeIn(3000, ()=>{
        textoLogo.fadeIn(5000);
    });
}

function mostrarMain()
{
    $("#containerBTNS").empty();
    $("#formLog").empty();
    $("#formLogDown").empty();

    const divMain = $("<div/>");
    divMain.attr("id", "divPublicidad");

    /* se crea un array con las direcciones de los videos para
    que se muestre cualquier de los dos aleatoriamente */
    const direccionesVideos = [`videos/anuncio_adidas.mp4`,
                                `videos/anuncio_nike.mp4`];

    const posiblesIndices = [0, 1];
    let random = Math.floor(Math.random() * posiblesIndices.length)

    const video = $("<video/>");
    video.attr("autoplay", true);
    video.prop("muted", true);
    video.prop("loop", "loop");

    const source = $("<source/>");
    source.attr("src", direccionesVideos[random]);

    video.append(source);
    divMain.append(video);

    $("#formLog").append(divMain)
}