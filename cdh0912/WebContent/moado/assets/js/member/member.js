var root = "/MoaDo";
var FACEBOOK_APPLICATION_ID = '466651296834694';

var loadingImgStr = '<div><img src="'+root+'/assets/images/member/loading.gif"></div>';
$(function() {
	/*********************************************************
	jQuery validate에 notEqualTo 규칙 추가
	*********************************************************/
	$.validator.addMethod(
		'notEqualTo',
		function (value, element, param) {
			return this.optional(element) || value != param.val();
		},
		'Please specify a different value'
	);

	/*********************************************************
	로그인폼 유효성 검사를 위한 jQuery validate 함수
	*********************************************************/
	$("#loginForm").validate({  
		submitHandler: memberLogin,

		rules: {
		    id: {
                required: true,
                email: true,
                maxlength: 40
            },
            password: {
                required: true
            }
        },
        messages: {
        	id: {
                required: "이메일 주소를 입력해주세요.",
                email: "올바른 형식의 이메일 주소를 입력해주세요.",
                maxlength: "이메일 주소는 최대 40자를 초과할 수 없습니다."
            },
            password: {
                required: "비밀번호를 입력해주세요."
            }
        },
        errorElement: "div",
        errorPlacement: function(error, element) {
            error.insertBefore(element.parent());
            error.css({
            	"margin": "0 0 0 0px", 
            	"color":"#85d6de", 
            	"text-align":"left"});
        }

    });
	
	/*********************************************************
	회원가입폼 유효성 검사를 위한 jQuery validate 함수
	*********************************************************/	
	$("#registerForm").validate({
		submitHandler : memberRegister,
		ignore: [],
		rules : {
			id : {
				required : true,
				email : true,
				maxlength : 40
			},
			name : {
				required : true,
				maxlength : 40
			},
			password : {
				required : true,
				rangelength : [ 5, 16 ]
			},
			password2 : {
				required : true,
				equalTo : "#password"
			},
			agree : {
				required : true
			}
		},
		messages : {
			id : {
				required : "이메일 주소를 입력해주세요.",
				email : "올바른 형식의 이메일 주소를 입력해주세요.",
				maxlength : "이메일 주소는 최대 40자를 초과할 수 없습니다."
			},
			name : {
				required : "이름을 입력해주세요.",
				maxlength : "이름은 최대 40자를 초과할 수 없습니다."
			},
			password : {
				required : "비밀번호를 입력해주세요.",
				rangelength : "비밀번호는 5~16자까지 사용 가능합니다."
			},
			password2 : {
				required : "비밀번호를 다시 한번 입력해주세요.",
				equalTo : "입력하신 비밀번호가 일치하지 않습니다."
			},
			agree : {
				required : "회원약관에 동의해주세요."
			}
		},
		errorElement : "div",
		errorPlacement : function(error, element) {
			error.insertBefore(element.parent());
			error.css({
				"margin" : "0 0 0 0px",
				"color" : "#85d6de",
				"text-align" : "left"
			});
		}
	});
	
	/*********************************************************
	비밀번호 찾기 폼 유효성 검사를 위한 jQuery validate 함수
	*********************************************************/
	$("#forgotPassForm").validate({

		submitHandler : adminSendPassword,

		rules : {
			id : {
				required : true,
				email : true,
				maxlength : 40
			}
		},
		messages : {
			id : {
				required : "이메일 주소를 입력해주세요.",
				email : "올바른 형식의 이메일 주소를 입력해주세요.",
				maxlength : "이메일 주소는 최대 40자를 초과할 수 없습니다."
			}
		},
		errorElement : "div",
		errorPlacement : function(error, element) {
			error.insertBefore(element.parent());
			error.css({
				"margin" : "0 0 0 0px",
				"color" : "#85d6de",
				"text-align" : "left"
			});
		}

	});
	
	/*********************************************************
	비밀번호 변경 폼 유효성 검사를 위한 jQuery validate 함수
	*********************************************************/	
	$("#resetPassForm").validate({
		submitHandler : memberResetPassword,
		rules : {
			password : {
				required : true,
				rangelength : [ 5, 16 ],
				notEqualTo : $('#oldPassword')
			},
			password2 : {
				required : true,
				equalTo : "#password"
			},
		},
		messages : {
			password : {
				required : "새 비밀번호를 입력해주세요.",
				rangelength : "비밀번호는 5~16자까지 사용 가능합니다.",
				notEqualTo : "임시 비밀번호와 동일한 비밀번호는 사용하실 수 없습니다."
			},
			password2 : {
				required : "새 비밀번호를 다시 한번 입력해주세요.",
				equalTo : "입력하신 비밀번호가 일치하지 않습니다."
			},
		},
		errorElement : "div",
		errorPlacement : function(error, element) {
			error.insertBefore(element.parent());
			error.css({
				"margin" : "0 0 0 0px",
				"color" : "#85d6de",
				"text-align" : "left"
			});
		}
	});
	
	/*********************************************************
	회원정보 수정 폼 유효성 검사를 위한 jQuery validate 함수
	*********************************************************/	
	$("#modifyInfoForm").validate({
		submitHandler : memberModify,
		rules : {
			name : {
				required : true,
				maxlength : 40
			},
			oldPassword : {
				required : true
			},
			password : {
				rangelength : [ 5, 16 ],
				notEqualTo : $('#oldPassword')
			},
			password2 : {
				equalTo : "#password"
			}
		},
		messages : {
			name : {
				required : "이름을 입력해주세요.",
				maxlength : "이름은 최대 40자를 초과할 수 없습니다."
			},
			oldPassword : {
				required : "기존 비밀번호를 입력해주세요."
			},
			password : {
				rangelength : "비밀번호는 5~16자까지 사용 가능합니다.",
				notEqualTo : "기존 비밀번호와 동일한 비밀번호는 사용하실 수 없습니다."
			},
			password2 : {
				equalTo : "입력하신 비밀번호가 일치하지 않습니다."
			}
		},
		errorElement : "div",
		errorPlacement : function(error, element) {
			error.insertBefore(element.parent());
			error.css({
				"margin" : "0 0 0 0px",
				"color" : "#85d6de",
				"text-align" : "left"
			});
		}

	});
	
	/***************************************************************************
	 * remote 속성을 이용한 bootstrap 모달 팝업 onClick 이벤트
	 **************************************************************************/	
	$('.member-style a.modalButton').on('click', function(e) {
	    e.preventDefault();
	    var url = $(this).data('src');
	    var target = $(this).data('target');
	    $(window.parent.document).find('.modal-backdrop').remove();
	    $(window.parent.document).find(target).removeData('bs.modal');
	    $(window.parent.document).find(target).modal({remote: url });

	});
	
	$('#id').on('focus', function(e) {
	    $('#alertMsg').html('');
	});
	
	$('#loginForm #password').on('focus', function(e) {
	    $('#alertMsg').html('');
	});
	
	$('#forgotPassForm #password').on('focus', function(e) {
	    $('#alertMsg').html('');
	});	
	
	$('#resetPassForm #password').on('focus', function(e) {
	    $('#alertMsg').html('');
	});
	
	$('#name').on('focus', function(e) {
	    $('#alertMsg2').html('');
	});
	
	$('#modifyInfoForm input').on('focus', function(e) {
	    $('#alertMsg').html('');
	});
	
	$('#modifyInfoForm #oldPassword').on('focus', function(e) {
	    $('#alertMsg2').html('');
	});	
	
	/*********************************************************
	bootstrap checkbox 클릭 시 checked 속성 여부를 적용하기 위한 onClick 이벤트
	*********************************************************/	
	/*
	$('#loginForm .checkbox').on('click', function(e) {
		if ($('#idSave').is(':checked')) {
			$('#idSave').attr('checked', true);
		} else {
			$('#idSave').attr('checked', false);
		}
	});
	*/
});

