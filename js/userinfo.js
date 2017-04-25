var app = app || {};

/*-- html5-template
====================================================== */
app.template = function(){};

//swiper
app.template.swiper = function(){};
app.template.swiper.mySwiper = {};
app.template.swiper.init = function(){
	app.template.swiper.bind();
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
    var Landscape = new mo.Landscape({
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
   document.body.addEventListener("touchmove", app.template.touch.eventlistener_handler, false);
};
 
 
//  p1
app.p1 = function(){};
app.p1.init = function(){
      
};
app.p1.judge = function(){
	
};
app.p1.bind_touch_event = function(){
	
	$(".p1-btn").on("touchend",function(){
		var cardnumber = $(".p1-number").val();
	    if(cardnumber != ""){
	        app.p1.getuserinfobycardnumber(cardnumber);
	    }else {
	    	   $(".p1-hit").html("请输入正确的证件号码！");
	    };
	});		
	$(".p1-number").on("focus", function(){
        $(".p1-hit").html("");
    });
};
app.p1.getuserinfobycardnumber = function(card_number){
	$.getJSON('https://molirun.api.createcdigital.com/user/id/' + card_number, function(data){
		var data = typeof data == "object" ? data : JSON.parse(data);
        console.log(data[0]);
        if(data[0]){
        	   app.p2.set_userinfo(data);
           app.template.swiper.next();
        }else {
        	   $(".p1-hit").html("<p>无此证件号码的参赛选手信息</p><p>请核对后重新输入！</p><p>或致电 4008-200-796 查询！</p>");
        }
    });
	
};

app.p1.destory = function(){};

//  p2
app.p2 = function(){};
app.p2.init = function(){
      
};
app.p2.set_userinfo = function(data){
	var name ;
	var sex;
	var group;
	var size;
	var tag;
	if(data[0].grouptype=="5km" || data[0].grouptype=="10km"){
		name = data[0].p1_name;
		sex = data[0].p1_sex;
		group = data[0].grouptype;
		size = data[0].p1_teesize;
		tag = data[0].p1_tag;
	}
	if(data[0].grouptype=="家庭跑"){
		name = data[0].p1_name+" "+data[0].p2_name+" "+data[0].kids_name;
		sex = data[0].p1_sex+" "+data[0].p2_sex+" "+data[0].kids_sex;
		group = data[0].grouptype;
		size = data[0].p1_teesize+" "+data[0].p2_teesize+" "+data[0].kids_teesize;
		tag = data[0].p1_tag;
	}
    $(".p2-name").html(name);
    $(".p2-sex").html(sex);
    $(".p2-group").html(group);
    $(".p2-size").html(size);
    $(".p2-tag").html(tag);
	
};
app.p2.bind_touch_event = function(){
	$(".p2-btn").on("touchend",function(){
		$(".p2 .p2-cover").css("display","block");
	});
	$(".p2-btn2").on("touchend",function(){
		$(".p2 .p2-cover").css("display","none");
	});
	
};
app.p2.destory = function(){};


/*-- page init
====================================================== */
(function(){
    
    // 框架
    app.template.touch.init();
    app.template.swiper.init();
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
        }
    };
    app.p1.bind_touch_event();
    app.p2.bind_touch_event();
   
})();