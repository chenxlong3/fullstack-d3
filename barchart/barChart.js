async function barChart() {
    const dataset = await d3.json("../data/weather_data.json");
    const dAccessor = d => d.humidity;

    const width = 800;
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
    dimensions.bounded_height = dimensions.width - dimensions.margin.bottom - dimensions.margin.top;

    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimensions.bounded_width)
        .attr("height", dimensions.bounded_height);

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
        .thresholds(12);

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

}

barChart()