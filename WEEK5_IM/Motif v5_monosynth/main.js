   Bush4_1looping = false
   Bush6a_looping = false
   plant5a_looping = false
   plant8a_looping = false
   plant3a_looping = false
   plantbass_looping = false
   rainOn = false;
   var slowDown = 1;
   var pitchShift = 0;
   var spring1, spring3, spring5, spring8;
   var pushUp = 50;


   $(document).ready(function() {

       $("#pitch").text(pitchShift);
       $("#animated-rain").hide();

       spring1 = new SpringTime(pitchShift, 1);
       console.log(spring1)
       spring3 = new SpringTime(pitchShift, 3);
       spring6 = new SpringTime(pitchShift, 6);
       spring5 = new SpringTime(pitchShift, 5);
       spring8 = new SpringTime(pitchShift, 8);
       spring8.slowness(.15 * slowDown);
       spring1.slowness(2 * slowDown);

       spring3.slowness(.5 * slowDown);
       spring5.slowness(.3 * slowDown);


       $('#slow-button').click(function() {
           $("#play-back-speed").text(slowDown);
           slowDown = slowDown + 1;
           spring8.slowness(.15 * slowDown);
           spring1.slowness(2 * slowDown);
           spring3.slowness(.5 * slowDown);
           spring5.slowness(.3 * slowDown);
           console.log(slowDown)
       });

       $('#fast-button').click(function() {

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

           

           pitchShift = pitchShift + 1;
           $("#pitch").text(pitchShift);
           spring1._index++;
           spring3._index++;
           spring5._index++;
           spring8._index++;
           console.log(pitchShift)
       });

       $('#pitch-low-button').click(function() {
        PushTerreriumDown();
           $("#pitch").text(pitchShift);
           pitchShift = pitchShift - 1;
           spring1._index--;
           spring3._index--;
           spring5._index--;
           spring8._index--;
           console.log(pitchShift)
       });

       $('#rainbutton').click(function() {
           if (rainOn) {
               console.log('rain was true, so....')
               rainOn = false
               console.log('switched rain to false')
               spring3.removeRain();
               // spring4.addRain(0, -Infinity);
           } else if (rainOn == false) {
               console.log('rain was false. so....')
               rainOn = true;
               console.log('rain switched to true')
               $("#animated-rain").show();
               var rain1 = spring3.addRain(1, -4);
               // spring4.addRain(0, 0);
           }

       });





       $('#bush4abutton').click(function() {
           //toggle artwork
           var image = document.getElementById('bush4a');
           if (image.src.match("before")) {
               image.src = "assets/bush4a_after.png";
           } else {
               image.src = "assets/bush4a_before.png";
           }
           var interval;
           Bush4_1looping = !Bush4_1looping;
           console.log('Is bush4 loop?  ' + Bush4_1looping)
               // console.log('clicked bush4a button')
           if (Bush4_1looping) {
               // $('#bush4a').attr('src', 'assets/bush1_after.png');
               interval = setInterval(function() {
                   if (Bush4_1looping == false) {
                       console.log('looping finished')
                           // $('#bush4a').attr('src', 'assets/bush1_before.png');
                       clearInterval(interval);
                   }
                   spring4.startFlower1(pitchShift, 0);
               }, 3000);
           }

       });


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

           var interval;
           // //change from false to true
           plant8a_looping = !plant8a_looping;
           console.log('Is plant8 looping? ' + plant8a_looping)
               //     // console.log('clicked bush6 button')
           if (plant8a_looping) {

               interval = setInterval(function() {
                   if (plant8a_looping == false) {
                       console.log('looping finished')
                       clearInterval(interval);
                   }
                   spring8.startFlower1(pitchShift, 0);
               }, 3000);
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
                   spring1.startFlower1(pitchShift, 0);
               }, 3000);
           }
       });

       //play bush-bass once
       $('#plant-bass').click(function() {
           spring1length = spring1.startFlower1(pitchShift, 0);
           // console.log('play bush4_1 once')
           $('#plant-bass').attr('src', 'assets/plantBass_after.png');
           setInterval(displayNextImage, 2000); //would love to change this to the actual length

           function displayNextImage() {
               $('#plant-bass').attr('src', 'assets/plantBass_before.png');
           }
       });

       //play bush-bass once
       $('#plant-3a').click(function() {
           spring3length = spring3.startFlower1(pitchShift, 0);
           // console.log('play bush4_1 once')
           $('#plant-3a').attr('src', 'assets/plant3a_after.png');
           setInterval(displayNextImage, 2000); //would love to change this to the actual length

           function displayNextImage() {
               $('#plant-3a').attr('src', 'assets/plant3a_before.png');
           }
       });


       //play bush-bass once
       $('#plant-8a').click(function() {
           spring8length = spring8.startFlower1(pitchShift, 0);
           // console.log('play bush4_1 once')
           $('#plant-8a').attr('src', 'assets/plant8a_after.png');
           setInterval(displayNextImage, 2000); //would love to change this to the actual length

           function displayNextImage() {
               $('#plant-8a').attr('src', 'assets/plant8a_before.png');
           }
       });

       //play bush-bass once
       $('#plant-5a').click(function() {
           spring5length = spring5.startFlower1(pitchShift, 0);
           // console.log('play bush4_1 once')
           $('#plant-5a').attr('src', 'assets/plant5a_after.png');
           setInterval(displayNextImage, 2000); //would love to change this to the actual length

           function displayNextImage() {
               $('#plant-5a').attr('src', 'assets/plant5a_before.png');
           }
       });

       //play bush4a once
       $('#bush4a').click(function() {
           spring4length = spring4.startFlower1(pitchShift, 0);
           // console.log('play bush4_1 once')
           $('#bush4a').attr('src', 'assets/bush4a_after.png');
           setInterval(displayNextImage, 2000); //would love to change this to the actual length

           function displayNextImage() {
               $('#bush4a').attr('src', 'assets/bush4a_before.png');
           }
       });

       //play bush 6 once
       $('#bush6a').click(function() {
           spring6length = spring6.startFlower1(0);
           // console.log('play bush6a once')
           $('#bush6a').attr('src', 'assets/bush6_a_after.png');
           setInterval(displayNextImage, 2000); //would love to change this to the actual length

           function displayNextImage() {
               $('#bush6a').attr('src', 'assets/bush6_a_before.png');
           }
       });

       function PushTerreriumUp() {
           
               pushUp = pushUp-2;
                console.log('pushing Up to'+ pushUp)
               $('#terrarium').css({ top: pushUp+'%' });
           }


           function PushTerreriumDown() {
           
               pushUp = pushUp+2;
                console.log('pushing Up to'+ pushUp)
               $('#terrarium').css({ top: pushUp+'%' });
           }



   });
