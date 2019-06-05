const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fileInputFirst = document.getElementById('firstInput');
const fileInputSecond = document.getElementById('secondInput');
const btn = document.querySelector('.btn');

fileInputFirst.addEventListener('change', handleImg);
fileInputSecond.addEventListener('change', handleImg);
btn.addEventListener('click', turnOver);

let x = 0;
let y = 0;
let arrayOfImagesFirst = [];
let arrayOfImagesSecond = [];
let array = [];
let isTurned = false;


function handleImg(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;

        if (e.target === fileInputFirst) {
            	arrayOfImagesFirst.push(img);
        } else {
            	arrayOfImagesSecond.push(img);
        }

        array = arrayOfImagesFirst.concat(arrayOfImagesSecond);

        img.onload = function() {
            drawCanvas(array);
        }
    }
    reader.readAsDataURL(e.target.files[0]);  
    e.target.value = '';
}
function drawCanvas(arr) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let stepX = 0;
	let stepY = 0;
	const size = 200;

	if(!isTurned) {
        for (var i = 0; i < arr.length; i++) {
        	let ratio  = arr[i].width / arr[i].height;
  			ctx.drawImage(arr[i], 0, 0, arr[i].width, arr[i].height, stepX, y, size * ratio, size);
  			stepX += size * ratio;
 		}
    } else {
        for (var i = 0; i < arr.length; i++) {
        	let ratio  = arr[i].width / arr[i].height;
  			ctx.drawImage(arr[i], 0, 0, arr[i].width, arr[i].height, x, stepY, size, size / ratio);
  			stepY += size / ratio;
 		}
    }
}

function turnOver() {
	isTurned = !isTurned;
	drawCanvas(array);
}