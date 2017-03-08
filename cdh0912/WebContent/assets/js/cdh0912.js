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

var angle1 = +45;
var angle2 = +45;
var bodyTag;
var bodyClassName;
var currSection = 'Intro';
var currSlide;
var lastSection;
var lastSlide;


$(window).load(function(){
	
	//////////////////// 화살표 ////////////////////
	
	//왼쪽 화살표 삭제
	$(".fp-prev").remove();
	
	var arrow1 = $("#section1 .fp-next");
	var arrow2 = $("#section2 .fp-next");
	
	//페이지 로드 시 화살표에 class, style, text 추가
	$(".fp-next").addClass(">>>>>").css("transform","rotate(45deg)").append("<span class='arrowText'></span>");

	//섹션1 슬라이드 배경을 클릭했을때
	$("#section1 .slide").on("click", function() {
		//다음,이전 슬라이드로 이동
		arrow1.trigger("click");
		//클릭이미지 삭제
		$(".clickImg").fadeOut( "400" );
		//화살표 회전
		rotateArrow(arrow1, angle1, 1);
	});
	
	//섹션2 슬라이드 배경을 클릭했을때
	$("#section2 .slide").on("click", function() {
		//다음,이전 슬라이드로 이동
		arrow2.trigger("click");
		//클릭이미지 삭제
		$(".clickImg").fadeOut( "400" );
		//화살표 회전
		rotateArrow(arrow2, angle2, 2);
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
	
	//open div클릭시 iframe 로드 
	$("#dc_openImg").click(function() {
		var iframe = $("#dc_iFrame");
		iframe.attr('src', iframe.data("src"));
		$(this).remove();
	});
	$("#moa_openImg").click(function() {
		var iframe = $("#moa_iFrame");
		iframe.attr('src', iframe.data("src"));
		$(this).remove();
	});
	
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
			if(bodyClassName.length == 4) {
				currSlide = bodyClassName[3]; //현재 수평페이지 번호
			} else {currSlide = 0;}
			//초기화
			lastClassName = className;
			
			//debug.
			// console.log( currSection + ", " + currSlide );
			// alert("lastSection: "+lastSection+"\n"+"lastSlide: "+lastSlide+"\n"+"currSection: "+currSection+"\n"+"currSlide: "+currSlide);
			//scroll 감지 끝//
			
			
			
			
			sectionArr = ['Intro', 'DreamCatcher', 'MoaDo', 'BongJungDong', 'Profile'];
			
			//// 네비게이션 css효과 ////
			//기존 active 제거
			$("#blockNavigation .active").removeClass("active");
			
			navId = "#nav_" + currSection;
			if ( currSlide == 1 ) {
				navId = navId + "_" + currSlide;
			} 
			$("#blockNavigation").find(navId).find(".block").addClass("active");		
			

			//// 화살표 ////
			//dc 슬라이드 이동 시 화살표 회전
			if( lastSection == sectionArr[1] && lastSection == currSection && lastSlide != currSlide ) {
				rotateArrow($("#section1 .fp-next"), angle1, 1);
			}
			//moado 슬라이드 이동 시 화살표 회전 
			if( lastSection == sectionArr[2] && lastSection == currSection && lastSlide != currSlide ) {
				rotateArrow($("#section2 .fp-next"), angle2, 2);
			}
			
			
			//// 배경사진 ////
			//배경사진 css효과 ---> 마지막으로 작동해야 다른 효과들에 방해없음
			
			if( currSection == 'Intro') {
				$("header").css("background","transparent");
				$("#section0").css("background-position", "50% 0px");
				$("#section1 #slide1").css("background-position", "50% 100px");
				$("#section2 #slide1").css("background-position", "50% 100px");
			} else if( currSection == 'DreamCatcher') {
				$("header").css("background","rgba(0, 0, 0, 0.2)");
				$("#section1 #slide1").css("background-position", "50% 0px");
				$("#section0").css("background-position", "50% 100px");
				$("#section2 #slide1").css("background-position", "50% 100px");
			} else if( currSection == 'MoaDo') {
				$("header").css("background","rgba(0, 0, 0, 0.2)");
				$("#section2 #slide1").css("background-position", "50% 0px");
				$("#section0").css("background-position", "50% 100px");
				$("#section1 #slide1").css("background-position", "50% 100px");
			} else {
				$("header").css("background","rgba(0, 0, 0, 0.2)");
				$("#section2 #slide1").css("background-position", "50% 100px");
				$("#section0").css("background-position", "50% 100px");
				$("#section1 #slide1").css("background-position", "50% 100px");
			}
			

			/*
			obj = [$("#section0"), $("#section1 #slide1"), $("#section2 #slide1")];
			for(var i=0; i<3; i++) {
				if(currSection == sectionArr[i]) {
					obj[i].css("background-position", "50% 0px");
				} else {
					obj[i].css("background-position", "50% 100px");
				}
			}
			*/
			
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
