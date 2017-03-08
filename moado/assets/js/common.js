$(function() {

$('a.modalButton').on('click', function (e) {
	e.preventDefault();
	var url = $(this).data('src');
	var target = $(this).data('target');
	$(target).removeData("bs.modal").find(".modal-content").empty();
	$(target).modal({remote: url });

	$(target).modal('show');
});

});

var StringBuffer = function() { 
    this.buffer = new Array(); 
} 
StringBuffer.prototype.append = function(obj) {
     this.buffer.push(obj); 
} 
StringBuffer.prototype.toString = function(){ 
     return this.buffer.join(""); 
}

function modalPopup(element){

    var url = $(element).data('src');
    var target = $(element).data('target');
    $(window.parent.document).find('.modal-backdrop').remove();
    $(window.parent.document).find(target).removeData('bs.modal');
    $(window.parent.document).find(target).modal({remote: url });		
}

function logout(){
	$.ajax({
		url: root+'/member/logout',
		type : 'post',
		dataType : 'json',
		success : memberLogoutSuccess,
		error : function(){alert('오류가 발생했습니다.\n나중에 다시 시도해주세요.');}
	});
}

function memberLogoutSuccess(data){
	var result = data.result;
	//alert(result);
	if(result == 'logoutSuccess'){
		location.reload(true);
	}
}