   var gridDist = 180;
   var distortionAmt = 0;
   var changereverb = 0;
    var chorus = new Tone.Chorus(4, 2.5, 0.5);
   var synth = new Tone.SimpleSynth().toMaster().connect(chorus);
   var reverb = new Tone.JCReverb(changereverb).connect(Tone.Master);


   var dist = new Tone.Distortion(distortionAmt).toMaster();
var fm = new Tone.SimpleFM().connect(dist);
//this sounds good on bass notes
// fm.triggerAttackRelease("A1", "8n");


   function draw() {


       if (mouseIsPressed) {
           //play a middle c for the duration of an 8th note
           synth.triggerAttackRelease("C4", "8n");
           fm.triggerAttackRelease("A1", "8n");
distortionAmt=distortionAmt+.1;
           // scopeheight=scopeheight+1;
           changeSize();
           gridDist=gridDist-2;
           changereverb=changereverb+.5
       }
   }

	function changeSize (){

       	console.log("gridDist is now: ", gridDist, "reverb is: ",changereverb)
       	console.log('the begining')
       var colors = [
           'rgb(178,138,61)',
           'rgb(255,91,76)',
           'rgb(255,144,160)',
           'rgb(255, 255,255)',
           'rgb(100,100,100)'
       ];

       var type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg';
       var two = new Two({
           type: Two.Types[type],
           fullscreen: true,
           autostart: true
       }).appendTo(document.body);

       var background = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height);
       background.noStroke();
       background.fill = 'rgb(248,187,209)';
       background.name = 'background';

       var container = two.makeGroup(background);

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

               var type = !!(j % 2) ? 'Squiggle' : 'Nonagon';
               var scopeheight = !!(j % 2) ? width / 3 : width;
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

               shape.step = (Math.floor(Math.random() * 8) / 8) * Math.PI / 60;
               shape.step *= Math.random() > 0.5 ? -1 : 1;

               container.add(shape);

           }

       }

       
      }



   $(function() {
   	var cursor = two.makeCircle(0, 0, Math.min(two.height, two.width) / 5);
       cursor.outline = two.makeCircle(0, 0, Math.min(two.height, two.width) / 5);
       cursor.target = new Two.Vector();

       cursor.outline.noFill();
       cursor.outline.stroke = 'rgba(20, 100, 100, 0.1)';
       cursor.outline.linewidth = 40;

       container.mask = cursor;
       cursor.target.set(two.width / 2, two.height / 2);
       cursor.translation.copy(cursor.target);

       var center = _.debounce(function() {
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
           }

       });

   		

   });

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
