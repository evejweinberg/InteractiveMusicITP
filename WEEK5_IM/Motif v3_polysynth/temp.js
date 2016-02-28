var Form = function(){
    console.log(this);
    this.mood = "happy"

    this.makeSad = function(){
        //
    }
}

Form.prototype.makeHappy(){
    //
}

Form.prototype.everyonesMood = 'somber'

var f = new Form();
console.log(f.mood);
f.everyonesMood();

f.makeHappy();



var Motif 