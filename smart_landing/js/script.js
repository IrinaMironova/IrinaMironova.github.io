
$(".menu-collapsed").click(function() {
  $(this).toggleClass("menu-expanded");
});
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