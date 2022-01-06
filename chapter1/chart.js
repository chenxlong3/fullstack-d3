async function drawLineChart() {
    //loading data
    const dataset = await d3.json("weather_data.json");
    const dataParser = d3.timeParse("%Y-%m-%d");

    // call-back function: input:d output: ...
    // get the data of x and y
    const xAccessor = d => dataParser(d.date);
    const yAccessor = d => d.temperatureMax;
    
    // set size parameters
    let dimensions = {
        width: window.innerWidth * 0.9,
        height: 400,
        margin: {
            top: 15,
            right: 15,
            bottom: 40,
            left: 60
        },
    };

    // calculate bounded width and bounded height
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    // select: select the specific element and implement some operations
    // 
    const wrapper = d3.select("#wrapper").append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height);

    const bounds = wrapper.append("g")
    .style("transform", `translate(
        ${dimensions.margin.left}px,
        ${dimensions.margin.right}px
    )`);

    const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0]);
    


}

drawLineChart()