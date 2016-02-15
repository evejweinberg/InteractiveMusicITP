// $(document).ready(function() {
console.log('begin')
    ///////////////////////////    
    var changereverb = 0
    var distortionAmt = 0
    var clickNum = 0;



 var players = [];
var myNotesURL = [
                "https://aamontoya89.github.io/samples/01_bassdrum.wav",
        "https://aamontoya89.github.io/samples/02_snare.wav",
        "https://aamontoya89.github.io/samples/03_gtr.wav",
        "https://aamontoya89.github.io/samples/04_metal.wav",
                "https://aamontoya89.github.io/samples/05_noise.wav"
];
for (var i = 0; i < myNotesURL.length; i++ ) {
    players[i] = new Tone.Player(myNotesURL[i]).toMaster();
  console.log("hi "+players[i]);
}






$("#one").on('click', function() {
     $( this ).append("T")
  });

// }).on("mouseup", function() {

//     stopSample(this.id);

// });


function startSample(sample_number) {
    console.log(sample_number)
};


// function stopSample(sample_number) {
//     // playing.triggerRelease("allNotes[randNote[clickNum]]", "4n");
// }








//////leave this at the end///////
// });
