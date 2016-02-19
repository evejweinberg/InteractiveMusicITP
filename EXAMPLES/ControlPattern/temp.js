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
