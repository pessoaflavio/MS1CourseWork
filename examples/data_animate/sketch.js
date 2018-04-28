var planets;
var size;
var velocity;
var color;
var date;

function preload () {
    planets = loadTable('rndplanets.csv', 'csv', 'header');
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  noLoop();
  console.log(planets.getColumn('size')[0]);
  planet1 = new singleplanet(100, 100, 20, 1902);
}

function singleplanet (size, velocity, color, date) {
  this.size =  size;
  this.velocity = velocity;
  this.color = color;
  this.date = date;
  
  this.drawPlanet = function(xpos, ypos){
    fill(this.color, this.color*10, this.color*10);
      noStroke();
      ellipse(xpos, ypos, this.size);
  }
  
  // this.drawPlanet = function (xpos, ypos){
  //   for (var i = 0; i <= planets.getRowCount; i++ ) 
  //     {
  //     fill(this.color, this.color*10, this.color*10);
  //     noStroke();
  //     ellipse(this.size, this.size, xpos+1, ypos+1);
  //     }
  //   };

  
// var sz = planets.getColumn('size')[i];
// var sp = planets.getColumn('velocity')[i];
// var clr = planets.getColumn('color')[i];
// var dt = planets.getColumn('date')[i];
}

function draw () {
  planet1.drawPlanet(10, 20);
}