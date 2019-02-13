$(document).ready(function () {

    var bar = $( ".header-midium ,.search-top" );     
    $( "#menu-mobile" ).on( "click", function( event ) {
        bar.slideToggle('slow');
    });

   $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:5000,
        nav:true,
      responsive:{
          0:{
              items:1,
              nav:true
          },
          600:{
              items:3,
              nav:true
          },
          1000:{
              items:4,
              nav:true,
              loop:true
          }
      }
  })
 });