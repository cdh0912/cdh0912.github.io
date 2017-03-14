/*$(window).load(function(){
	makeModal();
});

function makeModal() {
	var projectNames = ["DreamCatcher","MoaDo"];
	for(var i=0; i<projectNames.length; i++){
		var modalCode = "" 
		+ "<div class='modal fade' id='" + projectNames[i] + "' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>"
		+ "<div class='modal-dialog'><div class='modal-content'><div class='modal-header'>"
		+ "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>"
		+ "<h4 class='modal-title' id='myModalLabel'>" + projectNames[i] + "</h4></div>"
		+ "<div class='modal-body'>"
		+ "<iframe src='" + projectNames[i] + ".html' width='100%' height='100%' frameborder='0' allowtransparency='true'></iframe>"
		+ "</div></div></div></div>";
		$("#modalArea").append(modalCode);
	};		
}

 */

var sectionNameArr = ['intro', 'fandream', 'univue', 'dreamcatcher', 'moado', 'contact'];
var angle1 = +45;
var angle2 = +45;
var angle3 = +45;
var angle4 = +45;
var bodyTag;
var bodyClassName;
var currSection = 'intro';
var currSectionNum = 0;
var currSlide;
var lastSection;
var lastSlide;
var sections = $(".section");
var slides = $(".slide");

$(document).ready(function() {

	
	/*======================
	 * init
	 * ===================*/

	//에러페이지
	window.onerror = function() {
		//document.location.href = "404.html";
	}

	//프로토콜 http로 고정
	if( location.protocol == "https:" ) {
		document.location.replace("http://cdh0912.github.io");
	}
	
	//fullpage.js
	$('#fullpage').fullpage({
		scrollingSpeed: 800,
		anchors: sectionNameArr
		/* ,
		navigation: true,
		slidesNavigation: true,
		navigationPosition: 'left',
		navigationTooltips: ['Intro', '드림캐처', '모아두', '봉정동', 'Contact'] */
	});

	//왼쪽 화살표 삭제
	$(".fp-prev").remove();
	
	//화살표에 class, style, text 추가
	$(".fp-next").addClass(">>>>>").css("transform","rotate(45deg)");
	
	
	
	
	/*======================
	 * after dom ready
	 * ===================*/
	
	//섹션,슬라이드 배경을 클릭했을때
	$("body").on("click", ".section .slide", function() {
		//다음,이전 슬라이드로 이동
		var arrow = $(this).closest(".section").find(".fp-next");
		arrow.trigger("click");
		//클릭이미지 삭제
		$(".clickImg").fadeOut( "400" );
		//화살표 회전
		rotateArrow(arrow, "angle"+currSectionNum, currSectionNum);
	});

	//네비게이션 첫 액티브 지정
	$("#nav-intro .nav-block").addClass("nav-active");

	//네비게이션 마우스오버 css효과
	$("#blockNavigation .nav-area").hover(
  			function() {
  				$(this).find(".block").addClass("hover");
  			},
  			function() {
  				$(this).find(".block").removeClass("hover");
  			}
   	);

	//네비게이션 클릭 시 페이지 이동
	$("body").on("click", ".tile", function() {
		var address = $(this).data("href");
		location.href = address;
	})

	//로딩애니메이션
	$(".spinner").fadeOut();
		
	//body의 className 변경으로 페이지 이동을 감지하고, 모션 조작
	addClassNameListener("body");
	
	//스타워즈 애니메이션 시작
	starwars();
	
	//audio 볼륨 0.2로 세팅. 500ms후에도 intro이면 재생
	var starwarsOST = document.getElementById("starwarsOST");
	starwarsOST.volume = 0.2;
	starwarsOST.pause();
	setTimeout(function(){
		if(currSection == "intro") {
			starwarsOST.play();
		}
	},500);
});


/*======스타워즈======*/
var size = 3;
var posY = 230; 
var ang = 55;
var delta = 0.8;
var scaleDelta = 0.008;
var speed = 50;
var agent = navigator.userAgent.toLowerCase();

function starwars(){
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
		setTimeout(starwars,speed);	
	}else{
		$(".starwars-intro").animate({opacity:"0"},500);
	}
}
/*======스타워즈 끝======*/



