
// Pharmacy Dashboard Charts

// Initialize ApexCharts for various dashboard components
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we're on pages with charts
    if (document.getElementById('salesPurchaseChart')) {
        initSalesVsPurchaseChart();
    }
    
    if (document.getElementById('customerChart')) {
        initCustomerChart();
    }
    
    if (document.getElementById('salesChart')) {
        initSalesChart();
    }
    
    if (document.getElementById('expiryTimelineChart')) {
        initExpiryTimelineChart();
    }
    
    if (document.getElementById('categoryDistributionChart')) {
        initCategoryDistributionChart();
    }
});

function initSalesVsPurchaseChart() {
    const options = {
        series: [{
            name: 'Sales',
            data: [4500, 5200, 4800, 5800, 6200, 7100, 6800, 7500, 8200, 8900, 9500, 10200]
        }, {
            name: 'Purchases',
            data: [3800, 4100, 4300, 4900, 5300, 5900, 6100, 6700, 7200, 7800, 8400, 9100]
        }],
        chart: {
            type: 'area',
            height: 300,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#2c7da0', '#2a9d8f'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                formatter: function(val) {
                    return '$' + val.toLocaleString()
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right'
        },
        grid: {
            borderColor: '#f1f1f1'
        }
    };

    const chart = new ApexCharts(document.getElementById('salesPurchaseChart'), options);
    chart.render();
}

function initCustomerChart() {
    const options = {
        series: [68, 32],
        chart: {
            type: 'donut',
            height: 200,
            sparkline: {
                enabled: true
            }
        },
        colors: ['#2c7da0', '#e9c46a'],
        labels: ['New Customers', 'Returning'],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            formatter: function(w) {
                                return '5.5K';
                            }
                        }
                    }
                }
            }
        }
    };

    const chart = new ApexCharts(document.getElementById('customerChart'), options);
    chart.render();
}

function initSalesChart() {
    const options = {
        series: [{
            name: 'Sales',
            data: [31, 40, 28, 51, 42, 109, 100, 85, 92, 110, 98, 120]
        }],
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false
            }
        },
        colors: ['#2c7da0'],
        stroke: {
            curve: 'smooth',
            width: 3
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#2a9d8f'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        markers: {
            size: 4,
            colors: ['#fff'],
            strokeColors: ['#2c7da0'],
            strokeWidth: 2,
            hover: {
                size: 7
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yaxis: {
            labels: {
                formatter: function(val) {
                    return '$' + val + 'k'
                }
            }
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return '$' + val + 'k'
                }
            }
        },
        grid: {
            borderColor: '#f1f1f1'
        }
    };

    const chart = new ApexCharts(document.getElementById('salesChart'), options);
    chart.render();

    // Add randomize functionality
    document.getElementById('btn-random')?.addEventListener('click', function() {
        const newData = options.series[0].data.map(() => Math.floor(Math.random() * 100) + 20);
        chart.updateSeries([{
            data: newData
        }]);
    });

    document.getElementById('btn-update')?.addEventListener('click', function() {
        const newData = [85, 92, 110, 98, 120, 115, 108, 102, 95, 88, 82, 78];
        chart.updateSeries([{
            data: newData
        }]);
    });
}

function initExpiryTimelineChart() {
    const options = {
        series: [{
            data: [
                { x: 'Amoxicillin 500mg', y: 45 },
                { x: 'Insulin Glargine', y: 25 },
                { x: 'Salbutamol Inhaler', y: 35 },
                { x: 'Atorvastatin 20mg', y: 120 },
                { x: 'Omeprazole 20mg', y: 60 }
            ]
        }],
        chart: {
            height: 300,
            type: 'bar',
            toolbar: {
                show: false
            }
        },
        colors: ['#e76f51', '#e9c46a', '#2a9d8f', '#2c7da0', '#61a5c2'],
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            formatter: function(val) {
                return val + ' days';
            },
            offsetX: 20,
            style: {
                fontSize: '12px',
                colors: ['#333']
            }
        },
        xaxis: {
            title: {
                text: 'Days until expiry'
            },
            max: 150
        },
        title: {
            text: 'Expiry Timeline',
            align: 'left',
            style: {
                fontSize: '14px',
                fontWeight: '500'
            }
        }
    };

    if (document.getElementById('expiryTimelineChart')) {
        const chart = new ApexCharts(document.getElementById('expiryTimelineChart'), options);
        chart.render();
    }
}

function initCategoryDistributionChart() {
    const options = {
        series: [35, 28, 15, 12, 10],
        chart: {
            type: 'pie',
            height: 300
        },
        labels: ['Antibiotics', 'Analgesics', 'Cardiovascular', 'Respiratory', 'Others'],
        colors: ['#2c7da0', '#2a9d8f', '#e9c46a', '#e76f51', '#61a5c2'],
        legend: {
            position: 'bottom'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    if (document.getElementById('categoryDistributionChart')) {
        const chart = new ApexCharts(document.getElementById('categoryDistributionChart'), options);
        chart.render();
    }
}