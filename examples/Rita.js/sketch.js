function setup() {
  // put setup code here
  createCanvas(800, 600);
  // this will load our rita function 1 frame per second
  frameRate(1);
  
}

function rita () {
  
  //This generates a random interger and will also round it up.
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  //We get a random number between 0 and 4000, by passing 4000 as an argument
  //You could also use min to define a specific range, if you want to.
  var randomGenerator = getRandomInt(4000);
  
  //We concatenate the Met API url with our random number
  var url = 'https://collectionapi.metmuseum.org/api/collection/v1/object/' + randomGenerator;
  var metData;
  
  //A p5 method to make a GET request 
  //(https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
  httpGet(url, 'json', function(response) {
    
    metData = response;
    console.log(metData);
    
    //Here we pick our response from the HTTP request, 
    //and turn it into a RiTa object!
    //The response is a JSON object, 
    //with properties that we can pass 
    //also to be specific in what we want
    var keywords = RiString(metData.metadata.metaKeywords);
    //... and then we use .words() 
    //to have an array of all the words in our text
    var syllabus = keywords.words();
    
    console.log(syllabus);
    
    // Iterate through our words and filter Commas to appear as gray
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
  //Calls our RiTa function
  rita();
  background('white');
}