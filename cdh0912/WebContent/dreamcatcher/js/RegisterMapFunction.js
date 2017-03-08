var map; //지도 객체
var polylist; // !!!차후에 일정관리로 보낼 array!!!
var idNum=1; //stop디비전 idx
var flightPath; //폴리라인 객체
var markers = new Array; //생성된 마커들의 배열
var site_ids = new Array; //site_id들의 배열
var route_url = ""; //스태틱맵 이미지 url
var animateArrow; //폴리라인 심볼 애니메이션 인터벌

var plumMarker = new google.maps.MarkerImage("imgs/dot_plum.png",
		new google.maps.Size(20, 20),
		new google.maps.Point(0, 0),
		new google.maps.Point(7, 7));
var yellowMarker = new google.maps.MarkerImage("imgs/dot_yellow.png",
		new google.maps.Size(20, 20),
		new google.maps.Point(0, 0),
		new google.maps.Point(7, 7));


//infowindow의 +이미지 눌렀을때 경로에 <div>생성,hidden생성(위도,경도)
function addBox(sname, sid, lat, lng) {
	var html = "<table class='stop' class='ui-state-default' id='stop'></table>";
	$(html).hide().appendTo($("#stopArea")).fadeIn(500); // 나타나는 fadein 애니메이션
	$("#stop").attr("id", "stop" + idNum).append("<tr><td width='70%'>"+sname+"</td><td width='30%'>"
			+ "<img onclick='markerClick(" + sid + ")' src='"+"imgs/stop_info.png' class='stop_infoImg'/>"
			+ "<img onclick='javascript:removeBox(this);' src='"+"imgs/stop_remove.png' class='stop_removeImg'/></td></tr>");
	$("#stop" + idNum).append("<input type='hidden' name='site_id' class='hideSite_id' value='"+sid+"'/>" +
							  "<input type='hidden' name='site_name' class='hideSite_name' value='"+sname+"'/>" +
							  "<input type='hidden' name='latitude' class='hideLatitude' value='"+lat+"'/>" +
							  "<input type='hidden' name='longitude' class='hideLongitude' value='"+lng+"'/>");
							  
	idNum = idNum+1;
	if(flightPath){ // 폴리라인 지우는 함수 호출.
		removeLine();
		}
	reLoadPolyLine();

}


//루트 리스트 새로 쓰기.  //루트추가 시,루트삭제 시,루트변경 시에 매번 호출돼어야함.
function reLoadPolyLine() {

	//추가 돼있는 루트의 갯수만큼 수행
	polylist = [];
	var count = $(".stop").length; //루트에 추가된 장소의 갯수
	for (var i = 0; i < count; i++) {
		
		//루트로 추가된 마커들의 아이콘을 초록색으로 변경
		marker = markers[$(".hideSite_id:eq(" + i + ")").val()];
		marker.setIcon(yellowMarker);
		
		//맵 모양으로 리스트 작성
	    polylist.push({
	        'site_id': $(".hideSite_id:eq(" + i + ")").val(),
	        'site_name': $(".hideSite_name:eq(" + i + ")").val(),
			'latitude' : $(".hideLatitude:eq(" + i + ")").val(),
			'longitude' : $(".hideLongitude:eq(" + i + ")").val()
	    });
	}												//	alert(polylist.length);	//	alert(latitude+","+longitude);	//	alert(polylist[0].get("lat"));	//	alert(polylist[0].get("lng"));
	drawPolyLine(polylist);
	
	
	//루트로 추가된 마커들의 아이콘을 초록색으로 변경
	changeSelectedMarkersIcon();
	
}


//ReLoadPolyLine()에서 만들어진 polylist로  지도상에 폴리라인을 그린다.
function drawPolyLine(polylist) {

	var flightPlanCoordinates = "[]";
	flightPlanCoordinates = Array();

	for (i=0; i<polylist.length; i++) {
		flightPlanCoordinates.push(
			new google.maps.LatLng(polylist[i].latitude,	polylist[i].longitude)
		);
	}

	var lineSymbol = {
		path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
		strokeColor: '#c15587',//자주색
		strokeOpacity: 1.0,
		strokeWeight: 2,
		fillColor:'#f7e126',//노랑색
		fillOpacity:1.0,
		scale: 3
	};
	flightPath = new google.maps.Polyline({
		path: flightPlanCoordinates,
		strokeColor: '#c15587',//자주색
		strokeOpacity: 1.0,
		strokeWeight: 4,
		icons: [{ icon: lineSymbol }]
	});
	

//	폴리라인 심볼 애니메이션 인터벌
	var count = 0;
	animateArrow = window.setInterval(function() {
		count = (count + 1) % 200; // 0 ~ 200
		var icons = flightPath.get('icons');
		icons[0].offset = (count / 2) + '%'; // 0% ~ 100%
		flightPath.set('icons', icons);
	}, 20);
	
	flightPath.setMap(map);

}