/*********************************************************
memberLogin : Login을 위한 ajax 함수
*********************************************************/
function memberLogin() {
	$('#alertMsg').html('');
	$.ajax({
		url: root+'/member/login',
		type : 'POST',
		data : $('#loginForm').serialize(),
		dataType : 'json',
		success : loginSuccess,
		error : function(){alert('오류가 발생했습니다.\n나중에 다시 시도해주세요.');}
	});
}	
var id = '';
var name = '';

/*********************************************************
loginSuccess : Login ajax callback 함수
*********************************************************/
function loginSuccess(data){
	var result = data.result;
	// 로그인 성공시
	if(result == 'loginSuccess'){
		$('.content-body').hide();
		// memberState = 0 : 가입대기 상태 | 1 : 가입완료 상태 | 2: 비밀번호 리셋 상태
		var memberState = data.memberState;
		if( memberState == 0 ){
			id = data.memberInfo.id;
			name = data.memberInfo.name;
			$('.userName').html(name);
			$('.send-auth').show();
		}else if(memberState == 1){
			document.location.href=root+"/main";
		}else if(memberState == 2){
			id = data.memberInfo.id;
			//alert($('#resetPassButton').data('src'));
			var src = $('#resetPassButton').data('src') + '&id=' + id + "&tempPassword="+$('#password').val();
			//alert(src);
			$('#resetPassButton').data('src', src);
			//alert($('#resetPassButton').data('src'));
			name = data.memberInfo.name;
			$('.userName').html(name);
			$('.reset-pass').show();
		}
	// 로그인 실패시
	}else{
		$('#alertMsg').css({
			"color" : "#85d6de",
			"text-align" : "left"
		}).html('아이디 또는 비밀번호를 확인하신 후 다시 로그인해 주세요.');
	}
}

