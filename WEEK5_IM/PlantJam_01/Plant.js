var Plant = function(data){

	this.img = $("<img>").attr("src", "assets/" + data.offImg).appendTo("body");

	this.img.on("click", this.clicked.bind(this));

	this.img.css({
		"left" : data.x,
		"top" : data.y
	});

	this.notes = data.notes;

	this.active = false;

	this.player = new Tone.Player("audio/" + data.audio).toMaster();

}

//click handler
Plant.prototype.clicked = function(e){

	//toggle state
	this.active = !this.active;

	if (this.active){
		this.player.start("@1m");
	} else {
		this.player.stop("@1m");
	}

	
}


//MAIN

var plants = [];

//create all of your plants
for (var i = 0; i < PlantData.length; i++){
	var data = PlantData[i];
	var plant = new Plant(data);
	plants.push(plant);
}

Tone.Transport.start();