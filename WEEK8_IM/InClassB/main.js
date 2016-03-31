//Javascript is an interpretted language
//bind, call, apply -- they all redefine what 'this' is
//bind returns a function
//
//
// $.ready(setup);
// $(ready)


var star;
var star2;
var star3;

$( document ).ready(function() {




$("<button>").appendTo("body").on("click", function(){
if (Tone.Transport.state === 'started'){
this.textContent = "start"
Tone.Transport.stop();
} else{
this.textContent = "end"
Tone.Transport.start();
}

})

//make 30 balls
// for (var i=0; i<30;i++){


// }

console.log('ready')




var MyClass = function() {
    //listen for mouse events using jquery
    $("#element").on("mousedown", this.onmousedown.bind(this));
}

$("#bbb").on("click", wasClicked);


function wasClicked() {
    console.log(this);
}

$("button").on("click", function() {
    console.log(this);

})




star = new Star(100,200,"C4");
star2 = new Star(200,300,"G4");




// star3 = new Star(lots of arguments)
// instead of lots of these..pass in all your data labeled in an object:
star = new Star({
x : 200,
y : 300,


})

//then in the class have it take a data object
//in it will be


// var star2Trigger = star2._trigger.bind(star2)
// invoke star1's trigger as if you were star2, star2 is the context, so 'this' now refers to star2's 'this'
// star._trigger.call(star)















}) //end ready






// document.querySelector("button").addEventListener("click", wasClicked)




////////////////////////////////////
////////////////////////////////////
////////////////////////////////////





// var MyClass = function(){
//     //listen for mouse events using jquery
//     $("#element").on("mousedown", this.onmousedown.bind(this));
// }

// MyClass.prototype.onmousedown = function(event){
//     console.log("i was invoked with the correct context");
// }


// function printToTheConsole(stuff){
//     console.log(stuff);
// }

// var alwaysPrintHi = printToTheConsole.bind(window, "HELLO!");

// alwaysPrintHi(); //prints "HELLO!"


// //here is a basic class
// var AClass = function(){
//     this.name = "Henry";
// }

// AClass.prototype.greeting = function(){
//     console.log("hi my name is "+this.name);
// };

// //here is another class
// var AnotherClass = function(){
//     this.name = "Harriet";  
// }

// var anInstance = new AClass();
// var anotherInstance = new AnotherClass();

// //say the greeting
// anInstance.greeting(); //prints "hi my name is Henry"
// //use anInstance's greeting method with anotherInstances's data
// anInstance.greeting.call(anotherInstance); //prints "hi my name is Harriet"



// Child.prototype = new Parent();.
// //and remember to set the constructor back to the Child
// Child.prototype.constructor = Child;

// //Here is an example of an extend method without side effects
// function extend(Child, Parent){
//     function TempConstructor(){}
//     TempConstructor.prototype = Parent.prototype;
//     Child.prototype = new TempConstructor();
//     Child.prototype.constructor = Child;
// }
