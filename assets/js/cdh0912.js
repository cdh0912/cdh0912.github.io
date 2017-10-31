var sectionNameArr = [];
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
	for(var i=0; i<sections.length; i++) {
        sectionNameArr.push(sections.eq(i).data('sectionName'));
	}

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
	});

	
	
	
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
	
	var starwarsOST = document.getElementById("starwarsOST");
	starwarsOST.volume = 0.2; //audio 볼륨 0.2로 세팅
	setTimeout(function () {      
		if (currSection == "intro") {
			starwarsOST.play(); //audio play
		}
	}, 1000);
	
	//모바일 체크
	var filter = "win16|win32|win64|mac";
	var enterInMobile = false;
	if(navigator.platform){
		if(0 > filter.indexOf(navigator.platform.toLowerCase())){
			enterInMobile = true;
		}
	}
	
	//mail  form
	var $contactForm = $('#contact-form');
	$contactForm.submit(function(e) {
		e.preventDefault();
		$.ajax({
			url: '//formspree.io/cdh0912@gmail.com',
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function() {
				$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
			},
			success: function(data) {
				$contactForm.find('.alert--loading').hide();
				$contactForm.append('<div class="alert alert--success">Message sent!</div>');
			},
			error: function(err) {
				$contactForm.find('.alert--loading').hide();
				$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
			}
		});
	});
	
	//모달 팝업 시 body의 스크롤 동작 X
	$("body").on("click", ".md-trigger, .md-overlay, .md-close", function(){
		if( $(".md-modal").hasClass("md-show") ){
			$("body").on("scroll touchmove mousewheel", function(e) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
		} else {
			$("body").off("scroll touchmove mousewheel");
		}
	});
	
	
});


function addClassNameListener(elemId) {
	var elem = document.getElementById(elemId);
	var lastClassName = elem.className;
	window.setInterval( function() {   
		var className = elem.className;
		if (className !== lastClassName) {
			/*==== scroll 감지 ====*/
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
			// console.log("lastSection: "+lastSection+"\n"+"lastSlide: "+lastSlide+"\n"+"currSection: "+currSection+"\n"+"currSlide: "+currSlide);
			/*==== scroll 감지 끝 ====*/
			
			
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
			/*==== 네비게이션 css 제어 끝 ====*/
			

			/*==== section 이동 시 효과 ====*/
			if( currSection == sectionNameArr[0]) {
				$("header #logo").addClass("boxshadow-white");
				
				//audio 재생
				document.getElementById("starwarsOST").play();
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
			/*==== section 이동 시 효과 끝 ====*/
			
			
		}
	},10);
}

