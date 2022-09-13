
//1 if you want to see the first batch without clicking
let counter = 1;
let current = 0;
// we need to set the current year to our starting year!!!!!!!!!!!!!!!!!!!!!!!!
let currentYear = 1399
//here we should say the batch of the batch what was year batch???????
let yearBatch = 100

//year labels variables
let s = 1400
let t = 1499


function preload() {
  // Load up the table data. It needs to be sorted by years!!!!!
  table = loadTable('data/meteorites-landing-cleaned.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //print("setup")
  background('#BAE1F4')
}

/* It is deleting everything --> NOT LIKE
//Function to resize the visualisation when it is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#BAE1F4');
}*/

  function draw() {
    strokeWeight(2)
    //print("setup")
    //cursor('https://64.media.tumblr.com/de76c5c61256ed87de95db9e9cbbe1f4/70056dacaa7e2276-8f/s75x75_c1/78cbb577ceb30a91dbaab5850d8e3a807b707be7.pnj')
    //cursor('https://github.com/jumpi00/Carla-Giampaolo_project/blob/master/comet_2604-fe0f.png?raw=true')

    //print("currentyear",currentYear)
    numRows = table.getRowCount()

    while (counter<numRows-1) {
        let year = table.getNum(counter, "year");
        let mass = table.getString(counter, "mass"); 

        if (year>currentYear+yearBatch) {
          print("end batch")
          noLoop()
          break
        }

          //coloring
          let reclass = table.getString(counter, "recclass"); {
            if (reclass == "L6" || reclass == "L5" || reclass == "L4" || reclass == "L3")       {
              fill(121,181,212,70)
              stroke(121,181,212,70)
            } else if ( reclass == "CM2" || reclass == "CM1" || reclass == "CM1/2" || reclass == "CM") {
              fill(70,159,164,70) 
              stroke(70,159,164,70)
            } else if ( reclass == "EH3" || reclass == "EH4" || reclass == "EH4/5" || reclass == "EH5") {
              fill(57,106,164,70)
              stroke(57,106,164,70) 
            } else if ( reclass == "Iron, IIIAB" || reclass == "Iron, IIAB" || reclass == "Iron, IAB-MG" || reclass == "Iron, IVA") {
              fill(217,247,1,70)
              stroke(217,247,1,70) 
            }else {
              fill(100,100,100,70)
              stroke(100,100,100,70)
            }
          }

          //sides polygon
          {
            if (year > "1399" && year < "1500") {
              polygon (random(width), random(height), mass/3000, 4)
            } 
            if (year > "1499" && year < "1600") {
              polygon (random(width), random(height), mass/3000, 5)
            }
            if (year > "1599" && year < "1700") {
              polygon (random(width), random(height), mass/3000, 6)
            }
            if (year > "1699" && year < "1800") {
              polygon (random(width), random(height), mass/3000, 7)
            }
            if (year > "1799" && year < "1900") {
              polygon (random(width), random(height), mass/3000, 8)
            }
            if (year > "1899" && year < "2000") {
              polygon (random(width), random(height), mass/3000, 11)
            }
            if (year > "1999" && year < "2100") {
              polygon (random(width), random(height), mass/3000, 15)
            }
            print(year)
            }

        // What does this mean? = it would stop the loop of the clicks and currents  
        current++;
        // What does this mean??????????
        counter += 1
      }



          //LABELS FOR THE YEARS        
            push()
            stroke('#2B507B')
            fill('#EBF0F9')
            strokeWeight(1)
            rectMode(CENTER)
            rect(windowWidth/2-10,windowHeight/10*9-4,110,35 )
            pop()

            fill('#2B507B')
            textAlign(CENTER);
            textSize(11)
            textFont('Noto Sans Mono')
            text (s + " - " + t,windowWidth/2-10,windowHeight/10*9);
            


// WHEN DATA SET IS READY: change the background colour, and the year !!!!!!!!!!!!!!!!!!!!!!!!!!!
// after 8 clicks you start all over again from 1400
        if (currentYear===2099){
        //if (counter>=numRows-1) { //I changed this because it was not showing the 2000s meteorites
        background('#BAE1F4')
        counter = 0
        currentYear = 1399
      }

      
      // IF FOR THE LABELS
      if (t===2199) {
        //background(220);
        s=1400
        t=1499
      }

    }

// function that stops the loop until you clic the mouse again.
    function mousePressed() {
    currentYear += yearBatch
    s += 100
    t += 100
    loop()
    }



//This is the function that draws polygons
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}