//루트들에 있는 한개의 루트 제거
function removeBox(element) {
	//클릭된 루트박스(stop) //element는 (i)아이콘
	var elementFafa = $(element).parent().parent().parent().parent();
	
	// 폴리라인 지우는 함수 호출.
	removeLine();
	
	// 폴리라인 그리는 함수 호출. + 루트박스 삭제
	elementFafa.fadeTo("fast", 0.00, function(){ //fade
						 $(this).slideUp("fast", function() { //slide up
						 $(this).remove(); //then remove from the DOM
						 reLoadPolyLine();
        });
    });	
}


//지도상에 그려져있던 폴리라인을 지운다.
function removeLine() {
	stopArrow();
	flightPath.setMap(null);
}

//폴리라인 심볼 애니메이션 인터벌 삭제
function stopArrow() {
	clearInterval(animateArrow);
	flightPath.set('icons', null);
};

//루트로 추가된 마커들의 아이콘을 초록색으로 변경
function changeSelectedMarkersIcon() {
	//모든 마커들의 아이콘을 빨간색으로 초기화
	for (var i=0; i < site_ids.length; i++) {
		var site_id = site_ids[i];
		marker = markers[site_id];
		marker.setIcon(plumMarker);
	}
	//루트로 추가된 마커들만 아이콘을 초록색으로 변경
	if(site_ids.length != 0){
		for(var i=0; i < polylist.length; i++){
			var site_id = polylist[i].site_id;
			marker = markers[site_id];
			marker.setIcon(yellowMarker);
		}
	}
}


//루트 눌렀을때 마커 클릭한 효과 
function markerClick(id) { // id는 마커id
	marker = markers[id];
	google.maps.event.trigger(marker, "dblclick");
}


//루트 순서 드래그로 바꿀 수 있는 플러그인 //http://api.jqueryui.com/sortable/
$(function() { 
    $( "#stopArea" ).sortable({
    	cursorAt: { bottom: 7 },
    	opacity: 0.5,
		update: function(event, ui) { removeLine(); reLoadPolyLine(); }
    });
    $( "#stopArea" ).disableSelection();
  });



