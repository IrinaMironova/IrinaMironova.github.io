const plus = document.querySelector('#plus');
const field = document.querySelector('.field');
const list = document.querySelector('.list');
const iconDelete = document.querySelector('.icon_delete');
const save = document.querySelector('#save');
const template = document.querySelector('#tmpl');
const templateInfo = document.querySelector('#tmpl_info');
const ul = document.querySelector('ul');
const name = document.querySelector('#name');
const company = document.querySelector('#company');
const bday = document.querySelector('#bday');
const dateMonth = new Date().getMonth();
const dateDay = new Date().getDate();

plus.addEventListener('click', function() {
	const inputAdded = document.querySelectorAll('.added');
	const imgAdded = document.querySelectorAll('.remove');
	if(inputAdded) {
		inputAdded.forEach(function(item) {
			item.remove();
		});
		imgAdded.forEach(function(item) {
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

	const newComp = templateInfo.content.querySelector(".job")
	newComp.textContent = company.value.trim();

	const hidDate = templateInfo.content.querySelector('.date');
	hidDate.textContent = bday.value;

	const newB = templateInfo.content.querySelectorAll(".birthday");
	const newMonth = templateInfo.content.querySelectorAll(".birthmonth");
	const newYear = templateInfo.content.querySelectorAll(".birthyear");

	if (bday.valueAsDate !== null) {
		newB.forEach(function(item) {
			item.textContent = bday.valueAsDate.getDate();
		})
		newMonth.forEach(function(item) {
			item.textContent = bday.valueAsDate.getMonth() + 1;
		});
		newYear.forEach(function(item) {
			item.textContent = bday.valueAsDate.getFullYear();
		});
	}

	let cloneSec = document.importNode(divTempl, true);

	if (newText.textContent === '' || newComp.textContent === '' || newB.textContent === '') {
		alert("please fill all fields!");
	} else {
		const tel = document.querySelectorAll('.tel');
				
		for (let i = 0; i < tel.length; i ++) {
			const newSpan = document.createElement('span');
			newSpan.classList.add('number');
			newSpan.textContent = tel[i].value;
			if(newSpan.textContent === '') {
				alert("please fill all number fields!");
			} else {
				const liAdd = ul.appendChild(clone);
				liAdd.appendChild(cloneSec);
				const parent = liAdd.childNodes[3].childNodes[3];
				parent.appendChild(newSpan);
			}
		}
		toggle();
	}

	const bDay = document.querySelectorAll('.birthday');
	const bMonth = document.querySelectorAll('.birthmonth');
	const bName = document.createElement('span');
	bName.classList.add('b_name');

	for(let i = 0; i < bDay.length; i++) {
		if(+bDay[i].textContent === dateDay && +bMonth[i].textContent === dateMonth + 1) {
			const textName = document.querySelector('.birthPerson').appendChild(bName);
			textName.textContent = document.querySelectorAll('.replace')[i].textContent + ' ';
		} 
	};
	const arrayBirth = document.querySelectorAll('.b_name');
	
	for(let j = 0; j < document.querySelectorAll('.b_name').length; j++) {
		for(let i = j + 1; i < document.querySelectorAll('.b_name').length; i++) {
			if( arrayBirth[i].textContent === arrayBirth[j].textContent) {
				arrayBirth[i].remove();
			} 
		}
	};
	localStorage.setItem('BirthItems', document.querySelector('.birthPerson').innerHTML);
	localStorage.setItem('ContactItems', document.querySelector('ul').innerHTML);
});


ul.addEventListener('click', ({target}) => {
	if ((target.classList.contains('li'))) {
		target.nextElementSibling.classList.toggle('hidden');
	}
	if ((target.classList.contains('replace'))) {
		const infoNext = target.parentNode.nextElementSibling;
		infoNext.classList.toggle('hidden');
	}
	if ((target.classList.contains('icon_edit'))) {
		toggle();
		const info = target.parentNode.nextElementSibling;
		name.value = target.previousElementSibling.textContent;
		let j = 0;
		console.log(info.children[1].children.length, document.querySelectorAll('.tel').length)
		for (let i = 0; i < info.children[1].children.length; i++) {
			if(document.querySelectorAll('.tel').length > info.children[1].children.length) {
				document.querySelectorAll('.added').forEach(function(item) {
					item.remove();
				});
				document.querySelectorAll('.remove').forEach(function(item) {
					item.remove();
				});
			} else if (document.querySelectorAll('.tel').length < info.children[1].children.length) {
				addInput();
			}
			document.querySelectorAll('.tel')[i].value = info.children[1].children[j].textContent
			j++;
		};
		company.value = info.children[3].textContent;
		bday.value = info.children[5].children[0].textContent;
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
		addInput();
	});

document.querySelector('.telNumbers').addEventListener('click', ({target}) => {
	if ((target.classList.contains('remove'))) {
		target.previousElementSibling.remove();
		target.remove();
	}
})
function addInput() {
	const newInput = document.createElement('input');
	newInput.type = 'tel';
	newInput.placeholder = 'Telephone №';
	newInput.classList.add('tel', 'added');
	const newDel = document.createElement('img');
	newDel.src = 'img/basket.png';
	newDel.classList.add('remove');

	document.querySelector('.telNumbers').appendChild(newInput);
	document.querySelector('.telNumbers').appendChild(newDel);
}

const saved = localStorage.getItem('ContactItems');
const savedBirthdate = localStorage.getItem('BirthItems');

if (saved) {
	document.querySelector('ul').innerHTML = saved;
}
if(savedBirthdate) {
	document.querySelector('.birthPerson').innerHTML = savedBirthdate;
}

