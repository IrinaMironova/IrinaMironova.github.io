const Million = 1000000;
let resultArray = [];
let countUnitNull = 0;
let countUnitOne = 0;
let countDoubleNull = 0;
let countDoubleOne = 0;
let countDoubleCombinedNullOne = 0;
let countDoubleCombinedOneNull = 0;
let countTripleNull = 0;
let countTripleOne = 0;
let countTripleCombinedNullNullOne = 0;
let countTripleCombinedNullOneNull = 0;
let countTripleCombinedOneNullNull = 0;
let countTripleCombinedOneOneNull = 0;
let countTripleCombinedNullOneOne = 0;

document.body.setAttribute("class", "noscroll");
document.getElementById("overlay").style.display = "block";
document.getElementById("spinner").style.display = "block";

//Чтоб не делать 100 запросов в связи с ограничениями random.org:
for(let i = 0; i < 4; i++) {
    fetch("https://www.random.org/integers/?num=10000&min=90000000&max=1000000000&col=1&base=2&format=plain&rnd=new")
        .then(res => {
            if(res.status === 200) {
                return res.text();
            }  
        })
        .then (data => {
            const array = data.split('');
            const result = array.filter(item => item !== '\n');
            resultArray = resultArray.concat(result);
            if(resultArray.length >= Million) {
                check(resultArray); 
            }  
        })
        .catch(function(error) {
            for(let j = 0; j < (Million / 4); j++) {
            	resultArray.push(getRandomInt(0, 1));
            }
            if(resultArray.length >= Million) {
                check(resultArray); 
            }
        });
}

function check(array) {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.body.className = document.body.className.replace(/\bnoscroll\b/,'');
    array.length = Million;
    console.log(array);
    for(let j = 0; j < Million; j++) {
        unit(parseInt(array[j]));
        double(parseInt(array[j]), parseInt(array[j + 1]));
        triple(parseInt(array[j]), parseInt(array[j + 1]), parseInt(array[j + 2]));
    }
    calc();
};

