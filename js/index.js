var app = app || {};

/*-- html5-template
====================================================== */
app.template = function(){};

//swiper
app.template.swiper = function(){};
app.template.swiper.mySwiper = {};
app.template.swiper.init = function(){
	app.template.swiper.bind();
    //判断是否有cookie
    if(app.p1.getidCookie("id")){
    	  console.info(app.p1.getidCookie("id"));
    	  app.p5.getuserinfobycardnumber(app.p1.getidCookie("id"));

    }else {
    	  console.info("none");
    }
//  app.p1.delidCookie("id");
};
app.template.swiper.bind = function(){
    $(".swiper-container").css("display", "block");

    app.template.swiper.mySwiper = new Swiper ('.swiper-container', {
        speed:500,
        lazyLoading : true,
        lazyLoadingInPrevNext : true,
        // direction : 'vertical',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
            app.template.swiper.on_pageslideend(0);
        },
        onSlideChangeStart: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画

            app.template.swiper.on_pageslideend(swiper.activeIndex);
            app.template.swiper.mySwiper.lockSwipes();
        }
    });

    app.template.swiper.lock();
};
app.template.swiper.lock = function(){
	app.template.swiper.mySwiper.lockSwipes();
};
app.template.swiper.on_pageslideend = function(index){};

app.template.swiper.next = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideNext();
    app.template.swiper.mySwiper.lockSwipes();
};

app.template.swiper.prev = function(){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slidePrev();
    app.template.swiper.mySwiper.lockSwipes();
};

app.template.swiper.to = function(index){
    app.template.swiper.mySwiper.unlockSwipes();
    app.template.swiper.mySwiper.slideTo(index);
    app.template.swiper.mySwiper.lockSwipes();
};

/* Landscape  引导用户竖屏显示 */
app.template.Landscape = function(){};
app.template.Landscape.init= function(){
    var Landscape = new landscape({
        pic: 'js/motion/landscape.png',
        picZoom: 3,
        mode:'portrait',//portrait,landscape
        prefix:'Shine'
    });
};

//touch
app.template.touch = function(){};

app.template.touch.eventlistener_handler = function(e){
    e.preventDefault();     // 阻止浏览器默认动作(网页滚动)
};

app.template.touch.init = function(){
	// fastclick
   FastClick.attach(document.body);
   document.body.addEventListener("touchmove", app.template.touch.eventlistener_handler, false);

};

