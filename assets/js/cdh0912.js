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

$(window).load(function(){
	
	//왼쪽 화살표 삭제
	$(".fp-prev").remove();
	
	//화면 여백div 생성1
	$(".boundarySpace").append("<div class='topSpace'></div><div class='leftSpace'></div><div class='rightSpace'></div><div class='bottomSpace'></div>"
							+  "<div class='rightShadow'></div><div class='bottomShadow'></div>");
	
	//화면 여백div 생성2
	$(".slideSpace").append("<div class='topSpace'></div><div class='centerSpace'></div><div class='leftSpace'></div><div class='rightSpace'></div><div class='bottomSpace'></div>"
						+	"<div class='rightShadow'></div><div class='centerShadow'></div><div class='bottomShadowL'></div><div class='bottomShadowR'></div>");
	

	//페이지 로드 시 화살표에 class 주고, text 추가
	$(".fp-next").addClass("arrowRight").after("<span class='arrowText1'>View<br>detail</span>" +
												"<span class='arrowText2'>Go<br>back</span>");
	
	var arrow1 = $("#section1 .fp-next");
	var arrow2 = $("#section2 .fp-next");

	//슬라이드 섹션에서 배경 클릭하면 슬라이드 작동
	$("#section1 .slide").on("click", function() {
		arrow1.trigger("click");
		//클릭이미지 클릭 시 삭제
		$(".clickImg").fadeOut( "400" );
	});
	$("#section2 .slide").on("click", function() {
		arrow2.trigger("click");
		//클릭이미지 클릭 시 삭제
		$(".clickImg").fadeOut( "400" );
	});
	
	//화살표 클릭 시 180도 회전
	arrow1.on("click", function() {
		angle1 = angle1 + 180;
		$(this).css("-webkit-transform", "rotate(" + angle1 + "deg)");
		$(this).addClass("");
	})
	arrow2.on("click", function() {
		angle2 = angle2 + 180;
		$(this).css("-webkit-transform", "rotate(" + angle2 + "deg)");
	})
	
	//화살표 마우스오버 시 텍스트 변경
	$("#section1 .fp-next").hover( function() {
		var arrowText;
		if( $("#section1 .fp-slidesNav a").first().hasClass("active")) {
			arrowText = $("#section1 .arrowText1");
		} else {
			arrowText = $("#section1 .arrowText2");
		};
		arrowText.stop(false, false).animate({
			width:"toggle",
			opacity:"toggle"
		},250);
	});
	$("#section2 .fp-next").hover( function() {
		var arrowText;
		if( $("#section2 .fp-slidesNav a").first().hasClass("active")) {
			arrowText = $("#section2 .arrowText1");
		} else {
			arrowText = $("#section2 .arrowText2");
		};
		arrowText.stop(false, false).animate({
            width:"toggle",
            opacity:"toggle"
        },250);
	});
	
});