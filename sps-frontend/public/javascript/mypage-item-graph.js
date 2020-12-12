// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function setUpGraph(resultData) { // "식품", "의류", "교육", "교통", "생활"
    console.log(resultData);
    // Pie Chart Example
    const ctx = document.getElementById("myPieChart");
    const myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['식품', '의류', '교육', '교통', '생활'],
            datasets: [{
                data: [resultData[0], resultData[1], resultData[2], resultData[3], resultData[4]],
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#a4dd4a', '#9c6be8'],
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#8ac430', '#7d59d3'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: true,
                caretPadding: 10,
            },
            legend: {
                display: true
            },
            cutoutPercentage: 80,
        },
    });
}
