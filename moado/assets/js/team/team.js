var root="/MoaDo"
$contentLoadTriggered = false;
    $(document).scroll(function(){
        if($(document).scrollTop() >= ($("#innercomp").height()) && $contentLoadTriggered == false){
        	
            $contentLoadTriggered = true;
            for(var i=0;i<4;i++){
            var clone=document.getElementById("comp1").cloneNode(true);
            	document.getElementById("innercomp").appendChild(clone);
            	}
              $contentLoadTriggered = false;
        }
    });

    
	function teamInfoSetting() {
		$('#teamIntro1').hide();
		$('#showTeamIntro').hide();
		var origin = document.getElementById("originTeamIntro").innerHTML
		$('#teamIntroModify').attr('value', origin);
		$('#teamIntro2').show();
		$('#showModifyTeamIntro').show();

	}
	function detailInfoSetting() {
		var text = document.getElementById("modifyDetailArea");
		document.getElementById("modifyDetailArea").removeAttribute("readonly");
		document.getElementById("modifyDetailArea").style.border = "1px solid black";
		$('#modifyDetailInfo').show();
		$('#showModifyDetailIntro').show();
		$('#showDetailIntro').hide();
	}
	function crewSetting() {
		$('#crewList').hide();
		$('#showCrewList').hide();
		$('#crewModify').show();
		$('#showModifyCrewList').show();
	}
	function showCrewList(){
		$('#crewList').show();
		$('#showCrewList').show();
		$('#crewModify').hide();
		$('#showModifyCrewList').hide();
	}
	function changeRole(){
		var role=document.getElementById("roleName");
		role.style.border="2px solid #527394";
		$('#roleNameModify').show();
		$('#roleNameSetting').hide();
		document.getElementById("roleName").removeAttribute("readonly");
		role.style.borderRadius="15px";
	}
	function teamImageSetting(){
		$('#modifyTeamImage').show();
		$('#showTeamImage').hide();
		$('#teamLogo').show();
	}
	function openNotification(){
		//$('#teamNotification').show();
	}
	function teamIntroModify(){
		$.ajax({
			type : 'POST', 
			dataType: 'text',
			url : root+'/team/teamIntro',
			data :{teamIntro:$('#teamIntroModify').val()}, //$('#loginform').
			success : function(data) { 
				document.getElementById("originTeamIntro").innerHTML=$('#teamIntroModify').val();
				$('#teamIntro2').hide();
				$('#showModifyTeamIntro').hide();
				$('#teamIntro1').show();
				$('#showTeamIntro').show();
			},
			error:function(e){alert('오류빌');}
		});	
	}
	function roleNameModify(e){
		
		$.ajax({
			type : 'POST', 
			dataType: 'text',
			url : root+'/team/roleName',
			data :{roleName:$('#'+e).val()}, //$('#loginform').
			success : function(data) { 
				document.getElementById(e).style.border="0px";
				document.getElementById(e).setAttribute("readonly", "readonly");
				$('#roleNameModify').hide();
				$('#roleNameSetting').show();
			},
			error:function(e){alert('오류빌');}
		});	
	}
	function dropCrew(e){
		if(confirm("팀원을 제명하시겠습니까?")){
		$.ajax({
			type : 'POST', 
			dataType: 'text',
			url : root+'/team/drop',
			data :{roleName:$('#'+e).val()}, //$('#loginform').
			success : function(data) { 
				$('#teamId').hide();
			},
			error:function(e){alert('오류빌');}
		});	
	}
		function teamImageModify(){
			$.ajax({
				type : 'POST', 
				dataType: 'text',
				url : root+'/team/teamImage',
				data :$('#teamImage').serialize(), //$('#loginform').
				success : function(data) { 
					$('#teamLogo').hide();
					$('#modifyTeamImage').hide();
					$('#showTeamImage').show();
				},
				error:function(e){alert('오류빌');}
			});	
		}
	}
