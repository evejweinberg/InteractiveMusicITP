




//inhereit everything from star class


var WarpStar = function(){

}

// var delay = new Tone.Feedbac

WarpStar.prototype._synth = new Tone.AMSynth().toMaster();




function funky(what){
	console.log(what)
	console.log(this)
}

var g = funky("hi");
window.funky("ho")


// var freaky = funky.bind(window, "hey");
