// Parse the Data
d3.csv("data/meteorites-landing-mass-composition-barchart.csv", function(data) {
 
  console.log("HERE!!!!!!!!!!!!!!!!!!!!")
  console.log(data)
  console.log(barWidth)
  console.log(barHeight)
  console.log(margin.top)
svg = svgbar

console.log(svgbar)



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

})