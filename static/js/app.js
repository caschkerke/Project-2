/**
 * Helper function to select sample data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * ==== samples.json structure breakdown ====
 * 
 * Array 0 - metadata:
 *  == Contains 153 nested arrays ==
 *  == Found within each nested array: ==
 *      - id
 *      - ethnicity
 *      - gender
 *      - age
 *      - location
 *      - bbtype
 *      - wfreq
 * 
 * Array 1 - names:
 *  == Contains 153 ID values ==
 * 
 * Array 2 - samples:
 *  == Contains 153 nested arrays ==
 *  == Found within each nested array: ==
 *      - an array of otu_ids
 *      - an array of sample_values
 *      - an array of otu_labels
 */

// same breakdown of the returned json I used on previous homework assignment, left in place if ends up necessary for easy-to-read csv documentation

// unpacking function if necessary to unpack csv data
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
}

//  Defining init function to hold a tentative "template" of graph/visual displays
function init() {
    d3.json("data/TODO.json").then((importedData) => {
        
        var data = importedData;
        var TODO = data.TODO
        var dropdownMenu = document.getElementById("selDataset"); 
        var TODO = [];

        for (var i = 0; i < TODO.length; i++) {
            
            var TODO = TODO[i].TODO;
            TODO.push(TODO);
            
            var ele = document.createElement("option");
            ele.textContent = TODO[i];
            ele.value = TODO[i];
            dropdownMenu.appendChild(ele);

        }

        var dataBar = [{
            x: [],
            y: []
        }];

        var layoutBar = {
            title: `TODO `,
            xaxis: { title: "TODO" },
            yaxis: { title: "TODO" }
        };

        Plotly.newPlot("bar", dataBar, layoutBar);

        console.log(TODO);
        console.log(TODO);
    })
}

// Calling updatePlotly() when a change to the DOM takes place
d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {

    d3.json("data/TODO.json").then((importedData) => {

// Defining + flattening dropdownmenu ID, flattening data calls
        var TODO = importedData;
        var TODO = data.TODO;
        var TODO = data.TODO;
        var dropdownMenu = d3.select("#selDataset");
        var dataset = dropdownMenu.property("value");

        console.log(m)

// Creating empty lists to hold matching iterated values
        var TODO = [];
        var TODO = [];
        var TODO = [];
        var TODO = [];
        var TODO = [];
        var TODO = [];
        var TODO = [];

        var TODO = [];
        var TODO = [];
        var TODO = [];
        var TODO = [];
        var TODO = [];
        var TODO = [];
        var TODO = [];
        
// Looping through dataset and pulling relevant values by ID
        for (var i = 0; i < TODO.length; i++) {
            
            var TODO = TODO[i].TODO;
            var TODO = TODO[i].TODO;

            if (TODO === dataset) {
                
                var TODO = TODO[i].TODO;        
                var TODO = TODO[i].TODO;
                var TODO = TODO[i].TODO;
                var TODO = TODO[i].TODO.slice(0, 10);        
                var TODO = TODO[i].TODO.slice(0, 10);
                var TODO = TODO[i].TODO.slice(0, 10);
                
                TODO.push(TODO);
                TODO.push(TODO);
                TODO.push(TODO);
                TODO.push(TODO);
                TODO.push(TODO);
                TODO.push(TODO);
                TODO.push(TODO);

            }

            if (TODO == dataset && TODO == TODO) {
                
                var TODO = TODO[i].TODO;
                var TODO = TODO[i].TODO;
                var TODO = TODO[i].TODO;
                var TODO = TODO[i].TODO;
                var TODO = TODO[i].TODO;
                var TODO = TODO[i].TODO;

                TODO.push(TODO);
                TODO.push(TODO);
                TODO.push(TODO);
                TODO.push(TODO);
                TODO.push(TODO);
                TODO.push(TODO);
                TODO.push(TODO);

            }
        }

// Verifying successful data import via console
        console.log(TODO);
        console.log(TODO);
        console.log(TODO);
        console.log(TODO);
        console.log(TODO),
        console.log(TODO);

        console.log(TODO);
        console.log(TODO);
        console.log(TODO);
        console.log(TODO);
        console.log(TODO);
        console.log(TODO);
        console.log(TODO);
        console.log(TODO);
// Populating panel with information
        var p1 = document.getElementById("TODO")
        p1.textContent = `TODO: ${TODO}`;

        var p2 = document.getElementById("TODO")
        p2.textContent = `TODO: ${TODO}`;

        var p3 = document.getElementById("TODO")
        p3.textContent = `TODO: ${TODO}`;

        var p4 = document.getElementById("TODO")
        p4.textContent = `TODO: ${TODO}`;

        var p5 = document.getElementById("TODO")
        p5.textContent = `TODO: ${TODO}`;

        var p6 = document.getElementById("TODO")
        p6.textContent = `TODO: ${TODO}`;
        
        var p7 = document.getElementById("TODO")
        p7.textContent = `TODO: ${TODO}`;

// Creating chart traces

        var traceBar = {
            type: "bar",
            x: TODO[0],
            y: `${TODO}`,
            text: TODO[0],
            marker: { 
                color: "#009999",
                line: {
                    width: 2
                },
            },
            orientation: "h",
        };

        var traceBubble = {

            x: TODO[0],
            y: TODO[0],
            mode: "markers",
            marker: {
                size: TODO[0],
                sizeref: 0.1,
                sizemode: "area"
            },
            text: TODO[0],
            type: "scatter"
        };

// Defining chart datasets
        var dataBar = [traceBar];
        var dataBubble = [traceBubble];
        
// Defining chart layouts/styles
        var layoutBar = {
            title: `TODO ${dataset}`,
            xaxis: { 
                title: "TODO",
                autorange: true
            },
            yaxis: { 
                autotick: false
            }
        };

        var layoutBubble = {
            xaxis: {
                title: "TODO"
            }
        };

// Opted to use purge instead of restyle/update when creating new bar graphs by user selection
        Plotly.purge("bar");

// Creating the charts
        Plotly.newPlot("bar", dataBar, layoutBar);
        Plotly.newPlot("bubble", dataBubble, layoutBubble);
    });
}

// Running initialization function
init();