"use strict";
var root = "MoaDo";
//Modernizr touch detect
Modernizr.load({
	test: Modernizr.touch,
	yep :['/assets/css/touch.css?v=1'],
	nope: ['../../../../../../MoaDo/assets/external/waypoint/waypoints.min.js'],
	complete : function () {
		if (Modernizr.touch){
			//initMobile

			$('.z-nav__list > .z-nav__item:has(.z-nav__list-secondary) > .z-nav__link').click(function(e){
				if ($(window).width() > 769) {
					e.preventDefault();
				};
			});

			$(".animationload").delay(1000).fadeOut("slow");
		}							 
		else{
			//initDesc
			
			//Animated header positioning
			var $head = $( '.header-fixed' );
			$( '.waypoint' ).each( function(i) {
				var $el = $( this ),
				animClassDown = $el.data( 'animateDown' ),
				animClassUp = $el.data( 'animateUp' );
							 
				$el.waypoint( function( direction ) {
					if( direction === 'down' && animClassDown) {
						$head.attr('class', 'header-fixed ' + animClassDown);
					}
					else if( direction === 'up' && animClassUp){
						$head.attr('class', 'header-fixed ' + animClassUp);
					}
				}, { offset: -250 });
			});	
		}
	}  
});

//Test if classList exist
var test = false;
if ("document" in self && !("classList" in document.createElement("_"))){
	test = true;
}

Modernizr.load({
  test: test,
  yep : ['external/classList/classList.js'],
  nope: []
});

//Plaeholder handler
if(!Modernizr.input.placeholder){             //placeholder for old brousers and IE
 
  $('[placeholder]').focus(function() {
   	var input = $(this);
   	if (input.val() == input.attr('placeholder')) {
    	input.val('');
    	input.removeClass('placeholder');
   	}
  }).blur(function() {
   	var input = $(this);
   	if (input.val() == '' || input.val() == input.attr('placeholder')) {
    	input.addClass('placeholder');
    	input.val(input.attr('placeholder'));
   	}
  }).blur();
 
  $('[placeholder]').parents('form').submit(function() {
   	$(this).find('[placeholder]').each(function() {
    	var input = $(this);
    	if (input.val() == input.attr('placeholder')) {
     		input.val('');
    	}
   	})
  });
 }

//Counter for progress bar and achivemt
function countValue(value, result, target, duration) {
    if(duration) {
        var count = 0;
        var speed = parseInt(duration / value);
        var interval = setInterval(function(){
            if(count - 1 < value) {
                target.html(count);
            }
            else {
                target.html(result);
                clearInterval(interval);
            }
            count++;
        }, speed);
    }
    else {
        target.html(result);
    }
}

function init_statsCounter(duration) {
	   $('.stat .stat__number').each(function() {
	       var container = $(this);
	       var value = container.attr('data-value');
	       var result = container.attr('data-result');
	                        
	       countValue(value, result, container, duration);
	   });
} 

// Progress bar and counter init in viewport
function init_progressBar(duration) {
	$('.progress-container').each(function() {
	        var container = $(this).find('.progress-value');
	        var value = $(this).find('.progress').attr('data-level');
	        var result = value;
	        if(Modernizr.csstransitions) {
	            $(this).find('.progress-bar').css({'width' : value + '%'});
	        }
	        else {
	            $(this).find('.progress-bar').animate({width : value + '%'}, 2500);
	        }
	                        
	        countValue(value, result, container, duration);
	});
}
    	
// Init for all template pages
$(document).ready(function() {
	$('.z-nav__list').mobileMenu({
	    triggerMenu:'.z-nav__toggle',
		subMenuTrigger: ".z-nav__toggle-sub",
		animationSpeed:500	
	});

	$('.z-nav__toggle').on('mousedown touchstart', function (){
		$('.z-nav__toggle').toggleClass('open-nav');
		var $mobileNav = $('.z-nav__list');
		var $cart = $('.cart__list');
		var $cartToggle = $('.cart__toggle');

		if($mobileNav.hasClass('open-nav')){
			$mobileNav.removeClass('open-nav close-nav');
			$mobileNav.addClass('close-nav');
		}
		else{
			$mobileNav.removeClass('open-nav close-nav');
			$mobileNav.addClass('open-nav');

			$cart.removeClass('open-nav close-nav');
			$cart.addClass('close-nav');
			$cartToggle.removeClass('open-nav close-nav');
			$cartToggle.addClass('close-nav');
		}
	});

   // hide .top-scroll first
    $(".top-scroll").hide();

    // fade in #back-top

//    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('.top-scroll').fadeIn(500);
            } else {
                $('.top-scroll').fadeOut(500);
            }
        });

        // scroll body to 0px on click
        $('.top-scroll').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
//   });

	// mega menu
	if($(".mega-menu").length==0){
			return 0;
	} else {
		$(".mega-menu").parent().addClass('skip-element');
	}

});

$(window).resize(function (){
	if (window.innerWidth > 768 ) {
		$('.z-nav__list').removeClass('close-nav');
	};
})

//Function section

//Start function
function cart() {

				function cartUsage(){
					$('.cart__toggle').toggleClass('open-nav');
					var $cart = $('.cart__list');
					var $mobileNav = $('.z-nav__list');
					var $navToggle = $('.z-nav__toggle');

					if($cart.hasClass('open-nav')){
						$cart.removeClass('open-nav close-nav');
						$cart.addClass('close-nav');	
					}
					else{
						$cart.removeClass('open-nav close-nav');
						$cart.addClass('open-nav');

						if($mobileNav.hasClass('open-nav')){
							$mobileNav.removeClass('open-nav close-nav');
							$mobileNav.addClass('close-nav');

							$navToggle.removeClass('open-nav close-nav');
							$navToggle.addClass('close-nav');
						}
					}
				}

				if( 'ontouchstart' in window ) {
					$('.cart__toggle').on('touchstart', function () {
						cartUsage();
					});			
				} else {
					$('.cart__toggle').on('click', function () {
						cartUsage();
					});
				}


}
//end function

