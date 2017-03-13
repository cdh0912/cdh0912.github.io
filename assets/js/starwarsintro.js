$(document).ready(function(){
	scale();
})
var size = 3;
var posY = 230; 
var ang = 55;
var delta = 0.8;
var scaleDelta = 0.008;
var speed = 70;
var agent = navigator.userAgent.toLowerCase();



function scale(){
	size = size - scaleDelta;
	posY = posY -delta;
	if(posY<80){
		delta = 0.4;
		scaleDelta = 0.006; 
	}
	if(posY<40){
		delta = 0.2;			 	
		scaleDelta = 0.003; 
	}
	if(posY<20){
		delta = 0.1;			 	
		scaleDelta = 0.001; 
	}

	$(".starwars-intro").css({"top" : posY + "%", "transform" : "rotateX(" + ang + "deg) scale(" + size + ")"})

	if(posY> -30){
		setTimeout(scale,speed);	
	}else{
		$(".starwars-intro").animate({opacity:"0"},500);
	}
}