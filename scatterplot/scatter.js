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
    
    // Using loop
    // dataset.foreach(d => {
    //     bounds
    //     .append("circle")
    //     .attr("cx", x_scale(x_accessor(d)))
    //     .attr("cy", y_scale(y_accessor(d)))
    //     .attr("r", 5);
    // });

    // const dots = bounds.selectAll("circle")
    //     .data(dataset)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", d => x_scale(x_accessor(d)))
    //     .attr("cy", d => y_scale(y_accessor(d)))
    //     .attr("r", 5)
    //     .attr("fill", "skyblue");
    function drawDot(dataset, color) {
        const dots = bounds.selectAll("circle").data(dataset);
    
        dots.enter().append("circle")
        .merge(dots)
        .attr("cx", d => x_scale(x_accessor(d)))
        .attr("cy", d => y_scale(y_accessor(d)))
        .attr("r", 10)
        .attr("fill", color);
    }
    // drawDot(dataset.slice(0, 200), "grey");
    // setTimeout(() => {
    //     drawDot(dataset, "cornflowerblue")
    // }, 1000);
    // Draw Peripherals
    const x_axis_gen = d3.axisBottom().scale(x_scale);
    const x_axis = bounds.append("g")
    .call(x_axis_gen)
    .style("transform", `translateY(${dimensions.bounded_height}px)`);
    // coordinates are relative to the x_axis
    const x_label = x_axis.append("text")
    .attr("x", dimensions.bounded_width / 2)
    .attr("y", dimensions.margin.bottom - 10)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .html("Dew point (&deg;F)");

    const y_axis_gen = d3.axisLeft().scale(y_scale).ticks(4);
    const y_axis = bounds.append("g")
    .call(y_axis_gen);
    
    // coordinates?
    const y_label = y_axis.append("text")
    .attr("x", -dimensions.bounded_height / 2)
    .attr("y", -dimensions.margin.left + 10)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .text("Relative humidity")
    .style("transform", "rotate(-90deg)")
    .style("text-anchor", "middle");
    
    const color_accessor = d => d.cloudCover;
    const color_scale = d3.scaleLinear()
    .domain(d3.extent(dataset, color_accessor))
    .range(["skyblue", "darkslategrey"]);
    
    drawDot(dataset, d => color_scale(color_accessor(d)));

}


drawScatter();