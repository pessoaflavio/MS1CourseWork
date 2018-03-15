//global variables
//we have datasets and canvas properties

var table01_Hour;
var table02_Day;
var table03_Week;
var table04_Month;
var width = width;
var height = height;

//But most important,
//we're creating a button to
//change our visualization state
//And also a state variable, to connect the changes.
var button;
var state = 0;

//preloading our data
function preload() {
  table01_Hour = loadTable("assets/all_hour.csv", "csv", "header");
  table02_Day = loadTable("assets/all_day.csv", "csv", "header");
  table03_Week = loadTable("assets/all_week.csv", "csv", "header");
  table04_Month = loadTable("assets/all_month.csv", "csv", "header");
}


//setting our sketch!
function setup() {
  createCanvas(windowWidth, windowHeight);
  background('black');
  noLoop();
  
  //here we create a button
  // with a 'button' class (see the CSS for styling)...
  button = createButton('go on');
  button.addClass('button');
  
  //... that will execute
  //the action() function, that will
  //change our global state
  button.mousePressed(action);
  ScatterPlot(table04_Month, 255, 255, 0);
}

//this is our function called by the button.
// we're telling it to run the newgraph() function
// until it hits a specific state;
// after that, we run the reset() function

function action() {
  if (state>=3) {
      reset();
   } else {
      state++;
      newgraph();   
   }
}

// reset() will put our state back to 0
// and will also draw our first scatterplot again

function reset() {
  state = 0;
  ScatterPlot(table04_Month, 255, 255, 0);
}

// newgraph() just defines conditions 
// when to run the ScatterPlot function,
// by checking the 'state' variable current value.

function newgraph() {
  if (state == 1) {ScatterPlot(table03_Week, 255, 215, 32)}
  else if (state == 2) {ScatterPlot(table02_Day, 250, 128, 14)}
  else if (state == 3) {ScatterPlot(table01_Hour, 255, 69, 0)}
  else if (state == 0){ScatterPlot(table04_Month, 255, 255, 0)}
}

//scatterPlot takes our data as parameters
// and will do regular p5 drawing on canvas
function ScatterPlot(value, c1, c2, c3) {

  background('black');
  for (var i=0; i<value.getRowCount(); i++) {
    stroke(c1, c2, c3, 100);
    noFill();
    var xI = value.get(i, 'latitude');
    var xII = map(xI, 90, -90, 0, height);
    var yI = value.get(i, 'longitude');
    var yII = map(yI, -180, 180, 0, width);
    var rI = (sqrt((value.get(i, 'mag'))*PI))*25; 
    ellipse(yII,xII,rI);

  }
  
}
