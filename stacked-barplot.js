// Parse the Data
d3.csv("data/meteorites-barchart2.csv", function(data) {

svg = svgbarstacked

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(1)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.reclass)}).keys()

  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, barWidth])
      .padding([0.2])
  
    svg.append("g")

    .attr("transform", "translate(0," + (barHeight-margin.bottom) + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0))

    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("fill", "#396AA4")
        .style("font-Family", "Rubik");
    

  

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 108309455])
    .range([ (barHeight-margin.bottom), 0 ])
  
    svg.append("g")
    .call(d3.axisLeft(y))
    .call(d3.axisLeft(y).tickFormat(d3.format(".3s")))
    .selectAll("text")
        .style("fill", "#396AA4")
        .style("font-Family", "Rubik");



  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"]);


  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .attr("opacity", .7)
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.reclass); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth());     
})