/*********************************************************
sendAuthCode : 회원 가입 인증 절차 - 이메일로 인증코드를 발송하기 위한 ajax 함수
*********************************************************/
function sendAuthCode(){
	$.ajax({
		url: root+'/admin/sendAuthCode',
		type : 'POST',
		data : {'id': id, 'name':name},
		dataType : 'json',
		success : sendAuthCodeSuccess,
		beforeSend : function(){
			$('#alertMsg').css({
				"text-align" : "center"
			}).html(loadingImgStr);
			$('.content-body').hide();
			$('.hidden-content').hide();

		},
		error : function(){alert('오류가 발생했습니다.\n나중에 다시 시도해주세요.');}
	});
}

/*********************************************************
sendAuthCodeSuccess : 인증코드 발송 ajax callback 함수
*********************************************************/
function sendAuthCodeSuccess(data){
	var result = data.result;
	//alert(result);
	$('.content-body').show();
	if(result == 'sendAuthCodeSuccess'){
		$('#alertMsg').css({
			"color" : "white"
		}).html('<h5>인증메일 발송이 완료되었습니다.</h5><br>');
	}else{
		$('#alertMsg').css({
			"color" : "white"
		}).html('<h5>인증메일 발송에 실패했습니다.</h5><br>');		
	}	
}

/*********************************************************
loginCallback : Google 로그인 절차를 처리하기 위한 callback 함수
*********************************************************/
function loginCallback(authResult) {

	// 승인 성공
	if (authResult['access_token']) {
		// 사용자가 승인되었으므로 로그인 버튼 숨김. 예:
		//document.getElementById('signinButton').setAttribute('style', 'display: none');	
		gapi.client.load('plus', 'v1', function() {	
			var request = gapi.client.plus.people.get({
				'userId' : 'me'		
			});
				
			request.execute(function(response){	
				var displayName = response.displayName;					
				var id = response.id;				
				var emails = response.emails;				
				var email = '';
				var m_level = 0;
				var m_state = 1;
				for(var i=0; i<emails.length; i++){
					// email 리스트 가운데 대표메일이 있다면 해당 이메일을 사용
					if(emails[i].primary){
						email = emails[i].value;
					}
					// email 리스트 가운데 대표메일이 없다면 리스트의 첫번째 이메일을 사용
					if(i == emails.length - 1 && email == ''){
						email = emails[0].value;
					}
				}
					
				// alert("닉네임 : "+displayName+"\n아이디 : "+id+"\n이메일 : "+email);
				// displayName과 email이 존재할 경우에만 로그인 절차 수행
				if( displayName != '' && displayName != 'undefined'	
					&&  email != '' && email != 'undefined'){
					$.ajax({		
						url: root+'/member/loginWithOAuth',
						type : 'POST',							
						data : {'id':email,'name':displayName,'loginMode':'Google'},
						dataType : 'json',							
						success : loginWithOAuthSuccess,
						error : function(){
							alert('오류가 발생했습니다.\n나중에 다시 시도해주세요.');
						}
					});	
				}
			});
		});
	// 승인 실패
	} else if (authResult['error']) {
		//alert('오류 발생');
		// 오류가 발생했습니다.
		// 가능한 오류 코드:
		//   "access_denied" - 사용자가 앱에 대한 액세스 거부
		//   "immediate_failed" - 사용자가 자동으로 로그인할 수 없음
		// console.log('오류 발생: ' + authResult['error']);  
	}
}

