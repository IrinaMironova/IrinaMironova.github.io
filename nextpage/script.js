const preload = document.querySelector('.preload');
const firstPage = document.querySelector('.first_page');
const contacts = document.querySelector('.header_contacts');
const lang = document.querySelector('.header_lang');
const actual = document.querySelector('.header_actual');
const li = document.querySelectorAll('.menu > li');
const footer = document.querySelector('.footer');
const button = document.querySelector('.wrapper > button');
const block = document.querySelector('.fillColor');
const secondPage = document.querySelector('.second_page');

setTimeout(function() {
	preload.classList.toggle('hidden');
	firstPage.classList.toggle('hidden');
}, 2500);

delayOpacity(contacts, 3000);
delayOpacity(lang, 3500);
delayOpacity(actual, 4000);

for(let i = 0; i < li.length; i++) {
	delayOpacity(li[i], 4500 + i * 200);
};

delayOpacity(footer, 4000);

setTimeout(function() {
	button.style.transition = "margin-top 1s ease-in-out";
	button.style.marginTop = "0";
},5000)

setTimeout(function() {
	firstPage.style.transition = "margin-top 1s ease-in-out";
	firstPage.style.marginTop = "-100vh";
	block.classList.toggle('hidden');
},7000);

setTimeout(function() {
	firstPage.classList.toggle('hidden');
},8000);

setTimeout(function() {
	block.style.transition = "margin-top 1s ease-in-out";
	block.style.marginTop = "-100vh";
	secondPage.classList.toggle('hidden');
},9000);

function delayOpacity(elem, time) {
	setTimeout(function() {
		elem.style.transition = "opacity 1s ease-in-out"
		elem.style.opacity = "1";
	}, time);
}
