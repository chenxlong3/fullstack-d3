async function drawScatter() {
    let dataset = await d3.json("../data/weather_data.json");
    const x_accessor = d => d.dewPoint;
    const y_accessor = d => d.humidity;
    // TextDecoderStream
    // tesata
    // teatae
}

drawScatter();