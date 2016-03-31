//bind returns a function
//with a bound context
//
// var Star = function(data){
//        this._element.css({
//         "top": data.x,
//         "left": data.y
//     })
// }

var Star = function(x, y, note) {
    console.log('yo')
        //make a new variable, keep a record of it, this lives on and all things bound to it live on.
    this._element = $("<div>").appendTo("body");
    this._element.addClass("Star");

    this._element.css({
        "top": x,
        "left": y
    })

    //bind: hold on to things, outside of this score
    //listen for a click event and take 'this' and do the function _clicked
    //arr[i]
    //Star is not doing the invoking
    this._element.on("click", this._clicked.bind(this));

    this._active = false;
    this._note = note;
    //loop every 1 meansure, bind to that instance of star
    this._loop = new Tone.Loop(this._trigger.bind(this), "1m")

    // this._synth = new Tone.SimpleSynth

    //start it somehwere, maybe not here
    Tone.Transport.start();

};


Star.prototype._synth = new Tone.SimpleSynth().toMaster();


Star.prototype._clicked = function() {
    console.log("was clicked");

    //without bind this is equal to the button
    //it would be the element
    this._active = !this._active

    if (this._active) {
        this._element.addClass("Active")
    } else {
        this._element.removeClass("Active")
    }
}


Star.prototype._trigger = function(when) {
    if (this._active) {
        this._synth.triggerAttackedRelease(this._note, "8n", when);
    }

    this._element.addClass("Flash");
    // setTimeout to remove class
    setTimeout(function() {
        this._element.removeCLass("Flash");
    }.bind(this), 100)

}








//    Star.prototype._clicked = function(self) {
//     console.log("was clicked");

//     self._active = !this._active

//     if (self._active) {
//         self._element.addClass("Active")
//     } else {
//         self._element.removeClass("Active")
//     }
// }
