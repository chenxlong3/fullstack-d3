async function drawScatter() {
    let dataset = await d3.json("../data/weather_data.json");
    const x_accessor = d => d.dewPoint;
    const y_accessor = d => d.humidity;

    const width = d3.min([
        window.innerWidth * 0.9,
        window.innerHeight * 0.9
    ]);
    let dimensions = {
        width: width,
        height: width,
        margin: {
            top: 10,
            right: 10,
            bottom: 50,
            left: 50
        }
    };
    dimensions.bounded_width = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.bounded_height = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

    const bounds = wrapper.append("g")
        .style("transform", `translate(
        ${dimensions.margin.left}px,
        ${dimensions.margin.top}px
    )`);

    const x_scale = d3.scaleLinear()
        .domain(d3.extent(dataset, x_accessor))
        .range([0, dimensions.bounded_width])
        .nice();

    const y_scale = d3.scaleLinear()
        .domain(d3.extent(dataset, y_accessor))
        .range([dimensions.bounded_height, 0])
        .nice();

    // dataset.foreach(d => {
    //     bounds
    //     .append("circle")
    //     .attr("cx", x_scale(x_accessor(d)))
    //     .attr("cy", y_scale(y_accessor(d)))
    //     .attr("r", 5);
    // });

    const dots = bounds.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", d => x_scale(x_accessor(d)))
        .attr("cy", d => y_scale(y_accessor(d)))
        .attr("r", 5)
        .attr("fill", "skyblue");

}

drawScatter();