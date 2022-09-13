// Parse the Data
d3.csv("data/meteorites-barchart.csv", function(data) {

svg = svgbar

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 107309420.2])
    .range([ 0, barWidth]);

   
  svg.append("g")
    .attr("transform", "translate(0," + (barHeight-margin.top) + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([ margin.top, barHeight-margin.top ])
    .domain(data.map(function(d) { return d.recclass; }))
    .padding(.1);
    
  svg.append("g")
    .call(d3.axisLeft(y))

  //Bars
  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    .attr("y", function(d) { return y(d.recclass); })
    .attr("width", function(d) { return x(d.mass); })
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")


    // .attr("x", function(d) { return x(d.Country); })
    // .attr("y", function(d) { return y(d.Value); })
    // .attr("width", x.bandwidth())
    // .attr("height", function(d) { return height - y(d.Value); })
    // .attr("fill", "#69b3a2")

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

})

