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

var sectionNameArr = ['intro', 'fandream', 'univue', 'dreamcatcher', 'moado'];
var angle1 = +45;
var angle2 = +45;
var angle3 = +45;
var angle4 = +45;
var bodyTag;
var bodyClassName;
var currSection = 'Intro';
var currSectionNum = 0;
var currSlide;
var lastSection;
var lastSlide;
var sections = $(".section");
var slides = $(".slide");

$(document).ready(function() {
		/* ※ 페이지 완성 되면 주석 해제
	
	//에러페이지
	window.onerror = function() {
		document.location.href = "error.html";
	}
	
	try{Typekit.load();}catch(e){}
	
		 */
		
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
});

$(window).load(function(){
	
	//bgm 볼륨 조절
	document.getElementById("starwarsOST").volume = 0.2;
	document.getElementById("starwarsOST").play();
	
	//////////////////// 화살표 ////////////////////
	//왼쪽 화살표 삭제
	$(".fp-prev").remove();
	
	//페이지 로드 시 화살표에 class, style, text 추가
	$(".fp-next").addClass(">>>>>").css("transform","rotate(45deg)").append("<span class='arrowText'></span>");
	
	//섹션,슬라이드 배경을 클릭했을때
	$(".section .slide").on("click", function() {
		//다음,이전 슬라이드로 이동
		var arrow = $(this).closest(".section").find(".fp-next");
		arrow.trigger("click");
		//클릭이미지 삭제
		$(".clickImg").fadeOut( "400" );
		//화살표 회전
		rotateArrow(arrow, "angle"+currSectionNum, currSectionNum);
	});

	//섹션1,2 화살표 마우스오버 시 텍스트 변경
	var arrowText = $(".arrowText");
	$(".fp-next").hover(
			function() {
				if (currSlide == 0) {
					arrowText.html("View<br>detail");
				} else {
					arrowText.html("Go<br>back");
				}
				;
				arrowText.fadeIn();
			}, function() {
				arrowText.fadeOut();
			});
	
	//'클릭하시오' 이미지 제거
	$(".fp-next").on("click", function() {
		arrowText.fadeOut("fast");
	});

	
	
	//////////////////// 네비게이션 ////////////////////
	
	//페이지 로드 후 첫 액티브 지정
	$("#nav_Intro .block").addClass("active");

	//마우스오버 css효과
	$("#blockNavigation .area").hover(
  			function() {
  				$(this).find(".block").addClass("hover");
  			},
  			function() {
  				$(this).find(".block").removeClass("hover");
  			}
   	);
	
	
	
	//////////////////// etc ////////////////////
	
	//로딩애니메이션
	$(".spinner").fadeOut();
		
	//Page move when click metro tile
	$(".tile").click(function() {
		var address = $(this).data("href");
		location.href = address;
	})

	//effect when mouse over metro tile
	
	
	//body의 className 변경으로 페이지 이동을 감지하고, 모션 조작
	addClassNameListener("body");
	
});


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
			
			
			//// 네비게이션 css효과 ////
			//기존 active 제거
			$("#blockNavigation .active").removeClass("active");
			
			navId = "#nav_" + currSection;
			if ( currSlide == 1 ) {
				navId = navId + "_" + currSlide;
			} 
			$("#blockNavigation").find(navId).find(".block").addClass("active");		
			

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
