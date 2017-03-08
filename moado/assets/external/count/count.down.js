 "use strict";
// JavaScript Document

function countDown(dateOfB, dateOfE){
	
	var dateOfBeginning = dateOfB || "Jul 4, 2013"; //type your date of the Beginnig
	var dateOfEnd = dateOfE || "Aug 15, 2013"; //type your date of the end
			
			var maxDate = Date.parse(dateOfEnd)-Date.parse(dateOfBeginning),
			curDate =Date.parse(dateOfEnd) - new Date();
			
			if (curDate <= 0) {
				curDate = 0;
			}
			
			var $s = $(".second"),
                $m = $(".minute"),
                $h = $(".hour"),
				$day = $(".day").attr('data-max', Math.floor(maxDate/(1000*60*60*24))),
				$sSpan = $s.parent().find('span'),
				$mSpan = $m.parent().find('span'),
				$hSpan = $h.parent().find('span'),
				$daySpan = $day.parent().find('span');
				
				
				
        function clock() {
                           
            var s = Math.floor((curDate/1000)%60),
            m = Math.floor(curDate/(1000*60)%60),
            h = Math.floor(curDate/(1000*60*60)%24),
            day = Math.floor(curDate/(1000*60*60*24));
				
            $s.val(s).trigger("change");
            $m.val(m).trigger("change");
            $h.val(h).trigger("change");
			$day.val(day).trigger("change"); 
			
			if (s.toString().length == 1) {
				$sSpan.text("0" + s);
			} else {
				$sSpan.text(s);	
			}

			if (m.toString().length == 1) {
				$mSpan.text("0" + m);
			} else {
				$mSpan.text(m);	
			}

			if (h.toString().length == 1) {
				$hSpan.text("0" + h);
			} else {
				$hSpan.text(h);	
			}

			if (day.toString().length == 1) {
				$daySpan.text("0" + day);
			} else {
				$daySpan.text(day);	
			}

			curDate -= 1000;

			if (curDate > 0) {
				setTimeout(clock, 1000);
			};
            
        }

        clock();
}

function countDownHour(dateOfB, dateOfE, elem){
	
	var dateOfBeginning = dateOfB || "Jul 4, 2013"; //type your date of the Beginnig
	var dateOfEnd = dateOfE || "Aug 15, 2013"; //type your date of the end
			
			var maxDate = Date.parse(dateOfEnd)-Date.parse(dateOfBeginning),
			curDate =Date.parse(dateOfEnd) - new Date();

			if (curDate <= 0) {
				curDate = 0;
			}
			
			//set id
			var $s = $("#" + elem +" .second"),
                $m = $("#" + elem +" .minute"),
                $h = $("#" + elem +" .hour").attr('data-max', Math.floor(maxDate/(1000*60*60))),
				$sSpan = $s.parent().find('span'),
				$mSpan = $m.parent().find('span'),
				$hSpan = $h.parent().find('span');
				
				
				
        function clock() {
                           
            var s = Math.floor((curDate/1000)%60),
            m = Math.floor(curDate/(1000*60)%60),
            h = Math.floor(curDate/(1000*60*60));
				
            $s.val(s).trigger("change");
            $m.val(m).trigger("change");
            $h.val(h).trigger("change");
			
			if (s.toString().length == 1) {
				$sSpan.text("0" + s);
			} else {
				$sSpan.text(s);	
			}

			if (m.toString().length == 1) {
				$mSpan.text("0" + m);
			} else {
				$mSpan.text(m);	
			}

			if (h.toString().length == 1) {
				$hSpan.text("0" + h);
			} else {
				$hSpan.text(h);	
			}
			
			curDate -= 1000;
			
            if (curDate > 0) {
				setTimeout(clock, 1000);
			};
        }
        clock();
}