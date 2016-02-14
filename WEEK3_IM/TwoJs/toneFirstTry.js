var gridDist = 30; //this will get smaller and smaller on each mouse click
var distortionAmt = 0;
var changereverb = 0;
var maskRad = 800;
var randNote = [];
var synths = [];
var rvgr = 0;
var timing = ["0:0", "0:1", "0:2", "0:3", "1:0", "1:1", "1:1", "1:2"]
var sampleURLArray = ["http://evejweinberg.github.io/samples/Hola.mp3",
    "http://evejweinberg.github.io/samples/Meow.wav",
    "http://evejweinberg.github.io/samples/Buzz.m4a"
]
var player;




// what is a chorus? what are these three parameters?
var chorus = new Tone.Chorus(4, 2.5, 0.5);
// how does connect work? what should i be chaining together and in what order?
//create one of Tone's built-in synthesizers and connect it to the master output
var synth = new Tone.SimpleSynth().toMaster().connect(chorus);
var reverb = new Tone.JCReverb(changereverb).connect(Tone.Master);


var dist = new Tone.Distortion(distortionAmt).toMaster(); //distortionAmt to get bigger on click
var fm = new Tone.SimpleFM().connect(dist);
//this sounds good on bass notes
// fm.triggerAttackRelease("A1", "8n");



//should I call this once first so the shapes show up?
// changeSize ();

//p5 draw loop
$(document).ready(function() {

    $("body").on('click', function() {
        //pick a random number
        var randNote = Math.floor((Math.random() * sampleURLArray.length) + 0);
        console.log(randNote)
        // make a player with that smaple
        player = new Tone.Player(sampleURLArray[randNote]).toMaster();
        //when loaded, play that sample
        Tone.Buffer.on("load", function() {
            player.start();
        });
      
        $('body').html('')
        rvgr = rvgr+.1;
        changeSize();
        gridDist = gridDist + 12;
        maskRad = maskRad - 20;
        changereverb = changereverb + .5;
            var reverbGrow = new Tone.Freeverb(rvgr,3000).toMaster();
reverbGrow.wet.value = 1;
player.connect(reverbGrow);

    })



});





var two;
var container;
var center;

function changeSize() {
    // var background = null;
    // console.log("gridDist is now: ", gridDist, "reverb is: ", changereverb)
    var colors = [
        'rgb(178,138,61)',
        'rgb(255,91,76)',
        'rgb(255,144,160)',
        'rgb(255, 255,255)',
        'rgb(100,100,100)'
    ];

    //what does this line do?
    var type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg';
    two = new Two({
        type: Two.Types[type],
        fullscreen: true,
        autostart: true
    }).appendTo(document.body);

    background = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height);
    background.noStroke();
    background.fill = 'rgb(248,187,209)';
    background.name = 'background';

    container = two.makeGroup(background);

    var rows = Math.floor(two.height / gridDist);
    var cols = Math.floor(two.width / gridDist);
    var width = Math.round(two.height / Math.max(rows, cols));

    for (var i = 0; i < rows; i++) {

        var even = !!(i % 2);
        var vi = i / (rows - 1);

        for (var j = 0; j < cols; j++) {

            var k = j;

            if (even) {
                k += 0.5;
                if (j >= cols - 1) {
                    continue;
                }
            }

            var hi = k / (cols - 1);
            //true boolean representation
            //converts from 0 to false
            // ? squiggle otherwise nonagon
            var type = !!(j % 2) ? 'Squiggle' : 'Nonagon';
            var scopeheight = !!(j % 2) ? width / 3 : width;
            //similar to two.make
            var shape = two['make' + type](width, scopeheight, Math.floor(Math.random() * 3) + 3);
            var color = colors[Math.floor(Math.random() * colors.length)];

            shape.rotation = Math.floor(Math.random() * 4) * Math.PI / 2 + Math.PI / 4;
            shape.translation.set(hi * two.width, vi * two.height);

            if (j % 2) {
                shape.noFill();
                shape.stroke = color;
                shape.linewidth = 4;
                shape.cap = 'round';
            } else {
                shape.noStroke();
                shape.fill = color;
            }

            shape.step = .01;
            // shape.step *= Math.random() > 0.5 ? -1 : 1;

            container.add(shape);

        }

    }





    var cursor = two.makeCircle(0, 0, maskRad);
    cursor.outline = two.makeCircle(0, 0, maskRad);
    cursor.target = new Two.Vector();

    cursor.outline.noFill();
    cursor.outline.stroke = 'rgba(20, 100, 100, 0.1)';
    cursor.outline.linewidth = 40;

    container.mask = cursor;
    //call once!
    cursor.target.set(two.width / 2, two.height / 2);


    cursor.translation.copy(cursor.target);

    center = _.debounce(function() {
        cursor.target.set(two.width / 2, two.height / 2);
    }, 1000);

    var drag = function(e) {
        cursor.target.set(e.clientX, e.clientY);
        // center();
    };

    var touchDrag = function(e) {
        e.preventDefault();
        var touch = e.originalEvent.changedTouches[0];
        drag({
            clientX: touch.pageX,
            clientY: touch.pageY
        });
        return false;
    };

    $(window)
        .bind('mousemove', drag)
        .bind('touchmove', touchDrag);

    two.bind('update', function() {

        cursor.translation.x += (cursor.target.x - cursor.translation.x) * 0.125;
        cursor.translation.y += (cursor.target.y - cursor.translation.y) * 0.125;
        cursor.outline.translation.copy(cursor.translation);

        for (var k in container.children) {
            var child = container.children[k];
            if (child.name === 'background') {
                continue;
            }

            child.rotation += child.step;
            // console.log(child.step)
        }

    });




}





Two.prototype.makeSquiggle = function(width, height, phi) {

    var amt = 64;

    var squiggle = this.makeCurve(
        _.map(_.range(amt), function(i) {
            var pct = i / (amt - 1);
            var theta = pct * Math.PI * 2 * phi + Math.PI / 2;
            var x = width * pct - width / 2;
            var y = height / 5 * Math.sin(theta);
            return new Two.Anchor(x, y);
        }),
        true
    );

    return squiggle;

};

Two.prototype.makeNonagon = function(width, height, sides) {

    width /= 2;
    height /= 2;

    var shape = this.makePath(
        _.map(_.range(sides), function(i) {
            var pct = i / sides;
            var theta = Math.PI * 2 * pct - Math.PI / 2;
            var x = width * Math.cos(theta);
            var y = height * Math.sin(theta);
            return new Two.Anchor(x, y);
        })
    );

    return shape;

};
