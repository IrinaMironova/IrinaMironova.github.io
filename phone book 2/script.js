const plus = document.querySelector('#plus');
const field = document.querySelector('.field');
const list = document.querySelector('.list');
const iconDelete = document.querySelector('.icon_delete');
const save = document.querySelector('#save');

const template = document.querySelector('#tmpl');
const templateInfo = document.querySelector('#tmpl_info');
const templateTel = document.querySelector('#tel_info');

const ul = document.querySelector('ul');
const name = document.querySelector('#name');

const company = document.querySelector('#company');
const bday = document.querySelector('#bday');
const dateMonth = new Date().getMonth();
const dateDay = new Date().getDate();


plus.addEventListener('click', function() {
	const inputAdded = document.querySelectorAll('.added');
	if(inputAdded) {
		inputAdded.forEach(function(item) {
			item.remove();
		});
	}
	clear();
	toggle();
});
	
save.addEventListener('click', () => {
	let liTempl = template.content.querySelector("li");
	let newText = template.content.querySelector(".replace");
	newText.textContent = name.value.trim();
	let clone = document.importNode(liTempl, true);

	let divTempl = templateInfo.content.querySelector("div");
	
	const newTel = templateInfo.content.querySelectorAll(".number");

	for (let i = 0; i < document.querySelectorAll('.tel').length; i ++) {
		newTel[i].textContent = document.querySelectorAll('.tel')[i].value;
	}

	const newComp = templateInfo.content.querySelectorAll(".job")
	newComp.forEach(function(item) {
		item.textContent = company.value.trim();
	})
	
	const hidDate = templateInfo.content.querySelectorAll('.date');
	hidDate.forEach(function(item) {
		item.textContent = bday.value;
	})

	const newB = templateInfo.content.querySelectorAll(".birthday");
	newB.forEach(function(item) {
		item.textContent = bday.valueAsDate.getDate();
	})
	const newMonth = templateInfo.content.querySelectorAll(".birthmonth");
	newMonth.forEach(function(item) {
		item.textContent = bday.valueAsDate.getMonth() + 1;
	});

	const newYear = templateInfo.content.querySelectorAll(".birthyear");
	newYear.forEach(function(item) {
		item.textContent = bday.valueAsDate.getFullYear();
	});
	let cloneSec = document.importNode(divTempl, true);

	if (newText.textContent === '' || newTel.textContent === '' || newComp.textContent === '' || newB.textContent === '') {
		alert("please fill all fields!");
	} else {
		ul.appendChild(clone);
		const liAdd = document.querySelectorAll('li');
		liAdd.forEach((item) => {
			item.appendChild(cloneSec);
		});
		toggle();
		
	}
	const bDay = document.querySelectorAll('.birthday');
	const bMonth = document.querySelectorAll('.birthmonth');
	const bName = document.createElement('span');
	bName.classList.add('b_name');

	for(let i = 0; i < bDay.length; i++) {
		if(+bDay[i].textContent === dateDay && +bMonth[i].textContent === dateMonth + 1) {
			const t = document.querySelector('.birthPerson').appendChild(bName);
			t.textContent = document.querySelectorAll('.replace')[i].textContent + ' ';

		} 
	};
	const arrayBirth = document.querySelectorAll('.b_name');
	arrayBirth.forEach(function(item) {
		if (item.textContent === item.previousElementSibling.textContent) {
			item.remove();
		}
	})
	localStorage.setItem('BirthItems', document.querySelector('.birthPerson').innerHTML);
	localStorage.setItem('ContactItems', document.querySelector('ul').innerHTML);
	
});

ul.addEventListener('click', ({target}) => {
	const info = target.parentNode.nextElementSibling;
	if ((target.classList.contains('li'))) {
		target.nextElementSibling.classList.toggle('hidden');
	}
	if ((target.classList.contains('replace'))) {
		info.classList.toggle('hidden');
	}
	if ((target.classList.contains('icon_edit'))) {
		toggle();
		name.value = target.previousElementSibling.textContent;
		let j = 1;
		for (let i = 0; i < document.querySelectorAll('.tel').length; i++) {
			if( j % 2) {
				document.querySelectorAll('.tel')[i].value = info.childNodes[3].childNodes[j].textContent;
				j++;
			}
		}
		company.value = info.childNodes[7].textContent;
		bday.value = info.childNodes[11].childNodes[1].textContent;
		ul.removeChild(target.parentNode.parentNode);
	}
	
});

iconDelete.addEventListener('click', function() {
	toggle(), 
	clear(); 
});
	
function toggle() {
	field.classList.toggle('hidden');
	plus.classList.toggle('hidden');
	list.classList.toggle('hidden');
}

function clear() {
	const tel = document.querySelectorAll('.tel');
	name.value = "";
	tel.forEach(function(number) {
		number.value = "";
	});
	company.value = "";
	bday.value = "";
}

document.querySelector('#plusTel')
	.addEventListener('click', function () {
		const newInput = document.createElement('input');
		newInput.type = 'tel';
		newInput.placeholder = 'Telephone №';
		newInput.classList.add('tel');
		newInput.classList.add('added');
		const newDel = document.createElement('img');
		newDel.src = 'img/basket.png';
		newDel.classList.add('remove');

		document.querySelector('.telNumbers').appendChild(newInput);
		document.querySelector('.telNumbers').appendChild(newDel);
		let telTempl = templateTel.content.querySelector("div");
		
		let cloneTel = document.importNode(telTempl, true);

		templateInfo.content.querySelector(".arrayTelNumbers").append(cloneTel);
		
	});

document.querySelector('.telNumbers').addEventListener('click', ({target}) => {
	if ((target.classList.contains('remove'))) {
		console.log('ha')
		target.previousElementSibling.remove();
		target.remove();
	}
	
})


const saved = localStorage.getItem('ContactItems');
const savedBirthdate = localStorage.getItem('BirthItems');

if (saved) {
	document.querySelector('ul').innerHTML = saved;
}
if(savedBirthdate) {
	document.querySelector('.birthPerson').innerHTML = savedBirthdate;
}