function addClassNameListener(elemId) {
	var elem = document.getElementById(elemId);
	var lastClassName = elem.className;
	window.setInterval( function() {   
		var className = elem.className;
		if (className !== lastClassName) {
			//이전 섹션, 이전 슬라이드 번호 추출
			bodyClassName = lastClassName.split("-");
			lastSection = bodyClassName[2];
			if(bodyClassName.length == 4) {
				lastSlide = bodyClassName[3]; 
			}
			//현재 섹션, 현재 슬라이드 번호 추출
			bodyClassName = className.split("-");
			currSection = bodyClassName[2];
			
			//현재 섹션이 몇번쨰 섹션인지 검색
			for(var i=0; i<sectionNameArr.length; i++){
				if(sectionNameArr[i] == currSection){
					currSectionNum = i;
				}
			}
			
			if(bodyClassName.length == 4) {
				currSlide = bodyClassName[3]; //현재 수평페이지 번호
			} else {currSlide = 0;}
			//초기화
			lastClassName = className;
			
			console.log( currSection + "(" + currSectionNum + ") / " + currSlide );
			// alert("lastSection: "+lastSection+"\n"+"lastSlide: "+lastSlide+"\n"+"currSection: "+currSection+"\n"+"currSlide: "+currSlide);
			//scroll 감지 끝//
			
			
			/*==== 네비게이션 css 제어 ====*/
			
			navId = "#nav-" + currSection;

			if ( currSlide == 1 ) {
				$("#blockNavigation").find(navId).parent().removeClass("pl24").addClass("pl0");
				navId = navId + "-" + currSlide;
			} else {
				$("#blockNavigation").find(navId).parent().removeClass("pl0").addClass("pl24");
			}
			
			//이전 블록의 active 제거
			$("#blockNavigation .nav-active").removeClass("nav-active");
			//현재 블록에 active 추가
			$("#blockNavigation").find(navId).find(".nav-block").addClass("nav-active");		
			

			//// 화살표 ////
			if( lastSection == sectionNameArr[1] && lastSection == currSection && lastSlide != currSlide ) {
				rotateArrow($("#section1 .fp-next"), angle1, 1);
			}
			if( lastSection == sectionNameArr[2] && lastSection == currSection && lastSlide != currSlide ) {
				rotateArrow($("#section2 .fp-next"), angle2, 2);
			}
			if( lastSection == sectionNameArr[3] && lastSection == currSection && lastSlide != currSlide ) {
				rotateArrow($("#section3 .fp-next"), angle3, 3);
			}
			if( lastSection == sectionNameArr[4] && lastSection == currSection && lastSlide != currSlide ) {
				rotateArrow($("#section4 .fp-next"), angle4, 4);
			}
			
			
			if( currSection == sectionNameArr[0]) {
				$("header #logo").addClass("boxshadow-white");
				setTimeout(function(){
					document.getElementById("starwarsOST").play();
				},500);
				
			} else {
				$("header #logo").removeClass("boxshadow-white");
				
				//slide1이 보여지면 iframe load
				if( currSlide == 1 ) {
					var iframe = $(".section").eq(currSectionNum).find("iframe");
					if( iframe.attr("src") == "about:blank" ){
						iframe.attr("src", iframe.data("src"));
						$(".section").eq(currSectionNum).find(".openImg").remove();
					}
				}
			}
		}
	},10);
}

function rotateArrow(arrow, angle, section) {
	if( arrow.hasClass(">>>>>") && lastSlide == 0 ) {
		angle = angle + 180;
		switch (section) {
		case 1 : angle1 = angle; break;
		case 2 : angle2 = angle; break;
		}
		arrow.css("transform", "rotate(" + angle + "deg)");
		arrow.css("right","4px");
		arrow.removeClass(">>>>>");
		arrow.addClass("<<<<<");
	} else if( arrow.hasClass("<<<<<") && lastSlide == 1 ) {
		angle = angle + 180;
		switch (section) {
		case 1 : angle1 = angle; break;
		case 2 : angle2 = angle; break;
		}
		arrow.css("transform", "rotate(" + angle + "deg)");
		arrow.css("right","14px");
		arrow.removeClass("<<<<<");
		arrow.addClass(">>>>>");
	} 
}