//Start function
function revDefault() {

	var api = $('.banner').revolution({
		delay:9000,
		startwidth:1170,
		startheight:560,

		onHoverStop:"on",
			         
		hideThumbs:0,
		hideTimerBar:"on",
			 
		navigationType:"none",
		navigationArrows:"solo",
			 
		soloArrowLeftHalign:"left",
		soloArrowLeftValign:"bottom",
		soloArrowLeftHOffset:0,
		soloArrowLeftVOffset:-80,
			 
		soloArrowRightHalign:"right",
		soloArrowRightValign:"bottom",
		soloArrowRightHOffset:0,
		soloArrowRightVOffset:-80,

		hideSliderAtLimit: 640
	});

	api.bind("revolution.slide.onchange",function (e,data) {
        var slideText = $('.banner li').eq(data.slideIndex - 1).attr('data-text');
        $('.slider-info').text(slideText);
    });
}
//end function

//Start function
function revAlternative() {

	var api = $('.banner').revolution({
		delay:9000,
		startwidth:1170,
		startheight:560,

		onHoverStop:"on",
			         
		hideThumbs:100,
		hideTimerBar:"on",
			 
		navigationType:"none",
		navigationArrows:"solo",
			 
		soloArrowLeftHalign:"left",
		soloArrowLeftValign:"center",
		soloArrowLeftHOffset:0,
		soloArrowLeftVOffset:0,
			 
		soloArrowRightHalign:"right",
		soloArrowRightValign:"center",
		soloArrowRightHOffset:0,
		soloArrowRightVOffset:0,

		hideSliderAtLimit: 640
	});
}
//end function

//
function royalSlider(){

	$(".royalSlider").royalSlider({
		keyboardNavEnabled: true,
		loop:true,
		autoScaleSlider: true,
		autoScaleSliderHeight: 284,
		slidesSpacing: 0,
		autoPlay: {
			// autoplay options go gere
			enabled: true,
			pauseOnHover: true
		},
		controlNavigation: 'thumbnails',
		thumbs: {
			autoCenter: false,
			fitInViewport: false
		},
		controlsInside: false
	}); 

	var slider = $(".royalSlider").data('royalSlider');
}

//Start function
function flexSlider(){
	$('.flexslider').flexslider({
		controlNav: false,
		prevText: "", 
		nextText: "",
			after: function(){
                $('.slider-info').text($('.flex-active-slide').attr('data-text'));
			}
	});
}
//end function

//Start function
function staffSlider() {

	// Default view
    var minimalSwiper = $('.staff-slider').swiper({
		slidesPerView:1
	});

	//init slider navigation arrow
    $('.staff-slider-control .prev-arrow').on('click', function(e){
        e.preventDefault();
        minimalSwiper.swipePrev();
    });

    $('.staff-slider-control .next-arrow').on('click', function(e){
        e.preventDefault();
        minimalSwiper.swipeNext();
    });
}
//end function

//Start function
function minimalSlider(){

	// Default view
    var minimalSwiper = $('.minimal-slider').swiper({
		slidesPerView:1,
		loop:true,
	});

	//init slider navigation arrow

    $('.minimal-slider-control .prev-arrow').on('click', function(e){
           e.preventDefault();
           minimalSwiper.swipePrev();
    });

    $('.minimal-slider-control .next-arrow').on('click', function(e){
           e.preventDefault();
           minimalSwiper.swipeNext();
    });
}//end function

function dateSlider(){

	// Base slider with data init
    var dateSwiper = $('.date-slider').swiper({
		slidesPerView:1,
		loop:true,
		//mode: 'vertical',
		onSlideChangeStart:function change(index){
			changeDate();
		}
	});

    var slidesDate = $('.date-slider .swiper-slide');
	var placement = $('.date-slider-control .date-slide');
	
    function changeDate(){
        var slideText = slidesDate.eq(dateSwiper.activeIndex).attr('data-date');
        placement.text(slideText);
    }

    changeDate();
               	
	//init slider navigation arrow

    $('.date-slider-control .prev-arrow').on('click', function(e){
        e.preventDefault();
        dateSwiper.swipePrev();
    });

    $('.date-slider-control .next-arrow').on('click', function(e){
        e.preventDefault();
        dateSwiper.swipeNext();
    });
}
//end function



function itemCarousel(){

	// Full width carousel
    var carouselAllSwiper = $('.carousel-all').swiper({
				    slidesPerView:7,
				    speed: 500,
				    autoplay: 2000,
				    autoplayDisableOnInteraction:false,
				    loop: true
	});

	var actSlide = $('.carousel-all .swiper-slide-active');
	actSlide.css('margin-right', '-1px');
	
	//Detect size and set present optiom
	var displayWidth = $(window).width();

	switch (true) {
		case (displayWidth>992):
			carouselAllSwiper.params.slidesPerView=7;
			carouselAllSwiper.resizeFix();   
		break;
		case (displayWidth>769 && displayWidth<=992):
				carouselAllSwiper.params.slidesPerView=4;
			     carouselAllSwiper.resizeFix();
		break;
		case (displayWidth>400 && displayWidth<=769):
			carouselAllSwiper.params.slidesPerView=3;
			carouselAllSwiper.resizeFix();
		break;
		case (displayWidth<=400):
			carouselAllSwiper.params.slidesPerView=2;
			carouselAllSwiper.resizeFix();
		break;
	}

    //Resize detect
	$(window).resize(function(){
	    actSlide.css('margin-right', '-1px');
	    
	    var displayWidth = $(window).width();

		switch (true) {
			case (displayWidth>992):
				carouselAllSwiper.params.slidesPerView=7;
				carouselAllSwiper.reInit();  
			break;
			case (displayWidth>769 && displayWidth<=992):
				carouselAllSwiper.params.slidesPerView=4;
				carouselAllSwiper.reInit();
			break;
			case (displayWidth>400 && displayWidth<=769):
				carouselAllSwiper.params.slidesPerView=3;
				carouselAllSwiper.reInit();
			break;
			case (displayWidth<=400):
				carouselAllSwiper.params.slidesPerView=2;
				carouselAllSwiper.reInit();
			break;
		}
	});
}

//Start function
function scrollSlider() {

	//scroll testimonial
    $(".testimonial-wrap").mCustomScrollbar({
        axis:"x",
		advanced:{
			autoExpandHorizontalScroll:true
		},
	    autoDraggerLength : false
	});
}
//end function

