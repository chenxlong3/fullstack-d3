async function barChart() {
    const dataset = await d3.json("../data/weather_data.json");
    const width = 400;
    let dimensions = {
        width: width,
        height: width * 0.6,
        margin: {
            top: 30,
            right: 10,
            bottom: 50,
            left: 50
        }
    }

    dimensions.bounded_width = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.bounded_height = dimensions.height - dimensions.margin.bottom - dimensions.margin.top;
    const metrics = [
        "windSpeed",
        "moonPhase",
        "dewPoint",
        "humidity",
        "uvIndex",
        "windBearing",
        "temperatureMin",
        "temperatureMax"
    ]
    const drawHist = metric => {
        const dAccessor = d => d[metric]
        const wrapper = d3.select("#wrapper")
            .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height);

        const bounds = wrapper.append("g")
            .style("transform", `translate(
        ${dimensions.margin.left}px,
        ${dimensions.margin.top}px
    )`);

        const xScale = d3.scaleLinear()
            .domain(d3.extent(dataset, dAccessor))
            .range([0, dimensions.bounded_width])
            .nice();
        const binsGen = d3.histogram()
            .domain(xScale.domain())
            .value(dAccessor)
            .thresholds(13);

        const bins = binsGen(dataset);
        console.log(bins);

        const yAccessor = d => d.length;
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(bins, yAccessor)])
            .range([dimensions.bounded_height, 0])
            .nice();

        const binsGroup = bounds.append("g");
        const binsGroups = binsGroup.selectAll("g")
            .data(bins)
            .enter().append("g");

        const bar_padding = 1;
        const bar_rects = binsGroups.append('rect')
            .attr('x', d => xScale(d.x0) + bar_padding / 2)
            .attr('y', d => yScale(yAccessor(d)))
            .attr('width', d => d3.max([0, xScale(d.x1) - xScale(d.x0) - bar_padding]))
            .attr('height', d => dimensions.bounded_height - yScale(yAccessor(d)))
            .style('fill', 'cornflowerblue');

        // Adding labels
        const bar_text = binsGroups.filter(yAccessor)
            .append("text")
            .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
            .attr("y", d => yScale(yAccessor(d)) - 5)
            .text(yAccessor)
            .style("text-anchor", "middle")
            .attr("fill", "darkgrey")
            .style("font-size", "12px")
            .style("font-family", "sans-serif");

        const mean = d3.mean(dataset, dAccessor);

        const mean_line = bounds.append("line")
            .attr("x1", xScale(mean))
            .attr("x2", xScale(mean))
            .attr("y1", -15)
            .attr("y2", dimensions.bounded_height)
            .attr("stroke", "maroon")
            .attr("stroke-dasharray", "2px 4px");

        const mean_label = bounds.append("text")
            .attr("x", xScale(mean))
            .attr("y", -20)
            .text("mean")
            .attr("fill", "maroon")
            .style("font-size", "12px")
            .attr("text-anchor", "middle");

        const xAxisGen = d3.axisBottom()
            .scale(xScale);

        const x_ax = bounds.append("g")
            .call(xAxisGen)
            .style("transform", `translateY(${dimensions.bounded_height}px)`);
        const x_label = x_ax.append("text")
            .attr("x", dimensions.bounded_width / 2)
            .attr("y", dimensions.margin.bottom - 10)
            .attr("fill", "black")
            .style("font-size", "1.4em")
            .text(metric)
            .style("text-transform", "capitalize")
    }
    metrics.forEach(drawHist);
}

barChart()