function calc() {
    document.querySelector('#null').textContent = countUnitNull;
    document.querySelector('#null_percent').textContent = (countUnitNull/10000).toFixed(2);
    const oilCanvas = document.getElementById("oilChart1");
    const oilData = {
        labels: ["0", "1"],
        datasets: [
            {
                data: [countUnitNull, countUnitOne],
                backgroundColor: ["#FF6384","#63FF84"]
            }
        ]
    };
    const pieChart = new Chart(oilCanvas, {
        type: 'pie',
        data: oilData
    });
    document.querySelector('#one').textContent = countUnitOne;
    document.querySelector('#one_percent').textContent = (countUnitOne/10000).toFixed(2);
    const oilCanvas2 = document.getElementById("oilChart2");
    const oilData2 = {
        labels: ["00","11","01","10"],
        datasets: [
            {
                data: [
                    countDoubleNull, 
                    countDoubleOne,
                    countDoubleCombinedNullOne, 
                    countDoubleCombinedOneNull
                ],
                backgroundColor: ["#FF6384","#63FF84","#7753ad","#8bf7cd"]
            }]
    };
    const pieChart2 = new Chart(oilCanvas2, {
        type: 'pie',
        data: oilData2
    });

    document.querySelector('#null_null').textContent = countDoubleNull;
    document.querySelector('#null_null_percent').textContent = (countDoubleNull * 100 / 999999).toFixed(2);
    document.querySelector('#one_one').textContent = countDoubleOne;
    document.querySelector('#one_one_percent').textContent = (countDoubleOne * 100 / 999999).toFixed(2);
    document.querySelector('#null_one').textContent = countDoubleCombinedNullOne;
    document.querySelector('#null_one_percent').textContent = (countDoubleCombinedNullOne * 100 / 999999).toFixed(2);
    document.querySelector('#one_null').textContent = countDoubleCombinedOneNull;
    document.querySelector('#one_null_percent').textContent = (countDoubleCombinedOneNull * 100 / 999999).toFixed(2);

    const oilCanvas3 = document.getElementById("oilChart3");
    const oilData3 = {
        labels: ["000","111","010","100","001","110","011"],
        datasets: [
            {
                data: [
                    countTripleNull, 
                    countTripleOne,
                    countTripleCombinedNullNullOne, 
                    countTripleCombinedNullOneNull,
                    countTripleCombinedOneNullNull, 
                    countTripleCombinedOneOneNull,
                    countTripleCombinedNullOneOne
                ],
                backgroundColor: [
                    "#FF6384",
                    "#63FF84",
                    "#7753ad",
                    "#8bf7cd",
                    "#1b94d3",
                    "#4fd31b",
                    "#ebf765",
                    "#21221b"
                ]
            }
        ]
    };
    const pieChart3 = new Chart(oilCanvas3, {
        type: 'pie',
        data: oilData3
    });

    document.querySelector('#null_null_null').textContent = countTripleNull;
    document.querySelector('#null_null_null_percent').textContent = (countTripleNull * 100 / 999998).toFixed(2);
    document.querySelector('#one_one_one').textContent = countTripleOne;
    document.querySelector('#one_one_one_percent').textContent = (countTripleOne * 100 / 999998).toFixed(2);
    document.querySelector('#null_null_one').textContent = countTripleCombinedNullNullOne;
    document.querySelector('#null_null_one_percent').textContent = (countTripleCombinedNullNullOne * 100 / 999998).toFixed(2);
    document.querySelector('#null_one_null').textContent = countTripleCombinedNullOneNull;
    document.querySelector('#null_one_null_percent').textContent = (countTripleCombinedNullOneNull * 100 / 999998).toFixed(2);
    document.querySelector('#one_null_null').textContent = countTripleCombinedOneNullNull;
    document.querySelector('#one_null_null_percent').textContent = (countTripleCombinedOneNullNull * 100 / 999998).toFixed(2);
    document.querySelector('#one_one_null').textContent = countTripleCombinedOneOneNull;
    document.querySelector('#one_one_null_percent').textContent = (countTripleCombinedOneOneNull * 100 / 999998).toFixed(2);
    document.querySelector('#null_one_one').textContent = countTripleCombinedNullOneOne;
    document.querySelector('#null_one_one_percent').textContent = (countTripleCombinedNullOneOne * 100 / 999998).toFixed(2);
};

function getRandomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};

function unit(element) {
    if(element === 0) {
        countUnitNull++;
    }
    if(element === 1) {
        countUnitOne++;
    }
};
function double(prevElement, nextElement) {
	if(prevElement === 0 && nextElement === 0) {
        countDoubleNull++;
    }
    if(prevElement === 1 && nextElement === 1) {
        countDoubleOne++;
    }
    if(prevElement === 0 && nextElement === 1) {
        countDoubleCombinedNullOne++;
    }
    if(prevElement === 1 && nextElement === 0) {
        countDoubleCombinedOneNull++;
    }
};

function triple(prevElement, nextElement, nextNextElem) {
	if(prevElement === 0 && nextElement === 0 && nextNextElem === 0) {
        countTripleNull++;
    }
    if(prevElement === 1 && nextElement === 1 && nextNextElem === 1) {
        countTripleOne++;
    }
    if(prevElement === 0 && nextElement === 0 && nextNextElem === 1) {
        countTripleCombinedNullNullOne++;
    }
    if(prevElement === 0 && nextElement === 1 && nextNextElem === 0) {
        countTripleCombinedNullOneNull++;
    }
    if(prevElement === 1 && nextElement === 0 && nextNextElem === 0) {
        countTripleCombinedOneNullNull++;
    }
    if(prevElement === 1 && nextElement === 1 && nextNextElem === 0) {
        countTripleCombinedOneOneNull++;
    }
    if(prevElement === 0 && nextElement === 1 && nextNextElem === 1) {
        countTripleCombinedNullOneOne++;
    }
};
