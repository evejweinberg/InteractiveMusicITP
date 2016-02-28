//API description
//@ this class represents flowers opening up in the spring time
// This class depends on Tone.js (r6)

//API
//TO DO: implement these methods:
//create 1 red flower
//add rain (this adds a constant pitter patter)
//this has 4 notes in it that are randomly pulled
//{amount of rain - makes the timing tighter
//}
//1 flower opening
//number of flowers (adds them to the left and right, using panner)
//@types of flowers - there are 3 types
//{
//}
//
//
//    var spring1 = new SpringTime(["C4", "E4", "A4"]);



var SpringTime = function(index, petalNum) {
    /**
     *  The amts of notes played per flower. 
     *  @private
     */
    this._petalNum = petalNum
    this._index = index;

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

    /*  The synth which plays the notes
     *  @type  {Tone.SimpleSynth}
     *  @private
     */

    this._synth = new Tone.MonoSynth({
        "portamento": 0.00,
        "oscillator": {
            "type": "sawtooth"
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
    this._rainAmt = 1;
    this._RainSamples = ["http://evejweinberg.github.io/samples/DJsamples/rain1.wav",
        "http://evejweinberg.github.io/samples/DJsamples/rain2.mp3"
    ];

//     Tone.Buffer.on("load", function(){
//    this._Rainplayer.start()
  
// });




}


/**
 *  Play the motif
 *  @param  {when=}  when  When to start the motif. If no
 *  value is given, it will play immediately.
 *  @return {number} The time at the end of the section                       
 */

SpringTime.prototype.startFlower2 = function(){
    
}


SpringTime.prototype.startFlower1 = function(when) {

    var array = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79]; //cdefgab



    function miditoFreq(number) {
        return Math.pow(2, ((number - 69) / 12.0)) * 440;
    }
    when = when || this._synth.now();
    // var step = 100;
    // var step = Math.pow(2, ((this._freq-69)/12.0))*440;
    for (var i = 0; i < this._petalNum; i++) {
        var number = array[this._index % this._petalNum]
        this._freq = miditoFreq(number);

        this._index++;
        //.triggerAttackRelease (note, duration[, time][, velocity])
        this._synth.triggerAttackRelease(this._freq, (.25 * this._speed), when + (i * (.6 * this._speed)))
    }

    return this._petalNum * (.25 * this._speed) + when;



};

SpringTime.prototype.slowness = function(speed) {
    this._speed = speed;
    this._release = 12;

}


SpringTime.prototype.addRain = function(rainAmount,volume) {
  
    this._rainAmt = rainAmount;
        this._Rainplayer = new Tone.Player({
        "url": this._RainSamples[this._rainAmt],
        loop: true,
        "volume": -Infinity,
        autostart: true
    }).toMaster();
    console.log( 'rain playing')
      this._Rainplayer.volume.value = 0 || volume;

}

SpringTime.prototype.removeRain = function() {
  

    console.log( 'rain STOP playing')
      this._Rainplayer.stop;

}






