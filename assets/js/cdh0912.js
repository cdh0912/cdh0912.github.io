/*$(window).load(function(){
	makeModal();
});

function makeModal() {
	var projectNames = ["DreamCatcher","Moado"];
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
var currSection;
var currSlide;
var lastSection;
var lastSlide;

$(window).load(function(){
	
	//왼쪽 화살표 삭제
	$(".fp-prev").remove();
	
	//화면 여백div 생성 - 인덱스 전용
	$(".boundarySpace").append("<div class='topSpace'></div><div class='leftSpace'></div><div class='rightSpace'></div><div class='bottomSpace'></div>"
							+  "<div class='leftShadow'></div><div class='rightShadow'></div><div class='topShadow'></div><div class='bottomShadow'></div>");
	//화면 여백div 생성 - 슬라이드 전용
	$(".slideSpace").append("<div class='topSpace'></div><div class='centerSpace'></div><div class='leftSpace'></div><div class='rightSpace'></div><div class='bottomSpace'></div>"
						+	"<div class='leftShadow'></div><div class='rightShadow'></div><div class='centerShadowL'></div><div class='centerShadowR'></div><div class='topShadowL'></div><div class='topShadowR'></div><div class='bottomShadowL'></div><div class='bottomShadowR'></div>");
	
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
					arrowText.removeClass("arrowText-left")
							.html("View<br>detail");
				} else {
					arrowText.addClass("arrowText-left").html(
							"Go<br>back");
				}
				;
				arrowText.fadeIn();
			}, function() {
				arrowText.fadeOut();
			});

	$(".fp-next").on("click", function() {
		arrowText.fadeOut("fast");
	});

	//body의 className 변경으로 페이지 이동을 감지하고, 모션 조작
	addClassNameListener("body");
	
	
	//로딩애니메이션
	$(".spinner").fadeOut();
	
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
			}
			
			//섹션1 내 슬라이드 이동 시 화살표 회전
			if( lastSection == "DreamCatcher" && lastSection == currSection && lastSlide != currSlide ) {
				rotateArrow($("#section1 .fp-next"), angle1, 1);
			}
			//섹션2 내 슬라이드 이동 시 화살표 회전 
			if( lastSection == "Moado" && lastSection == currSection && lastSlide != currSlide ) {
				rotateArrow($("#section2 .fp-next"), angle2, 2);
			}
			
			lastClassName = className;
		//	alert("lastSection: "+lastSection+"\n"+"lastSlide: "+lastSlide+"\n"+"currSection: "+currSection+"\n"+"currSlide: "+currSlide);
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
		arrow.removeClass(">>>>>");
		arrow.addClass("<<<<<");
	} else if( arrow.hasClass("<<<<<") && lastSlide == 1 ) {
		angle = angle + 180;
		switch (section) {
		case 1 : angle1 = angle; break;
		case 2 : angle2 = angle; break;
		}
		arrow.css("transform", "rotate(" + angle + "deg)");
		arrow.removeClass("<<<<<");
		arrow.addClass(">>>>>");
	} 
}
