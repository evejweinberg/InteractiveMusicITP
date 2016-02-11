


/*/
audio parameteroscillators frequency
volume of some node

osccilator type is a property
MUST connec tto a connect to  the Master Output.
osc.toMaster();
osc.frequency.value  bc it's at audio rate
44,000 times per second
this means your can schedule things to the beat.

TOne.Player -- loads a buffer, like an mp3 or wav file.
time in web ausio is in seconds and you can use decimals

signal rate parameters - get updated at audio rate

TIME:
4n = quarter note
you define the length of the measure and the tempo.
a bar is composed of beats
a bar is a measure
tempo 120
meter 4/4 by default
default BMP is 120
sythensizer simulates the attach decay.

synth.triggerAttachRelease(440,2);

Master is your speakers.

a synth is composed on an oscilattro and an envelope.
sustain value is not a time, it's the level at the moment that the sustian kicks in.


/*/




/*/

var numbo = "hyhyprpot"
numbo.chatAt(4);

var arrayOfThousand = new Array(1000);
arrayOfThousand.push(another);
//arrayOfThousand.length

arrayOfThousand.shift();
//take something off the front
//pop takes something off the back




//object literals are between curly braces, map a key to a value
var obj = {
    "key": 2000,
    "2ndthingy": 100
}

console.log(obj.key)
console.log(obj["key"]);
console.log(obj[0]);

//functions
var funcky = function(parameter){
   console.log('hi')
};

var something = funcky;

something();


function scopes(){
    var you = "you";
    (function(){
        var me = "me";
        console.log("i can see " + you);
    })();
    console.log(you + "can't see " + me);
}



*/



