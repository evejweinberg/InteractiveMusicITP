var sentence, words;
sentence = "Tiffany never quite knew why Miranda was so cheerful in the mornings. Why was there such a 'pep in her step'? What was she hiding?";
words = sentence.split(" ");
var wordIndex = 0;
newsentence = "";
var evenOdd = 2;
var myWindow;








var spriteLibrary = [];
var sprites = [];
var sprite1Total = 21;
var stagedChainNums = [];
var colors = [
    "rgb(200, 0, 0)", "rgb(0, 255, 0)", "rgb(0, 0, 255)"
];
var indexNum = 0;
var imagesScootY = 200;
var bgURLS = ["url(http://evejweinberg.github.io/samples/ArrowDownwardPurpleGreen.gif)", "url(http://evejweinberg.github.io/samples/txt_blgrid.jpg)", "url(http://evejweinberg.github.io/samples/txt_pnkscrb.jpg)", "url(http://evejweinberg.github.io/samples/ArrowDownwardPink.gif)"]


var currentImage;
var prevImage;

/////p5 for images/////////////////////

function setup() {
    $("#bringback").hide();
    for (var i = 0; i < sprite1Total; i++) {
        var sprite;
        if (i < 10) {
            sprite = "http://evejweinberg.github.io/assets/hf_0" + i + ".png";
        } else {
            sprite = "http://evejweinberg.github.io/assets/hf_" + i + ".png";
        }
        // spriteLibrary.push(loadImage(sprite)); //canvas
        spriteLibrary.push(createImg(sprite)); //dom
        //add a class here? or push into a div and change the image source?
        // spriteLibrary[i].position(($(window).width() / 2) - 250, imagesScootY)
    }
}

function draw() {

    currentImage = spriteLibrary[indexNum];
    currentImage.show();
    currentImage.position(windowWidth / 2 - 220, imagesScootY);
    if (currentImage !== prevImage && prevImage) {
        prevImage.hide();
    }
    prevImage = currentImage;

}



/////////////TONE JS ////////////
var snareUrl = "https://tonejs.github.io/Tone.js/examples/audio/505/snare.mp3";
var snare = new Tone.Player(snareUrl).toMaster();
var faster = 0
var Gotfaster = 0.5
snare.retrigger = true;
var synth = new Tone.FMSynth().toMaster();

//my scale, plus I want to add the snare
var val1 = "C2";
var val2 = "G2";
var val3 = "E2";
var val4 = "C3";
var val5 = "A3";
var val6 = "B3";
var val7 = "C4";
var val8 = "E4";
var val9 = "snare";

var obj = {};
obj[val1] = [{ value: val3, probability: 0.7 }, { value: val2, probability: 0.3 }]; //can I still add probability to this?
obj[val2] = [val1, val3];
obj[val3] = [val2, val4];
obj[val4] = [val5, val3];
obj[val5] = [val4, val6];
obj[val6] = [val5, val7];
obj[val7] = [val8, val8];
obj[val8] = [val7, val9];
obj[val9] = [val8, val7];

var chain = new Tone.CtrlMarkov(obj);
chain.value = "C2";
//////////////////////////////////////////////////
$("#bringback").click(function() {
    console.log('pushed');
    imagesScootY = 200;
});


