const barChart = document.getElementById('barChart');

new Chart(barChart, {
    type: 'bar',
    data: {
        labels: ['18-25','26-35','36-45','46-55','56+'],
        datasets: [{
            label: 'Customers',
            data: [180,320,250,150,100]
        }]
    }
});

const pieChart = document.getElementById('pieChart');

new Chart(pieChart, {
    type: 'pie',
    data: {
        labels: ['Male','Female'],
        datasets: [{
            data: [60,40]
        }]
    }
});

Papa.parse("data/store_customers.csv", {

    download: true,
    header: true,

    complete: function(results){

        console.log(results.data);

    }

});