/////////////////////////////지도///지도///지도///지도///지도///지도/////////////////////////////
function LoadMap() {

	//--------------------------------- 지도 기본옵션 ---------------------------------------	
	var mapOptions = {
		disableDefaultUI: true,
		zoom : 8, // 지도 시작 시 줌 레벨
		center : new google.maps.LatLng(36.433371,127.9205498), // 지도 시작시 위치
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		minZoom : 3 //해당 지도의 최대 줌레벨 //낮을수록 넓은지역을 볼수있다.
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	//--------------------------------- 지도 기본옵션 끝 ---------------------------------------	

	
	
	
	//--------------------------------- 마커, 인포윈도우 생성 시작 ----------------------------------
	var infoWindow = new google.maps.InfoWindow();
	for (var i = 0; i < siteList.length; i++) {
		var myLatlng = new google.maps.LatLng(siteList[i].latitude, siteList[i].longitude);
		
//		if(siteList[i].approval == 1){ //승인된 site이면 빨간색 마커
			var marker = new google.maps.Marker({
				position : myLatlng,
				icon : plumMarker,
				map : map,
				title : siteList[i].site_name,
			});
//		} else { //approval==0  //승인되지 않은 site이면 초록색 마커
//			var marker = new google.maps.Marker({
//				position : myLatlng,
//				icon : yellowMarker,
//				map : map,
//				title : siteList[i].site_name,
//			});
//		}
		
		id = siteList[i].site_id;
		site_ids.push(id);
		markers[id] = marker;

		var site = siteList[i];
		
		(function(marker, site) {
			
			var siteImageUrl;
			if (site.savefolder != undefined || site.saved_picture != undefined) {
				siteImageUrl = "imgs/upload/" + site.savefolder + "/" + site.saved_picture;
			} else {
				siteImageUrl = "imgs/NoImage.jpg";
			}
			
			//맵 클릭해서 인포윈도우 닫기
			google.maps.event.addListener(map, "click", function(){
				//인포윈도우 닫기x
				infoWindow.close();
				});
			//마커 클릭해서 인포윈도우에 내용넣고 띄우기
			google.maps.event.addListener(marker, "click", function(e) {
				//인포윈도우 내용설정
					infoWindow.setContent(
						"<div class='infowindow'>																													" +
						"	<div class='info_siteimg' style='background-image:url(" + siteImageUrl + ");'></div>	" +
						"	<div class='info_sitemenu'>																												" +
						"		<div><font size='4px'><b>" + site.site_name + "</b></font></div>																	" +	
						"		<marquee><font size='2px'>" + site.address + "</font></marquee>																				" +	
						"		<a href=\"javascript:moveSiteView('"+site.site_id+"');\">																										 	" + 
						"		<img src='"+"imgs/info_mvsite.png' id='info_mvsitebtn'></a>													" +
						"		<a href=\"javascript:addBox('" + site.site_name + "','" + site.site_id + "','" + site.latitude + "','" + site.longitude + "');\">	" + 
						"		<img src='"+"imgs/info_plus.png' id='info_plusbtn' onclick=''></a>												" +
						"	</div>																																	" +
						"</div>																																		"
					);
					infoWindow.open(map, marker);
			});
			//마커 더블클릭해서 지도중앙을 마커위치로 부드럽게 이동하기
			google.maps.event.addListener(marker, "dblclick", function(e) {
				map.panTo(marker.getPosition());
				//인포윈도우 내용설정
				infoWindow.setContent(
						"<div class='infowindow'>																													" +
						"	<div class='info_siteimg' style='background-image:url(" + siteImageUrl + ");'></div>	" +
						"	<div class='info_sitemenu'>																												" +
						"		<div><font size='4px'><b>" + site.site_name + "</b></font></div>																	" +	
						"		<marquee><font size='2px'>" + site.address + "</font></marquee>																				" +	
						"		<a href=\"javascript:moveSiteView('"+site.site_id+"');\">																										 	" + 
						"		<img src='"+"imgs/info_mvsite.png' id='info_mvsitebtn'></a>													" +
						"		<a href=\"javascript:addBox('" + site.site_name + "','" + site.site_id + "','" + site.latitude + "','" + site.longitude + "');\">	" + 
						"		<img src='"+"imgs/info_plus.png' id='info_plusbtn' onclick=''></a>												" +
						"	</div>																																	" +
						"</div>																																		"
					);
					infoWindow.open(map, marker);
			});

		})(marker, site);
		
	}	
	//------------------------------- 마커, 인포윈도우 생성 끝 ------------------------------

/*
	//------------------------------ 좌표 제한 시작 --------------------------------
		// 한국 범위
	var strictBounds = new google.maps.LatLngBounds(new google.maps.LatLng(
			33, 125), new google.maps.LatLng(39, 132));			
		// 위경도가  한국근처 벗어나지 못하도록 드래그 끝날 때 좌표 제한시키는 이벤트. 
	google.maps.event
			.addListener(map, 'dragend', function() {
						if (strictBounds.contains(map.getCenter()))
							return;
						var c = map.getCenter(),
						x = c.lng(),
						y = c.lat(),
						maxX = strictBounds.getNorthEast().lng(),
						maxY = strictBounds.getNorthEast().lat(),
						minX = strictBounds.getSouthWest().lng(),
						minY = strictBounds.getSouthWest().lat();
						if (x < minX)
							x = minX;
						if (x > maxX)
							x = maxX;
						if (y < minY)
							y = minY;
						if (y > maxY)
							y = maxY;
						map.setCenter(new google.maps.LatLng(y, x));
					});
	//------------------------------ 좌표 제한 끝 -------------------------------
*/
}//LoadMap 끝



//루트의 위도 경로로 google static map 이미지를 가져올 URL을 만든다.
function makeRouteImageURL() {
	var latlngs = "";
	var latlngs2 = "";
	for(var i=0; i<polylist.length; i++) {
		var k = i;
		if(i > 8)
			k = i % 9;
		latlngs += "&markers=label:" + (k+1) + "|color:purple|" + polylist[i].latitude + "," + polylist[i].longitude;

		latlngs2 += polylist[i].latitude + ",%20" + polylist[i].longitude;
		if(i < polylist.length-1) {
			latlngs2 += "|";
		}
	}
														//차후에 사이즈 constant만들면 다용도로 사용가능
	route_url = "http://maps.googleapis.com/maps/api/staticmap?size=600x600&maptype=roadmap\%20"
			+ latlngs // 마커 위치
			+ "&sensor=false&path=color:0x9c436acc|weight:7|"
			+ latlngs2; // 경로 위치

	//	window.open(route_url,"width=1200,height=900,scrollbars=yes,resizable=yes");
}	


