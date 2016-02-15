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
// var timing = ["0:0", "0:1", "0:2", "0:3", "1:0", "1:1", "1:1", "1:2"]

// 
var dist = new Tone.Distortion(distortionAmt).toMaster(); //distortionAmt to get bigger on click
var fm = new Tone.SimpleFM().connect(dist);
//this sounds good on bass notes
// fm.triggerAttackRelease("A1", "8n");

var players = [];
var osc = new Tone.Oscillator().toMaster().start(0);
var myNotesURL = [
    "https://aamontoya89.github.io/samples/01_bassdrum.wav",
    "https://aamontoya89.github.io/samples/02_snare.wav",
    "https://aamontoya89.github.io/samples/03_gtr.wav",
    "https://aamontoya89.github.io/samples/04_metal.wav",
    "https://aamontoya89.github.io/samples/05_noise.wav"

]

for (var i = 0; i < myNotesURL.length; i++) {
    players[i] = new Tone.Player(myNotesURL[i]).connect(Tone.Master);
    console.log(players[i])
   
}


$(document).ready(function() {
    ///////////everything below so we know its ready


    var allNotes = [
        "C2", "E1", "G2", "B4", "D3", "A3", "A2"
    ]

    //can I access the buttons? Yes!
    $("button").css("border", "9px solid blue");




    $("body").on('click', function() {
        console.log('click')

        osc.frequency.setValueAtTime("C4", 0);
        osc.frequency.exponentialRampToValueAtTime("C1", 2);

        osc.stop(3);


        //push a new number to the array, random number in the scope
        randNote = Math.floor((Math.random() * allNotes.length) + 0);
        // console.log(randNote)

        var randNoteB = Math.floor((Math.random() * allNotes.length) + 0);
        $('#rand').text(allNotes[randNoteB]);


        //display what note the most recent one is
        $('#rand').text(allNotes[randNote[clickNum]]);

        synth2.triggerAttackRelease(allNotes[randNoteB], "4n");
        clickNum++;
    })

$("button").on("mouseDown")



    //////leave this at the end///////
});
