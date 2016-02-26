//envelope = volume vs time
//
//these arguments are telling the synth to have an envelope to the default values
//synth.triggerAttackRelease(a,b,c)
//note, duration, time to trigger(sec marker, or), velocity how hard o hit the key
//synth.envelope.attack = 3;
//synth.envelope.sustain =2;
// 
//OR
//
//
//
//var synth = new Tome.SimpleSynth({
//oscillator:{
//type: "triangle"
//}
//});
//
//
//
//
//
//Tone.Transport.bmp=400;
//
//

//wave to sine not square
//release longer
//sharp attack

var harp = new Tone.PolySynth(4, Tone.SimpleSynth).toMaster();
//number of voices and which synth to use

Tone.Note(route.("Harp", function(time, note, duration) {
    harp.triggerAttackRelease(note, duration, time);
    drawPolygon();
});



Tone.Buffer.on("load", function() {
    player.start();
})


//////Transport/////
{
    "oscillator": {
        "partials": [
            1,
            0,
            2,
            0,
            3
        ]
    },
    "envelope": {
        "attack": 0.001,
        "decay": 1.2,
        "sustain": 0,
        "release": 2.2
    }
}

{
    "frequency": 12,
    "delayTime": 3.5,
    "type": "sine2",
    "depth": 0.8,
    "feedback": 0.1,
    "spread": 180
}
