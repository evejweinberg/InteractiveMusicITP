//DESCRIBE WHAT THIS MOTIF IS ALL ABOUT
// This class depends on Tone.js (r6)



var harp = new Tone.PolySynth(4, Tone.SimpleSynth).toMaster();
harp.set({
        "harmonicity": 9,
        "carrier": {
            "oscillator": {
                "type": "sine"
            },
            "envelope": {
                "attack": 0.03,
                "decay": 0.3,
                "sustain": 0.7,
                "release": 4
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
                "release": 2
            }
        }
    


        "frequency": 1,
        "type": "sine",
        "depth": 1,
        "baseFrequency": 200,
        "octaves": 12.6,
        "filter": {
            "type": "lowpass",
            "rolloff": -12,
            "Q": 1
        }
    }

)};


var AnachronisticMotif = function() {
    /*
    @private -- private variables are prefixed with an underscore
     */
    this._melody = [];
    this._melodyLength = 10;
    /*
    //make sound

     */
    this._synth = new Tone.SimpleSynth().toMaster();

    this._generateMelody();
    this._offset = 0;
    this._duration = .5;


};


AnachronisticMotif.prototype._generateMelody = function() {
    for (var i = 0; i < _melodyLength; i++) {
        this._melody[i] = Math.round(Math.random() * 40 + 20);
    }
};

AnachronisticMotif.prototype.reverse = function() {
    this._melody = this._melody.reverse();
};


AnachronisticMotif.prototype.start = function(when) {
    // var now = Tone.context.currentTime;
    when = when || Tone.context.currentTime;

    var noteDuration = 0.5;
    for (var i = 0; i < _melodyLength; i++) {
        var freq = Tone.prototype.midiToFrequency(this._melody[i] + this._offset);
        this._synth.triggerAttackRelease(freq, noteDuration, i * noteDuration + when);

    }

    return when + this._melodyLength * noteDuration;


};


AnachronisticMotif.prototype.modulate = function() {
    this._offset = Math.floor(Math.random() * 10 + 10)
        // offset = 
}


///////////////////////
//////main page////////
///////////////////////
function aSection(when) {
    var motif = new AnachronisticMotif();
    var pause = 1;
    var endTime = motif.start(when);
    endTime = motif.start(endTime + pause);
    motif.reverse();
    motif.modulate();
    return endTime;
}

function bSection(when) {
    var motif = new AnachronisticMotif();
    var pause = 1;
    var endTime = motif.start(when);
    endTime = motif.start(endTime + pause);
    motif.reverse();
    motif.modulate();
    return endTime;
}

aSection();
bSection(aSection);







////////////////////////////////
var Motif = function(notes) {

    /**
     *  The passed in notes as midi
     *  @type  {array}
     *  @private
     */
    this._midiNotes = [];

    for (var i = 0; i < notes.length; i++) {
        this._midiNotes[i] = Tone.prototype.noteToMidi(notes[i]);
    }

    /**
     *  The offset from the given notes. 
     *  Values in semi-tones
     *  @type {number}
     *  @private
     */
    this._transpose = 0;

    /**
     *  The time the note is held out for 
     *  in seconds.
     *  @type {number}
     *  @private
     */
    this._noteLength = 0.6;

    /**
     *  The synth which plays the notes
     *  @type  {Tone.SimpleSynth}
     *  @private
     */
    this._synth = new Tone.SimpleSynth({
        oscillator: {
            type: "sawtooth9"
        }
    }).toMaster();
};

/**
 *  Play the motif
 *  @param  {when=}  when  When to start the motif. If no
 *                         value is given, it will play immediately.
 *  @return {number} The time at the end of the section                       
 */
Motif.prototype.start = function(when) {
    when = when || this._synth.now();
    var duration = this._noteLength * 0.8;
    for (var i = 0; i < this._midiNotes.length; i++) {
        this._synth.triggerAttackRelease(this._midiNotes[i] + this._transpose, duration, this._noteLength * i + when);
    }
    return this._midiNotes.length * this._noteLength + when;
};

/**
 *  Transpose the melody up a fifth or down a fourth
 */
Motif.prototype.dominant = function() {
    this._transpose = Math.random() > 0.5 ? -5 : 7;
};

/**
 *  Transpose the melody back to root position.
 */
Motif.prototype.tonic = function() {
    this._transpose = 0;
};

/**
 *  Make it play twice as fast. 
 */
Motif.prototype.doubleTime = function() {
    this._noteLength /= 2;
};

/**
 *  Make the motif play half as slow
 */
Motif.prototype.halfTime = function() {
    this._noteLength *= 2;
};

/**
 *  reverse the order of the notes.
 */
Motif.prototype.reverse = function() {
    this._midiNotes = this._midiNotes.reverse();
};
