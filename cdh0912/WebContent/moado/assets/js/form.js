"use strict";

//Plaeholder handler
$(function() {

var $errorArea = $('.form-error');
$errorArea.hide(0);

var $errorHolder = $('.form-error__holder');

// Prevent default bootstap behaviour
$errorArea.find('.close').click(function (e){
	e.stopImmediatePropagation();
	$errorArea.slideUp(400);
});
  
$('#contact-form').submit(function(e) {
		
		e.preventDefault();
		$errorArea.find('.inv-em').remove();

		var error = 0;
		var self = $(this);
		
	    var $name = self.find('[name=contact-name]');
	    var $email = self.find('[type=email]');
	    var $message = self.find('[name=contact-message]');
		
				
		var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  		if(!emailRegex.test($email.val())) {
			createErrTult('Incorrect <strong>email</strong>.', $email)
			error++;	
		}

		if($name.val().length>1 &&  $name.val()!= $name.attr('placeholder')) {
			$name.removeClass('invalid_field');			
		} 
		else {
			createErrTult('<strong>Name</strong> is missing.', $name)
			error++;
		}

		if($message.val().length>2 && $message.val()!= $message.attr('placeholder')) {
			$message.removeClass('invalid_field');
		} 
		else {
			createErrTult('There is no any <strong>message</strong>.', $message)
			error++;
		}

		$('html, body').animate({scrollTop: $(this).parent().offset().top-280}, 500);


		if (error!=0)return;
		self.find('[type=submit]').attr('disabled', 'disabled');

		self.children().fadeOut(300,function(){ $(this).remove() })
		$('<p class="success"><span class="fa fa-thumbs-up success__icon"></span><span class="success__lead">Well done!</span> Your message was successfully sent.</p>').appendTo(self)
		.hide().delay(300).fadeIn();


		var formInput = self.serialize();
		$.post(self.attr('action'),formInput, function(data){}); // end post
}); // end submit

$('#contact-form-4').submit(function(e) {

		
		$('html, body').animate({scrollTop: $(this).parent().offset().top-250}, 500);
		$errorArea.css("min-height", '115px');

		e.preventDefault();	
		var error = 0;
		var self = $(this);
		
	    var $name = self.find('[name=contact-name]');
	    var $email = self.find('[type=email]');
	    var $message = self.find('[name=contact-message]');
		
				
		var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		
		
		var emailValidate = !emailRegex.test($email.val());
		var nameValidate = $name.val().length>1 &&  $name.val()!= $name.attr('placeholder');
		var messageValidate = $message.val().length>2 && $message.val()!= $message.attr('placeholder');

		$errorArea.find('.inv-em').remove();
		

  		if(emailValidate) {
			createErrTult('Incorrect <strong>email</strong>.', $email)
			error++;	
		}

		if(nameValidate) {
			$name.removeClass('invalid_field');			
		} 
		else {
			createErrTult('<strong>Name</strong> is missing.', $name)
			error++;
		}

		if(messageValidate) {
			$message.removeClass('invalid_field');
		} 
		else {
			createErrTult('There is no any <strong>message</strong>.', $message)
			error++;
		}

		$errorArea.css("min-height", '0px');


		if (error!=0)return;
		self.find('[type=submit]').attr('disabled', 'disabled');

		self.children().fadeOut(300,function(){ $(this).remove() })
		$('<p class="success"><span class="fa fa-thumbs-up success__icon"></span><span class="success__lead">Well done!</span> Your message was successfully sent.</p>').appendTo(self)
		.hide().delay(300).fadeIn();


		var formInput = self.serialize();
		$.post(self.attr('action'),formInput, function(data){}); // end post
}); // end submit

// Init full contact form
$('#contact-form-full').submit(function(e) {
		$errorArea.find('.inv-em').remove();
      
		e.preventDefault();	
		var error = 0;
		var self = $(this);
		
	    var $name = self.find('[name=contact-name]');
	    var $email = self.find('[type=email]');
	    var $phone = self.find('[name=contact-phone]');
	    var $subject = self.find('[name=contact-subject]');
	    var $message = self.find('[name=contact-message]');
		
				
		var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		
  		if(!emailRegex.test($email.val())) {
			createErrTult('Incorrect <strong>email</strong>.', $email)
			error++;	
		}

		if( $name.val().length>1 &&  $name.val()!= $name.attr('placeholder')  ) {
			$name.removeClass('invalid_field');			
		} 
		else {
			createErrTult('<strong>Name</strong> is missing.', $name)
			error++;
		}


		if( $phone.val().length>1 &&  $phone.val()!= $phone.attr('placeholder')  ) {
			$phone.removeClass('invalid_field');			
		} 
		else {
			createErrTult('Incorrect <strong>phone number</strong>.', $phone)
			error++;
		}

		if( $subject.val().length>1 &&  $subject.val()!= $subject.attr('placeholder')  ) {
			$subject.removeClass('invalid_field');			
		} 
		else {
			createErrTult('There is no <strong>subject</strong>.', $subject)
			error++;
		}

		if($message.val().length>2 && $message.val()!= $message.attr('placeholder')) {
			$message.removeClass('invalid_field');
		} 
		else {
			createErrTult('There is no any <strong>message</strong>.', $message)
			error++;
		}

		$('html, body').animate({scrollTop: $(this).offset().top-280}, 300);
		
		if (error!=0)return;
		self.find('[type=submit]').attr('disabled', 'disabled');

		self.children().fadeOut(300,function(){ $(this).remove() })
		$('<p class="success"><span class="fa fa-thumbs-up success__icon"></span><span class="success__lead">Well done!</span> Your message was successfully sent.</p>').appendTo(self)
		.hide().delay(300).fadeIn();


		var formInput = self.serialize();
		$.post(self.attr('action'),formInput, function(data){}); // end post
}); // end submit


$('#question-form').submit(function(e) {
		$errorArea.find('.inv-em').remove();
      
		e.preventDefault();	
		var error = 0;
		var self = $(this);
		
	    var $name = self.find('[name=question-name]');
	    var $email = self.find('[type=email]');
	    var $subject = self.find('[name=question-subject]');
	    var $message = self.find('[name=question-message]');
		
				
		var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		
  		if(!emailRegex.test($email.val())) {
			createErrTult('Incorrect <strong>email</strong>.', $email)
			error++;	
		}

		if( $name.val().length>1 &&  $name.val()!= $name.attr('placeholder')  ) {
			$name.removeClass('invalid_field');			
		} 
		else {
			createErrTult('<strong>Name</strong> is missing.', $name)
			error++;
		}

		if( $subject.val().length>1 &&  $subject.val()!= $subject.attr('placeholder')  ) {
			$subject.removeClass('invalid_field');			
		} 
		else {
			createErrTult('There is no <strong>subject</strong>.', $subject)
			error++;
		}

		if($message.val().length>2 && $message.val()!= $message.attr('placeholder')) {
			$message.removeClass('invalid_field');
		} 
		else {
			createErrTult('There is no any <strong>message</strong>.', $message)
			error++;
		}

		$('html, body').animate({scrollTop: $(this).offset().top-300}, 300);	
		
		
		if (error!=0)return;
		self.find('[type=submit]').attr('disabled', 'disabled');

		self.children().fadeOut(300,function(){ $(this).remove() })
		$('<p class="success"><span class="fa fa-thumbs-up success__icon"></span><span class="success__lead">Well done!</span> Your question was successfully sent.</p>').appendTo(self)
		.hide().delay(300).fadeIn();


		var formInput = self.serialize();
		$.post(self.attr('action'),formInput, function(data){}); // end post
}); // end submit


function createErrTult(text, $elem){
			$errorArea.show(0)

			// $elem.focus();
			$('<p />', {
				'class':'inv-em',
				'html': text,
			})
			.appendTo($elem.addClass('invalid_field').parent()) 
			.appendTo($errorHolder)
			.delay(4000).animate({'opacity':0},300, function(){ $(this).slideUp(400,function(){ $(this).remove() }) });
	}
});
