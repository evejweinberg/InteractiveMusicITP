
var spriteLibrary = [];
var sprites = [];
var sprite1Total = 20;
var stagedChainNums = [];
function preload(){
  
  for (var i=0; i < sprite1Total; i++){
    var sprite;
    if(i<10){
      sprite = "assets/hf_0" + i + ".png";
    }
    else {
      sprite = "assets/hf_" + i + ".png";
    }
    spriteLibrary.push(loadImage(sprite));
  }
}

function setup(){
	 createCanvas(1280, 720);
sprites.push(new Jitter());
}

function draw(){
	background(255, 0, 0);

  for (var i = 0; i < sprites.length; i++) {
    sprites[i].display();
  }

}

var snareUrl = "https://tonejs.github.io/Tone.js/examples/audio/505/snare.mp3";
var snare = new Tone.Player(snareUrl).toMaster();
var faster = 0
var Gotfaster =0.5
//what is retrigger?
snare.retrigger = true;
var synth = new Tone.FMSynth().toMaster();



//my scale, plus I want to add the snare
var val1 = "C2";
var val2 = "G2";
var val3 = "E2";
var val4 = "C3";
var val5 = "E3";
var val6 = "B3";
var val7 = "C4";
var val8 = "E4";
var val9 = "D2";


var obj = {};

obj[val3] = [val2, val4];
obj[val1] = [val5, val2];
obj[val2] = val4;
obj[val4] = [val1, val3]; 
obj[val5] = val4;

var chain = new Tone.CtrlMarkov(obj);



//if I run with some notes it's fine but others I throws
chain.value = "C2";

//play 70 notes
for (var i=0;i<70;i++){
//clamp this value
if (faster <.26){
var Gotfaster = 0.5-faster
} else{
Gotfaster=0.20
}
//schedule them all, note, time, velocity
synth.triggerAttackRelease(chain.value,0.2,i*(Gotfaster));
//get the next state in the Markov chain
chain.next();
stagedChainNums.push(chain.next());
faster = faster+.0045


}



function Jitter() {
  this.startingFrame = floor(random(sprite1Total));

  var x = 0;
  
 

  this.y = 0,0;
 

  this.display = function() {

   
    fill(0, 255, 0)
    // var x = rect(this.x, this.y, 40, 40);
    image(spriteLibrary[floor(this.startingFrame)], 0,0);
    
    // frameSlower = frameNumber *.5;

    // if (frameSlower % 100 == 0){
      this.startingFrame = this.startingFrame + 1;
    // }
    if(this.startingFrame == sprite1Total){
      this.startingFrame = 0;
    }
  }


}