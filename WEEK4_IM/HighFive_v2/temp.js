var spriteLibrary = [];
var sprites = [];
var sprite1Total = 21;
var stagedChainNums = [];
var colors = [
    (255, 0, 0),
    (0, 255, 0),
    (0, 0, 255)
];

function preload() {

    for (var i = 0; i < sprite1Total; i++) {
        var sprite;
        if (i < 10) {
            sprite = "assets/hf_0" + i + ".png";
        } else {
            sprite = "assets/hf_" + i + ".png";
        }
        // spriteLibrary.push(loadImage(sprite)); //canvas
        spriteLibrary.push(createImg(sprite)); //dom
        spriteLibrary[i].position(0, 0)
    }
}

function setup() {
    createCanvas(1280, 720);
    // sprites.push(new Jitter());
}

function draw() {
    clear()
        // image(spriteLibrary[0], 0, 0);
        // background(255, 0, 0);

    for (var i = 0; i < sprites.length; i++) {
        sprites[i].display();
    }

}



/////////////TONE JS ////////////
var snareUrl = "https://tonejs.github.io/Tone.js/examples/audio/505/snare.mp3";
var snare = new Tone.Player(snareUrl).toMaster();
var faster = 0
var Gotfaster = 0.5
    //you don't need to wait for the sample to
snare.retrigger = true;
var synth = new Tone.FMSynth().toMaster();



//my scale, plus I want to add the snare
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
obj[val1] = [val3, val2];
obj[val2] = [val1, val3];
obj[val3] = [val2, val4];
obj[val4] = [val5, val3];
obj[val5] = [val4, val6];
obj[val6] = [val5, val7];
obj[val7] = [val8, val8];
obj[val8] = [val7, val9];
obj[val9] = [val8, val7];


var chain = new Tone.CtrlMarkov(obj);

//if I run with some notes it's fine but others I throws
chain.value = "C2";

Tone.Buffer.on("load", function() {


    var now = synth.now();

    //play 70 notes
    for (var i = 0; i < 70; i++) {

        if (faster < .26) {
            var Gotfaster = 0.5 - faster
        } else {
            Gotfaster = 0.20
        }
        if (chain.value === "snare") {
            snare.start(i * Gotfaster + now);
            $('body').css({ "background-color": colors[3] });
            console.log('snare')
        } else {
            //schedule them all, note, time, velocity
            synth.triggerAttackRelease(chain.value, 0.2, i * (Gotfaster) + now);
        }
        //get the next state in the Markov chain
        chain.next();
        stagedChainNums.push(chain.next());
        faster = faster + .0045
        // spriteLibrary[i].position(0, 0)
        // image(spriteLibrary[i], 0, 0);


    }

});



function Jitter() {
    this.startingFrame = floor(random(sprite1Total));
    this.display = function() {

        image(spriteLibrary[floor(this.startingFrame)], 0, 0);


        this.startingFrame = this.startingFrame + 1;

        if (this.startingFrame == sprite1Total) {
            this.startingFrame = 0;
        }
    }


}