//Start function
function featureSlider() {

	//Slider view
    var featureSwiper = $('.fearure-slider').swiper({
		slidesPerView: 1,
		loop: false,
		paginationClickable:true,
		pagination:'.feature-pagination'
	});
}
//end function

//Start function
function sliderSides () {

				//Swiper init
               	var prevContainer = $('.leftside-arrow .img-prev');
				var nextContainer = $('.rightside-arrow .img-next');
				var prevName = $('.leftside-arrow .arrow-heading');
				var nextName = $('.rightside-arrow .arrow-heading');
				

               	// Side arrow carousel
               	var carouselSwiper = $('.carousel-sides').swiper({
				    slidesPerView:4,
				    loop: true,
				    speed: 600
				});

				var slideArray = $('.carousel-sides .swiper-slide');

				function previewPrev(){
				 	var prevImg = slideArray.eq(carouselSwiper.activeIndex - 1).attr('data-src');
		            var nextImg = slideArray.eq(carouselSwiper.activeIndex + carouselSwiper.params.slidesPerView).attr('data-src');
		            var prevHead = slideArray.eq(carouselSwiper.activeIndex - 1).attr('data-head');
		            var nextHead = slideArray.eq(carouselSwiper.activeIndex + carouselSwiper.params.slidesPerView).attr('data-head');

				    prevContainer.attr('src', prevImg);
				    nextContainer.attr('src', nextImg);
				    prevName.text(prevHead);
				    nextName.text(nextHead);
				}

				function previewNext(){
				    var prevImg = slideArray.eq(carouselSwiper.previousIndex).attr('data-src');
		            var nextImg = slideArray.eq(carouselSwiper.previousIndex + carouselSwiper.params.slidesPerView+1).attr('data-src');
		            var prevHead = slideArray.eq(carouselSwiper.previousIndex).attr('data-head');
		            var nextHead = slideArray.eq(carouselSwiper.previousIndex + carouselSwiper.params.slidesPerView+1).attr('data-head');

				    prevContainer.attr('src', prevImg);
				    nextContainer.attr('src', nextImg);
				    prevName.text(prevHead);
				    nextName.text(nextHead);
				}

				//init slider navigation arrow

                $('.leftside-arrow').on('click', function(e){
                    e.preventDefault();
                    carouselSwiper.swipePrev();
                    
                    previewPrev();
                });

                $('.rightside-arrow').on('click', function(e){
                    e.preventDefault();
                    carouselSwiper.swipeNext();

                    previewNext();
                });

                //Start arrow contant init	
                previewPrev();



				     var displayWidth = $(window).width();

				    switch (true) {
					  	case (displayWidth>992):
					   		carouselSwiper.params.slidesPerView=4;
				        	carouselSwiper.resizeFix();   
					   	break;
					  	case (displayWidth>640 && displayWidth<=992):
					   		carouselSwiper.params.slidesPerView=3;
				         	carouselSwiper.resizeFix();
					   	break;
					   	case (displayWidth>400 && displayWidth<=640):
					   		carouselSwiper.params.slidesPerView=2;
				         	carouselSwiper.resizeFix();
					   	break;
					   	case (displayWidth<=400):
					   		carouselSwiper.params.slidesPerView=1;
				         	carouselSwiper.resizeFix();
					   	break;
					}

                    //Resize detect
	                $(window).resize(function(){
	                	var displayWidth = $(window).width();

						switch (true) {
						  	case (displayWidth>992):
						   		carouselSwiper.params.slidesPerView=4;
					        	carouselSwiper.reInit();  
						   	break;
						  	case (displayWidth>640 && displayWidth<=992):
						   		carouselSwiper.params.slidesPerView=3;
					         	carouselSwiper.reInit();
						   	break;
						   	case (displayWidth>400 && displayWidth<=640):
						   		carouselSwiper.params.slidesPerView=2;
					         	carouselSwiper.reInit();
						   	break;
						   	case (displayWidth<=400):
						   		carouselSwiper.params.slidesPerView=1;
					         	carouselSwiper.reInit();
						   	break;
						}
	                 });
}
//end function

//Start function
function sliderSidesAdvanced() {

				sliderSides();

	             var slidesSlides = $('.carousel-sides .swiper-slide');
	             var sliderInfo = $('.slider-information__item');

	             slidesSlides.mouseenter(function (e){
	             	slidesSlides.removeClass('carousel-slide-active');
	             	$(this).addClass('carousel-slide-active');

	             	var sidesFilter = $(this).attr('data-head').toLowerCase();

	             	sliderInfo.hide(0);
	             	$('.' + sidesFilter).show(0);
	             }).mouseleave(function(){ slidesSlides.removeClass('carousel-slide-active'); });
}
//end function

