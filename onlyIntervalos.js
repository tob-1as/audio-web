const intervalos = ['unísono','b2','2','b3','3','4','4+','5','b6','6','b7','7','8']
const factor = [1, 256/243, 9/8, 32/27, 81/64, 4/3, 729/512, 3/2, 128/81, 27/16, 16/9, 243/128, 2];

var play_intervalo = document.getElementById('play_intervalo');
var form_inter = document.getElementById('form_inter')
var submit_inter = document.getElementById('submit_inter');
var contadorIntervaloDoc = document.getElementById('puntos_Intervalo');
var highScoreIntervaloDoc = document.getElementById('highScore_Intervalo');
var mensaje_inter = document.getElementById('mensaje_inter');

var contadorIntervalo = 0;
var highScoreIntervalo = 0;

var cantidadDeSemitonos =  Math.floor(Math.random()*intervalos.length);
var nota = Math.random() * 600 + 200;
var intervalo = intervalos[cantidadDeSemitonos];
    
play_intervalo.addEventListener('click', ()=>{
  
  form_inter.style.visibility = "visible";
  submit_inter.style.visibility = "visible";
  
  tocarIntervalo(nota, cantidadDeSemitonos, 1);
})

submit_inter.addEventListener('click', ()=>{                    ///////////////////////GANAROPERDER
  var res = form_inter.sel_inter.value;
  if (res != 'Selecciona'){
    
    if(res == intervalo){            //nice
      exito();
      mensaje_inter.className = 'exito';
      mensaje_inter.innerHTML = `nice`;
      contadorIntervalo++;
      resetIntervalo();
      
    }else{                           //fuck
      fracaso();
      mensaje_inter.className = 'fracaso';
      mensaje_inter.innerHTML = `Pucha, era ${intervalo}.`;
      contadorIntervalo = 0;
      resetIntervalo();
    }
  }
})

function resetIntervalo(){
  form_inter.style.visibility = "hidden";
  submit_inter.style.visibility = "hidden";
  
  if(contadorIntervalo > highScoreIntervalo) highScoreIntervalo = contadorIntervalo;
  contadorIntervaloDoc.innerHTML = `Puntos: ${contadorIntervalo}`;
  highScoreIntervaloDoc.innerHTML = `Puntaje más alto: ${highScoreIntervalo}`
  
  cantidadDeSemitonos = Math.floor(Math.random()*intervalos.length);
  intervalo = intervalos[ cantidadDeSemitonos ];
  nota = Math.random() * 400 + 150;
  
  document.getElementById('form_inter').reset();
  
}

function tocarIntervalo(fundamental, semitonos, duracion) {
  var osc = aCtx.createOscillator();
  osc.connect(ganancia);
  
  osc.type = "triangle";
  osc.frequency.setValueAtTime(fundamental, aCtx.currentTime);
  osc.frequency.setValueAtTime(fundamental * factor[semitonos], aCtx.currentTime+(duracion/2));
  
  osc.start()
  
  setTimeout(()=>{
    osc.stop();
  }, duracion*1000);
}

/*
 Así que nunca más pasearemos
tan tarde de noche,
aunque el corazón siga enamorado,
y aunque siga brillando la luna
*/
