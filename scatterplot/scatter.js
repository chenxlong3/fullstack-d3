async function drawScatter() {
    let dataset = await d3.json("../data/weather_data.json");
    const x_accessor = d => d.dewpoint;
    const y_accessor = d => d.humidity;
    
}

drawScatter();