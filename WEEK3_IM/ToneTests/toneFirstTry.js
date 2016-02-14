var changereverb = 0
var distortionAmt = 0
var clickNum = 0;
// what is a chorus? what are these three parameters?
var chorus = new Tone.Chorus(4, 2.5, 0.5);
// how does connect work? what should i be chaining together and in what order?
//create one of Tone's built-in synthesizers and connect it to the master output
var synth1 = new Tone.SimpleSynth().toMaster().connect(chorus);

var synth2 = new Tone.SimpleSynth().toMaster();
var reverb = new Tone.JCReverb(changereverb).connect(Tone.Master);
var randNote = [];
var synths = [];
var timing = ["0:0", "0:1", "0:2", "0:3", "1:0", "1:1", "1:1", "1:2"]


var dist = new Tone.Distortion(distortionAmt).toMaster(); //distortionAmt to get bigger on click
var fm = new Tone.SimpleFM().connect(dist);
//this sounds good on bass notes
// fm.triggerAttackRelease("A1", "8n");


var osc = new Tone.Oscillator().toMaster().start(0);



$(document).ready(function() {
    ///////////everything below so we know its ready

    var sampleURLArray = ["http://itpblog.evejweinberg.com/Homework/samples/Hola.mp3",
        "http://tonejs.github.io/Tone.js/examples/audio/FWDL.mp3"
    ]

    var allNotes = [
        "C2", "E1", "G2", "B4", "D3", "A3", "A2"
    ]
    var sampleURL = "http://itpblog.evejweinberg.com/Hola.wav";
    var sampleYT = "http://tonejs.github.io/Tone.js/examples/audio/FWDL.mp3"

    var player1 = new Tone.Player(sampleYT).toMaster();
    var player2 = new Tone.Player(sampleURLArray[0]).toMaster();


    //trigger the start of the sample once its loaded
    // Tone.Buffer.on("load", function(){
    //     player1.start();
    // });


    $("body").on('click', function() {

        osc.frequency.setValueAtTime("C4", 0);
osc.frequency.exponentialRampToValueAtTime("C1", 2);

osc.stop(3);


        //push a new number to the array, random number in the scope
        randNote[clickNum] = Math.floor((Math.random() * allNotes.length) + 0);
        console.log(randNote)

        var randNoteB = Math.floor((Math.random() * allNotes.length) + 0);


        //display what note the most recent one is
        $('#rand').text(allNotes[randNote[clickNum]]);

        for (var i = 0; i < clickNum; i++) {
            console.log(timing[i])
            // synth2.triggerAttackRelease(allNotes[randNote[clickNum]], "4n");

            synth2.triggerAttackRelease("allNotes[randNote[clickNum]]", "4n");


        }
        // synth2.triggerAttackRelease(allNotes[randNoteB], "4n");


        distortionAmt = distortionAmt + .2
            // console.log('clck')
            // call the twoJS function
            //delete it first
            // $('body').html('')

        changereverb = changereverb + .5;
        clickNum++;



    })





    //////leave this at the end///////
});
