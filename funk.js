var aCtx = new (window.AudioContext || window.webkitAudioContext)();
var ganancia = aCtx.createGain();
ganancia.gain.value= 0.1;
ganancia.connect(aCtx.destination);

//~~~~~~~~~~~~~~~~~~~~~~~~FUNCIONES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function exito(){
  var osc = aCtx.createOscillator();
  osc.connect(ganancia);
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(440, aCtx.currentTime);
  osc.frequency.setValueAtTime(440 * (3/2), aCtx.currentTime+0.15);
  
  osc.start()
  
  setTimeout(()=>{
    osc.stop();
  }, 333);
}
function fracaso(){
  var osc = aCtx.createOscillator();
  osc.connect(ganancia);
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(440, aCtx.currentTime);
  osc.frequency.setValueAtTime(440 * (1/(3/2)), aCtx.currentTime+0.15);
  
  osc.start()
  
  setTimeout(()=>{
    osc.stop();
  }, 333);
}

function crearNodo(tag, parent, clase, id){
  var nuevo = document.createElement(tag);
  nuevo.className = clase;
  nuevo.id = id;
  document.getElementById(parent).appendChild(nuevo);
  return nuevo;
}

function disclaimer(){
  alert(`
\n
En fase de pruebas, así que está lleno de bugs el sitio, si, si sé
\n
Si encuentras un error, un número satisfactorio de recargas(F5) va a funcionar
`)
}
