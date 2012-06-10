//GENERAL: //goo.gl/F1s5f //goo.gl/gVV9R /////////////////////////////

function noselect(arg){ arg.onselectstart = new Function ("return false"); }
function id(arg)      { return document.getElementById(arg);                    }
function name(arg)    { return document.getElementsByName(arg);                 }
function w(id, arg)   { var out = document.getElementById(id); out.innerHTML = "<li>" +arg + "</li>" + out.innerHTML; };

//BOTONES //////////////////////////////////////////////////////////

function cantidad_botones(){
    var dia_nro = document.getElementsByName("dia_nro");
    var lng = dia_nro.length; var ln  = lng - 1;
    return ln;
}
function valueBotones(elem, fecha){  
    elem.value = fecha;    
}
function titleBotones(elem, fecha){  
    elem.title = fecha;    
}

function botones(n, fecha){ 
    var nro = parseInt(n);
    var ln = cantidad_botones();
    for(var i = 0; i<ln; i++){ 
        (function(j){  
            var boton = name("dia_nro");                       
            if(nro == j) { boton[j].disabled = true; id("range").value = j; }
            if(nro !== j){ boton[j].disabled = false;                       }
            if(boton[j].value == n){
                boton[j].title = fecha;
            }
            if(boton[j].value == ln){
             boton[j].title = fecha;
            }
        })(i); /*closure*/ 
    } //end for
    if(nro == 0){
        id("hoy").disabled        = true;   id("atras").disabled      = true;
        id("range").value = 0;          
        valueBotones(id("hoy"), fecha); 
    }
    if(nro > 0){
        id("hoy").disabled        = false;  id("atras").disabled      = false;
        id("adelante").disabled   = false;  id("fin").disabled        = false;     
    }
    if(nro == ln){
       id("range").value          = ln;     name("dia_nro")[ln].disabled = true;              
       id("adelante").disabled    = true;   id("fin").disabled         = true;        
       valueBotones(id("fin"), fecha);    
    }
    if(nro !== ln){
       name("dia_nro")[ln].disabled = false;    
       id("adelante").disabled    = false;  id("fin").disabled         = false;        
    }          
}

//FECHA //goo.gl/3kawF //http://goo.gl/k4eu1 /////////////////////////////

function getDiaStr(arg){
    var dias  = ["Domingo", "Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    return dias[arg];
}

function getMesStr(arg){
    var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return meses[arg];
}

function fecha(num) {
    var hoy  = new Date();
    var fech = hoy.getDate(); 
    var diaN = hoy.getDay();      var diaS  = getDiaStr(diaN); 
    var mesN = hoy.getMonth();    var mesS  = getMesStr(mesN);
    var anio = hoy.getFullYear(); 
    if( mesN < 10){ var mesNN = mesN+1; var mesNN = "0" + mesNN; }
    if( mesN >=10){ var mesNN = hoy.getMonth()+1; } //empieza a contar de cero
    
    //si contador es cero
    if( num == 0 ){  
        var fechaStr   = diaS + " " + fech + " de " + mesS + " de " + anio;
        var fechaNro   = fech + '/' + mesNN + '/' + anio;
        var fechaShort = mesS.slice(0,3) + "-" + fech;
        var fechaOut   = num + " | <b>" + fechaShort + "</b> | " + fechaNro + " | <b>" + fechaStr + "</b>";
        
        w("out",fechaOut);
        document.getElementById("preout").innerHTML = fechaOut;
        botones(0, fechaShort);       
    }
    //sino...
    if( num > 0 ){
        var anio = hoy.getFullYear();
        for (var i=0; i<num; i++){
            hoy.setTime(hoy.getTime()+24*60*60*1000); // añadimos 1 día
            fech  = hoy.getDate(); 
            diaN  = hoy.getDay();
            diaS  = getDiaStr(diaN); 
            mes   = hoy.getMonth()+1;
            mesN  = hoy.getMonth();
            mesS  = getMesStr(mesN);
        }
        if (mes<10){ 
            mes = mesNN;
        }
    
        var fechaNro   = fech + '/' + mes + '/' + anio;
        var fechaStr   = diaS + " " + fech + " de " + mesS + " de " + anio;
        var fechaShort = mesS.slice(0,3) + "-" + fech;
        var fechaOut   = num + " | <b>" + fechaShort + "</b> | " + fechaNro + " | <b>" + fechaStr + "</b>";
        
        w("out",fechaOut); 
        document.getElementById("preout").innerHTML = fechaOut;

        botones(num, fechaShort);    
    } 
}

//ACCIONES //////////////////////////////////////////////////////

window.onload = function(){
    
    noselect(document.getElementsByTagName("input"));
    noselect(document.getElementById("inp"));
    noselect(document.getElementById("preout"));
    //noselect(document.body);
    
    var contador = 0; 
    for(var i = 0; i<=cantidad_botones(); i++){
        contador = i;
        fecha(contador);
    }
    document.getElementById("out").innerHTML = "";    
    contador = 0;
    fecha(contador);
    
    id("hoy").onclick      = function(){                       contador = 0;   fecha(contador);   }
    id("fin").onclick      = function(){    contador = cantidad_botones();     fecha(contador);   }
    id("atras").onclick    = function(){ if(contador>=1){      contador--;     fecha(contador); } }
    id("adelante").onclick = function(){ if(contador<7) {      contador++;     fecha(contador); } }     
    id("range").onchange   = function(){ var val = this.value; contador = val; fecha(contador);   }    
        
    for(var i = 0; i<name("dia_nro").length; i++){
        (function(j){ 
            name("dia_nro")[j].onclick  = function(){          contador = j;   fecha(contador);   }    
        })(i); /*autoeject, nuevo scope x c/ iteracion*/ 
    } // end for  
         
    id("limpiar").onclick  = function(){ document.getElementById("out").innerHTML = "";    } 
   
}