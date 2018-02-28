function setup() {
  // put setup code here
  createCanvas(800, 600);
  frameRate(1);
  
}

function rita () {
  function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
  
  var randomGenerator = getRandomInt(4000);
  
  var url = 'https://collectionapi.metmuseum.org/api/collection/v1/object/' + randomGenerator;
  var metData;
  
  httpGet(url, 'json', function(response) {
    
    metData = response;
    console.log(metData);
    var keywords = RiString(metData.titles.primaryTitle);
    var syllabus = keywords.words();
    
    console.log(syllabus);
    
    for (var i = 0; i < syllabus.length; i++) {
      if (syllabus[i] === ',') 
          { fill('lightgrey')
          } else { fill(0, i*5, 153)
          }
      textSize(14);
      text(syllabus[i], i*10, (i+5)*10);
    }

  });
}

function draw () {
  rita();
  background('white');
}