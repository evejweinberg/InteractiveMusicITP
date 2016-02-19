var AllHFFrames = [];
var sprites = [];
var sprite1Total = 21;
var stagedChainNums = [];
var colors = [
    (255, 0, 0), 
    (0, 255, 0), 
    (0, 0, 255)
    // ('hsv', 343, 35, 89), //pink 0
    // ('hsv', 15, 77, 82), //red  1
    // ('hsv', 209, 55, 85), //blue  2 
    // ('hsv', 250, 51, 67), // purple  3
    // ('hsv', 47, 59, 94), //yellow  4
    // ('hsv', 190, 21, 97), //lght blue  5
    // ('hsv', 0, 0, 23) //black   6
];

function preload() {
    for (var i = 0; i < sprite1Total; i++) {
        var sprite;
        if (i < 10) {
            sprite = "assets/hf_0" + i + ".png";
        } else {
            sprite = "assets/hf_" + i + ".png";
        }
        AllHFFrames.push(createImg(sprite));
      
    }
}

function setup() {
    createCanvas(1280, 720);

      
    // sprites = new Jitter();
}

function draw() {
    // AllHFFrames[3].position(0,0);
// for (var i = 0; i < sprites.length; i++) {
//         sprites[i].display();
//     }
}



/////////////TONE JS ////////////
var snareUrl = "https://tonejs.github.io/Tone.js/examples/audio/505/snare.mp3";
var snare = new Tone.Player(snareUrl).toMaster();
var faster = 0
var Gotfaster = 0.5

//you don't need to wait for the sample to
snare.retrigger = true;
var synth = new Tone.FMSynth().toMaster();




//make sure the sound "snare" has loaded, so wrap it all
/*Tone.Buffer.on("load", function() {

    var now = synth.now();
    var bgRandom = 3;
    for (var i = 0; i < 70; i++) {
        Tone.Transport.start();
        Tone.Transport.scheduleRepeat(function(time) {

            console.log(i)

            if (faster < .26) {
                var Gotfaster = 0.5 - faster
            } else {
                Gotfaster = 0.20
            }
            if (chain.value === "snare") {
                //push something to an array
                $('body').css({ "background-color": colors[bgRandom] });
                snare.start(i * Gotfaster + now);
            } else {

                synth.triggerAttackRelease(chain.value, 0.2, time + now);
            }

            chain.next();
            console.log(chain.next())

            faster = faster + .0045

            // dont just draw the next image, but draw the corresponsing frame number to the chain's value
            // sprites[i % sprites.length].display();
            // sprites[chain.value[1]].display();

        }, 1 + i * Gotfaster, now);
    }


});
*/

//my scale, plus I want to add the snare
// var val0 = ["A2",0];
// var val1 = ["C2", 1];
// var val2 = ["G2", 2];
// var val3 = ["E2", 3];
// var val4 = ["C3", 4];
// var val5 = ["A3", 5];
// var val6 = ["B3", 6];
// var val7 = ["C4", 7];
// var val8 = ["E4", 8];
// var val9 = ["snare", 9];
// var val10 = ["note", 2];

// var obj = {};
// obj[val0[0]] = val1[0];
// console.log(val1[0])
// obj[val1[0]] = [val3[0], val2[0]];
// obj[val2[0]] = [val1[0], val3[0]];
// obj[val3[0]] = [val2[0], val4[0]];
// obj[val4[0]] = [val5[0], val3[0]];
// obj[val5[0]] = [val4[0], val6[0]];
// obj[val6[0]] = [val5[0], val7[0]];
// obj[val7[0]] = [val6[0], val5[0]];
// obj[val8] = [val7[0], val9[0]];
// obj[val9] = [val8[0], val7[0]];
var val1 = "C2";
var val2 = "G2";
var val3 = "E2";
var val4 = "C3";
var val5 = "A3";
var val6 = "B3";
var val7 = "C4";
var val8 = "E4";
var val9 = "snare";

var obj = {};
obj[val1] = [val2,val3];
obj[val2] = [val1, val3];
obj[val3] = [val2, val4];
obj[val4] = [val5, val3];
obj[val5] = [val4, val6];
obj[val6] = [val5, val7];
obj[val7] = [val8, val8];
obj[val8] = [val7, val9];
obj[val9] = [val8, val7];

var chain = new Tone.CtrlMarkov(obj);
chain.value = "C2";




Tone.Buffer.on("load", function() {

    var now = synth.now();

    //play 70 notes
    for (var i = 0; i < 70; i++) {
        //clamp this value
        if (faster < .26) {
            var Gotfaster = 0.5 - faster
        } else {
            Gotfaster = 0.20
        }
        if (chain.value === "snare") {
            snare.start(i * Gotfaster+now);
        } else {
            //schedule them all, note, time, velocity
            synth.triggerAttackRelease(chain.value, 0.2, i * (Gotfaster)+now);
        }
        //get the next state in the Markov chain
        chain.next();
        console.log(chain.next())
        stagedChainNums.push(chain.next());
       
}

});



// function Jitter() {
//     this.startingFrame = floor(random(sprite1Total));
//     this.display = function() {
//         image(spriteLibrary[floor(this.startingFrame)], 0, 0);
//         this.startingFrame = this.startingFrame + 1;

//         if (this.startingFrame == sprite1Total) {
//             this.startingFrame = 0;
//         }
//     }


// }
