$(document).ready(function() {
    
    console.log('[INFO] structuredNotes DOM Ready');
    mostrarMensajeCargando("Cargando Structured Notes v0.1");
    
    ///////////////////////////////
    // ASIGNACION EVENT HANDLERS //
    ///////////////////////////////
    
        $("#pageOpciones").bind("pageshow", loadSettings);
        
        //Abrir pagina de edicion de campo al hacer doble click en las areas correspondientes de la minuta
        $("#tablaMinuta_Asistentes").dblclick(abrirDialogoEdicion);
        $("#tablaMinuta_Acciones").dblclick(abrirDialogoEdicion);
        $("#tablaMinuta_Notas").dblclick(abrirDialogoEdicion);
        $("#tablaMinuta_S").dblclick(abrirDialogoEdicion);
        $("#tablaMinuta_W").dblclick(abrirDialogoEdicion);
        $("#tablaMinuta_O").dblclick(abrirDialogoEdicion);
        $("#tablaMinuta_T").dblclick(abrirDialogoEdicion);
        
        
    
    //AQUI VA EL CODIGO PRINCIPAL DE LA APLICACION
    
    //Boton de pruebas
    $('#botPruebas').click(function() {
        console.log("[INFO] Asignando tamaños a los bloques de la minuta");
        console.time("tamanoBloques");
        
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
        
        if (typeof scrollAsistentes != 'undefined') scrollAsistentes.destroy();
        if (typeof scrollAcciones != 'undefined') scrollAcciones.destroy();
        if (typeof scrollNotas != 'undefined') scrollNotas.destroy();
        if (typeof scrollS != 'undefined') scrollS.destroy();
        if (typeof scrollW != 'undefined') scrollW.destroy();
        if (typeof scrollO != 'undefined') scrollO.destroy();
        if (typeof scrollT != 'undefined') scrollT.destroy();
        
        scrollAsistentes = new iScroll('tablaMinuta_Asistentes');
        scrollAcciones = new iScroll('tablaMinuta_Acciones');
        scrollNotas = new iScroll('tablaMinuta_Notas');
        scrollS = new iScroll('tablaMinuta_S');
        scrollW = new iScroll('tablaMinuta_W');
        scrollO = new iScroll('tablaMinuta_O');
        scrollT = new iScroll('tablaMinuta_T');
        
        
        
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        
        console.timeEnd("tamanoBloques");
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
    $("#dialogoEdicionCampo").jqmData("campo", campo);
    
    $.mobile.changePage( "#dialogoEdicionCampo");
    
    
    console.log("[DEBUG] Editando el campo: " + campo);
    
    //Mostramos en el titulo del dialogo el campo correspondiente al texto en edicion
    $("#spanTituloEdicionCampo").html(campo);
    
    //Mostramos en el textArea el html original del campo para editar
    $("#wysihtml5-textarea").html($this.html());
    
    
    //Configuramos el text area como un editor rico: wysihtml5
    var editor = new wysihtml5.Editor("wysihtml5-textarea", { // id of textarea element
        toolbar:      "wysihtml5-toolbar", // id of toolbar element
        parserRules:  wysihtml5ParserRules // defined in parser rules set 
    });
    
    //Asignacion Event Handlers de los botones
    $("#botGuardarEdicionCampo").click(guardarCampoEditado);
    
    console.log("[DEBUG] Saliendo de abrirDialogoEdicion fichero structuredNotesMain.js");
};




/* ToDo: Destroy wysihtml5 textarea antes de cerrar */
function guardarCampoEditado() {
    console.log("[DEBUG] Entrando en guardarCampoEditado fichero structuredNotesMain.js");
    
    var contenidoEditado = $("#wysihtml5-textarea").val();
    var campoEditado = $("#dialogoEdicionCampo").jqmData("campo");
    var identificadorDivEditado = "";
    
    if ( campoEditado == "Asistentes") identificadorDivEditado = "tablaMinuta_Asistentes";
    if ( campoEditado == "Acciones") identificadorDivEditado = "tablaMinuta_Acciones";
    if ( campoEditado == "Notas") identificadorDivEditado = "tablaMinuta_Notas";
    
    $("#"+identificadorDivEditado).html(contenidoEditado);
    
    $.mobile.changePage( "#pageEdicionMinutaTables");
    
    console.log("[DEBUG] Saliendo de guardarCampoEditado fichero structuredNotesMain.js");
}