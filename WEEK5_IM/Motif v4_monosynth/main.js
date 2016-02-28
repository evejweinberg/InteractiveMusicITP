   Bush4_1looping = false
   Bush6a_looping = false
   $(document).ready(function() {
       var spring4 = new SpringTime(0, 4);
       var spring6 = new SpringTime(0, 6);

       spring4.slowness(.5);
       spring6.slowness(.3);




       $('#bush4abutton').click(function() {
           var interval;
           Bush4_1looping = !Bush4_1looping;
           console.log('bush4 loop?  ' + Bush4_1looping)
           console.log('clicked bush4a button')
           if (Bush4_1looping) {
           	$('#bush4a').attr('src', 'assets/bush1_after.png');
               interval = setInterval(function() {
                   if (Bush4_1looping == false) {
                       console.log('looping finished')
                       $('#bush4a').attr('src', 'assets/bush1_before.png');
                       clearInterval(interval);
                   }
                   spring4.start(0);
               }, 3000);
           }

       });



       $('#bush6abutton').click(function() {
           var interval;
           Bush6a_looping = !Bush6a_looping;
           console.log('bush6 loop?  ' + Bush6a_looping)
           console.log('clicked bush6 button')
           if (Bush6a_looping) {
           	$('#bush6a').attr('src', 'assets/bush6_a_after.png');
               interval = setInterval(function() {
                   if (Bush6a_looping == false) {
                       console.log('looping finished')
                       $('#bush6a').attr('src', 'assets/bush6_a_before.png');
                       clearInterval(interval);
                   }
                   spring6.start(0);
               }, 3000);
           }

       });

       //play bush4a once
       $('#bush4a').click(function() {
           spring4length = spring4.start(0);
           console.log('play bush4_1 once')
           $('#bush4a').attr('src', 'assets/bush1_after.png');
           setInterval(displayNextImage, 2000); //would love to change this to the actual length

           function displayNextImage() {
               $('#bush4a').attr('src', 'assets/bush1_before.png');
           }


       });

       //play bush 6 once
       $('#bush6a').click(function() {
           spring6length = spring6.start(0);
           console.log('play bush6a once')
           $('#bush6a').attr('src', 'assets/bush6_a_after.png');
             setInterval(displayNextImage, 2000); //would love to change this to the actual length

           function displayNextImage() {
               $('#bush6a').attr('src', 'assets/bush6_a_before.png');
           }
       });



   });