/*********************************************************
facebookLogin : Facebook 로그인 절차를 처리하기 위한 callback 함수
*********************************************************/
function facebookLogin(){
	FB.login(function(response) {  
		var fbname;  
		var accessToken = response.authResponse.accessToken;  
		FB.api('/me', function(user) {  
			fbname = user.name;
			$.ajax({
				url: root+'/member/loginWithOAuth',
				type : 'POST',
				data : {'id':user.email,'name':fbname,'loginMode':'Facebook',"accessToken":accessToken},			
				dataType : 'json',				
				success : loginWithOAuthSuccess,				
				error : function(){alert('오류가 발생했습니다.\n나중에 다시 시도해주세요.');}			
			});	     	    
		});     
	}, {scope: "user_about_me,email"});  
}

/*********************************************************
loginWithOAuthSuccess : Google & Facebook 로그인 완료 callback 함수
*********************************************************/
function loginWithOAuthSuccess(data){
	var result = data.result;
	if(result == 'loginWithOAuthSuccess'){
		alert(data.memberName+'('+data.memberId+') 님!\n환영합니다!\n'+data.loginMode + ' 계정으로 로그인하셨습니다.');
		document.location.href=root+"/main";
	}else{
		alert('로그인 도중 오류가 발생하였습니다.');
	}
}

