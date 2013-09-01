$(document).ready(function() {
    
    console.log('[INFO] structuredNotes DOM Ready');
    mostrarMensajeCargando("Cargando Structured Notes v0.1");
    
    ///////////////////////////////
    // ASIGNACION EVENT HANDLERS //
    ///////////////////////////////
    
        $("#pageOpciones").bind("pageshow", loadSettings);
        
        //Abrir pagina de edicion de campo al hacer click en las areas correspondientes de la minuta
        $("#tablaMinuta_Asistentes").click(abrirDialogoEdicion);
        $("#tablaMinuta_Acciones").click(abrirDialogoEdicion);
        $("#tablaMinuta_Notas").click(abrirDialogoEdicion);
        $("#tablaMinuta_S").click(abrirDialogoEdicion);
        $("#tablaMinuta_W").click(abrirDialogoEdicion);
        $("#tablaMinuta_O").click(abrirDialogoEdicion);
        $("#tablaMinuta_T").click(abrirDialogoEdicion);
        
        $("#pageEdicionMinutaTables").bind("pageshow", prepararPaginaEdicionMinuta);
        
        $("#botCancelarEdicionMinuta").click(cancelarEdicionMinuta);
        
        
    
    //AQUI VA EL CODIGO PRINCIPAL DE LA APLICACION
    
    //Boton de pruebas
    $('#botPruebas').click(function() {
        console.log("[INFO] BOTON DE PRUEBAS");
        
        prepararPaginaEdicionMinuta();
        
    });
    
    
    
    ////////////////////////
    // PAGINA DE OPCIONES //
    ////////////////////////
    
    //Guarda las opciones modificadas
    $('#botOpciones_guardar').click(saveSettings);
    
    
    ocultarMensajeCargando();
    
}); 



/* ToDo: Hacer que el text area tenga un tamaño adecuado */
function abrirDialogoEdicion() {
    console.log("[DEBUG] Entrando en abrirDialogoEdicion fichero structuredNotesMain.js");
    
    //Obtenemos el div que ha llamado a la funcion abrirDialogoEdicion y sacamos el parametro data-campo
    var $this = $( this );
    var campo = $this.jqmData("campo");
    
    //Lo asignamos al div del panel de edicion para no perderlo mas adelante
    $("#dialogoEdicionCampoCKEditor").jqmData("campo", campo);
    
    $.mobile.changePage( "#dialogoEdicionCampoCKEditor");
    
    
    console.log("[DEBUG] Editando el campo: " + campo);
    
    //Mostramos en el titulo del dialogo el campo correspondiente al texto en edicion
    $("#spanTituloEdicionCampoCKEditor").html(campo);
    
    //Inicializamos el CKEditor en el textarea si no ha sido inicializado antes
    if (!CKEDITOR.instances.textareaCKEditor) 
        CKEDITOR.replace( 'textareaCKEditor', { toolbar: 'Basic' } );
    
    //Cargamos los datos correspondientes al area de la minuta que invoco al editor
    CKEDITOR.instances.textareaCKEditor.setData($this.html());
    
    //Asignacion Event Handlers de los botones
    $("#botGuardarEdicionCampoCKEditor").click(guardarCampoEditado);
    $("#botCancelarEdicionCampoCKEditor").click(cancelarCampoEditado);
    
    console.log("[DEBUG] Saliendo de abrirDialogoEdicion fichero structuredNotesMain.js");
};




function cancelarCampoEditado() {
    $.mobile.changePage( "#pageEdicionMinutaTables");
}



function cancelarEdicionMinuta() {
    $.mobile.changePage( "#pageInicial");
}


/*  Para guardar los datos correctamentes en la pageEdicionMinutaTables hay que tener cuidado al meter html en la celda
    correspondiente ya que iScroll es muy sensible a los cambios del DOM.
    1. Obtener el contenido del textarea en formato HTML de la pagina de edicion de campo
    2. Obtener el div que invoco a la pagina de edicion de campo y su variable global del objeto iScroll asociada (window.scroll ...)
    3. Destruir el objeto iScroll que invoco al dialogo (lo regeneraremos al mostrar la pagina de edicion de minuta)
    4. Poner a null la variable global del objeto iScroll para que en el evento "pageshow" se re inicialice
    5. Poner el html en el div que lo invoco */