//Start function
function fadingSlider() {

				//Slider view
        var fadeSwiper = $('.fading-slider').swiper({
				    slidesPerView: 5,
				    loop: true,
				    paginationClickable:true,
				    pagination:'.fade-pagination',
				    noSwiping:true,
				    onSlideChangeStart:function(index){
				    	fadingSlide.removeClass('slide-disabled')
						i = index.activeIndex;
						fadingSlide.eq(i).addClass('slide-disabled');

						i2 = fadeSwiper.activeIndex + fadeSwiper.params.slidesPerView -1;
	                 	fadingSlide.eq(i2).addClass('slide-disabled');
					}
				});

				//init slider navigation arrow

                $('.fade-slider-control .prev-arrow').on('click', function(e){
                    e.preventDefault();
                    fadeSwiper.swipePrev();
                });

                $('.fade-slider-control .next-arrow').on('click', function(e){
                    e.preventDefault();
                    fadeSwiper.swipeNext();
                });

                //function init
                function fadeSlideResize(){
									i = fadeSwiper.activeLoopIndex;
	                fadeSwiper.swipeTo(i, 0, function (e) {
	                    i2 = fadeSwiper.activeIndex + fadeSwiper.params.slidesPerView -1;
	                 	fadingSlide.eq(i2).addClass('slide-disabled');
	                });
								}

                var displayWidth = fadeSwiper.width;
                
						    switch (true) {
							  	case (displayWidth>1350):
							   		fadeSwiper.params.slidesPerView=5;
						        	fadeSwiper.resizeFix();   
							   	break;
							  	case (displayWidth>1150 && displayWidth<=1350):
							   		fadeSwiper.params.slidesPerView=4;
						         	fadeSwiper.resizeFix();
							   	break;
							   	case (displayWidth>760 && displayWidth<=1150):
							   		fadeSwiper.params.slidesPerView=3;
						         	fadeSwiper.resizeFix();
							   	break;
							   	case (displayWidth<=760):
							   		fadeSwiper.params.slidesPerView=1;
							   		fadeSwiper.params.noSwiping=false;
						         	fadeSwiper.resizeFix();
							   	break;
								}

                    //Resize detect
	                $(window).resize(function(){

	                     if (fadeSwiper.width >1150 & fadeSwiper.width <  1350  ){
	                        fadeSwiper.params.slidesPerView=4;        
	                        fadeSwiper.reInit();

	                        fadeSlideResize();
	                    }
	                    else
	                     if (fadeSwiper.width > 760 &  fadeSwiper.width < 1150 ){
	                         fadeSwiper.params.slidesPerView=3;
	                         fadeSwiper.reInit();

	                         fadeSlideResize(); 
	                    } else
	                     if (fadeSwiper.width < 760){
	                         fadeSwiper.params.slidesPerView=1;
	                         fadeSwiper.params.noSwiping=false;
	                         fadeSwiper.reInit();   
	                    }

	                    else{
	                        fadeSwiper.params.slidesPerView=5;
	                        fadeSwiper.reInit();
	                        
	                        fadeSlideResize();
	                    }
	                 });

	                var fadingSlide = $('.fading-slider .swiper-slide');

	                var i = fadeSwiper.activeIndex;
	                fadingSlide.eq(i).addClass('slide-disabled');

	                var i2 = fadeSwiper.activeIndex + fadeSwiper.params.slidesPerView -1;
	                fadingSlide.eq(i2).addClass('slide-disabled');
}
//end function

//Start function
function sliderSidebar() {

				// Slider with sidebar
               	var siderbarSwiper = $('.slider-siderbar').swiper({
				    slidesPerView:1,
				    speed: 600,
				    autoplay: 4000,
				    autoplayDisableOnInteraction:false,
				    loop: true,
				     onSlideChangeStart:function change(index){
				     	current = siderbarSwiper.activeLoopIndex+1;
		                slideActive.text(current);

		                infoHeading.text(slidesSB.eq(current-1).attr('data-heading'));
		                infoText.text(slidesSB.eq(current-1).attr('data-text'));

				     }
				});

				//init slider navigation arrow

                $('.slider-siderbar-control .prev-arrow').on('click', function(e){
                    e.preventDefault();
                    siderbarSwiper.swipePrev();
                });

                $('.slider-siderbar-control .next-arrow').on('click', function(e){
                    e.preventDefault();
                    siderbarSwiper.swipeNext();
                });

                var slidesSB = $('.slider-siderbar .swiper-slide');

                var slideActive = $('.current-slide');
                var slideAll = $('.all-slide')
                var current = siderbarSwiper.activeLoopIndex+1;
                var all = siderbarSwiper.slides.length-2;
  
                slideActive.text(current);
                slideAll.text(all);

                //Slide infobox
                var infoHeading = $('.slide-info__heading');
                var infoText = $('.slide-info__text');
                infoHeading.text(slidesSB.eq(current-1).attr('data-heading'));
                infoText.text(slidesSB.eq(current-1).attr('data-text'));
}
//end function

//Start function
function sliderSidebarFull() {

	 			// Slider with sidebar
               	var siderbarSwiper = $('.slider-siderbar').swiper({
				    slidesPerView:1,
				    speed: 600,
				    autoplay: 4000,
				    autoplayDisableOnInteraction:false,
				    loop: true,
				     onSlideChangeStart:function change(index){
				     	current = siderbarSwiper.activeLoopIndex+1;
		                slideActive.text(current);

		                infoIcon.html(slidesSB.eq(current-1).attr('data-icon'));
		                infoHeading.text(slidesSB.eq(current-1).attr('data-heading'));
		                infoText.text(slidesSB.eq(current-1).attr('data-text'));

				     }
				});

				//init slider navigation arrow

                $('.slider-siderbar-control .prev-arrow').on('click', function(e){
                    e.preventDefault();
                    siderbarSwiper.swipePrev();
                });

                $('.slider-siderbar-control .next-arrow').on('click', function(e){
                    e.preventDefault();
                    siderbarSwiper.swipeNext();
                });

                var slidesSB = $('.slider-siderbar .swiper-slide');

                var slideActive = $('.current-slide');
                var slideAll = $('.all-slide')
                var current = siderbarSwiper.activeLoopIndex+1;
                var all = siderbarSwiper.slides.length-2;
  
                slideActive.text(current);
                slideAll.text(all);

                //Slide infobox
                var infoIcon = $('.slide-info__icon');
                var infoHeading = $('.slide-info__heading');
                var infoText = $('.slide-info__text');

                infoIcon.html(slidesSB.eq(current-1).attr('data-icon'));
                infoHeading.text(slidesSB.eq(current-1).attr('data-heading'));
                infoText.text(slidesSB.eq(current-1).attr('data-text'));
}
//end function

//Start function
function productSlider(){

	// Product slider
    var product = $('.product-slider').swiper({
		slidesPerView:1,
		paginationClickable:true,
		pagination:'.product-slider-pagination'
	});
}
//end function

//Start function
function flickr() {

	//init flickr
	$('#flickr').jflickrfeed({
        limit:          15,
        qstrings:       {id: '52617155@N08'},
        itemTemplate:   '<li><a href="{{image_b}}" data-rel="colorbox"><img src="{{image_s}}" alt="{{title}}" /><span class="hover-effect"></span></a></li>'
        },function(data){$('#flickr a').colorbox({'data-rel':'colorbox'});}
    );

    //Colorbox responsive
	$.colorbox.settings.maxWidth  = '95%';
	$.colorbox.settings.maxHeight = '95%';

   	/* Colorbox resize function */
	var resizeTimer;
	function resizeColorBox()
	{
		if (resizeTimer) clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			if ($('#cboxOverlay').is(':visible')) {
				$.colorbox.load(true);
			}
		}, 300)
	}

	// Resize Colorbox when resizing window or changing mobile device orientation
	$(window).resize(resizeColorBox);
		window.addEventListener("orientationchange", resizeColorBox, false);
	}
