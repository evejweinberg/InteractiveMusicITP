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



var SpringTime = function(notes) {
    this._speed = .4;
    this._release = 12;
    this._notes = notes
    this._harp = new Tone.PolySynth(4, Tone.SimpleSynth).toMaster();
    this._harp.set({
            "harmonicity": 9,
            "carrier": {
                "oscillator": {
                    "type": "sine"
                },
                "envelope": {
                    "attack": 0.03,
                    "decay": 0.3,
                    "sustain": 0.7,
                    "release": this._release
                }
            },
            "modulator": {
                "oscillator": {
                    "type": "sine"
                },
                "envelope": {
                    "attack": 0.04,
                    "decay": 0.1,
                    "sustain": 0.04,
                    "release": this._release
                }
            }

        }

    );
    // this._harp.triggerAttackRelease(notes, "4n", 0);
    // harp.triggerAttackRelease(["C3", "E3", "A3"], "4n", 1);

}


SpringTime.prototype.start = function(when) {

    var speed = this._speed;
    // this._speed = speed || 
    this._harp.triggerAttackRelease(this._notes[0], "4n", when);
    this._harp.triggerAttackRelease(this._notes[1], "4n", when + this._speed);
    this._harp.triggerAttackRelease(this._notes[2], "4n", when + this._speed*2);

};

SpringTime.prototype.slowness = function() {
    this._speed = 2;
    this._release = 12;

}
