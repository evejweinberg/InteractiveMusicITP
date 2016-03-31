var searchButton;
var input;
var video;
var id;

function setup() {
// searchButton = createButton('Shuffle');
// searchButton.style("color", "#8B008B");
// searchButton.position(0,0);

// searchButton.mousePressed(search);
}

function search() {
  var term = "dog";
  var apiKey = "AIzaSyDE39RKPa8zjlkDiuUVuQG8uD5Sl9D-rEU";
  var url = 'https://www.googleapis.com/youtube/v3/search/?part=snippet&q=' + term + '&key=' + apiKey + '&type=maxResults=1&order=viewCount&safeSearch=moderate';

  console.log(url);
  
  loadJSON(url, gotData);
  
}

function gotData(data) {
  items = data.items;
  id = items[0].id.videoId;

  if (video) {
    var div = document.getElementById("test");
    div.mute();
    div.parentNode.removeChild(div);
    if (id) {
      makeDiv(id);
      
    }
  } else {
    if (id) {
      makeDiv(id);
      
    }
  }
}

function makeDiv(videoId) {
  var embed = '<iframe width="400" height="250" src="https://www.youtube.com/embed/' + id +
    '?rel=0&autoplay=1" frameborder="0" muted="muted" allowfullscreen volume="0"></iframe>';
  video = createElement('div', embed);
  
  video.id("test");
  video.position(50, 150);
  console.log(video);
  
}