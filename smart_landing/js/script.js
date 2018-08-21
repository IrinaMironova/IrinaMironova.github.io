var menu = document.getElementById("menu");
var toggleMenu = document.getElementById("toggle-menu");

toggleMenu.addEventListener("click", function() {
  showMenu();
});

function showMenu() {	
	menu.classList.toggle("active");
};
$('.owl-carousel1').owlCarousel({
    loop:true,
    margin: 10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        850:{
            items:2
        },
        1520: {
           items:3
        }
    }
});
$( ".owl-prev>span" ).addClass( "prev" );
$('.prev').replaceWith('<span aria-label="Previous">Previous</span>');
$( ".owl-next>span" ).addClass( "next" );
$('.next').replaceWith('<span aria-label="Next">Next</span>');
$('.owl-carousel2').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    navText : ["",""],
    responsive:{
        0:{
            items:1
        },
        760:{
            items:2
        }
        
    }
});