/*********************************************************
Facebook 로그인 연동을 위한 초기 설정
*********************************************************/
window.fbAsyncInit = function() {  
    FB.init({appId: FACEBOOK_APPLICATION_ID, status: true, cookie: true,xfbml: true});      
};  
(function(d) {
	var js, id = FACEBOOK_APPLICATION_ID, ref = d.getElementsByTagName("script")[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement("script");
	js.id = id;
	js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));

/*********************************************************
Google 로그인 연동을 위한 초기 설정
*********************************************************/
(function() {
	var po = document.createElement('script');
	po.type = 'text/javascript';
	po.async = true;
	po.src = 'https://apis.google.com/js/client:plusone.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(po, s);
})();

/*********************************************************
memberRegister : 회원가입을 위한 ajax 함수
*********************************************************/
function memberRegister() {
	jQuery.ajax({
		url: root+'/member/register',
		type : 'POST',
		data : $('#registerForm').serialize(),
		dataType : 'json',
		success : memberRegisterResult,
		beforeSend : function(){
			$('#alertMsg').css({
				"text-align" : "center"
			}).html(loadingImgStr);
			$('.content-body').hide();
		},
		error : function(){alert('회원 가입 중 오류가 발생했습니다.\n나중에 다시 시도해주세요.');}
	});
}

/*********************************************************
memberRegisterResult : 회원가입 완료 ajax callback 함수
*********************************************************/
function memberRegisterResult(data) {
	$('#alertMsg').html('');
	$('#alertMsg2').html('');
	var result = data.result;
	if( result == 'idExist'){
		$('.content-body').show();
		$('#alertMsg').css({
			"color" : "#85d6de",
			"text-align" : "left"
		}).html('이미 사용중인 이메일입니다.');
		return;
	}else if( result == 'registerSuccess'){
		jQuery('.userName').html(jQuery('#name').val());
		jQuery('.hidden-content').show();
	}else{
		$('.content-body').show();
		$('#alertMsg').css({
			"color" : "#85d6de",
			"text-align":"left"
		}).html('회원 가입 중 오류가 발생했습니다.');
	}

}

/*********************************************************
adminSendPassword : 임시 비밀번호 발송을 위한 ajax 함수
*********************************************************/
function adminSendPassword() {
	$.ajax({
		url: root+'/admin/sendPassword',
		type : 'POST',
		data : jQuery('#forgotPassForm').serialize(),
		dataType : 'json',
		success : sendPasswordResult,
		beforeSend : function(){
			$('#alertMsg').css({
				"text-align" : "center"
			}).html(loadingImgStr);
			$('.content-body').hide();
		},
		error : function(){alert('오류가 발생했습니다.\n나중에 다시 시도해주세요.');}
	});
	


}

/*********************************************************
sendPasswordResult : 임시 비밀번호 발송 결과 ajax callback 함수
*********************************************************/
function sendPasswordResult(data) {
	$('#alertMsg').html('');	
	var result = data.result;
	if(result == 'idNotExist'){
		$('.content-body').show();
		$('#alertMsg').css({
			"color" : "#85d6de",
			"text-align" : 'left'
		}).html('가입되지 않은 이메일입니다.');
		return;
	}else if(result == 'sendPasswordSuccess'){
		jQuery('#forgotPassForm .hidden-content').show();
	}
}

/*********************************************************
moveResetPassword : 비밀번호 변경 페이지 이동 함수
*********************************************************/
function moveResetPassword() {
	document.loginForm.action = root+'/member/resetPassword';
	document.loginForm.submit();
}

/*********************************************************
memberResetPassword : 비밀번호 변경을 위한 ajax 함수
*********************************************************/
function memberResetPassword() {
	jQuery.ajax({
		url: root+'/member/resetPasswordProcess',
		type : 'POST',
		data : jQuery('#resetPassForm').serialize(),
		dataType : 'json',
		success : resetPasswordResult,
		beforeSend : function(){
			$('#alertMsg').css({
				"text-align" : "center"
			}).html(loadingImgStr);
			$('.content-body').hide();
		},
		error : function(){alert('오류가 발생했습니다.\n나중에 다시 시도해주세요.');}
	});
}

/*********************************************************
resetPasswordResult : 비밀번호 변경 결과 ajax callback 함수
*********************************************************/
function resetPasswordResult(data) {
	
	$('#alertMsg').html('');
	$('.content-body').show();
	//admin@dreamcatcher.com
	var result = data.result;
	alert(result);
	if( result == 'passwordExist'){
		$('#alertMsg').css({
			"color" : "#85d6de",
			"text-align" : "left"
		}).html('임시 비밀번호와 동일한 비밀번호는 사용하실 수 없습니다.');
		return;
	}else if(result=='resetPasswordSuccess') {
		$('#alertMsg').html('');
		$('.content-body').hide();
		$('.hidden-content').show();
	}
}

/*********************************************************
memberModify : 회원정보 수정을 위한 ajax 함수
*********************************************************/
function memberModify() {
	jQuery.ajax({
		url: root+'/member/modifyInfo',
		type : 'POST',
		data : jQuery('#modifyInfoForm').serialize(),
		dataType : 'json',
		success : memberModifyResult,
		beforeSend : function(){
			$('#alertMsg').css({
				"text-align" : "center"
			}).html(loadingImgStr);
			$('.content-body').hide();
		},
		error : function(){alert('오류가 발생했습니다.\n나중에 다시 시도해주세요.');}
	});
}

/*********************************************************
memberModifyResult : 회원정보 수정 결과 ajax callback 함수
*********************************************************/
function memberModifyResult(data) {
	$('#alertMsg').html('');
	var result = data.result;
	if( result == 'invalidPassword'){
		$('.content-body').show();
		$('#alertMsg2').css({
			"color" : "#85d6de",
			"text-align" : "left"
		}).html('잘못된 비밀번호입니다.');
		return;
	}else if( result == 'modifyInfoSuccess'){
		$('.content-body').show();
		jQuery('#name').val(data.memberInfo.name);
		jQuery('#oldPassword').val('');
		$('#alertMsg').html('<br><h4>회원 정보가 정상적으로 수정되었습니다.</h4><br>');
	}else{
		$('.content-body').show();
		$('#alertMsg').css({
			"color" : "#85d6de",
		}).html('<br><b>회원 정보 수정 중 오류가 발생했습니다.</b><br>');
	}

}

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}
