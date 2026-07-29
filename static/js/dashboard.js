// ================= Get Data from Flask =================

const ageLabels = JSON.parse(document.getElementById("age-labels").textContent);
const ageValues = JSON.parse(document.getElementById("age-values").textContent);

const genderLabels = JSON.parse(document.getElementById("gender-labels").textContent);
const genderValues = JSON.parse(document.getElementById("gender-values").textContent);

const clusterLabels = JSON.parse(document.getElementById("cluster-labels").textContent);
const clusterValues = JSON.parse(document.getElementById("cluster-values").textContent);

const income = JSON.parse(document.getElementById("income-data").textContent);
const spending = JSON.parse(document.getElementById("spending-data").textContent);


// ================= Age Chart =================

new Chart(document.getElementById("ageChart"),{

    type:"bar",

    data:{

        labels:ageLabels,

        datasets:[{

            label:"Customers",

            data:ageValues,

            backgroundColor:[
                "#6C63FF",
                "#F59E0B",
                "#10B981",
                "#EF4444"
            ],

            borderRadius:8

        }]

    },

    options:{

    responsive:true,

    maintainAspectRatio:false,

    animation:{
        duration:1800,
        easing:"easeOutQuart"
    },
    plugins:{
        legend:{
            labels:{
                font:{
                    size:14
                }
            }
        }
    },
    scales:{
        x:{
            title:{
                display:true,
            }
        },
        y:{
            title:{
                display:true,
                text:"Spending Score"
            }
        }
    }
}
});


// ================= Gender Chart =================

new Chart(document.getElementById("genderChart"),{

    type:"pie",
    maintainAspectRatio:false,
    plugins:{
        legend:{
            labels:{
                font:{
                    size:14
                }
            }
        }
    },

    data:{

        labels:genderLabels,
        hoverOffset : 20,

        datasets:[{

            data:genderValues,

            backgroundColor:[
                "#EC4899",
                "#06B6D4"
            ]
            

        }]

    },
    options:{

    responsive:true,

    maintainAspectRatio:false,

    animation:{
        duration:1800,
        easing:"easeOutQuart"
    },
}

});


// ================= Segment Chart =================

new Chart(document.getElementById("segmentChart"),{

    type:"doughnut",
    plugins:{
        legend:{
            labels:{
                font:{
                    size:14
                }
            }
        }
    },

    data:{

        labels:clusterLabels,

        datasets:[{

            data:clusterValues,

            backgroundColor:[
                "#8B5CF6",
                "#EC4899",
                "#06B6D4",
                "#10B981",
                "#F59E0B"
            ]

        }]

    },
     options:{

    responsive:true,

    maintainAspectRatio:false,

    animation:{
        duration:1800,
        easing:"easeOutQuart"
    },
}

});


// ================= Income vs Spending =================

new Chart(document.getElementById("incomeChart"),{

    type:"scatter",
    plugins:{
        legend:{
            labels:{
                font:{
                    size:14
                }
            }
        }
    },

    data:{

        datasets:[{

            label:"Customers",

            data:income.map((x,index)=>({

                x:x,
                y:spending[index]

            })),

            backgroundColor:"#7C3AED",

            pointRadius:6

        }]

    },

    options:{

        responsive:true,

        maintainAspectRatio:false,

        animation:{
            duration:1800,
            easing:"easeOutQuart"
        },
        scales:{

            x:{
                title:{
                    display:true,
                    text:"Annual Income (k$)"
                }
            },

            y:{
                title:{
                    display:true,
                    text:"Spending Score"
                }
            }

        }

    }

});
// ================= SEARCH CUSTOMER =================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("keyup", function () {

        const filter = this.value.toLowerCase();

        const rows = document.querySelectorAll("tbody tr");

        rows.forEach(function (row) {

            const cells = row.querySelectorAll("td");

            let found = false;

            cells.forEach(function (cell) {

                if (cell.textContent.toLowerCase().includes(filter)) {
                    found = true;
                }

            });

            row.style.display = found ? "" : "none";

        });

    });

});
// ================= GENDER FILTER =================

const genderFilter = document.getElementById("genderFilter");

genderFilter.addEventListener("change", function () {

    const gender = this.value;

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(function(row){

        const rowGender = row.cells[1].textContent;

        if(gender === "" || rowGender === gender){

            row.style.display = "";

        }
        else{

            row.style.display = "none";

        }

    });

});
// ================= SEGMENT FILTER =================

const segmentFilter = document.getElementById("segmentFilter");

segmentFilter.addEventListener("change", function () {

    const selectedSegment = this.value;

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(function(row){

        const segment = row.cells[5].textContent.trim();

        if(selectedSegment === "" || segment === selectedSegment){

            row.style.display = "";

        }else{

            row.style.display = "none";

        }

    });

});
// ================= KPI COUNTER =================

function animateValue(id, start, end, duration){

    let obj=document.getElementById(id);

    let range=end-start;

    let current=start;

    let increment=end>start?1:-1;

    let stepTime=Math.abs(Math.floor(duration/range));

    let timer=setInterval(function(){

        current+=increment;

        obj.textContent=current;

        if(current==end){

            clearInterval(timer);

        }

    },stepTime);

}

animateValue("totalCustomers",0,1000,1500);
animateValue("avgAge",0,34,1500);
animateValue("avgIncome",0,61,1500);
animateValue("avgSpending",0,50,1500);