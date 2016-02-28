   Bush4_1looping = false
   Bush6a_looping = false
   rainOn = false;
   $(document).ready(function() {
       $("#animated-rain").hide();
       var spring4 = new SpringTime(0, 4);
       var spring6 = new SpringTime(0, 6);

       spring4.slowness(.5);
       spring6.slowness(.3);

       $('#rainbutton').click(function() {
           if (rainOn) {
               rainOn = false
               spring4.removeRain();
               // spring4.addRain(0, -Infinity);
           }
           if (rainOn == false) {
               rainOn = true;
               console.log('rain button clicked')
               $("#animated-rain").show();
               var rain1 = spring4.addRain(1, -4);
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
                   spring4.startFlower1(0);
               }, 3000);
           }

       });



       $('#bush6abutton').click(function() {
           //toggle artwork
           var image = document.getElementById('bush6a');
           if (image.src.match("before")) {
               image.src = "assets/bush6_a_after.png";
           } else {
               image.src = "assets/bush6_a_before.png";
           }

           var interval;
           //change from false to true
           Bush6a_looping = !Bush6a_looping;
           console.log('Is bush6 looping? ' + Bush6a_looping)
               // console.log('clicked bush6 button')
           if (Bush6a_looping) {

               interval = setInterval(function() {
                   if (Bush6a_looping == false) {
                       console.log('looping finished')
                           // $('#bush6a').attr('src', 'assets/bush6_a_before.png');
                       clearInterval(interval);
                   }
                   spring6.startFlower1(0);
               }, 3000);

           }

       });

       //play bush4a once
       $('#bush4a').click(function() {
           spring4length = spring4.startFlower1(0);
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



   });