//tool
app.template.tool = function(){};
app.template.tool.date = function (fmt) {
    var date = new Date();

    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

app.template.tool.random = function(range){
    return Math.floor((Math.random() * range) + 1);
};

/*-- api config
====================================================== */
app.api = function(){};
app.api.host = "https://molirun.api.createcdigital.com";
//app.api.host = "http://localhost:8000";



/*-- p1
====================================================== */
app.p1 = function(){};
app.p1.init = function(){

};
app.p1.getidCookie = function(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
    	   return unescape(arr[2]);
    }else {
    	   return null;
    }
};
app.p1.setidCookie = function(name,value){
	var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
};
app.p1.delidCookie = function(name){
	var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval= app.p1.getidCookie(name);
    if(cval!=null){
    	  document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
};
app.p1.bind_touch_event = function(){
   $(".p1-btn1").on("touchend",function(){
   	  app.template.swiper.next();
   });
   $(".p1-btn2").on("touchend",function(){
   	  app.p1.show_layout();
   	  _hmt.push(['_trackEvent', 'div', 'touchend']);
   });
};
app.p1.show_layout = function(){
	$(".p1-coverimg").attr("src", $(".p1-coverimg").attr("data-src"));
    $(".p1-coverimg").css({"width":"750px", "height": "100%"});
    $(".p1-covershade").css({"width":"100%","height":"100%"});
    $(".p1-cover").css({"width":"750px", "height": "100%"});
    $(".cover-btn1,.cover-btn2").css("display","block");
    $(".p1 .p1-cover .cover-wrapper").css({"opacity":"1","left":"111px","top":"286px"});
    //  cover-btn1 拒绝
    $(".p1 .p1-cover .cover-btn1").on("touchend",function(){
    	   $(".p1-coverimg").css({"width":"0", "height": "0"});
    	   $(".p1-covershade").css({"width":"0","height":"0"});
    	   $(".p1-cover").css({"width":"0", "height": "0"});
       $(".cover-btn1,.cover-btn2").css("display","none");
       $(".p1 .p1-cover .cover-wrapper").css("opacity","0");
    });
    // cover-btn2 同意
    $(".p1 .p1-cover .cover-btn2").on("touchend",function(){
    	   $(".p1-coverimg").css({"width":"0", "height": "0"});
    	   $(".p1-covershade").css({"width":"0","height":"0"});
    	   $(".p1-cover").css({"width":"0", "height": "0"});
       $(".cover-btn1,.cover-btn2").css("display","none");
       $(".p1 .p1-cover .cover-wrapper").css("opacity","0");
       app.template.swiper.to(2);
    });
};

app.p1.destory = function(){};


/*-- p2
====================================================== */
app.p2 = function(){};
app.p2.init = function(){

};
app.p2.bind_touch_event = function(){
	//返回
   $(".p2-btn1").on("touchend",function(){
   	   app.template.swiper.prev();
   });
   //报名参赛
   $(".p2-btn2").on("touchend",function(){
   	  app.p2.show_layout();
   });
};
app.p2.show_layout = function(){
	$(".p2-coverimg").attr("src", $(".p2-coverimg").attr("data-src"));
    $(".p2-coverimg").css({"width":"750px", "height": "100%"});
    $(".p2-covershade").css({"width":"100%","height":"100%"});
    $(".p2-cover").css({"width":"750px", "height": "100%"});
    $(".cover2-btn1,.cover2-btn2").css("display","block");
    $(".p2 .p2-cover .cover-wrapper2").css({"opacity":"1","left":"111px","top":"286px"});
	//  p2 cover2-btn1 拒绝
    $(".p2 .p2-cover .cover2-btn1").on("touchend",function(){
    	   $(".p2-coverimg").css({"width":"0", "height": "0"});
    	   $(".p2-covershade").css({"width":"0","height":"0"});
    	   $(".p2-cover").css({"width":"0", "height": "0"});
       $(".cover2-btn1,.cover2-btn2").css("display","none");
       $(".p2 .p2-cover .cover-wrapper2").css("opacity","0");
       app.template.swiper.prev();
    });
    //  p2 cover2-btn2 同意
    $(".p2 .p2-cover .cover2-btn2").on("touchend",function(){
    	   $(".p2-coverimg").css({"width":"0", "height": "0"});
    	   $(".p2-covershade").css({"width":"0","height":"0"});
    	   $(".p2-cover").css({"width":"0", "height": "0"});
       $(".cover2-btn1,.cover2-btn2").css("display","none");
       $(".p2 .p2-cover .cover-wrapper2").css("opacity","0");
       app.template.swiper.to(2);
    });

}
app.p2.destory = function(){};

/*-- p3
====================================================== */
app.p3 = function(){};
app.p3.init = function(){
	app.p3.checkstock_bygrouptype();
    app.p3.check_group();
	$(".p3-group-5,.p3-group-10,.p3-group-family").change(function(){
		app.p3.check_group();
	});

	app.p3.remove_month("#year-1","#month-1");
	app.p3.remove_month("#year-2","#month-2");
	app.p3.remove_month("#year-3","#month-3");
	app.p3.remove_month2();
	if(userGetfromCookie == true){
		console.info("true");
		app.p5.selectedYearandMonth();
	}

};
app.p3.check_group = function(){
	if($(".p3-group-family").is(":checked")){
		app.p3.disabled_singletextinput();
		app.p3.enabled_familytextinput();
		$(".p3-btn4").show();
	    $(".p3-btn2").hide();
	}else if($(".p3-group-5").is(":checked") || $(".p3-group-10").is(":checked")){
		app.p3.disabled_familytextinput();
		app.p3.enabled_singletextinput();
		$(".p3-btn2").show();
	    $(".p3-btn4").hide();
	}
};
app.p3.remove_month = function(el,el2){
	$(""+el+"").on("change",function(){
		if($(""+el+"").val()==2004 || ($(""+el+"").val()==1999&&$("#p3-group-10").is(":checked"))){
			$(""+el2+" option[value='11']").remove();
			$(""+el2+" option[value='12']").remove();
		}else {
			if($(""+el2+" option[value='11']").val()==undefined){
				$(""+el2+"").append("<option value='11'>11月</option>");
				$(""+el2+"").append("<option value='12'>12月</option>");
			}
		}

		if($(""+el+"").val()==1951){
			$(""+el2+" option[value='1']").remove();
			$(""+el2+" option[value='2']").remove();
			$(""+el2+" option[value='3']").remove();
			$(""+el2+" option[value='4']").remove();
			$(""+el2+" option[value='5']").remove();
			$(""+el2+" option[value='6']").remove();
			$(""+el2+" option[value='7']").remove();
			$(""+el2+" option[value='8']").remove();
			$(""+el2+" option[value='9']").remove();
		}else {
			if($(""+el2+" option[value='4']").val()==undefined){
				$(""+el2+"").prepend("<option value='9'>9月</option>");
				$(""+el2+"").prepend("<option value='8'>8月</option>");
				$(""+el2+"").prepend("<option value='7'>7月</option>");
				$(""+el2+"").prepend("<option value='6'>6月</option>");
				$(""+el2+"").prepend("<option value='5'>5月</option>");
				$(""+el2+"").prepend("<option value='4'>4月</option>");
				$(""+el2+"").prepend("<option value='3'>3月</option>");
				$(""+el2+"").prepend("<option value='2'>2月</option>");
				$(""+el2+"").prepend("<option value='1'>1月</option>");
			}
		}

	});
};
app.p3.remove_month2 = function(){
	$("#year-4").on("change",function(){
		if($("#year-4").val()==2016){
			$("#month-4 option[value='11']").remove();
			$("#month-4 option[value='12']").remove();
			if($("#month-4 option[value='1']").val()==undefined){
				$("#month-4").prepend("<option value='9'>9月</option>");
                $("#month-4").prepend("<option value='8'>8月</option>");
                $("#month-4").prepend("<option value='7'>7月</option>");
                $("#month-4").prepend("<option value='6'>6月</option>");
                $("#month-4").prepend("<option value='5'>5月</option>");
                $("#month-4").prepend("<option value='4'>4月</option>");
				$("#month-4").prepend("<option value='3'>3月</option>");
				$("#month-4").prepend("<option value='2'>2月</option>");
				$("#month-4").prepend("<option value='1'>1月</option>");
			}
		}else if($("#year-4").val()==1999){
				$("#month-4 option[value='1']").remove();
			    $("#month-4 option[value='2']").remove();
			    $("#month-4 option[value='3']").remove();
                $("#month-4 option[value='4']").remove();
                $("#month-4 option[value='5']").remove();
                $("#month-4 option[value='6']").remove();
                $("#month-4 option[value='7']").remove();
                $("#month-4 option[value='8']").remove();
				$("#month-4 option[value='9']").remove();
			    if($("#month-4 option[value='11']").val()==undefined){
					$("#month-4").append("<option value='11'>11月</option>");
					$("#month-4").append("<option value='12'>12月</option>");
				}
		}else {
			if($("#month-4 option[value='11']").val()==undefined){
				$("#month-4").append("<option value='11'>11月</option>");
				$("#month-4").append("<option value='12'>12月</option>");
			}else if($("#month-4 option[value='1']").val()==undefined){
				$("#month-4").prepend("<option value='9'>9月</option>");
                $("#month-4").prepend("<option value='8'>8月</option>");
                $("#month-4").prepend("<option value='7'>7月</option>");
                $("#month-4").prepend("<option value='6'>6月</option>");
                $("#month-4").prepend("<option value='5'>5月</option>");
                $("#month-4").prepend("<option value='4'>4月</option>");
				$("#month-4").prepend("<option value='3'>3月</option>");
				$("#month-4").prepend("<option value='2'>2月</option>");
				$("#month-4").prepend("<option value='1'>1月</option>");
			}
		}
	});
};
app.p3.checkstock_bygrouptype = function(){
	//查询库存信息
	$.getJSON(app.api.host + '/stock/get', function(data){
        console.info(data[0]);
        if(data.length>0){
        	  if(data[0].group_type_family<=0){
        	  	 $("#p3-group-family").remove();
        	  	 $("#p3-group-5").attr("checked","checked");
        	  }
        	  if(data[0].group_type_single<=0){
        	  	if($("#p3-group-family")){
        	  		$("#p3-group-5,#p3-group-10").remove();
        	  	    $("#p3-group-family").attr("checked","checked");
        	  	}
        	  }
        	  if(data[0].group_type_family<=0 && data[0].group_type_single<=0){
        	  	 $(".p3-btn2,.p3-btn4").hide();
             alert("很抱歉！本次活动报名人数名额已满！");
        	  }
        	  // 个人 T恤尺码库存
        	  if(data[0].p_xs <= 0){
        	  	 $("#size-1 option[value='XS']").remove();
        	  }
        	  if(data[0].p_s <= 0){
        	  	 $("#size-1 option[value='S']").remove();
        	  }
        	  if(data[0].p_m <= 0){
        	  	 $("#size-1 option[value='M']").remove();
        	  }
        	  if(data[0].p_l <= 0){
        	  	 $("#size-1 option[value='L']").remove();
        	  }
        	  if(data[0].p_xl <= 0){
        	  	 $("#size-1 option[value='XL']").remove();
        	  }
        	  if(data[0].p_xxl <= 0){
        	  	 $("#size-1 option[value='XXL']").remove();
        	  }
        	  if(data[0].p_xs <= 0 && data[0].p_s <= 0 && data[0].p_m <= 0 && data[0].p_l <= 0 && data[0].p_xl <= 0 && data[0].p_xxl <= 0){
        	  	 $(".p3-btn2").hide();
                 alert("很抱歉！本次活动5公里,10公里的T恤尺码已没有库存！");
        	  }

        	  // 家庭 T恤尺码库存
        	  if(data[0].f_xs <= 0){
        	  	 $("#size-2 option[value='XS']").remove();
        	  	 $("#size-3 option[value='XS']").remove();
        	  	 $("#size-4 option[value='XS']").remove();
        	  }
        	  if(data[0].f_s <= 0){
        	  	 $("#size-2 option[value='S']").remove();
        	  	 $("#size-3 option[value='S']").remove();
        	  	 $("#size-4 option[value='S']").remove();
        	  }
        	  if(data[0].f_m <= 0){
        	  	 $("#size-2 option[value='M']").remove();
        	  	 $("#size-3 option[value='M']").remove();
        	  	 $("#size-4 option[value='M']").remove();
        	  }
        	  if(data[0].f_l <= 0){
        	  	 $("#size-2 option[value='L']").remove();
        	  	 $("#size-3 option[value='L']").remove();
        	  	 $("#size-4 option[value='L']").remove();
        	  }
        	  if(data[0].f_xl <= 0){
        	  	 $("#size-2 option[value='XL']").remove();
        	  	 $("#size-3 option[value='XL']").remove();
        	  	 $("#size-4 option[value='XL']").remove();
        	  }
        	  if(data[0].f_xxl <= 0){
        	  	 $("#size-2 option[value='XXL']").remove();
        	  	 $("#size-3 option[value='XXL']").remove();
        	  	 $("#size-4 option[value='XXL']").remove();
        	  }
        	  if(data[0].kids_110 <= 0){
        	  	 $("#size-4 option[value='XXXS']").remove();
        	  }
        	  if(data[0].kids_130 <= 0){
        	  	 $("#size-4 option[value='XXS']").remove();
        	  }
        	  if(data[0].f_xs <= 0 && data[0].f_s <= 0 && data[0].f_m <= 0 && data[0].f_l <= 0 && data[0].f_xl <= 0 && data[0].f_xxl <= 0 && data[0].kids_110 <= 0 && data[0].kids_130 <= 0){
        	  	 $(".p3-btn4").hide();
             alert("很抱歉！本次活动亲子跑的T恤尺码已没有库存！");
        	  }

        }
   });
};
app.p3.disabled_singletextinput = function(){
    $("#username-1").attr("disabled", "disabled");
    $("#idcard-1").attr("disabled", "disabled");
    $("#phone-1").attr("disabled", "disabled");
    $("#eperson-1").attr("disabled", "disabled");
    $("#ephone-1").attr("disabled", "disabled");
};
app.p3.disabled_familytextinput = function(){
    $("#username-2,#username-3,#username-4").attr("disabled", "disabled");
    $("#idcard-2,#idcard-3,#idcard-4").attr("disabled", "disabled");
    $("#phone-2,#phone-3").attr("disabled", "disabled");
    $("#eperson-2,#eperson-3,#eperson-4").attr("disabled", "disabled");
    $("#ephone-2,#ephone-3,#ephone-4").attr("disabled", "disabled");
    $("#parent,#parent-phone").attr("disabled", "disabled");
};
app.p3.enabled_singletextinput = function(){
    $("#username-1").removeAttr("disabled");
    $("#idcard-1").removeAttr("disabled");
    $("#phone-1").removeAttr("disabled");
    $("#eperson-1").removeAttr("disabled");
    $("#ephone-1").removeAttr("disabled");
};
app.p3.enabled_familytextinput = function(){
    $("#username-2,#username-3,#username-4").removeAttr("disabled");
    $("#idcard-2,#idcard-3,#idcard-4").removeAttr("disabled");
    $("#phone-2,#phone-3").removeAttr("disabled");
    $("#eperson-2,#eperson-3,#eperson-4").removeAttr("disabled");
    $("#ephone-2,#ephone-3,#ephone-4").removeAttr("disabled");
    $("#parent,#parent-phone").removeAttr("disabled");
};
var idcard1;
var idcard2;
var idcard3;
var idcard4;
var idcard5 = false;
var idcard6 = false;
var idcard7 = false;
var idcard8 = false;

app.p3.bind_touch_event = function(){
	// 两个返回按钮
	$(".p3-btn1,.p3-btn3").on("touchend",function(){
		app.template.swiper.to(0);
	});

	// 5公里 10公里 确定按钮
	$(".p3-btn2").on("touchend",function(){
		var phone_patt = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/); // 手机号码
	    var id_patt = new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/); // 身份证
	    var hkm_patt = new RegExp(/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/); // 港澳
	    var tw_patt = new RegExp(/\d{8}/); // 台胞证
		if($(".p3-group-5").is(":checked") || $(".p3-group-10").is(":checked")){
			var a = false;
			var card_number = $("#idcard-1").val();
			if($("#username-1").val()==""){
				app.p3.alertTxt("姓名不能为空!")
			}else if(($("#idchange-1").val()== "0" && !id_patt.test(card_number)) || ($("#idchange-1").val() == "1" && $("#idchange-1").val() == "") || ($("#idchange-1").val()== "2" && !hkm_patt.test(card_number)) || ($("#idchange-1").val()== "3" && !tw_patt.test(card_number))){
				app.p3.alertTxt("证件号码输入有误!")
			}else if($("#phone-1").val()=="" || !phone_patt.test($("#phone-1").val())){
				app.p3.alertTxt("手机号码输入有误!")
			}else if($("#username-1").val()==$("#eperson-1").val() || $("#eperson-1").val() == ""){
				app.p3.alertTxt("紧急联系人姓名不能重复或者为空!")
			}else if($("#phone-1").val()==$("#ephone-1").val() || !phone_patt.test($("#ephone-1").val())){
				app.p3.alertTxt("紧急联系人手机不能重复或者为空!")
			}else {
				a = true;
				app.template.swiper.next();
			}
			if(!a){
				$(".p3 .p3-coverbox").css("display","block");
			}
		}
	});

	//亲子跑 确定按钮
	$(".p3-btn4").on("touchend",function(){
		app.p3.check_personOne();
		app.p3.check_personTwo();
		app.p3.check_children();
		app.p3.check_idcard();
		if($(".p3-group-family").is(":checked")){
			if((flag || flag1) && flag2){
				app.template.swiper.next();
			}else {
				$(".p3 .p3-coverbox").css("display","block");
			}
		}
        flag= false;
        flag1= false;
        flag2= false;
        flag3= false;
        flag4= false;
	});
	// 浮层确定按钮
	$(".p3-cover").on("touchend",function(){
		$(".p3 .p3-coverbox").css("display","none");
	});

    /* debug */
    $(".debug-5km").click(function(){
        var random = app.template.tool.random(9);
        $("#username-1").val("姓名" + random);
        $("#idcard-1").val("32068219880109001" + random);
        $("#phone-1").val("1356413319" + random);
        $("#eperson-1").val("紧急联系人姓名" + random);
        $("#ephone-1").val("1356413319" + (random+1));
    });

    $(".debug-10km").click(function(){
        var random = app.template.tool.random(9);
        $("#p3-group-10").attr('checked', 'checked');
        $("#username-1").val("姓名" + random);
        $("#idcard-1").val("32068219880109001" + random);
        $("#phone-1").val("1356413319" + random);
        $("#eperson-1").val("紧急联系人姓名" + random);
        $("#ephone-1").val("1356413319" + (random+1));
    });

    $(".debug-family").click(function(){
        var random = app.template.tool.random(9);
        $("#p3-group-family").attr('checked', 'checked');
        $("#username-2").val("成人1" + random);
        $("#idcard-2").val("62068219880109001" + random);
        $("#phone-2").val("1356413319" + random);
        $("#eperson-2").val("紧急联系人成人1" + random);
        $("#ephone-2").val("1366413319" + (random+1));

        $("#username-3").val("成人2" + random);
        $("#idcard-3").val("72068219880109001" + random);
        $("#phone-3").val("1376413319" + random);
        $("#eperson-3").val("紧急联系人成人2" + random);
        $("#ephone-3").val("1376413319" + (random+1));

        $("#username-4").val("小孩" + random);
        $("#idcard-4").val("82068220070109001" + random);
        $("#phone-4").val("1386413319" + random);
        $("#parent").val("监护人" + random);
        $("#parent-phone").val("1386413319" + random);
        $("#eperson-4").val("紧急联系人小孩" + random);
        $("#ephone-4").val("1386413319" + (random+1));

        $(".p3-btn4").show();
    });
};

