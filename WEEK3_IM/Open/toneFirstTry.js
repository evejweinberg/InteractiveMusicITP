var gridDist = 260; //this will get smaller and smaller on each mouse click
var distortionAmt = 0;
var changereverb = 0;
var maskRad = 800;
var randNote = [];
var synths = [];
var rvgr = 0;
var changeDelay = 0;
var timing = ["0:0", "0:1", "0:2", "0:3", "1:0", "1:1", "1:1", "1:2"]
var sampleURLArray = ["http://evejweinberg.github.io/samples/Hola.mp3", "http://evejweinberg.github.io/samples/triangle.m4a",
    "http://evejweinberg.github.io/samples/Meow.wav",
    "http://evejweinberg.github.io/samples/trombone.m4a", "http://evejweinberg.github.io/samples/piano.wav", "http://evejweinberg.github.io/samples/Muww.wav"
]
var player;
var cursor;
var panVar = 0.1;
var decay = 30;


//not using this, using my own sounds instead
var allNotes = [
    "C2", "E1", "G2", "B4", "D3", "A3", "A2"
]




// ([frequency][, delayTime][, depth])







// var dist = new Tone.Distortion(distortionAmt).toMaster(); //distortionAmt to get bigger on click
// var fm = new Tone.SimpleFM().connect(dist);
//this sounds good on bass notes


$(document).ready(function() {


    $("body").on('click', function() {
        //pick a random number
        var randNote = Math.floor((Math.random() * sampleURLArray.length) + 0);
        // console.log("pan is  " + panVar)
        // console.log(pan.pan())
        var chorus = new Tone.Chorus(3, changeDelay, 0.8);
        var pan = new Tone.Panner(panVar);
        var reverbGrow = new Tone.Freeverb(rvgr, 3000);
        player = new Tone.Player(sampleURLArray[randNote]);
        player.chain(chorus, reverbGrow, pan, Tone.Master)
            //when loaded, play that sample
        Tone.Buffer.on("load", function() {
            player.start();
        });
        //clear it all
        $('body').html('')

        //update the parameters
        //my var pan has a method called pan that allows me to schedule a new value
        pan.pan.linearRampToValue(panVar, .10);

        changeSize();
        cursorStuff();
        gridDist = gridDist - 14;
        maskRad = maskRad - decay*1.3;
        changeDelay = changeDelay + 1;
        rvgr = rvgr + .1;
        reverbGrow.wet.value = 1;

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

    // //what does this line do?
    var type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg';
    two = new Two({
        type: Two.Types[type],
        fullscreen: true,
        autostart: true
    }).appendTo(document.body);
    $('body').addClass("dropshadow");

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


    two.bind('update', function() {

        cursor.translation.x += (cursor.target.x - cursor.translation.x) * 0.125;
        cursor.translation.y += (cursor.target.y - cursor.translation.y) * 0.125;
        cursor.outline.translation.copy(cursor.translation);

        for (var k in container.children) {
            var child = container.children[k];
            if (child.name === 'background') {
                continue;
            }

            child.rotation += (child.step / 2);
            // console.log(child.step)
        }

    });




}

function cursorStuff()

{
    cursor = two.makeCircle(two.width / 2, two.height / 2, maskRad);
    cursor.outline = two.makeCircle(two.width / 2, two.height / 2, maskRad);
    cursor.target = new Two.Vector();

    cursor.outline.noFill();
    cursor.outline.stroke = 'rgba(20, 100, 100, 0.1)';
    cursor.outline.linewidth = 40;

    container.mask = cursor;

    //why does this reset everytime. 
    //why can't i reset this to MouseX,mouseY
    cursor.target.set(two.width / 2, two.height / 2);





    cursor.translation.copy(cursor.target);

    center = _.debounce(function() {
        cursor.target.set(e.clientX, e.clientY);
    }, 1000);

    var drag = function(e) {
        // console.log(e.clientX, e.clientY + "mouse")
        if (e.clientX < 100) {
            panVar = 0.1;
        } else if (e.clientX > 600) {
            panVar = 1;
        } else {
            panVar = 0.5;
        }
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

function elastic(progress, x) {
    return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress)
}
