/*
    Demonstrate how to create a line chart
*/

async function getData() {
    const response = await fetch('../data/trial-times.csv');
    const data = await response.text();     // CSV is in TEXT format

    const trials = [];      // x-axis labels = trial numbers
    const CY = [];          // y-axis control young times
    const SDY = [];         // y-axis sleep-deprived young times
    const CM = [];          // y-axis control middle times
    const SDM = [];         // y-axis sleep-deprived middle times
    const CO = [];          // y-axis control old times
    const SDO = [];         // y-axis sleep-deprived old times

    // \n - new line character
    // split('\n') will separate table into an array of indiv. rows
    // slice(start, end) - return a new array starting at index start
    //                     up to but not including index end.
    const table = data.split('\n').slice(1);

    table.forEach(row => {
        const columns = row.split(',');         // split each row on the commas

        const trial = columns[0];               // assign trial number
        trials.push(trial);                     // push trial number into trials array

        const cy = parseFloat(columns[1]);      // assign control young times
        CY.push(cy);                            // push control young times into CY array

        const sdy = parseFloat(columns[2]);     // assign sleep-deprived young times
        SDY.push(sdy);                          // push control young times into CY array

        const cm = parseFloat(columns[3]);      // assign control middle times
        CM.push(cm);                            // push control young times into CY array

        const sdm = parseFloat(columns[4]);     // assign sleep-deprived middle times
        SDM.push(sdm);                          // push control young times into CY array

        const co = parseFloat(columns[5]);      // assign control old times
        CO.push(co);                            // push control young times into CY array

        const sdo = parseFloat(columns[6]);     // assign sleep-deprived old times
        SDO.push(sdo);                          // push control young times into CY array
    });
    return {trials, CY, SDY, CM, SDM, CO, SDO};
}

async function createChart() {
    const data = await getData();    // createChart will wait until getData() is finished processing
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.trials,
            datasets: [
                {
                    label: 'Control Young',
                    data: data.CY,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Sleep-Deprived Young',
                    data: data.SDY,
                    fill: false,
                    backgroundColor: 'rgba(0, 102, 255, 0.2)',
                    borderColor: 'rgba(0, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Control Middle',
                    data: data.CM,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Sleep-Deprived Middle',
                    data: data.SDM,
                    fill: false,
                    backgroundColor: 'rgba(0, 102, 255, 0.2)',
                    borderColor: 'rgba(0, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Control Old',
                    data: data.CO,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Sleep-Deprived Old',
                    data: data.SDO,
                    fill: false,
                    backgroundColor: 'rgba(0, 102, 255, 0.2)',
                    borderColor: 'rgba(0, 102, 255, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,   // Re-size based on screen size
            scales: {           // Display options for x & y axes
                x: {
                    title: {
                        display: true,
                        text: 'Trial #',   // x-axis title
                        font: {            // font properties
                            size: 20
                        }
                    },
                    ticks: {
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Average Time to Cool Tile (seconds)',
                        font: {
                            size: 20
                        }
                    },
                    ticks: {
                        callback: function(val, index) {
                            // Labeling of tick marks can be controlled by code and font size
                            return index % 3 === 0 ? this.getLabelForValue(val) : '';
                        },
                        maxTicksLimit: 24,    // limit # of ticks
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {          // Display options
                title: {
                    display: true,
                    text: 'Average Spatial Learning Trial Times of Different Ages of Drosophila After a Night of Sleep Deprivation or Normal Sleep',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom'
                }
            }
        }
    });
}

createChart();