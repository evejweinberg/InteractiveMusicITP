// var a = new Interface.Panel({ 
//   container:document.querySelector("#sliderPanel") 
// });
// var b = new Interface.Slider({
//   label: 'vertical slider',  
//   bounds:[.05,.05,.3,.9] 
// });
// var c = new Interface.Slider({ 
//   bounds:[.4,.35,.55,.3], 
//   label: 'horizontal slider',  
//   isVertical:false, 
//   value:.5,
// });

// a.background = 'black';
// a.add(b,c);



a = new Interface.Slider({ bounds:[0,0,1,.2], isVertical:false }); 
panel = new Interface.Panel(); panel.add(a);