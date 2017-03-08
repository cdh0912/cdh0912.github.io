// Mobile menu

;(function($){

	
	$.fn.mobileMenu=function(options){
		
		if( !options.triggerMenu) throw new Error("Object options.triggerMenu required!!!");
		if( !options.subMenuTrigger) throw new Error("Object options.triggerMenu required!!!");
		var animationSpeed = options.animationSpeed || 500;
		
		
		//Initialization variables
		var $navigationList = this;
				
		if( 'ontouchstart' in window )
		{
			$(options.triggerMenu).on('touchstart',menuToggle);
			$navigationList.find('.z-nav__item '+ options.subMenuTrigger).on('touchstart', subMenuToggle);
		}else
		{
			$(options.triggerMenu).on('click',menuToggle);
			$navigationList.find('.z-nav__item '+ options.subMenuTrigger).on('click', subMenuToggle);
		}
		
		//navigation-toggle 
		
		function menuToggle(e){
			e.preventDefault();
			//$navigationList.slideToggle(animationSpeed, setClass);	
			//$(this).toggleClass('open-menu');
		};
		
		//navigation list item toggle
		
		function subMenuToggle(e){
			e.preventDefault();
			var subMenu = $(this).toggleClass('plus').parent('.z-nav__item').children('.z-nav__list-secondary');
			
			$(this).parent('.z-nav__item').parent('.z-nav__list').find('.z-nav__item .z-nav__list-secondary.z-show').not(subMenu).slideUp(animationSpeed, setClass).siblings('.z-nav__toggle-sub').toggleClass('plus');
			subMenu.slideToggle(animationSpeed, setClass);	
		}
	
		return this;
	}
	
	// function change style="display:none" to class="hide"
	function setClass (){
		var $this=$(this);
		
		if ($this.attr('style')&&$this.css('display')=='none')
		$this.removeAttr('style').removeClass('z-show').addClass('z-hide');
	
		if ($this.attr('style')&&$this.css('display')=='block')
		$this.removeAttr('style').removeClass('z-hide').addClass('z-show');
	}
	
}(jQuery))