//end function

//Start function
function isotopeFilters() {

					/* ------------------- Isotope filters --------------------------*/
			
					var $container = $('#blog-random');
			 		$container.isotope({
					  itemSelector : '.post',
					    masonry: {
						  isFitWidth: true
						}
					});
				 	
					// filter items when filter link is clicked
					$('#filters li').click(function(){
					  var $allFilters = $('#filters li');
					  $allFilters.removeClass('tags__link--active');
					  $(this).addClass('tags__link--active');

					  var selector = $(this).attr('data-filter');
					  $container.isotope({ filter: selector });
					  setProjects();	
					  return false;

					});
					
					function splitColumns() { 
						var winWidth = $(window).width(), 
							columnNumb = 1;
						
						
							if (winWidth > 1200) {
								columnNumb = 4;
							} else if (winWidth > 900) {
								columnNumb = 3;
							} else if (winWidth > 600) {
								columnNumb = 2;
							} else if (winWidth > 200) {
								columnNumb = 1;
							}
						
						return columnNumb;
					}		
					
					function setColumns() { 
						var winWidth = $(window).width(), 
							columnNumb = splitColumns(), 
							postWidth = Math.floor(winWidth / columnNumb);
						
						
						$container.find('.item').each(function () { 
							$(this).css( { 
								width : postWidth + 'px',
								height : postWidth + 'px' 
							});
						});
					}		
					
					function setProjects() { 
						setColumns();
						$container.isotope('reLayout');
					}		
					
					$container.imagesLoaded(function () { 
						setProjects();
					});
					
				
					$(window).bind('resize', function () { 
						setProjects();			
					});
}
//end function


//Start function
function isotopeGallery() {

				var $container = $('.gallery-full');
			 		$container.isotope({
					  itemSelector : '.gallery-item',
					  //layoutMode : 'fitRows'
					    masonry: {
						  //columnWidth: 100,
						  isFitWidth: true
						}
					});
				 	
					// filter items when filter link is clicked
					$('#filters li').click(function(){
					  var $allFilters = $('#filters li');
					  $allFilters.removeClass('tags__link--active');
					  $(this).addClass('tags__link--active');

					  var selector = $(this).attr('data-filter');
					  $container.isotope({ filter: selector });
					  setProjects();	
					  return false;

					});
					
					function splitColumns() { 
						var winWidth = $('.gallery-wrapper').width(), 
							columnNumb = 1;
						
							if (winWidth > 2100) {
								columnNumb = 9;
							} else if (winWidth > 1200) {
								columnNumb = 7;
							} else if (winWidth > 900) {
								columnNumb = 5;
							} else if (winWidth > 600) {
								columnNumb = 3;
							} else if (winWidth > 300) {
								columnNumb = 2;
							}
						
						return columnNumb;
					}		
					
					function setColumns() { 
						var winWidth = $('.gallery-wrapper').width(), 
							columnNumb = splitColumns(), 
							postWidth = Math.floor(winWidth / columnNumb) - 2 ;
							console.log(postWidth);
						
						$container.find('.gallery-item').each(function () { 
							$(this).css( { 
								width : postWidth + 'px'
								//height : postWidth + 'px' 
							});
						});
					}		
					
					function setProjects() { 
						setColumns();
						$container.isotope('reLayout');
					}		
					
					$container.imagesLoaded(function () { 
						setProjects();
					});
					
				
					$(window).bind('resize', function () { 
						setProjects();			
					});
}
//end function

//Start function
function checkNext() {

	$(".checkout-next").click(function (e) {
		e.preventDefault();

		var next = $(this).attr('data-page');
		$('.' + next ).find('.collapsed').trigger('click');
	});
}
//end function

//Start function
function selectBox() {

	//Select box
	$('.select-box').selectpicker();
}
//end function

//Start function
function initMap() {

	//Map start init - location New York
    var mapOptions = {
        scaleControl: true,
        center: new google.maps.LatLng(40.705002, -73.983450),
        zoom: 9,
        // disableDefaultUI: false,
        zoomControl: true,
        panControl: false,
	    mapTypeControl: false,
	    streetViewControl: false,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var myIcon = new google.maps.MarkerImage("../images/components/marker.png", null, null, null, new google.maps.Size(57,64));
                    
    var map = new google.maps.Map(document.getElementById('map'),mapOptions);
    var marker = new google.maps.Marker({
        map: map,
        position: map.getCenter(),
        icon: myIcon 
    });

    // marker.setIcon('http://google.com/mapfiles/ms/micons/ltblue-dot.png');
}
//end function

//Start function
function initMapVintage() {

	//Map start init - location New York
    var mapOptions = {
        scaleControl: true,
        center: new google.maps.LatLng(40.705002, -73.983450),
        zoom: 8,
        // disableDefaultUI: false,
        zoomControl: true,
        panControl: false,
	    mapTypeControl: false,
	    streetViewControl: false,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var myIcon = new google.maps.MarkerImage("../images/components/marker.png", null, null, null, new google.maps.Size(57,64));

    var map = new google.maps.Map(document.getElementById('map'),mapOptions);
    var marker = new google.maps.Marker({
        map: map,
        position: map.getCenter(),
        icon: myIcon 
    });

     var roadAtlasStyles = [
  {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -100 },
        { "lightness": -8 },
        { "gamma": 1.18 }
      ]
  }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -100 },
        { "gamma": 1 },
        { "lightness": -24 }
      ]
  }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "administrative",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "transit",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "road",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "administrative",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "landscape",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
      "featureType": "poi",
      "stylers": [
        { "saturation": -100 }
      ]
  }, {
  }
            ]

             var styledMapOptions = {
                
            };

            var usRoadMapType = new google.maps.StyledMapType(
                roadAtlasStyles, styledMapOptions);

            map.mapTypes.set('usroadatlas', usRoadMapType);
            map.setMapTypeId('usroadatlas');

		//marker.setIcon('http://google.com/mapfiles/ms/micons/ltblue-dot.png');
}
//end function

