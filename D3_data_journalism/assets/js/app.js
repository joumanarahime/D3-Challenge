// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 600;

var chartMargin = {
  top: 30,
  right: 30,
  bottom:100,
  left: 100
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("./assets/data/data.csv").then(function(data) {

  // Print the Data
  // console.log(censusData);
  data.forEach(row =>{
    row.age = +row.age;
    row.smokes = +row.smokes;
  });



  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, function(data){return data.age}), d3.max(data, function(data) {return data.age})])
    .range([0, chartWidth]);

  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(data, function(data){return data.smokes}), d3.max(data, function(data) {return data.smokes})])
    .range([chartHeight, 0]);

  var xAxis = d3.axisBottom(xLinearScale);
  var yAxis = d3.axisLeft(yLinearScale);


  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

  chartGroup.append("g")
    .call(yAxis);
  
  var div= d3.select("body").append("div").attr("class","toolTip").style("opacity",1);

  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age+1))
    .attr("cy", d => yLinearScale(d.smokes+0.3))
    .attr("r", "15")
    .attr("opacity", ".8")
    .attr("stroke-width", "0.5");

  chartGroup.selectAll("text")
    .data(data) 
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", (d,i) => xLinearScale(d.age + 1))
    .attr("y", d => yLinearScale(d.smokes+0.2))
    .attr("class","stateText");


  circlesGroup.on("mouseover", function(data, i){
    d3.select(this)
    .transition()
    .duration(1000)
    .style("opacity", 1);

    div.transition()
      .duration(200)
      .style("opacity", 0.9);

    div.html(`${data.state} <br> avg. age: ${data.age} <br> smokes: ${data.smokes}%`)
      .style("left",(d3.event.pageX) + "px")
      .style("top", (d3.event.pageY) + "px")

  });  
    
 
  
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin.left + 20)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Age (Median)")  ;


  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 40})`)
    .classed("active", true)
    .attr("class", "axisText")
    .text("Smokes (%)");  
});
