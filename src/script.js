document.querySelector('.fa-search')
	.addEventListener("click", function() {
		document.querySelector('.search').classList.toggle('hidden');
	});

document.querySelector('.submenu').addEventListener('click', ({target}) => {
	document.querySelectorAll('.submenu>li').forEach(function(item) {
		item.classList.remove('active');
	});
	target.parentNode.classList.add('active');
})


document.querySelector('.text')
	.addEventListener("click", function() {
		document.querySelector('.enter_form').classList.toggle('hidden');
	});

document.querySelector('.adress > button')
	.addEventListener("click", function() {
		document.querySelector('.callback_form').classList.toggle('hidden');
		document.querySelector('.content').classList.add('dark');
		document.querySelector('footer').classList.add('dark');
	});

document.querySelector('#close')
	.addEventListener("click", function() {
		document.querySelector('.callback_form').classList.toggle('hidden');
		document.querySelector('.content').classList.remove('dark');
		document.querySelector('footer').classList.remove('dark');
	});	

const $galWrapper = document.querySelector('.bg');
const circleFirst = document.querySelector('.circle1');
const circleSecond = document.querySelector('.circle2');
const circleThird = document.querySelector('.circle3');


circleFirst.addEventListener('click', function() {
	clearBg(document.querySelectorAll('.circle'));
	$galWrapper.style.marginLeft = '0px';
	$galWrapper.style.transition = 'margin-left 1s';
	circleFirst.style.backgroundColor = 'white';
	document.querySelector('.content').style.background = 'radial-gradient(circle, #cdf3de, #849d8f)';
	document.querySelector('footer').style.background = '#849d8f';
});

$galWrapper.style.marginLeft = '0px';

circleSecond.addEventListener('click', function() {
	clearBg(document.querySelectorAll('.circle'));
	$galWrapper.style.transition = 'margin-left 1s';
	$galWrapper.style.marginLeft = '-650px';
	circleSecond.style.backgroundColor = 'white';
	document.querySelector('.content').style.background = 'radial-gradient(circle, #bfdcd8, #8996a6)';
	document.querySelector('footer').style.background = '#8996a6';
});

circleThird.addEventListener('click', function() {
	clearBg(document.querySelectorAll('.circle'));
	$galWrapper.style.transition = 'margin-left 1s';
	$galWrapper.style.marginLeft = '-1300px';
	circleThird.style.backgroundColor = 'white';
	document.querySelector('.content').style.background = 'radial-gradient(circle, #cee2d8, #9d8b84)';
	document.querySelector('footer').style.background = '#9d8b84';
});

function clearBg(elem) {
	elem.forEach(function(item) {
		item.style.backgroundColor = 'transparent';
	}) 
};

let count = 0;
const ul = document.querySelector('.product');
const template = document.querySelector('#tmpl');
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 0;
document.querySelector('.pieces').addEventListener('click',({target}) => {
	let sum = 0;
	if(target.classList.contains('type_icecream')) {
		count++;
		let liTempl = template.content.querySelector("li");
		let newText = template.content.querySelector(".replace");
		let newKg = template.content.querySelector(".kg");
		let newImg = template.content.querySelector(".img");
		let priceForOne = template.content.querySelector(".priceForOne");
		let price = template.content.querySelector(".totalPrice");

		const name = target.parentNode.children[3].textContent;
		newText.textContent = name;
		priceForOne.textContent = target.parentNode.children[2].children[0].textContent;
		
		let countForItem1 = 0;
		let countForItem2 = 0;
		let countForItem3 = 0;
		let countForItem4 = 0;

		if(target.classList.contains('type_icecream1')) {
			newImg.style.background = 'url(img/корзина1.png) no-repeat';
			countForItem1++;
			counter1 += countForItem1;
			newKg.textContent = counter1;
		} else if (target.classList.contains('type_icecream2')) {
			newImg.style.background = 'url(img/корзина2.png) no-repeat';
			countForItem2++;
			counter2 += countForItem2;
			newKg.textContent = counter2;
		} else if (target.classList.contains('type_icecream3')) {
			newImg.style.background = 'url(img/корзина3.png) no-repeat';
			countForItem3++;
			counter3 += countForItem3;
			newKg.textContent = counter3;
		} else {
			newImg.style.background = 'url(img/корзина4.png) no-repeat';
			countForItem4++;
			counter4 += countForItem4;
			newKg.textContent = counter4;
		}
		price.textContent = +newKg.textContent * +priceForOne.textContent;

		let clone = document.importNode(liTempl, true);
		const liAdd = ul.appendChild(clone);

		document.querySelectorAll('.closeLi').forEach(item => {
			item.addEventListener('click', function() {
				this.parentElement.remove();
				count = 0;
				countForItem = 0;
				document.querySelectorAll('.kg').forEach (function(item) {
					count += +item.textContent;
				});
				sum = 0;
				document.querySelectorAll('.totalPrice').forEach (function(item) {
					sum += +item.textContent;
				});
				document.querySelector('.basket').children[1].textContent = count + text;
				document.querySelector('.sum').textContent = sum;


				if(target.parentNode.children[3].textContent === 'Сливочное с апельсиновым джемом и цитрусовой стружкой') {
					countForItem1 = 0;
					counter1 = 0;
				} else if (target.parentNode.children[3].textContent === 'Сливочно-кофейное с кусочками шоколада') {
					countForItem2 = 0;
					counter2 = 0;
				} else if (target.parentNode.children[3].textContent === 'Сливочно-клубничное с присыпкой из белого шоколада' ){
					countForItem3 = 0;
					counter3 = 0;
				} else {
					countForItem4 = 0;
					counter4 = 0;
				}
				if (count === 0) {
					document.querySelector('.basket').children[1].textContent = 'Пусто';
					document.querySelector('.basket').children[0].style.color = 'white';
					document.querySelector('.items').classList.toggle('hidden');
				} else {
					let text = checkText();
					document.querySelector('.basket').children[1].textContent = count + text; 
				}
			});
		});
		let text = checkText();
		document.querySelector('.basket').children[1].textContent = count + text; 

		const arrayName = document.querySelectorAll('.replace');
		for(let j = 0; j < document.querySelectorAll('.replace').length; j++) {
			for(let i = j + 1; i < document.querySelectorAll('.replace').length; i++) {
				if( arrayName[i].textContent === arrayName[j].textContent) {
					arrayName[j].parentNode.remove();
				} 
			}
		};
		sum = 0;
		document.querySelectorAll('.totalPrice').forEach(function(item) {
			sum += +item.textContent;
		});
		
		document.querySelector('.sum').textContent = sum;
	}
});

document.querySelector('.basket').addEventListener('click', function() {
	if(document.querySelector('.product').children.length !== 0) {
		document.querySelector('.items').classList.toggle('hidden');
	}
});

function checkText() {
	let text;
	if(count === 1) {
		text = ' товар';
		document.querySelector('.basket').children[0].style.color = 'red';
		return text;
	} else if(count > 1 && count <= 5) {
		text = ' товара';
		return text;
	} else {
		text = ' товаров';
		return text;
	}
}





