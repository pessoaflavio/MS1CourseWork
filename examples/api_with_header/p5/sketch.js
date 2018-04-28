function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  // this will load our rita function 2 frame per second
  frameRate(1);
}

function rita () {
  //This generates a random interger and will also round it up.
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  //We get a random number between 0 and 500000, by passing 500000 as an argument
  var randomGenerator = getRandomInt(500000);
  
  //We concatenate the Met API url with our random number
  var url = 'https://collectionapi.metmuseum.org/api/collection/v1/object/' + randomGenerator;
  var metData;
  httpDo(url,
    {
    // here we specify what we want to do, which is to get a response from the API
    method: 'GET',
    // here we can pass our API key
    headers: { 
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWNjYWMyOTBAbmV3c2Nob29sLmVkdSIsInBlcm1pc3Npb25zIjp7InByb3ZlbmFuY2UiOmZhbHNlLCJ3ZWJMYWJlbCI6ZmFsc2V9LCJleHAiOjQ2NzgxNzgzODV9.HhOOmPn9LVY5C8A0HYKIHqTKIt9RV0ScrwnGfn8P0ag'
    }
      
    },
    function(response) {
      metData = response;
      console.log(metData);
      var parsedData = JSON.parse(metData);
      //Our response from the HTTP request becomes a RiTa object
      //The response is a JSON object, with properties that we can pass 
      var keywords = RiString(parsedData.metadata.metaKeywords);
      //... and this will give us an array of all the words in the text
      var syllabus = keywords.words();
      // Iterate through our words and filter Commas to appear as gray
      for (var i = 0; i < syllabus.length; i++) {
        if (syllabus[i] === ',') 
        { fill('lightgrey')
        } else { fill(0, i*5, 153)
        }
        textSize(14);
        text(syllabus[i].toUpperCase(), i*windowWidth/50, (i+5)*windowHeight/50);
        }
      }
    );
}

function draw () {
  //Calls our RiTa function
  rita();
  background(66, 244, 155, 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}