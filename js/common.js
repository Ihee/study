$(document).ready(function(){
	/* LNB 관련 */
	//lnb 초기화
	var lnbMenu1 = $('#lnb nav > ul > li'); //1뎁스 li태그
	lnbMenu1.each(function() {
		if($(this).hasClass('active') == true){
			$(this).children('ul').show();
		}
	});

	//lnb 1뎁스 a태그 클릭 시 제어
	var lnbLink = $('#lnb li > a'); //lnb 모든 링크
	lnbLink.click(function() {
		var lnb2depth = $('#lnb nav > ul > li > ul') //2뎁스메뉴
		var activeMenu = $(this).parent('li');
		var dropDownMenu = $(this).next(); 

		if ($(this).attr('role') == 'button'){ //클릭한 a태그의 role 속성이 button인 경우
			if (dropDownMenu.css('display') != 'block') {
				//펼쳐진 2뎁스 초기화
				//lnb2depth.hide();
				//lnbMenu1.removeClass('active');
				//클릭한 1뎁스 하위 2뎁스 펼쳐짐
				dropDownMenu.slideDown('fast');
				activeMenu.addClass('active');
			} else {
				dropDownMenu.slideUp('fast');
				activeMenu.removeClass('active');
			}
			return false;
		}
	});

	/* lnbControl() 관련 lnb 1depth a 태그의 텍스트를 각 title 속성에 저장 */
	var lnbTxtCon = $('#lnb li > a');
	lnbTxtCon.each(function(){
		$(this).attr('title', $(this).text());
	});

	lnbControl(); // LNB 사이즈 제어 스크립트 실행
	
	$(document).on('click', 'button[data-toggle=modal]', function(){ //모달 실행 버튼 클릭 할 경우 얼럿 사이즈 체크 함수 실행
		alertSizeChk();
	});
});

/* 얼럿 레이어 위치 및 사이즈 세팅 */
function alertSizeChk() {
	var target = $('#'+$('.modal:visible').attr('id'));
	var targetAlert = target.find('.alert');
	if (targetAlert.length > 0){ //모달이 얼럿 스타일인 경우에 실행
		var targetAlertCon = target.find('.alert-con');
		var alertW = targetAlertCon.width();
		var winH = $(window).outerHeight();
		if (alertW < 325){
			targetAlert.css('width', '400px');
		}
		else if (alertW > 324 && alertW < 505){
			targetAlert.css('width', alertW+76);
		}
		else {
			targetAlert.css('width', '580px');
		}
		var alertH = targetAlert.height(); //가로사이즈 세팅 이후에 세로 사이즈 측정
		if ((alertH+100) < winH){
			targetAlert.css('margin-top', ((winH/2)-(alertH/2)) +'px');
		}
		else { //세로 사이즈가 긴 경우의 처리
			targetAlert.css({'margin-top':'50px', 'margin-bottom':'50px'});
		}
		
	}
}

/* LNB 넓이 제어 */
function lnbControl() {
	var toggleBtn = $('.lnb-control');
	var lnb = $('#lnb');
	var container = $('#container');
	var txtCon = $('#lnb li > a');

	toggleBtn.click(function(){
		toggleBtn.toggleClass('closed');
		lnb.toggleClass('closed');
		container.toggleClass('closed');

		//LNB 열기/닫기 버튼 텍스트 수정
		if (toggleBtn.hasClass('closed')){
			toggleBtn.find('.sr-only').text('메뉴 열기');
		}
		else {
			toggleBtn.find('.sr-only').text('메뉴 닫기');
		}

		//lnb 1depth a 태그의 텍스트 삭제 및 복구
		if (lnb.hasClass('closed')){
			txtCon.each(function(){
				$(this).text('');
			});
		}
		else {
			setTimeout(function(){ //css transition 작동시간에 맞추어 텍스트 넣어줌
				txtCon.each(function(){
					$(this).text($(this).attr('title'));
				});
			}, 100);
		}
	});
}

/* show hide trigger 추가 : 이유는 모르겠으나 bootstrap modal js api와 충돌있음 */
(function ($) {
	$.each(['show', 'hide'], function (i, ev) {
		var el = $.fn[ev];
		$.fn[ev] = function () {
			this.trigger(ev);
			return el.apply(this, arguments);
		};
	});
})(jQuery);