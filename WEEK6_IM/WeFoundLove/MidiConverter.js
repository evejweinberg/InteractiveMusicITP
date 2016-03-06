var fs = require('fs');
var midiConverter = require('midi-converter');
var midiSong = fs.readFileSync('midi/MB1324.mid', 'binary');
var jsonSong = midiConverter.midiToJson(midiSong);
fs.writeFileSync('example.json', JSON.stringify(jsonSong));
console.log(jsonSong)