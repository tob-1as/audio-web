/*
Pues la espada gasta la vaina,
y el alma gasta el pecho,
y el corazón tiene que pararse a tomar aliento,
y el amor mismo ha de descansar.

Aunque la noche fue hecha para amar,
y el día vuelve demasiado pronto,
nunca más pasearemos
a la luz de la luna. (...)"
*/
//~~~~~~~~~~~~~~~~~~~~~~~~PANNING~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

const audios = ["https://cdn.glitch.com/5d6833ad-146e-469f-b2ae-833a562120e0%2Famores_incompletos.mp3?v=1590866118259", 
                "https://cdn.glitch.com/5d6833ad-146e-469f-b2ae-833a562120e0%2Fbroadcast_come_on_lets_go.mp3?v=1590869026269"]
const rangoDeExito = 0.2;
var contador_paneo = 0;
var highScore_paneo = 0;

var play_paneo = document.getElementById('play_Paneo');
var pan_canvas = document.getElementById('pan_canvas');
var puntos_paneoRef = document.getElementById('puntos_Paneo');
var highScore_paneoRef = document.getElementById('highScore_Paneo');
var mensaje_paneo = document.getElementById('mensaje_paneo');


var ctx = pan_canvas.getContext('2d');

var respuesta = -2;
//~~~~~~~~~~~~~~~~~~~Canvas pajero~~~~~~~~~~~~~~~~~~~~~~//
var mouseXrel;
var mouseYrel;

pan_canvas.addEventListener('mousemove', (evt)=>{
  let mousePos = getMouseEnCanvas(pan_canvas, evt);
  mouseXrel = mousePos.x;
  mouseYrel = mousePos.y;
})

setInterval(()=>{
  ctx.fillStyle = "#292929";
  ctx.fillRect(0, 0, pan_canvas.width, pan_canvas.height);
  
  ctx.fillStyle = "#bfedbb";
  ctx.fillRect(mouseXrel-rangoDeExito*101, 0, rangoDeExito*201, pan_canvas.height);
  
  ctx.fillStyle = "#f7a62d";
  ctx.fillRect(pan_canvas.width/2, 0, 2, pan_canvas.height);
  ctx.fillRect(pan_canvas.width/4, 0, 1, pan_canvas.height/3*2);
  ctx.fillRect(pan_canvas.width/4*3, 0, 1, pan_canvas.height/3*2);
  
  
  ctx.fillStyle = "#fff";
  ctx.fillRect(mouseXrel, 0, 1, pan_canvas.height);
  
  ctx.fillStyle = "#f2f2f2";
  ctx.fillRect(respuesta, 0, 2, pan_canvas.height);
  
  let mx = mouseXrel/150 - 1;
  document.getElementById('pan_mouse').innerHTML = Math.round((mx + Number.EPSILON) * 100) / 100;
  
}, 20)
//~~~~~~~~~~~~~~~~~~~END Canvas pajero~~~~~~~~~~~~~~~~~~~~~~//

var randomVal = Math.random()*2.1 - 1;  //


var panner = aCtx.createStereoPanner();
panner.connect(ganancia);
panner.pan.setValueAtTime(randomVal, aCtx.currentTime);

var cancion;
var buffer1;
var randCancion = audios[ Math.floor( Math.random()*audios.length ) ];

function primeraCarga(){
  //Cargar la canción
  fetch(randCancion)
  .then(data=> data.arrayBuffer())
  .then(arrayBuffer=> aCtx.decodeAudioData(arrayBuffer))
  .then(decodedAudio=> {cancion = decodedAudio;});
}


pan_canvas.addEventListener('click', (evt)=>{                ///////////////////////GANAROPERDER
  let mouseX = getMouseEnCanvas(pan_canvas, evt).x/150 - 1;
  mouseX = Math.round((mouseX + Number.EPSILON) * 100) / 100;
  
  if( Math.abs(mouseX-randomVal) < rangoDeExito  ){
    //nice
    ++contador_paneo;
    respuesta = Math.floor((randomVal+1)*150);
    mensaje_paneo.className = 'exito';
    mensaje_paneo.innerHTML = `nice, era ${Math.round((randomVal + Number.EPSILON)* 100) /100 } y tú pusiste ${mouseX}.`;
    exito();
    resetPaneo();
  }else{
    //fuck
    contador_paneo = 0;
    respuesta = Math.floor((randomVal+1)*150);
    puntos_paneoRef.innerHTML = `Puntos: 0`
    mensaje_paneo.className = 'fracaso';
    mensaje_paneo.innerHTML = `puchakais, era ${Math.round((randomVal + Number.EPSILON)* 100) /100 } y tú pusiste ${mouseX}.`;
    fracaso();
    resetPaneo();
  }
})



function play(sonk){
  const playSound = aCtx.createBufferSource();
  playSound.buffer = sonk;
  playSound.connect(panner);
  playSound.start(aCtx.currentTime);
  return playSound;
}

function playHandler(){
  if(play_paneo.getAttribute('data-disponible') == 'true'){
    respuesta = -2;
    if(play_paneo.getAttribute('data-playin')=='true'){
      buffer1.stop();
      play_paneo.dataset.playin = "false";
      play_paneo.innerText = ">Reproducir<";
    
    }else{
      buffer1 = play(cancion);
      play_paneo.dataset.playin = "true";
      play_paneo.innerText = ">Detener<"
    
    } 
  }
}

function resetPaneo(){
  play_paneo.dataset.disponible = "false";
  
  buffer1.stop();
  play_paneo.innerText = ">espera<";
  
  if(contador_paneo > highScore_paneo) highScore_paneo = contador_paneo;
  puntos_paneoRef.innerHTML = `Puntos: ${contador_paneo}`;
  highScore_paneoRef.innerHTML = `Puntaje más alto: ${highScore_paneo}`
  
  var randCancion = audios[ Math.floor( Math.random()*audios.length ) ];
  fetch(randCancion)
  .then(data=> data.arrayBuffer())
  .then(arrayBuffer=> aCtx.decodeAudioData(arrayBuffer))
  .then(decodedAudio=> {
    cancion = decodedAudio;
    randomVal = Math.random()*2.1 - 1;
    panner.pan.setValueAtTime(randomVal, aCtx.currentTime);
    play_paneo.dataset.playin = "false";
    
    play_paneo.dataset.disponible = "true";
    play_paneo.innerText = ">reproducir<";
  });
}

function getMouseEnCanvas(canvas, evt){
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