//Start function
function initMapLocation() {

	//Map start init
    var mapOptions = {
        scaleControl: true,
        center: new google.maps.LatLng(51.546109, -0.146007),
        zoom: 13,
        // disableDefaultUI: false,
        zoomControl: true,
        panControl: false,
	    mapTypeControl: false,
	    streetViewControl: false,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var myIcon = new google.maps.MarkerImage("../images/components/marker.png", null, null, null, new google.maps.Size(57,64));
                    
    var map = new google.maps.Map(document.getElementById('map'),mapOptions);
    var marker = new google.maps.Marker({
        map: map,
        position: map.getCenter(),
        icon: myIcon
 
    });

    //Custome map style
    var map_style = [{stylers:[{saturation:-100},{gamma:3}]},{elementType:"labels.text.stroke",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.business",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"poi.place_of_worship",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"poi.place_of_worship",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{visibility:"simplified"}]},{featureType:"water",stylers:[{visibility:"on"},{saturation:0},{gamma:2},{hue:"#aaaaaa"}]},{featureType:"administrative.neighborhood",elementType:"labels.text.fill",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"transit.station",elementType:"labels.icon",stylers:[{visibility:"off"}]}]

    //Then we use this data to create the styles.
    var styled_map = new google.maps.StyledMapType(map_style, {name: "Cusmome style"});

    map.mapTypes.set('map_styles', styled_map);
    map.setMapTypeId('map_styles');

    //marker.setIcon('http://google.com/mapfiles/ms/micons/ltblue-dot.png');
}
//end function

//Start function
function galleryPopup() {

	$('.gallery-wrapper').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});
}
//end function

//Start function
function shopPopup() {
	
	$('.product-wrapper').magnificPopup({
		delegate: '.product__control-right',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});

	$('.product__control-right').click(function (){
		$(this).blur();
	})
}
//end function

//Start function
function galletyThumbs() {

	// Initialize Advanced Galleriffic Gallery
    var gallery = $('#thumbs').galleriffic({
        imageContainerSel:         '#slideshow',
        // delay: 2000,
        // onSlideChange: function(){
        // 	var currentSlide = $(this).prev().children().clone();
        // 	$(this).prev().children().remove();
        // 	$(this).prev().append(currentSlide);
        // }
    });

}
//end function

//Start function
function numberStart() {

	$('#number-start').one('inview', function (event, visible) {
	   	if (visible == true) {
	       	init_statsCounter(2000);
	    }
	});
}
//end function

//Start function
function progressStart() {

	$('#progress-start').one('inview', function (event, visible) {
	    if (visible == true) {
	       	init_progressBar(2500);
	    }
	});
}
//end function

//Start function
function rocketsStart() {

	$('.rocket-container').one('inview', function (event, visible) {
        if (visible == true) {
            $('.rocket-top').addClass('rocket-ftop');
            $('.small-left').addClass('rocket-fleft');
            $('.small-right').addClass('rocket-fright');
        }
    });
				
}
//end function

//Start function
function rangeSlider(){

	$('.range-slider').noUiSlider({
		start: [ 109, 385 ],
		range: {
			'min': [  0 ],
			'max': [ 1000 ]
		},
		serialization: {
			lower: [
				$.Link({
					target: $('#range-min'),
					format: {
						decimals: 0
					}
				})
			],
			upper: [
				$.Link({
					target: $('#range-max'),
					format: {
						decimals: 0
					}
				})
			]
		}
	});
}
//end function

//Start function
function ratyDefault() {

	//Rating stars
	$('.score').raty({
		score: 5,
		size: 120,
		starOff : 'external/raty/images/star-off.svg',
  		starOn  : 'external/raty/images/star-on.svg'
	});
}
//end function

//Start function
function ratyDisabled() {

	$('.comment-score').raty({
		readOnly: true,
		score: 5,
		size: 120,
		starOff : 'external/raty/images/star-off.svg',
  		starOn  : 'external/raty/images/star-on.svg'
	});
}
//end function

//Start function
function sequence(parrent) {
			var sequence =  $(parrent +' .sequence__item');
				
			sequence.click(function (e) {
				e.preventDefault();

				sequence.removeClass('sequence__item--active');
				$(this).addClass('sequence__item--active');

				var sepatators = $('.sequence--clickable .sequence__separator');
				var defaultSeparator = '<span class="sequence__divider"></span><span class="sequence__divider"></span><span class="sequence__divider"></span><span class="sequence__divider"></span><span class="sequence__divider"></span><span class="sequence__divider"></span><span class="sequence__divider"></span><span class="sequence__divider"></span>';
				var prevSeparator= '<span class="sequence__divider sequence__color--one"></span><span class="sequence__divider sequence__color--one1"></span><span class="sequence__divider sequence__color--one2"></span><span class="sequence__divider sequence__color--one3"></span><span class="sequence__divider sequence__color--two3"></span><span class="sequence__divider sequence__color--two2"></span><span class="sequence__divider sequence__color--two1"></span><span class="sequence__divider sequence__color--two"></span>';
				var nextSeparator = '<span class="sequence__divider sequence__color--two"></span><span class="sequence__divider sequence__color--two1"></span><span class="sequence__divider sequence__color--two2"></span><span class="sequence__divider sequence__color--two3"></span><span class="sequence__divider sequence__color--one3"></span><span class="sequence__divider sequence__color--one2"></span><span class="sequence__divider sequence__color--one1"></span><span class="sequence__divider sequence__color--one"></span>';

				sepatators.html(defaultSeparator);
				$(this).prev('.sequence__separator').html(prevSeparator);
				$(this).next('.sequence__separator').html(nextSeparator);
			});
}
//end function	

//Start function
function sequenceExp() {
				var sequence =  $('.sequence__item');
				
				sequence.click(function (e) {
					e.preventDefault();

					sequence.removeClass('sequence__item--active');
					$(this).addClass('sequence__item--active');

					var sepatators = $('.sequence--clickable .sequence__separator');
					var connector = $(this).attr('data-connect');
					var textArea = $('.sequence__text');

					textArea.hide(0);
					$('.'+ connector).show();

					var defaultSeparator = '<span class="sequence__divider"></span><span class="sequence__divider"></span><span class="sequence__divider"></span><span class="sequence__divider"></span><span class="sequence__divider"></span><span class="sequence__divider"></span><span class="sequence__divider"></span><span class="sequence__divider"></span>';
					var prevSeparator= '<span class="sequence__divider sequence__color--one"></span><span class="sequence__divider sequence__color--one1"></span><span class="sequence__divider sequence__color--one2"></span><span class="sequence__divider sequence__color--one3"></span><span class="sequence__divider sequence__color--two3"></span><span class="sequence__divider sequence__color--two2"></span><span class="sequence__divider sequence__color--two1"></span><span class="sequence__divider sequence__color--two"></span>';
					var nextSeparator = '<span class="sequence__divider sequence__color--two"></span><span class="sequence__divider sequence__color--two1"></span><span class="sequence__divider sequence__color--two2"></span><span class="sequence__divider sequence__color--two3"></span><span class="sequence__divider sequence__color--one3"></span><span class="sequence__divider sequence__color--one2"></span><span class="sequence__divider sequence__color--one1"></span><span class="sequence__divider sequence__color--one"></span>';

					sepatators.html(defaultSeparator);
					$(this).prev('.sequence__separator').html(prevSeparator);
					$(this).next('.sequence__separator').html(nextSeparator);
				});
}
//end function

//Start function
function qNumber() {

	// This button will increment the value
	$('.qtyplus').click(function(e){
		// Stop acting like a button
		e.preventDefault();
		// Get the field name
		var fieldName = $(this).attr('data-field');
		// Get its current value
		var currentVal = parseInt($('input[name='+fieldName+']').val());
		// If is not undefined
		if (!isNaN(currentVal)) {
			// Increment
			$('input[name='+fieldName+']').val(currentVal + 1);
		} else {
			// Otherwise put a 0 there
			$('input[name='+fieldName+']').val(0);
		}
	});
	// This button will decrement the value till 0
	$(".qtyminus").click(function(e) {
		// Stop acting like a button
		e.preventDefault();
		// Get the field name
		var fieldName = $(this).attr('data-field');
		// Get its current value
		var currentVal = parseInt($('input[name='+fieldName+']').val());
		// If it isn't undefined or its greater than 0
		if (!isNaN(currentVal) && currentVal > 0) {
			// Decrement one
			$('input[name='+fieldName+']').val(currentVal - 1);
		} else {
			// Otherwise put a 0 there
			$('input[name='+fieldName+']').val(0);
		}
	});
}
//end function

//Start function
function scrollControls() {


	//Scroll down navigation function
	//scroll down
	
	$('.tags__item--comment').click(function (ev) {
		ev.preventDefault();
		$('html, body').stop().animate({'scrollTop': $('#comment-start').offset().top-100}, 900, 'swing');
	});

	$('.tags__item--user').click(function (ev) {
		ev.preventDefault();
		$('html, body').stop().animate({'scrollTop': $('#user-post-start').offset().top-100}, 900, 'swing');
	});
}
//end function

//Start function
function smoothLink() {

					// Smooth scroll
		            $('.scroll-link').bind('click.smoothscroll',function (e) {
		                e.preventDefault();

		                var target = this.hash,
		                $target = $(target);

		                if($target.offset() == undefined) return;

		                $('html, body').stop().animate({
		                    'scrollTop': $target.offset().top-110
		                }, 900, 'swing', function () {
		                    if($('body').hasClass('auto-close-menu') && $('.menu-open').length > 0){
		                        $('#menuToggle, #menuToggleLeft').click();
		                    }
		                    
		                });
		            });

		             if (!Modernizr.touch) {
					 	$('.scroll-link').click(function (e) {
					 		$('#review').trigger('click');
					 	});
					 } else {
					 	$('.scroll-link').on('touchstart', function (e) {
					 		$('#review').trigger('click');
					 	});
					 }
}
//end function

//Start function
function smoothScrollInit() {

					if (!Modernizr.touch) {
	 				// Smooth scroll
		            $('a[href^="#"]').bind('click.smoothscroll',function (e) {
		                e.preventDefault();

		                var target = this.hash,
		                $target = $(target);

		                if($target.offset() == undefined) return;

		                $('html, body').stop().animate({
		                    'scrollTop': $target.offset().top-110
		                }, 900, 'swing', function () {
		                    if($('body').hasClass('auto-close-menu') && $('.menu-open').length > 0){
		                        $('#menuToggle, #menuToggleLeft').click();
		                    }
		                    
		                });
		            });

		            } else {
		            // Smooth scroll
		            $('a[href^="#"]').bind('touchstart.smoothscroll',function (e) {
		                e.preventDefault();

		                var target = this.hash,
		                $target = $(target);

		                if($target.offset() == undefined) return;

		                $('html, body').stop().animate({
		                    'scrollTop': $target.offset().top-110
		                }, 900, 'swing', function () {
		                    if($('body').hasClass('auto-close-menu') && $('.menu-open').length > 0){
		                        $('#menuToggle, #menuToggleLeft').click();
		                    }
		                    
		                });
		            });
		            }
}
//end function


//Start function
function wijimoCharts() {

//Chart vars
var $wijlinechart = $("#wijlinechart");
var $wijbarchart = $("#wijbarchart");
var $wijpiechart = $("#wijpiechart");
var $wijlinechartLarge = $("#wijlinechart-large");

//Chart widget init
$wijlinechart.wijlinechart({
	showChartLabels: false,
	hint: {
		enable: false
	},
	axis: {
	    y: {labels: {style: {fill: "#737c85"}},
			gridMajor: {
				visible: true, 
				style: {
					stroke: "#dadede", 
					"stroke-width": "1"
				}
			},
			max:100,
			min:0,
			annoMethod: "values",
	    },
	    x: {labels: {style: {fill: "#737c85"}}}
	},
	legend: {
	    visible: false
	},               
	seriesList: [
	    {
	        data: {
	            x: [2,4,6,8,10,12],
	            y: [60, 65, 90, 55, 39, 44]
	        },
	        markers: {visible: true, type: "circle",
	            style: {
					stroke: "#f3f7f7", 
					"stroke-width": "1" 
				}
			}
	    },
	    {
		    data: {
		        x: [2,4,6,8,10,12],
		        y: [52, 44, 68, 80, 99, 70]
		    },
	        markers: {visible: true, type: "circle",
	          	style: {
					stroke: "#f3f7f7", 
					"stroke-width": "1" 
				}
			}
	    }
	],
	seriesStyles: [
	    {stroke: "#fe8f8c", "stroke-width": 1, opacity: 1}, 
	    {stroke: "#85d6de", "stroke-width": 1, opacity: 1}
	],
});
	                

//BarChart init

$wijbarchart.wijbarchart({
	horizontal: false, 
	autoResize: "true",
	shadow: false,
	stacked: true,
	hint: {
		enable: false
	},
	axis: {
		y: {
			labels: 
				{style: {fill: "#737c85"}
			},
			gridMajor: {
				visible: false, 
			},
			max:100,
			min:0
	    },
	    x: {
	    	labels: 
	    		{style: {fill: "#34495e"},
				gridMajor: {
					isible: false, 
				}
			}
		}
	},
	legend: {
		visible: false
	}, 
	seriesList: [{
		label: "tests",
		legendEntry: true,
		data: { x: ['S', 'M', 'T','W', 'T', 'F', 'S' ], y: [42, 30, 65, 60, 50, 66, 80] }
	},
	{
		label: "Max",
		data: { x: ['S', 'M', 'T','W', 'T', 'F', 'S' ], y: [100, 100, 100, 100, 100, 100, 100] }
	}],
	seriesStyles: [
		{fill: "#85d6de", stroke: "#85d6de", opacity: 1, rx: 10, ry: 10}, 
		{fill: "#e3edee", stroke: "#e3edee", opacity: 1}
    ]
});
					
//Pie chart
$wijpiechart.wijpiechart({
	radius: 72,
	animation: { enabled: false },
	legend: {
		compass: "north", // legend position relative to the chart 
	    orientation: "horizontal", // legend elements orientation 
	    textMargin: {left: 0, right: 0, top: 140, bottom: 0},
	    textStyle: {fill: "#737c85", "font-size": 11}, 
	},
	hint: {
		enable: false
	},
	labels: { 
	    // setup label style 
	    style: { 
	        "font-size": 16,
	        "font-family": "Varela Round",
	        fill:"#85d6de"
	    }, 
	    // setup label content 
	    formatter: function () { 
	        return Globalize.format(this.value / this.total, "p0"); 
	    },
	    connectorStyle: {
			"stroke-width": 0
		},                  
	    position: "outside", 
	    offset: 10 
	}, 
	seriesList: [{
		label: "$, Dollar",
		data: 56,
		offset: 0
		}, {
		label: "€, Euro",
		data: 25,
		offset: 0
		}, {
		label: "£, Pound",
		data: 19,
		offset: 0
	}],
	seriesStyles: [{
		fill: "#85d6de", 
		stroke: "#fff", 
		"stroke-width": 1
		}, {
		fill: "#7bc7d1", 
		stroke: "#fff", 
		"stroke-width": 1
		}, {
		fill: "#68aab8", 
		stroke: "#fff", 
		"stroke-width": 1
	}]
});


//Circle diagram
$(".dial").knob();

//Large chart
$wijlinechartLarge.wijlinechart({
	showChartLabels: false,
	type: "area",
	legend: {
		visible: false
	}, 
	hint: {
		enable: false
	},
	axis: {
		y: {labels: {style: {fill: "#737c85", x:30}},
			gridMajor: {
				visible: true, 
				style: {
					stroke: "#dadede", 
					"stroke-width": "1", 
				}
			},
			max:52000,
			min:10000
	    },
	    x: {labels: {style: {fill: "#737c85", y:150}}}
	},               
	seriesList: [{              	
		fitType: "spline",
		data: {
		    x: ["05-01", "05-02", "05-03", "05-04", "05-05", "05-06", "05-07", "05-08", "05-09", "05-10", "05-11", "05-12", "05-13", "05-14", "05-15", "05-16", "05-17", "05-18", "05-19", "05-20", "05-21", "05-22", "05-23"],
		    y: [11000, 35000, 12000, 28000, 12000, 40000, 12500, 46000, 23000, 31000, 15000, 19000, 15000, 18000, 31000, 17000, 24000, 19500, 30500, 16000, 14000, 12000, 10000]
		},
		markers: {visible: false}
		},{
		fitType: "spline",
		data: {
		    x: ["05-01", "05-02", "05-03", "05-04", "05-05", "05-06", "05-07", "05-08", "05-09", "05-10", "05-11", "05-12", "05-13", "05-14", "05-15", "05-16", "05-17", "05-18", "05-19", "05-20", "05-21", "05-22", "05-23"],
		    y: [10500, 18000, 12000, 30000, 40500, 29000, 18500, 25000, 15000, 51000, 16000, 23000, 11000, 33000, 11500, 17000, 22000, 17000, 43000, 13000, 12000, 11000, 10000]
		},
		markers: {visible: false}
	}],
	seriesStyles: [
		{fill: "#85d6de", stroke: "#85d6de", "stroke-width": 5, opacity: 1}, 
		{fill: "#fed37f", stroke: "#fed37f", "stroke-width": 5, opacity: 1}
	],
});
						
	//Charts redraw on resize
	$(window).resize(function(){
		$wijlinechart.wijlinechart("redraw");
		$wijbarchart.wijbarchart("redraw");
		$wijpiechart.wijpiechart("redraw");
		$wijlinechartLarge.wijlinechart("redraw");
	});

}
//end function

//Start function
function tooltips() {
	$('.tooltip-link').tooltip();
}
//end function

//Start function
function preloader() {
	$(window).load(function() {
		$(".animationload").delay(600).fadeOut("slow");
	});
}
//end function

function videoLoop(elem) {
	if($(elem).length==0){
			return 0;
	};

	var myVideo = document.getElementById(elem);
	if (typeof myVideo.loop == 'boolean') { // loop supported
	    myVideo.loop = true;
	} else { // loop property not supported
	    myVideo.on('ended', function () {
	    this.currentTime = 0;
	    this.play();
	    }, false);
	}
	myVideo.play();
}