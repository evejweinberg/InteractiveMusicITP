var r = new Rune({
    container: "#canvas",
    width: $(window).width(),
    height: $(window).height(),
    debug: true
});

var grid = r.grid({
  x: 50,
  y: 50,
  width: 600,
  moduleHeight: 200,
  gutter: 60,
  columns: 3,
  rows: 3
});

//////◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆//////



r.draw();


var meter = new Tone.Meter();
var mic = new Tone.Microphone().start();
//connect mic to the meter
mic.connect(meter);
//use getLevel or getDb 
//to access meter level
meter.getLevel();
console.log(meter.getLevel())