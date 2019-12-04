// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 600;

var chartMargin = {
  top: 30,
  right: 30,
  bottom:30,
  left: 30
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
    console.log(row.age);
    console.log(row.smokes);
  });





});
