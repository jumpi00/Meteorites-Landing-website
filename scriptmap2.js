function ready(error, dataGeo, data) {
//data = filterByValue(data,"homecontinent","Asia")
//our
svg = svgmap

 // Add the visibility flag
 for (let i = 0; i < data.length; i++) {
  data[i]["visible"] = "visible"
  data[i]["savedn"] = data[i]["n"]
}

console.log(data)

  // Create a color scale
  var allContinent = d3.map(data, function (d) { return (d.homecontinent) }).keys()
  var color = d3.scaleOrdinal()
    //.range(d3.schemePaired);
    .domain(allContinent)
    //.range(["#FCAA67","#B0413E","#306B34", "#5A352A", "#FFCAB1", "#3BA99C", "#EDAFB8", "#DEC1FF"]);
    .range(["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"]);

//n is the sum of meteroites of each country. 



  // Draw the map
  svg.append("g")
      .selectAll("path")
      .data(dataGeo.features)
      .enter()
      .append("path")
        .attr("fill", "#9dafc4")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
      .style("stroke", "#694629")
      .style("opacity", .3)



  // create a tooltip and its attributes
  const Tooltip = d3.select("#my0")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 1)
  .style("background-color", "#EBF0F9")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-color", "#c4bebc")
  .style("padding-top", "12px")
  .style("padding-bottom", "12px")
  .style("padding-right", "20px")
  .style("padding-left", "20px")



  
  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(d) {
    Tooltip.style("opacity", 1)
  }
  var mousemove = function(d) {
  
    mx = d3.mouse(this)[0]
    my = d3.mouse(this)[1]
    mx = 200
    my = 300
    //console.log(mx,my)
    Tooltip
      .html(d.country + "<br>" + "long: " + d.n)
      //.style("left", (mx+10) + "px")
      //.style("top", (my+10) + "px")
      //.style("left", (widht+10) + "px")
      //.style("top", (height+10) + "px")
  }
  var mouseleave = function(d) {
    Tooltip.style("opacity", 1)
  }


  update()
  
  
  function update() {
    // Add a scale for bubble size
    var valueExtent = d3.extent(data, function (d) { return +d.savedn; })
    var size = d3.scaleSqrt()
      .domain(valueExtent)  // What's in the data
      .range([1, 80])  // Size in pixel

    console.log("hello")

  // Add circles:
   selection = svg
      .selectAll("circle")
      //.data(currentData.sort(function (a, b) { return +b.n - +a.n }).filter(function (d, i) { return i < 1000 }))
      .data(data)

    selection
      .enter()
      .append("circle")
      .merge(selection)
      .attr("cx", function (d) { return projection([+d.homelon, +d.homelat])[0] })
      .attr("cy", function (d) { return projection([+d.homelon, +d.homelat])[1] })
      .style("fill", function (d) { return color(d.homecontinent) })
      .attr("stroke", function (d) { if (d.n > 2000) { return "black" } else { return "none" } })
      .attr("stroke-width", 1)
      .style("stroke", "#000000")
      .attr("fill-opacity", .4)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .transition().duration(1000)
      .attr("r", function (d) { return size(+d.n) })
      //.attr("visibility", function (d) { return d.visible })
      //.attr("visibility", function (d) { if (d.n==0) return "hidden"; else return "visible"})

  }

  // Create an event listener, waiting to be notified that the button has been clicked
  dispatch.on('redraw', function (filterValue) {
    console.log("dispatch called")
    for (let i = 0; i < data.length; i++) {
      if (data[i].homecontinent == filterValue || filterValue == "All") {
        //data[i].visible = "visible"
        data[i].n = data[i].savedn
      }
      else {
        //data[i].visible = "hidden"
        data[i].n = 0
      }
    }
    console.log(data)
    update()
  })

  
  
  /*MAYBE WE DO NOT NEED THIS ONE
  // Add title and explanation
  svg
    .append("text")
      .attr("text-anchor", "end")
      .style("fill", "black")
      .attr("x", width - 10)
      .attr("y", height - 30)
      .attr("width", 90)
      .html("WHERE DO METHEORITES FALL")
      .style("font-size", 14)
  */


  // --------------- //
  // ADD LEGEND //
  // --------------- //

  /* WE NEED TO WORK MORE ON THE LEGEND
  // Add legend: circles
  var valuesToShow = [10,500,1000]
  var xCircle = 40
  var xLabel = 120
  svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("circle")
      .attr("cx", xCircle)
      .attr("cy", function(d){ return height - size(d) } )
      .attr("r", function(d){ return size(d) })
      .style("fill", "none")
      .attr("stroke", "#694629")

  // Add legend: segments
  svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("line")
      .attr('x1', function(d){ return xCircle + size(d) } )
      .attr('x2', xLabel)
      .attr('y1', function(d){ return height - size(d) } )
      .attr('y2', function(d){ return height - size(d) } )
      .attr('stroke', '#694629')
      .style('stroke-dasharray', ('2,2'))

  // Add legend: labels
  svg
    .selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("text")
      .attr('x', xLabel)
      .attr('y', function(d){ return height - size(d) } )
      .text( function(d){ return d } )
      .style("font-size", 10)
      .attr('alignment-baseline', 'middle')*/
}
