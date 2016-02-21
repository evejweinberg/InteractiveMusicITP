var options = ["C2", "E2", "G2", "C3", "E3", "C2", "E2", "G2", "C3", "E3"]
    //Takes two arguments -- (array of values, "type" The name of the pattern)
var controller = new Tone.CtrlPattern(options, "down");
// Tone.CtrlPattern.Type.Up
var synth = new Tone.FMSynth().toMaster();
// synth.connect(controller);
// controller.connect(synth)
// synth.chain(controller, Tone.Master);

for (var i = 0; i < 70; i++) {
    synth.triggerAttackRelease(controller)
    controller.next();
}




var date = new Date();
      $(document.body).append(date.getHours());
      var s = "Thisisalistof15"
      console.log(s.length);
      console.log(s.charAt(s.length - 1)) //15 charachters but the first place is called 0, so nothing is in the 15th place, bc the last place is the 14th place but there are 15 total places
