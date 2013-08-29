$(document).ready(function() {
    
    console.log('[INFO] structuredNotes DOM Ready');
    mostrarMensajeCargando("Cargando Structured Notes v0.1");
    
    ///////////////////////////////
    // ASIGNACION EVENT HANDLERS //
    ///////////////////////////////
    
        $("#pageOpciones").bind("pageshow", loadSettings);
        $("#bloqueAsistentes").dblclick(abrirDialogoEdicion);
        
        
        
    
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
        
        scrollAsistentes = new iScroll('tablaMinuta_Asistentes',  {  hScrollbar: false, vScrollbar: true, zoom: true });
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




function abrirDialogoEdicion() {
    console.log("[DEBUG] Entrando en abrirDialogoEdicion fichero structuredNotesMain.js");
    $.mobile.changePage( "#dialogoEdicionCampo", { role: "dialog" } );
    var editor = new wysihtml5.Editor("wysihtml5-textarea", { // id of textarea element
        toolbar:      "wysihtml5-toolbar", // id of toolbar element
        parserRules:  wysihtml5ParserRules // defined in parser rules set 
    });
    
    console.log("[DEBUG] Saliendo de abrirDialogoEdicion fichero structuredNotesMain.js");
};