app.p3.alertTxt = function (text) {
	var M = {};
	if(M.dialog1){
		return M.dialog1.show();
	}
	M.dialog1 = jqueryAlert({
		'content' : ""+text+"",
		'closeTime' : 2000
	})
};
var personOne;
var personTwo;
var children;
var checkidcard;
var phone_patt = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/); // 手机号码
var id_patt = new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/); // 身份证
var childid_patt = new RegExp(/^[1-9]\d{5}20[01][0-9]((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/); // 儿童身份证
var hkm_patt = new RegExp(/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/); // 港澳通行证号码
var tw_patt = new RegExp(/\d{8}/); // 台胞证
var flag = false;
var flag1 = false;
var flag2 = false;

var flag3 = false;
var flag4 = false;
// 验证亲子跑
app.p3.check_personOne = function(){
    var card_number = $("#idcard-2").val();

    if($("#username-2").val()=="" && $("#idcard-2").val()==""  && $("#phone-2").val()=="" && $("#eperson-2").val()=="" && $("#ephone-2").val()==""){
           flag3 = true;
           flag = true;
    }else
    {
        	if($("#username-2").val()==""){
        		app.p3.alertTxt("成年人1姓名不能为空!")
        	}else if(($("#idchange-2").val()== "0" && !id_patt.test(card_number)) || ($("#idchange-2").val() == "1" && $("#idchange-2").val() == "") || ($("#idchange-2").val()== "2" && !hkm_patt.test(card_number)) || ($("#idchange-2").val()== "3" && !tw_patt.test(card_number))){
        		app.p3.alertTxt("成年人1证件号码输入有误!")
        	}else if($("#phone-2").val()=="" || !phone_patt.test($("#phone-2").val())){
        		app.p3.alertTxt("成年人1手机号码输入有误!")
        	}else if($("#username-2").val()==$("#eperson-2").val() || $("#eperson-2").val() == ""){
        		app.p3.alertTxt("成年人1紧急联系人姓名不能重复或者为空!")
        	}else if($("#phone-2").val()==$("#ephone-2").val() || !phone_patt.test($("#ephone-2").val())){
        		app.p3.alertTxt("成年人1紧急联系人手机不能重复或者为空!")
        	}else {
        		flag = true;
        	}
    }

};
app.p3.check_personTwo = function(){
    var card_number = $("#idcard-3").val();
     if($("#username-3").val()=="" && $("#idcard-3").val()==""  && $("#phone-3").val()=="" && $("#eperson-3").val()=="" && $("#ephone-3").val()==""){
           flag4= true;
           flag1 = true;
           personTwo= false;
    }else
    {
        	if(flag){
        		if($("#username-3").val()==""){
        			app.p3.alertTxt("成年人2姓名不能为空!")
        		}else if(($("#idchange-3").val()== "0" && !id_patt.test(card_number)) || ($("#idchange-3").val() == "1" && $("#idchange-3").val() == "") || ($("#idchange-3").val()== "2" && !hkm_patt.test(card_number)) || ($("#idchange-3").val()== "3" && !tw_patt.test(card_number))){
        			app.p3.alertTxt("成年人2证件号码输入有误!")
        		}else if($("#phone-3").val()=="" || !phone_patt.test($("#phone-3").val())){
        			app.p3.alertTxt("成年人2手机号码输入有误!")
        		}else if($("#username-3").val()==$("#eperson-3").val() || $("#eperson-3").val() == ""){
        			app.p3.alertTxt("成年人2紧急联系人姓名不能重复或者为空!")
        		}else if($("#phone-3").val()==$("#ephone-3").val() || !phone_patt.test($("#ephone-3").val())){
        			app.p3.alertTxt("成年人2紧急联系人手机不能重复或者为空!")
        		}else {
        			flag1 = true;
                     personTwo= true;
        		}
        	}
    }
};
app.p3.check_children = function(){

    if(flag3 && flag4)
    {
         app.p3.alertTxt("至少要填写一个成年人信息!")
    }
    else
    {
            if(flag && flag1){
                        var card_number = $("#idcard-4").val();
                        if($("#username-4").val()==""){
                            app.p3.alertTxt("未成年人姓名不能为空!")
                        }else if(($("#idchange-4").val()== "0" && !childid_patt.test(card_number)) || ($("#idchange-4").val() == "1" && $("#idchange-4").val() == "") || ($("#idchange-4").val()== "2" && !hkm_patt.test(card_number)) || ($("#idchange-4").val()== "3" && !tw_patt.test(card_number))){
                            app.p3.alertTxt("未成年人证件号码输入有误!")
                        } else if($("#parent").val()==""){
                            app.p3.alertTxt("法定监护人姓名不能为空!")
                        } else if($("#parent-phone").val()=="" || !phone_patt.test($("#parent-phone").val())){
                            app.p3.alertTxt("法定监护人手机号码输入有误!")
                        }else if($("#eperson-4").val()==$("#parent").val() || $("#eperson-4").val() == ""){
                            app.p3.alertTxt("未成年人紧急联系人姓名不能重复或者为空!")
                        }else if($("#parent-phone").val()==$("#ephone-4").val() || !phone_patt.test($("#ephone-4").val())){
                            app.p3.alertTxt("未成年人紧急联系人手机不能重复或者为空!")
                        }else {
                            flag2 = true;
                        }
        }   
    }
};
app.p3.check_idcard = function(){
	if($("#idchange-2").val()== "0" && $("#idchange-3").val()== "0" && $("#idchange-4").val()== "0"){
		if(($("#idcard-2").val()==$("#idcard-3").val()) || ($("#idcard-2").val()==$("#idcard-4").val()) || ($("#idcard-3").val()==$("#idcard-4").val()) || ($("#idcard-2").val()==$("#idcard-3").val()==$("#idcard-4").val())){
			checkidcard = false;
		}else {
			checkidcard = true;
		}
	}else if($("#idchange-2").val()== "1" && $("#idchange-3").val()== "1" && $("#idchange-4").val()== "1"){
		if(($("#idcard-2").val()==$("#idcard-3").val()) || ($("#idcard-2").val()==$("#idcard-4").val()) || ($("#idcard-3").val()==$("#idcard-4").val()) || ($("#idcard-2").val()==$("#idcard-3").val()==$("#idcard-4").val())){
			checkidcard = false;
		}else {
			checkidcard = true;
		}
	}else if($("#idchange-2").val()== "2" && $("#idchange-3").val()== "2" && $("#idchange-4").val()== "2"){
		if(($("#idcard-2").val()==$("#idcard-3").val()) || ($("#idcard-2").val()==$("#idcard-4").val()) || ($("#idcard-3").val()==$("#idcard-4").val()) || ($("#idcard-2").val()==$("#idcard-3").val()==$("#idcard-4").val())){
			checkidcard = false;
		}else {
			checkidcard = true;
		}
	}else if($("#idchange-2").val()== "3" && $("#idchange-3").val()== "3" && $("#idchange-4").val()== "3"){
		if(($("#idcard-2").val()==$("#idcard-3").val()) || ($("#idcard-2").val()==$("#idcard-4").val()) || ($("#idcard-3").val()==$("#idcard-4").val()) || ($("#idcard-2").val()==$("#idcard-3").val()==$("#idcard-4").val())){
			checkidcard = false;
		}else {
			checkidcard = true;
		}
	}else {
		checkidcard = true;
	}
}


app.p3.destory = function(){};

/*-- p4
====================================================== */
app.p4 = function(){};
app.p4.init = function(){
	if($(".p4-send").is(":checked")){
		$(".p4-nametext,.p4-name,.p4-adresstext,.p4-adress,.p4-phonetext,.p4-phone").css("display","block");
	}else if($(".p4-get").is(":checked")){
		$(".p4-nametext,.p4-name,.p4-adresstext,.p4-adress,.p4-phonetext,.p4-phone").css("display","none");
	}
	$(".p4-send").change(function(){
		$(".p4-nametext,.p4-name,.p4-adresstext,.p4-adress,.p4-phonetext,.p4-phone").css("display","block");
	});
	$(".p4-get").change(function(){
		$(".p4-nametext,.p4-name,.p4-adresstext,.p4-adress,.p4-phonetext,.p4-phone").css("display","none");
		$(".p4-hint").css("display","none");
	});
};
app.p4.bind_touch_event = function(){
	// 返回按钮
	$(".p4-btn1").on("touchend",function(){
		app.template.swiper.prev();
		flag = false;
		flag1 = false;
		flag2 = false;
        flag3 = false;
        flag4 = false;

	});
     $("#p4-name,#p4-adress,#p4-phone").on("focus", function(){
        $(".p4-hint").css("display","none");
    });
    //	确定按钮
    $(".p4-btn2").on("touchend",function(){
    	    var phone_patt = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
    	    //判断用户选取的寄送方式
    	    if($(".p4-send").is(":checked")){
    	    	   if($(".p4-name").val()!="" && $(".p4-adress").val()!="" && $(".p4-phone").val()!="" && phone_patt.test($(".p4-phone").val())){
    	    	   	  $(".p4-hint").css("display","none");
    	    	   	  app.template.swiper.next();
    	    	   }else {
    	    	   	  $(".p4-hint").css("display","block");
    	    	   }
    	    }else if($(".p4-get").is(":checked")){
    	    	   app.template.swiper.next();
    	    }else {

    	    }
    });

};


app.p4.destory = function(){};

/*-- p5
====================================================== */
app.p5 = function(){};
app.p5.init = function(){
	if(app.p1.getidCookie("id")){
		app.p5.getUserInfobyAjax(user);
		if(user.grouptype == "亲子跑"){
			getFamilyId1 = user.p1_card_number;
			getFamilyId2 = user.p2_card_number;
			getFamilyId3 = user.kids_card_number;
		}else {
			getId = user.p1_card_number;
		}

	}else {
		app.p5.getUserInfobyChart();
	}

};
var getId;
var getFamilyId1;
var getFamilyId2;
var getFamilyId3;
app.p5.getUserInfobyChart = function(){
	//进入第五页 获取用户填的表单信息
	if($(".p3-group-5").is(":checked") || $(".p3-group-10").is(":checked")){
		app.p5.singlejudge();
		$(".p5-group").html(''+singleGroup+'公里');
	    $(".p5-size").html(''+singleSize+'');
	    $(".p5-tag").html(''+singleTag+'');
	    $(".p5-username").html(''+singleName+'');
	    $(".p5-sex").html(''+singleSex+'');
	}else if($(".p3-group-family").is(":checked")){
		app.p5.familyjudge();
		$(".p5-group").html(''+familyGroup+'');
	    $(".p5-size").html(''+familySize1+' / '+familySize2+' / '+familySize3+'');
	    $(".p5-tag").html(''+familyTag+'');
	    $(".p5-username").html(''+familyName1+' / '+familyName2+' / '+familyName3+'');
	    $(".p5-sex").html(''+familySex1+' / '+familySex2+' / '+familySex3+'');
	};
	//进入第五页 判断用户选取的赛事包寄送方式
	if($(".p4-send").is(":checked")){
        $(".p5-onsite-part1").hide();
        $(".p5-onsite-part2").hide();

		$("#p5-getpackage").attr("src","img/p5-delivery.png");
		$(".p5-textadress,.p5-name,.p5-nameinput,.p5-adress,.p5-adressinput,.p5-phone,.p5-phoneinput").css("display","block");
		$(".p5-nameinput").html($(".p4-name").val());
		$(".p5-adressinput").html($(".p4-adress").val());
		$(".p5-phoneinput").html($(".p4-phone").val());
	}else if($(".p4-get").is(":checked")){
		$(".p5-textadress,.p5-name,.p5-nameinput,.p5-adress,.p5-adressinput,.p5-phone,.p5-phoneinput").css("display","none");
		$("#p5-getpackage").attr("src","img/p5-onsite.png");
        $(".p5-onsite-part1").show();
        $(".p5-onsite-part2").show();
	};
};

var userGetfromCookie;
app.p5.getUserInfobyAjax = function(data){
	userGetfromCookie = true;
	if(data.grouptype == "5km" || data.grouptype == "10km"){
		$(".p5-group").html(''+data.grouptype.split("km")[0]+'公里');
	    $(".p5-size").html(''+data.p1_teesize+'');
	    $(".p5-tag").html(''+data.p1_tag+'');
	    $(".p5-username").html(''+data.p1_name+'');
	    $(".p5-sex").html(''+data.p1_sex+'');
	    //p3
	    if(data.grouptype == "5km"){
	    	   $(".p3-group-5").attr("checked","checked");
	    }
	    if(data.grouptype == "10km"){
	    	   $(".p3-group-10").attr("checked","checked");
	    }
	    if(data.p1_teesize=="XS(160/82A)"){
	        $("#size-1 option[value='XS']").prop("selected","selected");


	    }else if(data.p1_teesize=="S(165/84A)"){
	       $("#size-1 option[value='S']").prop("selected","selected");


	    }else if(data.p1_teesize=="M(170/88A)"){
	        $("#size-1 option[value='M']").prop("selected","selected");


	    }else if(data.p1_teesize=="L(175/92A)"){
	        $("#size-1 option[value='L']").prop("selected","selected");


	    }else if(data.p1_teesize=="XL(180/96A)"){
	        $("#size-1 option[value='XL']").prop("selected","selected");


	    }else if(data.p1_teesize=="XXL(185/100A)"){
	        $("#size-1 option[value='XXL']").prop("selected","selected");


	    }
	    $("#username-1").val(''+data.p1_name+'');
	    if(data.p1_sex=="男"){
	    	  $(".p3-sex-boy").attr("checked","checked");
	    }
	    if(data.p1_sex=="女"){
	    	  $(".p3-sex-girl").attr("checked","checked");
	    }
//	    var cutyear = data.p1_birthday.split("-")[0];
//	    var cutmonth = data.p1_birthday.split("-")[1];
//	    $("#year-1 option[value='"+cutyear+"']").prop("selected","selected");


//	    $("#month-1 option[value='"+cutmonth+"']").prop("selected","selected");


	    if(data.p1_card_type=="身份证"){
	    	  $("#idchange-1 option[value='0']").prop("selected","selected");


	    }else if(data.p1_card_type=="护照"){
	    	  $("#idchange-1 option[value='1']").prop("selected","selected");


	    }else if(data.p1_card_type=="港澳居民来往内地通行证"){
	    	  $("#idchange-1 option[value='2']").prop("selected","selected");


	    }else if(data.p1_card_type=="台湾居民来往大陆通行证"){
	    	  $("#idchange-1 option[value='3']").prop("selected","selected");


	    }
	    $("#idcard-1").val(''+data.p1_card_number+'');
	    $("#phone-1").val(''+data.p1_phone+'');
	    $("#eperson-1").val(''+data.p1_emergency_name+'');
	    $("#ephone-1").val(''+data.p1_emergency_phone+'');
	    if(data.p1_tag=="#小清新"){
	    	  $("#tag option[value='1']").prop("selected","selected");


	    }else if(data.p1_tag=="#重口味"){
	    	  $("#tag option[value='2']").prop("selected","selected");


	    }else if(data.p1_tag=="#天然萌"){
	    	  $("#tag option[value='3']").prop("selected","selected");


	    }else if(data.p1_tag=="#自然呆"){
	    	  $("#tag option[value='4']").prop("selected","selected");


	    }else if(data.p1_tag=="#纯爷们"){
	    	  $("#tag option[value='5']").prop("selected","selected");


	    }else if(data.p1_tag=="#万人迷"){
	    	  $("#tag option[value='6']").prop("selected","selected");


	    }else if(data.p1_tag=="#女神经"){
	    	  $("#tag option[value='7']").prop("selected","selected");


	    }else if(data.p1_tag=="#男神经"){
	    	  $("#tag option[value='8']").prop("selected","selected");


	    }
	    app.p1.delidCookie("id");

	}else if(data.grouptype == "亲子跑"){
		$(".p5-group").html(''+data.grouptype+'');
	    $(".p5-size").html(''+data.p1_teesize+','+' '+data.p2_teesize+','+' '+data.kids_teesize+'');
	    $(".p5-tag").html(''+data.p1_tag+'');
	    $(".p5-username").html(''+data.p1_name+','+' '+data.p2_name+','+' '+data.kids_name+'');
	    $(".p5-sex").html(''+data.p1_sex+','+' '+data.p2_sex+','+' '+data.kids_sex+'');

	    //p3
	    	$(".p3-group-family").attr("checked","checked");
	    	//成年参赛者1
	    	if(data.p1_teesize=="XS(160/82A)"){
	        $("#size-2 option[value='XS']").prop("selected","selected");


	    }else if(data.p1_teesize=="S(165/84A)"){
	       $("#size-2 option[value='S']").prop("selected","selected");


	    }else if(data.p1_teesize=="M(170/88A)"){
	        $("#size-2 option[value='M']").prop("selected","selected");


	    }else if(data.p1_teesize=="L(175/92A)"){
	        $("#size-2 option[value='L']").prop("selected","selected");


	    }else if(data.p1_teesize=="XL(180/96A)"){
	        $("#size-2 option[value='XL']").prop("selected","selected");


	    }else if(data.p1_teesize=="XXL(185/100A)"){
	        $("#size-2 option[value='XXL']").prop("selected","selected");


	    }
	    $("#username-2").val(''+data.p1_name+'');
	    if(data.p1_sex=="男"){
	    	  $(".p3-sex-boy-2").attr("checked","checked");
	    }
	    if(data.p1_sex=="女"){
	    	  $(".p3-sex-girl-2").attr("checked","checked");
	    }
//	    	var cutyear = data.p1_birthday.split("-")[0];
//	    var cutmonth = data.p1_birthday.split("-")[1];
//	    $("#year-2 option[value='"+cutyear+"']").prop("selected","selected");


//	    $("#month-2 option[value='"+cutmonth+"']").prop("selected","selected");


	    if(data.p1_card_type=="身份证"){
	    	  $("#idchange-2 option[value='0']").prop("selected","selected");


	    }else if(data.p1_card_type=="护照"){
	    	  $("#idchange-2 option[value='1']").prop("selected","selected");


	    }else if(data.p1_card_type=="港澳居民来往内地通行证"){
	    	  $("#idchange-2 option[value='2']").prop("selected","selected");


	    }else if(data.p1_card_type=="台湾居民来往大陆通行证"){
	    	  $("#idchange-2 option[value='3']").prop("selected","selected");


	    }
	    $("#idcard-2").val(''+data.p1_card_number+'');
	    $("#phone-2").val(''+data.p1_phone+'');
	    $("#eperson-2").val(''+data.p1_emergency_name+'');
	    $("#ephone-2").val(''+data.p1_emergency_phone+'');
	    //成年参赛者2
	    if(data.p2_name != ""){
	    	    	if(data.p2_teesize=="XS(160/82A)"){
		        $("#size-3 option[value='XS']").prop("selected","selected");


		    }else if(data.p2_teesize=="S(165/84A)"){
		       $("#size-3 option[value='S']").prop("selected","selected");


		    }else if(data.p2_teesize=="M(170/88A)"){
		        $("#size-3 option[value='M']").prop("selected","selected");


		    }else if(data.p2_teesize=="L(175/92A)"){
		        $("#size-3 option[value='L']").prop("selected","selected");


		    }else if(data.p2_teesize=="XL(180/96A)"){
		        $("#size-3 option[value='XL']").prop("selected","selected");


		    }else if(data.p2_teesize=="XXL(185/100A)"){
		        $("#size-3 option[value='XXL']").prop("selected","selected");


		    }
		    $("#username-3").val(''+data.p2_name+'');
		    if(data.p2_sex=="男"){
		    	  $(".p3-sex-boy-3").attr("checked","checked");
		    }
		    if(data.p2_sex=="女"){
		    	  $(".p3-sex-girl-3").attr("checked","checked");
		    }
//		    	var cutyear2 = data.p2_birthday.split("-")[0];
//		    var cutmonth2 = data.p2_birthday.split("-")[1];
//		    $("#year-3 option[value='"+cutyear2+"']").prop("selected","selected");


//		    $("#month-3 option[value='"+cutmonth2+"']").prop("selected","selected");


		    if(data.p2_card_type=="身份证"){
		    	  $("#idchange-3 option[value='0']").prop("selected","selected");


		    }else if(data.p2_card_type=="护照"){
		    	  $("#idchange-3 option[value='1']").prop("selected","selected");


		    }else if(data.p2_card_type=="港澳居民来往内地通行证"){
		    	  $("#idchange-3 option[value='2']").prop("selected","selected");


		    }else if(data.p2_card_type=="台湾居民来往大陆通行证"){
		    	  $("#idchange-3 option[value='3']").prop("selected","selected");


		    }
		    $("#idcard-3").val(''+data.p2_card_number+'');
		    $("#phone-3").val(''+data.p2_phone+'');
		    $("#eperson-3").val(''+data.p2_emergency_name+'');
		    $("#ephone-3").val(''+data.p2_emergency_phone+'');
		}
	    //children
	    if(data.kids_teesize=="110cm以下"){
	        $("#size-4 option[value='XXXS']").prop("selected","selected");


	    }else if(data.kids_teesize=="110cm-130cm"){
	       $("#size-4 option[value='XXS']").prop("selected","selected");


	    }else if(data.kids_teesize=="XS(160/82A)"){
	        $("#size-4 option[value='XS']").prop("selected","selected");


	    }else if(data.kids_teesize=="S(165/84A)"){
	        $("#size-4 option[value='S']").prop("selected","selected");


	    }else if(data.kids_teesize=="M(170/88A)"){
	        $("#size-4 option[value='M']").prop("selected","selected");


	    }else if(data.kids_teesize=="L(175/92A)"){
	        $("#size-4 option[value='L']").prop("selected","selected");


	    }else if(data.kids_teesize=="XL(180/96A)"){
	        $("#size-4 option[value='XL']").prop("selected","selected");


	    }else if(data.kids_teesize=="XXL(185/100A)"){
	        $("#size-4 option[value='XXL']").prop("selected","selected");


	    }
	    $("#username-4").val(''+data.kids_name+'');
	    if(data.kids_sex=="男"){
	    	  $(".p3-sex-boy-4").attr("checked","checked");
	    }
	    if(data.kids_sex=="女"){
	    	  $(".p3-sex-girl-4").attr("checked","checked");
	    }
//	    var cutyear3 = data.kids_birthday.split("-")[0];
//	    var cutmonth3 = data.kids_birthday.split("-")[1];
//	    $("#year-4 option[value='"+cutyear3+"']").prop("selected","selected");


//	    $("#month-4 option[value='"+cutmonth3+"']").prop("selected","selected");


	    if(data.kids_card_type=="身份证"){
	    	  $("#idchange-4 option[value='0']").prop("selected","selected");


	    }else if(data.kids_card_type=="护照"){
	    	  $("#idchange-4 option[value='1']").prop("selected","selected");


	    }else if(data.kids_card_type=="港澳居民来往内地通行证"){
	    	  $("#idchange-4 option[value='2']").prop("selected","selected");


	    }else if(data.kids_card_type=="台湾居民来往大陆通行证"){
	    	  $("#idchange-4 option[value='3']").prop("selected","selected");


	    }
	    $("#idcard-4").val(''+data.kids_card_number+'');
	    $("#parent").val(''+data.kids_guardian_name+'');
	    $("#parent-phone").val(''+data.kids_guardian_phone+'');
	    $("#eperson-4").val(''+data.kids_emergency_name+'');
	    $("#ephone-4").val(''+data.kids_emergency_phone+'');
	    if(data.p1_tag=="#棒棒哒"){
	    	  $("#tag-family option[value='1']").prop("selected","selected");


	    }else if(data.p1_tag=="#萌萌哒"){
	    	  $("#tag-family option[value='2']").prop("selected","selected");


	    }else if(data.p1_tag=="#美美哒"){
	    	  $("#tag-family option[value='3']").prop("selected","selected");


	    }
	    app.p1.delidCookie("id");

	}
	//寄送方式
	if(data.pakcage_get_way == "顺丰到付"){
        $(".p5-onsite-part1").hide();
        $(".p5-onsite-part2").hide();

		$("#p5-getpackage").attr("src","img/p5-delivery.png");
		$(".p5-textadress,.p5-name,.p5-nameinput,.p5-adress,.p5-adressinput,.p5-phone,.p5-phoneinput").css("display","block");
		$(".p5-nameinput").html(data.pakcage_get_name);
		$(".p5-adressinput").html(data.pakcage_get_address);
		$(".p5-phoneinput").html(data.pakcage_get_phone);
		$(".p4-send").attr("checked","checked");
		$("#p4-name").val(data.pakcage_get_name);
		$("#p4-adress").val(data.pakcage_get_address);
		$("#p4-phone").val(data.pakcage_get_phone);
	}else if(data.pakcage_get_way == "现场领取"){
		$(".p5-textadress,.p5-name,.p5-nameinput,.p5-adress,.p5-adressinput,.p5-phone,.p5-phoneinput").css("display","none");
		$("#p5-getpackage").attr("src","img/p5-onsite.png");
		$(".p4-get").attr("checked","checked");
        $(".p5-onsite-part1").show();
        $(".p5-onsite-part2").show();
	};

};
app.p5.selectedYearandMonth = function(){
	if(user.grouptype=="5km" || user.grouptype=="10km"){
		var cutyear = user.p1_birthday.split("-")[0];
	    var cutmonth = user.p1_birthday.split("-")[1];
	    $("#year-1 option[value='"+cutyear+"']").prop("selected","selected");

	    $("#month-1 option[value='"+cutmonth+"']").prop("selected","selected");

	}
	if(user.grouptype=="亲子跑"){
		var cutyear = user.p1_birthday.split("-")[0];
	    var cutmonth = user.p1_birthday.split("-")[1];
	    $("#year-2 option[value='"+cutyear+"']").prop("selected","selected");

	    $("#month-2 option[value='"+cutmonth+"']").prop("selected","selected");

	    if(user.p2_name != ""){
	    	    var cutyear2 = user.p2_birthday.split("-")[0];
		    var cutmonth2 = user.p2_birthday.split("-")[1];
		    $("#year-3 option[value='"+cutyear2+"']").prop("selected","selected");

		    $("#month-3 option[value='"+cutmonth2+"']").prop("selected","selected");

	    }
	    var cutyear3 = user.kids_birthday.split("-")[0];
	    var cutmonth3 = user.kids_birthday.split("-")[1];
	    $("#year-4 option[value='"+cutyear3+"']").prop("selected","selected");

	    $("#month-4 option[value='"+cutmonth3+"']").prop("selected","selected");

	}

};
app.p5.bind_touch_event = function(){
	$(".p5-btn1").on("touchend",function(){
		app.p1.delidCookie("id");
		app.template.swiper.to(2);
	});
	$(".p5-btn2").on("touchend",function(){
		app.p1.delidCookie("id");
		app.template.swiper.prev();
	});
	//确认并支付
	$(".p5-paybtn").on("touchend",function(){
        alert("开始支付");
    	if($(".p3-group-5").is(":checked") || $(".p3-group-10").is(":checked")){
    		app.p5.singlejudge();
    		var paydata;
    		if($(".p3-group-5").is(":checked")){
    			paydata = {"openid": user.openid, "grouptype": "5km", "outtradeno": user.out_trade_no};
    		}else if($(".p3-group-10").is(":checked")){
    			paydata = {"openid": user.openid, "grouptype": "10km", "outtradeno": user.out_trade_no};
    		}
    		if(getId==user.p1_card_number){
    			user.action = "update";
    			console.info("update");
    		}else {
    			user.action = "add";
    			console.info("add");
    		}
    	}
    	if($(".p3-group-family").is(":checked")){
    		app.p5.familyjudge();
    		var paydata = {"openid": user.openid, "grouptype": "亲子跑", "outtradeno": user.out_trade_no};
    		if(getFamilyId1==user.p1_card_number && getFamilyId2==user.p2_card_number && getFamilyId3==user.kids_card_number){
    			user.action = "update";
    			console.info("update");
    		}else {
    			user.action = "add";
    			console.info("add");
    		}
    	}


        var coupon_code = $("#coupon").val();
        if(!coupon_code)
        {
            alert("现金支付");
            app.p5.gotopay(user, paydata);
        }else if(coupon_code != app.p5.coupon_code)
        {
             alert("优惠码支付");
            $.getJSON(app.api.host + '/coupon/verify/' + coupon_code, function(data){
                var data = typeof data == "object" ? data : JSON.parse(data);

                if(data.length > 0)
                {
                    if(data[0].number_of_use < 3)
                    {
                        app.p5.gotopay(user, paydata, true, coupon_code);
                        $("#coupon-msg").html('');
                        $("#coupon").attr('disabled', 'disabled');
                    }else
                    {
                        app.p5.coupon_code = coupon_code;
                        $("#coupon-msg").html('邀请码超过使用次数！');
                    }
                }else
                {
                    app.p5.coupon_code = coupon_code;
                    $("#coupon-msg").html('邀请码无效！');
                }
           });
        }
	});
};

app.p5.coupon_code = 0;
app.p5.gotopay = function(user_data, pay_data, use_coupon, coupon_code)
{
    $.post(app.api.host + '/user/add', user_data, function(data){
        var data = typeof data == "object" ? data : JSON.parse(data);
        console.info(data.rs);
        if(data.rs=="success" || (data.rs.indexOf('已报名')!=-1 && data.rs.indexOf('未支付')!=-1))
        {
            app.p1.setidCookie("id",""+user.p1_card_number+"");
            if(!use_coupon)
                app.p5.payment(pay_data);
            else
            {
                app.p5.useconpontopay(user_data, pay_data, coupon_code);
            }
        }else
        {
            alert(data.rs);
        }
    }, "JSON");
}

app.p5.useconpontopay = function(user_data, pay_data, coupon_code){
    var notify = {"appid":"wxc6d26827fed8ccc6",
                    "attach": user_data.grouptype != "亲子跑" ? "100元一般跑" : "200元亲子跑",
                    "bank_type":"",
                    "cash_fee":"0",
                    "device_info":"WEB",
                    "fee_type":"CNY",
                    "is_subscribe":"Y",
                    "mch_id":"1315072801",
                    "nonce_str":"",
                    "openid": user_data.openid,
                    "out_trade_no": user_data.out_trade_no,
                    "result_code":"SUCCESS",
                    "return_code":"SUCCESS",
                    "sign": "",
                    "time_end": app.template.tool.date("yyyyMMddhhmmss"),
                    "total_fee":"0",
                    "trade_type":"COUPON",
                    "transaction_id": coupon_code
                };

    $.post(app.api.host + '/wxpay/callback', notify, function(data){
        var data = typeof data == "object" ? data : JSON.parse(data);

        if(data.rs == "success")
        {
            $(".p5-paybtn,.p5-btn1,.p5-btn2").hide();
            $(".p5-payfinish").show();
            app.p1.delidCookie("id");
            alert("支付成功!");
        }else
        {
            alert(data.rs);
        }
    }, "JSON");

}

//获取用户所填的信息
var user = {};
var singleGroup;
var singleSize;
var singleTag;
var singleName;
var singleSex;
app.p5.singlejudge=function(){
     app.p5.getUserinfo_bygetUser();
     user.out_trade_no = md5($("#idcard-1").val());
	if($("#p3-group-5").is(":checked")){
		singleGroup = "5";
		user.grouptype = "5km";
	}else if($("#p3-group-10").is(":checked")){
		singleGroup = "10";
		user.grouptype = "10km";
	}
	if($("#size-1").val()=="XS"){
        singleSize="XS(160/82A)";
        user.p1_teesize = "XS(160/82A)";
    }else if($("#size-1").val()=="S"){
        singleSize="S(165/84A)";
        user.p1_teesize = "S(165/84A)";
    }else if($("#size-1").val()=="M"){
        singleSize="M(170/88A)";
        user.p1_teesize = "M(170/88A)";
    }else if($("#size-1").val()=="L"){
        singleSize="L(175/92A)";
        user.p1_teesize = "L(175/92A)";
    }else if($("#size-1").val()=="XL"){
        singleSize="XL(180/96A)";
        user.p1_teesize = "XL(180/96A)";
    }else if($("#size-1").val()=="XXL"){
        singleSize="XXL(185/100A)";
        user.p1_teesize = "XXL(185/100A)";
    }
    if($("#tag").val()=="1"){
        singleTag="小清新";
        user.p1_tag = "#小清新";
    }else if($("#tag").val()=="2"){
        singleTag="重口味";
        user.p1_tag = "#重口味";
    }else if($("#tag").val()=="3"){
        singleTag="天然萌";
        user.p1_tag = "#天然萌";
    }else if($("#tag").val()=="4"){
        singleTag="自然呆";
        user.p1_tag = "#自然呆";
    }else if($("#tag").val()=="5"){
        singleTag="纯爷们";
        user.p1_tag = "#纯爷们";
    }else if($("#tag").val()=="6"){
        singleTag="万人迷";
        user.p1_tag = "#万人迷";
    }else if($("#tag").val()=="7"){
        singleTag="女神经";
        user.p1_tag = "#女神经";
    }else if($("#tag").val()=="8"){
        singleTag="男神经";
        user.p1_tag = "#男神经";
    }
    singleName = $("#username-1").val();
    user.p1_name = ""+$("#username-1").val()+"";
    user.p1_birthday = ""+$("#year-1").val()+""+"-"+""+$("#month-1").val()+"";
    if ($(".p3-sex-boy").is(":checked")){
         singleSex="男";
         user.p1_sex = "男";
    }else{
         singleSex="女";
         user.p1_sex = "女";
    }
    if($("#idchange-1").val()== "0"){
    	  user.p1_card_type = "身份证";
    }else if($("#idchange-1").val()== "1"){
    	  user.p1_card_type = "护照";
    }else if($("#idchange-1").val()== "2"){
    	  user.p1_card_type = "港澳居民来往内地通行证";
    }else if($("#idchange-1").val()== "3"){
    	  user.p1_card_type = "台湾居民来往大陆通行证";
    }
    user.p1_card_number = ""+$("#idcard-1").val()+"";
    user.p1_phone = ""+$("#phone-1").val()+"";
    user.p1_emergency_name = ""+$("#eperson-1").val()+"";
    user.p1_emergency_phone = ""+$("#ephone-1").val()+"";
    if($(".p4-send").is(":checked")){
    	    user.pakcage_get_way = "顺丰到付";
        user.pakcage_get_name = ""+$("#p4-name").val()+"";
        user.pakcage_get_phone = ""+$("#p4-phone").val()+"";
        user.pakcage_get_address = ""+$("#p4-adress").val()+"";
    }else if($(".p4-get").is(":checked")){
    	    user.pakcage_get_way = "现场领取";
    	    user.pakcage_get_name = "";
        user.pakcage_get_phone = "";
        user.pakcage_get_address = "";
    }
        // p2
        user.p2_name = "";
        user.p2_sex = "";
        user.p2_birthday = "";
        user.p2_teesize = "";
        user.p2_card_type = "";
        user.p2_card_number = "";
        user.p2_phone = "";
        user.p2_emergency_name = "";
        user.p2_emergency_phone = "";
        // kids
        user.kids_name = "";
        user.kids_sex = "";
        user.kids_birthday = "";
        user.kids_teesize = "";
        user.kids_card_type = "";
        user.kids_card_number = "";
        user.kids_guardian_name = "";
        user.kids_guardian_phone = "";
        user.kids_emergency_name = "";
        user.kids_emergency_phone = "";
};
var familyGroup;
var familySize1;
var familySize2;
var familySize3;
var familyTag;
var familyName1;
var familyName2;
var familyName3;
var familySex1;
var familySex2;
var familySex3;
app.p5.familyjudge=function(){

    app.p5.getUserinfo_bygetUser();

	if($("#p3-group-family").is(":checked")){
		familyGroup = "亲子跑";
		user.grouptype = "亲子跑";
	}
	if($("#size-2").val()=="XS"){
        familySize1="XS(160/82A)";
        user.p1_teesize = "XS(160/82A)";
    }else if($("#size-2").val()=="S"){
        familySize1="S(165/84A)";
        user.p1_teesize = "S(165/84A)";
    }else if($("#size-2").val()=="M"){
        familySize1="M(170/88A)";
        user.p1_teesize = "M(170/88A)";
    }else if($("#size-2").val()=="L"){
        familySize1="L(175/92A)";
        user.p1_teesize = "L(175/92A)";
    }else if($("#size-2").val()=="XL"){
        familySize1="XL(180/96A)";
        user.p1_teesize = "XL(180/96A)";
    }else if($("#size-2").val()=="XXL"){
        familySize1="XXL(185/100A)";
        user.p1_teesize = "XXL(185/100A)";
    }
    familyName1 = $("#username-2").val();
    user.p1_name = ""+$("#username-2").val()+"";
    user.p1_birthday = ""+$("#year-2").val()+""+"-"+""+$("#month-2").val()+"";
    if ($(".p3-sex-boy-2").is(":checked")){
         familySex1 = "男";
         user.p1_sex = "男";
    }else{
         familySex1 = "女";
         user.p1_sex = "女";
    }
    if($("#idchange-2").val()== "0"){
    	  user.p1_card_type = "身份证";
    }else if($("#idchange-2").val()== "1"){
    	  user.p1_card_type = "护照";
    }else if($("#idchange-2").val()== "2"){
    	  user.p1_card_type = "港澳居民来往内地通行证";
    }else if($("#idchange-2").val()== "3"){
    	  user.p1_card_type = "台湾居民来往大陆通行证";
    }
    user.p1_card_number = ""+$("#idcard-2").val()+"";
    user.p1_phone = ""+$("#phone-2").val()+"";
    user.p1_emergency_name = ""+$("#eperson-2").val()+"";
    user.p1_emergency_phone = ""+$("#ephone-2").val()+"";
    if(personTwo == false || personTwo == "empty"){
    	   familySize2 = "";
    	   familyName2 = "";
    	   familySex2 = "";
    	    user.p2_name = "";
        user.p2_sex = "";
        user.p2_birthday = "";
        user.p2_teesize = "";
        user.p2_card_type = "";
        user.p2_card_number = "";
        user.p2_phone = "";
        user.p2_emergency_name = "";
        user.p2_emergency_phone = "";
        user.out_trade_no = md5($("#idcard-2").val()+$("#idcard-4").val());
    }else if(personTwo == true){
    	   if($("#size-3").val()=="XS"){
	        familySize2="XS(160/82A)";
	        user.p2_teesize = "XS(160/82A)";
	    }else if($("#size-3").val()=="S"){
	        familySize2="S(165/84A)";
	        user.p2_teesize = "S(165/84A)";
	    }else if($("#size-3").val()=="M"){
	        familySize2="M(170/88A)";
	        user.p2_teesize = "M(170/88A)";
	    }else if($("#size-3").val()=="L"){
	        familySize2="L(175/92A)";
	        user.p2_teesize = "L(175/92A)";
	    }else if($("#size-3").val()=="XL"){
	        familySize2="XL(180/96A)";
	        user.p2_teesize = "XL(180/96A)";
	    }else if($("#size-3").val()=="XXL"){
	        familySize2="XXL(185/100A)";
	        user.p2_teesize = "XXL(185/100A)";
	    }
	    familyName2 = $("#username-3").val();
	    user.p2_name = ""+$("#username-3").val()+"";
	    if ($(".p3-sex-boy-3").is(":checked")){
	         familySex2 = "男";
	         user.p2_sex = "男";
	    }else{
	         familySex2 = "女";
	         user.p2_sex = "女";
	    }
	    if($("#idchange-3").val()== "0"){
	    	  user.p2_card_type = "身份证";
	    }else if($("#idchange-3").val()== "1"){
	    	  user.p2_card_type = "护照";
	    }else if($("#idchange-3").val()== "2"){
	    	  user.p2_card_type = "港澳居民来往内地通行证";
	    }else if($("#idchange-3").val()== "3"){
	    	  user.p2_card_type = "台湾居民来往大陆通行证";
	    }
	    user.p2_birthday = ""+$("#year-3").val()+""+"-"+""+$("#month-3").val()+"";
	    user.p2_card_number = ""+$("#idcard-3").val()+"";
	    user.p2_phone = ""+$("#phone-3").val()+"";
	    user.p2_emergency_name = ""+$("#eperson-3").val()+"";
	    user.p2_emergency_phone = ""+$("#ephone-3").val()+"";
	    user.out_trade_no = md5($("#idcard-2").val()+$("#idcard-3").val()+$("#idcard-4").val());
    }

    user.kids_name = ""+$("#username-4").val()+"";
    user.kids_birthday = ""+$("#year-4").val()+""+"-"+""+$("#month-4").val()+"";
    if($("#size-4").val()=="XXXS"){
        familySize3="110cm以下";
        user.kids_teesize = "110以下";
    }else if($("#size-4").val()=="XXS"){
        familySize3="110cm-130cm";
        user.kids_teesize = "110cm-130cm";
    }else if($("#size-4").val()=="XS"){
        familySize3="XS(160/82A)";
        user.kids_teesize = "XS(160/82A)";
    }else if($("#size-4").val()=="S"){
        familySize3="S(165/84A)";
        user.kids_teesize = "S(165/84A)";
    }else if($("#size-4").val()=="M"){
        familySize3="M(170/88A)";
        user.kids_teesize = "M(170/88A)";
    }else if($("#size-4").val()=="L"){
        familySize3="L(175/92A)";
        user.kids_teesize = "L(175/92A)";
    }else if($("#size-4").val()=="XL"){
        familySize3="XL(180/96A)";
        user.kids_teesize = "XL(180/96A)";
    }else if($("#size-4").val()=="XXL"){
        familySize3="XXL(185/100A)";
        user.kids_teesize = "XXL(185/100A)";
    }
    if($("#idchange-4").val()== "0"){
    	  user.kids_card_type = "身份证";
    }else if($("#idchange-4").val()== "1"){
    	  user.kids_card_type = "护照";
    }else if($("#idchange-4").val()== "2"){
    	  user.kids_card_type = "港澳居民来往内地通行证";
    }else if($("#idchange-4").val()== "3"){
    	  user.kids_card_type = "台湾居民来往大陆通行证";
    }
	if($("#tag-family").val()=="1"){
        familyTag="棒棒哒";
        user.p1_tag = "#棒棒哒";
    }else if($("#tag-family").val()=="2"){
        familyTag="萌萌哒";
        user.p1_tag = "#萌萌哒";
    }else if($("#tag-family").val()=="3"){
        familyTag="美美哒";
        user.p1_tag = "#美美哒";
    }
	familyName3 = $("#username-4").val();
	 if ($(".p3-sex-boy-4").is(":checked")){
         familySex3 = "男";
         user.kids_sex = "男";
    }else{
         familySex3 = "女";
         user.kids_sex = "女";
    }
    user.kids_card_number = ""+$("#idcard-4").val()+"";
    user.kids_guardian_name = ""+$("#parent").val()+"";
    user.kids_guardian_phone = ""+$("#parent-phone").val()+"";
    user.kids_emergency_name = ""+$("#eperson-4").val()+"";
    user.kids_emergency_phone = ""+$("#ephone-4").val()+"";
    if($(".p4-send").is(":checked")){
    	    user.pakcage_get_way = "顺丰到付";
        user.pakcage_get_name = ""+$(".p4-name").val()+"";
        user.pakcage_get_phone = ""+$(".p4-phone").val()+"";
        user.pakcage_get_address = ""+$(".p4-adress").val()+"";
    }else if($(".p4-get").is(":checked")){
    	    user.pakcage_get_way = "现场领取";
    	    user.pakcage_get_name = "";
        user.pakcage_get_phone = "";
        user.pakcage_get_address = "";
    }

}

app.p5.getuserinfobycardnumber = function(card_number){
	$.getJSON(app.api.host + '/user/id/' + card_number, function(data){
        var data = typeof data == "object" ? data : JSON.parse(data);
        if(data[0].pay_status=="已支付"){
        	   console.info("已支付");
        	   app.p1.delidCookie("id");
        }else if(data[0].pay_status=="未支付"){
        	   console.info(app.p1.getidCookie("id"));
        	   console.info(data[0]);
//      	   app.p5.getUserInfobyAjax(data[0]);
        	   user = data[0];
        	   console.info(user);
        	   app.template.swiper.to(4);
        }
   });
};

app.p5.getUserinfo_bygetUser = function(){
	    app.p5.getUser();
	    user.openid = app.p5.wechatUserInfo.id;
        user.nickname = app.p5.wechatUserInfo.nickname;
        user.headimgurl = app.p5.wechatUserInfo.original.headimgurl;
        user.sex = app.p5.wechatUserInfo.original.sex;
        user.city = app.p5.wechatUserInfo.original.city;
        user.country = app.p5.wechatUserInfo.original.country;
        user.province = app.p5.wechatUserInfo.original.province;
        user.subscribe_time = "";
};
app.p5.getCookie = function(c_name){
    if (document.cookie.length>0)
    {
        var c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return ""
};
app.p5.wechatUserInfo = undefined;
app.p5.getUser = function(){
    if(!app.p5.wechatUserInfo){
        var wechatUserInfoBase64 = app.p5.getCookie("wechatUserInfo");
        app.p5.wechatUserInfo = JSON.parse(atob(wechatUserInfoBase64));
    }
    	  return app.p5.wechatUserInfo;
};
//  pay
app.p5.payment=function(data){
    console.log(data);
   $.post('https://pay.wechat.createcdigital.com/molirun-wxpayapi/wxpay/pub/pay.php', data, function(data){
      console.log("22222----"+data);
      //callpay(JSON.parse(data));
      callpay(typeof data == 'object' ? data : JSON.parse(data));
   }, "JSON");
	var callpay = function(jsapi){
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', jsapicall, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', jsapicall);
                    document.attachEvent('onWeixinJSBridgeReady', jsapicall);
                }
            }else{
                jsapicall(jsapi);
            }
        };

        var jsapicall = function(jsapi){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {"appId": jsapi.appId,"nonceStr": jsapi.nonceStr,"package": jsapi.package,"signType": jsapi.signType,"timeStamp": jsapi.timeStamp,"paySign": jsapi.paySign}, function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" )
                    {
				        $(".p5-paybtn,.p5-btn1,.p5-btn2").hide();
		                $(".p5-payfinish").show();
		                app.p1.delidCookie("id");
		                alert("支付成功!");
                    }else{
                	    user.action = "update";
                        console.log("=======支付失败!, msg:" + res.err_msg);
                        alert("支付失败!");
                    }
                }
            );
        };
};

app.p5.destory = function(){};

// init
(function(){
	 // 框架
    app.template.swiper.init();
    app.template.touch.init();
    app.template.Landscape.init();

	/* page init */
    app.template.swiper.on_pageslideend = function(index){
        switch(index)
        {
            case 0:
                app.p1.init();
                break;
            case 1:
                app.p1.destory();
                app.p2.init();
                break;
            case 2:
                app.p2.destory();
                app.p3.init();
                break;
            case 3:
                app.p3.destory();
                app.p4.init();
                break;
            case 4:
                app.p5.init();
                break;
        }
    };

	//点击事件初始化

	app.p1.bind_touch_event();
	app.p2.bind_touch_event();
	app.p3.bind_touch_event();
	app.p4.bind_touch_event();
	app.p5.bind_touch_event();

})();


