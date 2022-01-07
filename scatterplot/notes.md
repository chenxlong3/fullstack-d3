# Scatter Plot

## Steps in drawing any chart
1. Access data
    Look at the data structure and declare how to access the values we will need.
2. Create chart dimensions
    Declare the physical chart parameters
3. Draw canvas
   Render the chart area and bounds element
4. Create scales
   Create scales for every data-to-physical attribute in our chart
5. Draw data
   Render your data elements.
6. Draw peripherals
   Render your axes, labels, legends, etc.
7. Set up interactions
   Initialize event listeners and create interaction behavior.



## Data join
When .data() is called, we are joining our selected elements with our array of data points. The returned selection will have a list of existing elements, new elements that need to be added, and old elements that need to be removed.
