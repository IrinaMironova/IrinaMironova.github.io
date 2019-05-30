const btnRu = document.querySelector('.btn_lang_ru');
const btnEng = document.querySelector('.btn_lang_eng');
const langRu = document.querySelector('.lang_ru');
const langEng = document.querySelector('.lang_eng');
btnRu.addEventListener('click', function() {
	langRu.classList.remove('hidden');
	langEng.classList.add('hidden');
	console.log('haha');
});
btnEng.addEventListener('click', function() {
	langEng.classList.remove('hidden');
	langRu.classList.add('hidden');
	console.log('bebe');
});

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href')
    
    document.querySelector('' + blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}