Tone.Buffer.on("load", function() {

    // for (var i = 0; i < 70; i++) {
    //     trythis[i].start();
    // }

    var now = synth.now();
    Tone.Transport.start();
    // Tone.Transport.bpm.value = 120;

    Tone.Transport.scheduleRepeat(function(time) {
        //pull a random index to do cool stuff on the snare
        var bgRandom = Math.floor(Math.random() * bgURLS.length + 0);
        // spriteLibrary[bgRandom].position(($(window).width() / 2) - 250, imagesScootY)

        if (faster < .26) {
            var Gotfaster = 0.5 - faster
        } else {
            Gotfaster = 0.20
        }
        if (chain.value === "snare") {
            if (evenOdd % 2 == 0) {
                popUp();

            } else {
                removepopUP();
            }


            if (wordIndex < words.length) {
                newsentence += words[wordIndex];
                newsentence += " ";
                $("#adiv").html(newsentence);
                wordIndex = wordIndex + 1;
            }
            evenOdd++;
            //push something to an array
            $("#redDiv").toggle();
            $("#trDiv").toggle();
            $("#brDiv").toggle();
            $("#blDiv").toggle();
            // console.log(imagesScootY)
            $("#BG").css({ "background-image": bgURLS[bgRandom] });
            //push image down in Y for now on.
            imagesScootY = imagesScootY + 30;
            if (imagesScootY > 700) {
                console.log('show button')
                $("#bringback").show();

            }

            snare.start(now);
        } else {
            synth.triggerAttackRelease(chain.value, 0.2, time + now);
        }

        if (chain.value == val1) {
            indexNum = 1;
        } else if (chain.value == val2) {
            indexNum = 3;
        } else if (chain.value == val3) {
            indexNum = 5;
        } else if (chain.value == val4) {
            indexNum = 7;
        } else if (chain.value == val5) {
            indexNum = 11;
        } else if (chain.value == val6) {
            indexNum = 14;
        } else if (chain.value == val7) {
            indexNum = 16;
        } else if (chain.value == val8) {
            indexNum = 18;
        } else if (chain.value == val9) {
            indexNum = 20;
        }

        chain.next();

        // indexNum++;
        faster = faster + .0045

        // dont just draw the next image, but draw the corresponsing frame number to the chain's value
        // sprites[i % sprites.length].display();
        // sprites[chain.value].display();

    }, "4n"); //repeat every 8th note with 1 sec spacers
    //is this ramp working?
    Tone.Transport.bpm.rampTo(720, 45);





});



////////////////////////////////////////////////////////
/////THIS WORKS BUT I CANT SCHEDULE IMAGES TO IT///////
// Tone.Buffer.on("load", function() {
//     var now = synth.now();

//     for (var i = 0; i < 70; i++) {

//         if (faster < .26) {
//             var Gotfaster = 0.5 - faster
//         } else {
//             Gotfaster = 0.20
//         }
//         if (chain.value === "snare") {
//             snare.start(i * Gotfaster + now);
//             $('body').css({ "background-color": colors[3] });
//             console.log('snare')
//         } else {
//             //schedule them all, note, time, velocity
//             synth.triggerAttackRelease(chain.value, 0.2, i * (Gotfaster) + now);
//         }
//         //get the next state in the Markov chain
//         chain.next();
//         stagedChainNums.push(chain.next());
//         faster = faster + .0045
//             // spriteLibrary[i].position(0, 0)
//             // image(spriteLibrary[i], 0, 0);


//     }

// }); //////////////////////////////////



















//maybe i will have multiple videos so keep them in a function
function Jitter() {
    this.startingFrame = floor(random(sprite1Total));
    this.display = function() {

        image(spriteLibrary[floor(this.startingFrame)], 0, 200);


        this.startingFrame = this.startingFrame + 1;

        if (this.startingFrame == sprite1Total) {
            this.startingFrame = 0;
        }
    }


}


function popUp() {
    var TifforMir = Math.round(Math.random());
    var widthThing = (Math.random() * 250) + 30;
    var heightThing = (Math.random() * 250) + 30;
    var bgURLS = ["url(http://evejweinberg.github.io/samples/ArrowDownwardPurpleGreen.gif)", "url(http://evejweinberg.github.io/samples/txt_blgrid.jpg)", "url(http://evejweinberg.github.io/samples/txt_pnkscrb.jpg)", "url(http://evejweinberg.github.io/samples/ArrowDownwardPink.gif)"]
    var bgRandom = Math.floor(Math.random() * bgURLS.length + 0);
    // "background-image": bgURLS[bgRandom] }
    myWindow = window.open("http://evejweinberg.com", "myWindow", "width=" + widthThing + ", " + "height=" + heightThing + "," + "left=" + widthThing);
    console.log(TifforMir);
    if (newsentence.length<130)
    {if (TifforMir == 0) {
            myWindow.document.write("<p>Tiffany</p>")
        } else {
            myWindow.document.write("<p>Miranda</p>")
        }} else{
            myWindow.document.write("<p id='lrgType'>??????????????????</p>")
        }
    myWindow.document.writeln("<body bgcolor='yellow'>");
    // myWindow.document.writeln("<body style = 'background-image=bgURLS[bgRandom]'' >");
    myWindow.document.writeln("<\/body>");
    // myWindow.document.body
    // window.open("http://evejweinberg.com",_blank,height=100);
}

function removepopUP() {
    myWindow.close();
}