function guardarCampoEditado() {
    console.log("[DEBUG] Entrando en guardarCampoEditado fichero structuredNotesMain.js");
    
    //var contenidoEditado = $("#textareaCKEditor").val();
    var contenidoEditado = CKEDITOR.instances.textareaCKEditor.getData();
    var campoEditado = $("#dialogoEdicionCampoCKEditor").jqmData("campo");
    var identificadorDivEditado = "";
    
    var iScrollCampoEditado;
    
    /*
    if ( campoEditado == "Asistentes") identificadorDivEditado = "tablaMinuta_Asistentes";
    if ( campoEditado == "Acciones") identificadorDivEditado = "tablaMinuta_Acciones";
    if ( campoEditado == "Notas") identificadorDivEditado = "tablaMinuta_Notas";
    
    
    if ( campoEditado == "Asistentes") iScrollCampoEditado = window.scrollAsistentes;
    if ( campoEditado == "Acciones") iScrollCampoEditado = window.scrollAcciones;
    if ( campoEditado == "Notas") iScrollCampoEditado = window.scrollNotas;

    iScrollCampoEditado.destroy();
    window.scrollAsistentes = null;
    $("#"+identificadorDivEditado).html(contenidoEditado);
    //iScrollCampoEditado.wrapper.innerHTML = contenidoEditado;
    */
    
    switch (campoEditado) {
        case "Asistentes":
            identificadorDivEditado = "tablaMinuta_Asistentes"
            window.scrollAsistentes.destroy();            
            window.scrollAsistentes = null;
            $("#"+identificadorDivEditado).html(contenidoEditado);
            break;
            
        case "Acciones":
            identificadorDivEditado = "tablaMinuta_Acciones"
            window.scrollAcciones.destroy();
            window.scrollAcciones = null;
            $("#"+identificadorDivEditado).html(contenidoEditado);
            break;
            
        case "Notas":
            identificadorDivEditado = "tablaMinuta_Notas"
            window.scrollNotas.destroy();
            window.scrollNotas = null;
            $("#"+identificadorDivEditado).html(contenidoEditado);
            break;
            
        case "Fortalezas":
            identificadorDivEditado = "tablaMinuta_S"
            window.scrollS.destroy();
            window.scrollS = null;
            $("#"+identificadorDivEditado).html(contenidoEditado);
            break;
            
        case "Debilidades":
            identificadorDivEditado = "tablaMinuta_W"
            window.scrollW.destroy();
            window.scrollW = null;
            $("#"+identificadorDivEditado).html(contenidoEditado);
            break;
            
        case "Oportunidades":
            identificadorDivEditado = "tablaMinuta_O"
            window.scrollO.destroy();
            window.scrollO = null;
            $("#"+identificadorDivEditado).html(contenidoEditado);
            break;
            
        case "Amenazas":
            identificadorDivEditado = "tablaMinuta_T"
            window.scrollT.destroy();
            window.scrollT = null;
            $("#"+identificadorDivEditado).html(contenidoEditado);
            break;
            
        default:
            console.log ("[ERROR] El campo editado no corresponde con los casos del switch: fichero structuredNotesMain.js");
    }
    
    
    
    $.mobile.changePage( "#pageEdicionMinutaTables");
    
    console.log("[DEBUG] Saliendo de guardarCampoEditado fichero structuredNotesMain.js");
}




/* Asigna las alturas correspondientes a las celdas de la tabla de edicion de la minuta
    en funcion de lo definido en las opciones de la aplicacion.
    Inicializa tambien los iScroll para que se pueda hacer scroll individual en cada celda */
function prepararPaginaEdicionMinuta() {

    console.log("[DEBUG] Entrando en prepararPaginaEdicionMinuta fichero structuredNotesMain.js");
    //console.time("tamanoBloques");
    
    var realStateVerticalDisponible = obtenerRealStateVerticalDisponible();
    var alturaAsistentesAcciones = Math.floor(realStateVerticalDisponible * localStorage.alturaAsistentesAcciones / 100);
    var alturaSW = Math.floor(realStateVerticalDisponible * localStorage.alturaSWOT / 100);
    var alturaOT = alturaSW; //Las filas SW y OT deberan ser del mismo tamaño
    var alturaNotas = realStateVerticalDisponible - alturaAsistentesAcciones - alturaSW - alturaOT;
    
    console.log("[DEBUG] alturaAsistentesAcciones = " + alturaAsistentesAcciones);
    console.log("[DEBUG] alturaSW = " + alturaSW);
    console.log("[DEBUG] alturaOT = " + alturaOT);
    console.log("[DEBUG] alturaNotas = " + alturaNotas);
    
    
    $("#tablaMinuta_Asistentes").css("height", alturaAsistentesAcciones + "px");
    $("#tablaMinuta_Asistentes").css("max-height", alturaAsistentesAcciones + "px");
    
    $("#tablaMinuta_Acciones").css("height", alturaAsistentesAcciones + "px");
    $("#tablaMinuta_Acciones").css("max-height", alturaAsistentesAcciones + "px");
        
    $("#tablaMinuta_Notas").css("height", alturaNotas + "px");
    $("#tablaMinuta_Notas").css("max-height", alturaNotas + "px");
    
    
    $("#tablaMinuta_S").css("height", alturaSW + "px");
    $("#tablaMinuta_S").css("max-height", alturaSW + "px");
    
    $("#tablaMinuta_W").css("height", alturaSW + "px");
    $("#tablaMinuta_W").css("max-height", alturaSW + "px");
    
    $("#tablaMinuta_O").css("height", alturaOT + "px");
    $("#tablaMinuta_O").css("max-height", alturaOT + "px");
    
    $("#tablaMinuta_T").css("height", alturaOT + "px");
    $("#tablaMinuta_T").css("max-height", alturaOT + "px");

    
    if (!window.scrollAsistentes) window.scrollAsistentes = new iScroll('tablaMinuta_Asistentes');
    if (!window.scrollAcciones) window.scrollAcciones = new iScroll('tablaMinuta_Acciones');
    if (!window.scrollNotas) window.scrollNotas = new iScroll('tablaMinuta_Notas');
    if (!window.scrollS) window.scrollS = new iScroll('tablaMinuta_S');
    if (!window.scrollW) window.scrollW = new iScroll('tablaMinuta_W');
    if (!window.scrollO) window.scrollO = new iScroll('tablaMinuta_O');
    if (!window.scrollT) window.scrollT = new iScroll('tablaMinuta_T');
    
    window.scrollAsistentes.refresh(); 
    window.scrollAcciones.refresh();
    window.scrollNotas.refresh();
    window.scrollS.refresh();
    window.scrollW.refresh();
    window.scrollO.refresh();
    window.scrollT.refresh();
    
    
    console.log("[DEBUG] Saliendo de prepararPaginaEdicionMinuta fichero structuredNotesMain.js");
}
