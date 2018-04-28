var width = window.innerWidth;
var height = window.innerHeight;

var yScale = d3.scaleLog()
    .base(10)
    .domain([1000, 1000000])
    .range([100, height-100]);
    
var xScale = d3.scaleLog()
    .base(10)
    .domain([10000, 1000000])
    .range([100, width-100]);
    
d3.json('repos.json', function(error, data) {
    
    if (error) throw error;
    console.log(data);
    
    var viz = d3.select('#viz1');

    viz
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', 'lightpink')
    .selectAll('.textcourse')
    .data(data)
    .enter()
        .append('text')
        .transition()
        .duration(1000)
        .ease(d3.easeBounceOut)
        .text(function (d) {return d.name})
        .attr("x", width/2)
        .attr("y", function (d) {return yScale(d.size)})
        .attr('text-anchor', 'middle')
        .attr('fill', 'blue')
        .attr('opacity', '0.5')
        .style('font-size', '14px')
        .style('letter-spacing', '2px')
        .style('font-family', 'Helvetica')
        .style('font-weight', 'bold')
        .style('text-transform', 'uppercase')
        ;
    
    });
    
function updateData() {
    
    console.log('hello');
    
    d3.selectAll('text')
    .transition()
    .duration(1000)
    .ease(d3.easeBounceOut)
    .attr("x", function (d) {
        return xScale(d.stargazers_count)});
    
    
}