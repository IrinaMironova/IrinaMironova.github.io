const add = document.getElementById('add');
const ul = document.querySelector('ul');
const template = document.querySelector('#tmpl');
const btn = document.querySelectorAll('.btn');

function closeLi(element) {
	element.forEach(item => {
		item.addEventListener('click', function() {
			this.parentElement.style.display = 'none';
		});
	});

	return element;
};
	
add.addEventListener('click', (e) => {
	e.preventDefault();
	let liTempl = template.content.querySelector("li");
	let newText = template.content.querySelector("#replace")
	const val = document.getElementById('new').value.trim();
	newText.textContent = val;
	let clone = document.importNode(liTempl, true);
	
	if (newText.textContent === '') {
		alert("please write something!");
	} else {
		const liAdd = ul.appendChild(clone);
		document.getElementById('new').value = "";
		closeLi(document.querySelectorAll('.close'));
	}
});

ul.addEventListener('click', ({target}) => {
	if (target.classList.contains('check')) {
		target.parentElement.classList.toggle('checked');
		const hide = document.querySelector('.hide')
		if(hide.classList.contains('hidden') && target.parentElement.classList.contains('checked')) {
			target.parentElement.classList.toggle('hidden');
		}
	}
})

document.getElementById('field')
	.addEventListener('click', ({target}) => {

		if(target.classList.contains('btn')) {
			
			btn.forEach(function(item) {
				item.classList.toggle('hidden');
			})
			for (i = 0; i < ul.children.length; i++) {
				if(ul.childNodes[i].classList.contains('checked')) {
					ul.childNodes[i].classList.toggle('hidden');
				}
			}
		}
	});


