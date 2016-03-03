////////////////////////////API descriptiON//////////////////////////////////////////////////////////

//     //   ) ) / /        // | |     /|    / / /__  ___/             / / // | |     /|    //| | 
//    //___/ / / /        //__| |    //|   / /    / /                / / //__| |    //|   // | | 
//   / ____ / / /        / ___  |   // |  / /    / /                / / / ___  |   // |  //  | | 
//  //       / /        //    | |  //  | / /    / /                / / //    | |  //  | //   | | 
// //       / /____/ / //     | | //   |/ /    / /           ((___/ / //     | | //   |//    | | 
// ////////////////////////////////////////////////////////////////////////////////////////////////
// This class represents flowers opening up in the spring time
// This class depends on Tone.js (r6)
/////////////////////////////////////////////////////////////////////////////////////////////////////


//TO DO: 
// 1) rain volume
// 2) fix bug - where the fuck is it? why wont shit loop --after i hit each button once, it wont loop
// 3) change sawtooth to triangle or sine - can that be an argument?
// 4) change looping duration to actual duration of the thingy
// 5) change setInterval to Tone.Transport + Tone.Loop
// 6) add a filter



var SpringTime = function(index, petalNum, waveform) {
    /**
     *  The amts of notes played per shrub (should be equal to the image). 
     *  @private
     */
    this._petalNum = petalNum


    /**
     *  The length of time between each petal opening.
     *  This affects the delay of each note, and also the duration of each note 
     *  @private
     */

    this._speed = 1;
    this._delay = .6 * this._speed;
    this._duration = .25 * this._speed;
    /**
     *  The octave that the first note will play at.
     *  This affects the pitch
     *  @private
     */
    // this._freq = index;

    //not sure if this does anything yet
    this._release = 3;

    /*  The synths play the notes that are called in the various 'start' methods
     *  @type  {Tone.SimpleSynth}
     *  @private
     */

    //first synth
    this._synth = new Tone.MonoSynth({
        "portamento": 0.00,
        "oscillator": {
            "type": waveform
        },
        "envelope": {
            "attack": 0.005,
            "decay": 0.2,
            "sustain": 1.4,
            "release": 12.4,
        },
        "filterEnvelope": {
            "attack": 0.015,
            "decay": 0.1,
            "sustain": 0.05,
            "release": 20.8,
            "baseFrequency": 300,
            "octaves": 4
        },
        "pitch": {

            "pitch": 2,
            "windowSize": 0.04,
            "delayTime": 0.03,
            "feedback": 2.5

        }
    }).toMaster();

    //2nd instrument that can be called
    this._cactusSynth = new Tone.SimpleSynth({
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
            "release": 1.2
        }
    }).toMaster();

    //third synth
    this._triangleSynth = new Tone.MonoSynth({
        "portamento": 0.00,
        "oscillator": {
            "type": "triangle"
        },
        "envelope": {
            "attack": 0.005,
            "decay": 0.2,
            "sustain": 1.4,
            "release": 12.4,
        },
        "filterEnvelope": {
            "attack": 0.015,
            "decay": 0.1,
            "sustain": 0.05,
            "release": 20.8,
            "baseFrequency": 300,
            "octaves": 4
        },
        "pitch": {

            "pitch": 2,
            "windowSize": 0.04,
            "delayTime": 0.03,
            "feedback": 2.5

        }
    }).toMaster();

    
    /*  The rain options
     *  
     *  @private
     */
    // this._rainAmt = 1;
    this._RainSamples = ["http://evejweinberg.github.io/samples/DJsamples/rain1.wav",
        "http://evejweinberg.github.io/samples/DJsamples/rain2.mp3"
    ];

    /*  The singer's voice
     *  
     *  @private
     */
    this._singerSample = "http://evejweinberg.github.io/samples/DJsamples/singer.wav"






}


/**
 *  Play the motif
 *  @param  {when=}  when  When to start the motif. If no
 *  value is given, it will play immediately.
 *  @return {number} The time at the end of the section                       
 */

SpringTime.prototype.startFlower2 = function(octave, when) {

    var array = [36, 38, 40, 41, 43, 45, 47, 48]; //cdefgab
    this._octave = octave;

    this._index = 0;

    function miditoFreq(number) {
        return Math.pow(2, ((number - 69) / 12.0)) * 440;
    }
    when = when || this._synth.now();
    // var step = 100;
    // var step = Math.pow(2, ((this._freq-69)/12.0))*440;
    for (var i = 0; i < this._petalNum; i++) {
        var number = this._octave * 12 + array[this._index % this._petalNum]
        console.log(number)
        this._freq = miditoFreq(number);
        //next num in the index
        this._index++;
        // play that frequency
        //.triggerAttackRelease (note, duration[, time][, velocity])
        this._cactusSynth.triggerAttackRelease(this._freq, (.25 * this._speed), when + (i * (.6 * this._speed)))
    }

    return this._petalNum * (.25 * this._speed) + when;

}


SpringTime.prototype.startFlower1 = function(octave, when) {
    //c d   e    f  g   a   b
    // var array = [60,62, 64, 65, 67, 69, 71]; //cdefgab
    var array = [36, 38, 40, 41, 43, 45, 47, 48]; //cdefgab
    this._octave = octave;

    this._index = 0;

    function miditoFreq(number) {
        return Math.pow(2, ((number - 69) / 12.0)) * 440;
    }
    when = when || this._synth.now();
    // var step = 100;
    // var step = Math.pow(2, ((this._freq-69)/12.0))*440;
    for (var i = 0; i < this._petalNum; i++) {
        var number = this._octave * 12 + array[this._index % this._petalNum]
        console.log(number)
        this._freq = miditoFreq(number);
        //next num in the index
        this._index++;
        // play that frequency
        //.triggerAttackRelease (note, duration[, time][, velocity])
        this._synth.triggerAttackRelease(this._freq, (.25 * this._speed), when + (i * (.6 * this._speed)))
    }

    return this._petalNum * (.25 * this._speed) + when;



};

SpringTime.prototype.slowness = function(speed) {
    this._speed = speed;
    this._release = 6;

}


SpringTime.prototype.addRain = function(rainAmount, volume) {

    this._rainAmt = rainAmount;
    this._Rainplayer = new Tone.Player({
        "url": this._RainSamples[this._rainAmt],
        loop: true,
        "volume": -Infinity,
        autostart: true
    }).toMaster();
    console.log('rain add was called')
    this._Rainplayer.volume.value = 0 || volume;

}

SpringTime.prototype.removeRain = function() {


    console.log('rain remove was called')
    this._Rainplayer.stop;
    this._Rainplayer.volume.value = -Infinity;

}

SpringTime.prototype.addSinger = function() {


    console.log('added  Singer')
        // this._rainAmt = rainAmount;
    this._singer = new Tone.Player({
        "url": this._singerSample,
        loop: true,
        "volume": -Infinity,
        autostart: true
    }).toMaster();
    this._singer.volume.value = 0;


}

SpringTime.prototype.removeSinger = function() {


    // console.log('rain remove was called')
    this._singer.stop;
    this._singer.volume.value = -Infinity;

}
