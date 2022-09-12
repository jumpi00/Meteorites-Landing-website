/*
 * hbar.js
 * 
 * D3 code to draw a simple horizontal bar chart
 */

function drawHBar(container, data, parameters={}) {
    // Select the default parameters or select from provided parameters
    const yCol = parameters['yCol'] || data.columns[0]
    const xCol = parameters['xCol'] || data.columns[1]
    const colours = parameters['colours'] || d3.schemeCategory10

    // Create our D3 Simple object
    let chart = new D3SI(container, data, parameters)

    // Create our scales to map data to screen position and colours
    let xScale = chart.xScaleLinear(xCol)
    let yScale = chart.yScaleBand(yCol) 
    let colourScale = chart.colourScaleOrdinal(yCol, colours) 
    let minx = 0 // min value on x axis

    // Get a selection object representing all the bars we want in the chart
    let barSelection = chart.bind('rect')

    // Add the bars to the chart
    barSelection
         // Handle 'entered' data items by creating a rect for each one
        .enter()
        .append("rect")
            .attr("x",        function(d) { return xScale(minx) })
            .attr("y",        function(d) { return yScale(d[yCol]) })
            .attr("height",   yScale.bandwidth())
            .attr("width",    function(d) { return xScale(d[xCol])-xScale(minx) })        
            .style("fill",    chart.colourMap(yCol, colourScale) )
            .style("opacity", 1)

    // Add axes
    chart.drawAxisXTop(xScale, xCol)
    chart.drawAxisYLeft(yScale, yCol) 
}
