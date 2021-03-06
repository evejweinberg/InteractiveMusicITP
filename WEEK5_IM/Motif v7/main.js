$(document).ready(function() {
    var audio_context;
    var recorder;
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        audio_context = new AudioContext;
    } catch (e) {}

    navigator.getUserMedia({ audio: true }, startUserMedia, function(e) {});



    //////////////////////////////////////////////
    $("#pitch").text(pitchShift);
    $("#animated-rain").hide();


    Bush4_1looping = false
    Bush6a_looping = false
    plant5a_looping = false
    plant8a_looping = false
    plant3a_looping = false
    plantbass_looping = false
    rainOn = false;
    var singingOn = false
    var slowDown = 1;
    var pitchShift = 0;
    var spring1, spring3, spring5, spring8;
    var pushUp = 50;
    var rainVolume = -4;
    var loopPlant8a;


    //there is one Transport for the whole project
    Tone.Transport.start();

    //create each plant
    spring1 = new SpringTime(pitchShift, 1, "sine");
    spring3 = new SpringTime(pitchShift, 3, "sawtooth");
    spring6 = new SpringTime(pitchShift, 6, "triangle");
    spring5 = new SpringTime(pitchShift, 5, "sawtooth8");
    spring8 = new SpringTime(pitchShift, 8, "sawtooth");

    //set speed for each plant
    spring8.slowness(.15 * slowDown);
    spring1.slowness(2 * slowDown);
    spring3.slowness(.5 * slowDown);
    spring5.slowness(.3 * slowDown);







    $('#slow-button').click(function() {
stopRecording(this)
        slowDown = slowDown + 1;
        $("#play-back-speed").text(slowDown);
        spring8.slowness(.15 * slowDown);
        spring1.slowness(2 * slowDown);
        spring3.slowness(.5 * slowDown);
        spring5.slowness(.3 * slowDown);
        console.log(slowDown)
    });

    $('#fast-button').click(function() {
startRecording(this);
        slowDown = slowDown - 1;
        $("#play-back-speed").text(slowDown);
        spring8.slowness(.15 * slowDown);
        spring1.slowness(2 * slowDown);
        spring3.slowness(.5 * slowDown);
        spring5.slowness(.3 * slowDown);
        console.log(slowDown)
    });

    $('#pitch-high-button').click(function() {
        PushTerreriumUp();
        replaceShadowArt();
        pitchShift = pitchShift + 1;
        $("#pitch").text(pitchShift);
        spring1._index++;
        spring3._index++;
        spring5._index++;
        spring8._index++;
        // console.log('pitch shift ' +pitchShift)
    });

    $('#pitch-low-button').click(function() {
        replaceShadowArt();
        PushTerreriumDown();
        $("#pitch").text(pitchShift);
        pitchShift = pitchShift - 1;
        //change to a 4loop maybe
        spring1._index--;
        spring3._index--;
        spring5._index--;
        spring8._index--;
        // console.log(pitchShift)
    });

    ///////////Rain//////////////////
    //////////////////////////////
    $('#rainbutton').click(function() {
        if (rainOn) {
            console.log('rain was true, so....')
            rainOn = false
            console.log('switched rain to false')
            spring3.removeRain();
            $("#animated-rain").hide();
            // spring4.addRain(0, -Infinity);
        } else if (rainOn == false) {
            console.log('rain was false. so....')
            rainOn = true;
            console.log('rain switched to true')
            $("#animated-rain").show();
            var rain1 = spring3.addRain(1, rainVolume);
            // spring4.addRain(0, 0);
        }

    });


    $('#rain-vUp-button').click(function() {

        // $("#play-back-speed").text(slowDown);
        rainVolume++;
        console.log('rain Vol is: ' + rainVolume);
        // spring3.addRain(1, rainVolume);
        // console.log(slowDown)
    });
    //////////rain Over////////////////////////



    ////////SING//////////////////////////
    $('#lips').click(function() {
        if (singingOn) {
            singingOn = false
            spring3.removeSinger();
        } else if (rainOn == false) {
            singingOn = true;
            spring3.addSinger();
        }

    }); ////////////sing over////////////////////



    /////////////////////////////////////////////////
    //////////////LOOP PLANT SOUNDS////////////////
    ///////////////////////////////////////////////

    //loop plant 3
    $('#plant-3a-button').click(function() {
        //toggle artwork
        var image = document.getElementById('plant-3a');
        if (image.src.match("before")) {
            image.src = "assets/plant3a_after.png";
        } else {
            image.src = "assets/plant3a_before.png";
        }

        var interval;
        // //change from false to true
        plant3a_looping = !plant3a_looping;
        console.log('Is plant3 looping? ' + plant3a_looping)
            //     // console.log('clicked bush6 button')
        if (plant3a_looping) {

            interval = setInterval(function() {
                if (plant3a_looping == false) {
                    console.log('looping finished')
                    clearInterval(interval);
                }
                spring3.startFlower1(pitchShift, 0);
            }, 3000);
        }
    });

    //looping 5a
    $('#plant-5a-button').click(function() {
        //toggle artwork
        var image = document.getElementById('plant-5a');
        if (image.src.match("before")) {
            image.src = "assets/plant5a_after.png";
        } else {
            image.src = "assets/plant5a_before.png";
        }

        var interval;
        // //change from false to true
        plant5a_looping = !plant5a_looping;
        console.log('Is plant5 looping? ' + plant5a_looping)
            //     // console.log('clicked bush6 button')
        if (plant5a_looping) {

            interval = setInterval(function() {
                if (plant5a_looping == false) {
                    console.log('looping finished')
                    clearInterval(interval);
                }
                spring5.startFlower1(pitchShift, 0);
            }, 3000);
        }
    });

    $('#plant-8a-button').click(function() {
        //toggle artwork
        var image = document.getElementById('plant-8a');
        if (image.src.match("before")) {
            image.src = "assets/plant8a_after.png";
        } else {
            image.src = "assets/plant8a_before.png";
        }

        plant8a_looping = !plant8a_looping;
        // console.log('Is plant8 looping? ' + plant8a_looping)
        //     // console.log('clicked bush6 button')
        if (plant8a_looping) {


            loopPlant8a = new Tone.Loop(function(time) {
                //triggered every eighth note. 
                console.log(time);
                spring8.startFlower1(pitchShift, time);
            }, 3);

            loopPlant8a.start(Tone.Transport.now());

        } else {
            loopPlant8a.stop(Tone.Transport.now());
        }

    });


    //loop plant bass
    $('#plant-bass-button').click(function() {
       
        //toggle artwork
        var image = document.getElementById('plant-bass');
        if (image.src.match("before")) {
            image.src = "assets/plantBass_after.png";
        } else {
            image.src = "assets/plantBass_before.png";
        }

        var interval;
        // //change from false to true
        plantbass_looping = !plantbass_looping;
        console.log('Is plantbass looping? ' + plantbass_looping)
            //     // console.log('clicked bush6 button')
        if (plantbass_looping) {

            interval = setInterval(function() {
                if (plantbass_looping == false) {
                    console.log('looping finished')
                    clearInterval(interval);
                }
                spring1.startFlower2(pitchShift, 0);
            }, 3000);
        }
    });


    /////////////////////////////////////////////////
    //////////////PLAY PLANT SOUNDS////////////////
    ////////////////////////////////ONCE///////////////

    //play bush-bass once
    $('#plant-bass').click(function() {
        spring1length = spring1.startFlower1(pitchShift, 0);
        // console.log('play bush4_1 once')
        $('#plant-bass').attr('src', 'assets/plantBass_after.png');
        //change this to an anonymous function
        setInterval(displayNextImage, 2000); //would love to change this to the actual length

        function displayNextImage() {
            $('#plant-bass').attr('src', 'assets/plantBass_before.png');
        }
    });

    //play plant3 once
    $('#plant-3a').click(function() {
        spring3length = spring3.startFlower1(pitchShift, 0);
        // console.log('play bush4_1 once')
        $('#plant-3a').attr('src', 'assets/plant3a_after.png');
        setInterval(displayNextImage, 2000); //would love to change this to the actual length

        function displayNextImage() {
            $('#plant-3a').attr('src', 'assets/plant3a_before.png');
        }
    });


    //play plant 8 once
    $('#plant-8a').click(function() {
        spring8length = spring8.startFlower1(pitchShift, 0);
        // console.log('play bush4_1 once')
        $('#plant-8a').attr('src', 'assets/plant8a_after.png');
        setInterval(displayNextImage, 2000); //would love to change this to the actual length

        function displayNextImage() {
            $('#plant-8a').attr('src', 'assets/plant8a_before.png');
        }
    });

    //play plant 5 once
    $('#plant-5a').click(function() {
        spring5length = spring5.startFlower1(pitchShift, 0);
        // console.log('play bush4_1 once')
        $('#plant-5a').attr('src', 'assets/plant5a_after.png');
        setInterval(displayNextImage, 2000); //would love to change this to the actual length

        function displayNextImage() {
            $('#plant-5a').attr('src', 'assets/plant5a_before.png');
        }
    });




    function replaceShadowArt() {
        if (pitchShift == 0) {
            $("#terrarium").removeClass('hovering');
            $("#shadow").attr("src", "assets/shadow1.png")
        } else if (pitchShift == 1) {
            $("#terrarium").removeClass('hovering');
            $("#shadow").attr("src", "assets/shadow2.png")
        } else if (pitchShift == 2) {
            $("#terrarium").addClass('hovering');
            $("#shadow").attr("src", "assets/shadow3.png")
        } else if (pitchShift == 3) {
            $("#terrarium").addClass('hovering');
            $("#shadow").attr("src", "assets/shadow4.png")
        }
    }

    function PushTerreriumUp() {

        pushUp = pushUp - 2;
        console.log('pushing Up to' + pushUp)
        $('#terrarium').css({ top: pushUp + '%' });
    }


    function PushTerreriumDown() {

        pushUp = pushUp + 2;
        console.log('pushing Up to' + pushUp)
        $('#terrarium').css({ top: pushUp + '%' });
    }

    function checkForFalse() {
        if (plantbass_looping == false) {
            console.log('dont loop plant Bass anymore')
        }
    }


    function startUserMedia(stream) {
        var input = audio_context.createMediaStreamSource(stream);
        // __log('Media stream created.');

        // Uncomment if you want the audio to feedback directly
        //input.connect(audio_context.destination);
        //__log('Input connected to audio context destination.');

        recorder = new Recorder(input);
        // __log('Recorder initialised.');
    }

    function startRecording(button) {
        recorder && recorder.record();
        // button.disabled = true;
        // button.nextElementSibling.disabled = false;
        // __log('Recording...');
    }

    function stopRecording(button) {
        recorder && recorder.stop();
        // button.disabled = true;
        // button.previousElementSibling.disabled = false;
        // __log('Stopped recording.');

        // create WAV download link using audio data blob
        createDownloadLink();

        recorder.clear();
    }

    function createDownloadLink() {
        recorder && recorder.exportWAV(function(blob) {
            var url = URL.createObjectURL(blob);
            var li = document.createElement('li');
            var au = document.createElement('audio');
            var hf = document.createElement('a');

            au.controls = true;
            au.src = url;
            hf.href = url;
            hf.download = new Date().toISOString() + '.wav';
            hf.innerHTML = hf.download;
            li.appendChild(au);
            li.appendChild(hf);
            recordingslist.appendChild(li);
        });
    }


    //make the recorder output
    // var rec = new Recorder(Tone.Master.output);
    // //then just record the output
    // rec.record();
    // //...later on
    // //when you're done recording, just stop the recording

    //there are a few ways to use or download the recorded file
    //take a look at the Recorder.js github page for an example. 



}); //its all over now
