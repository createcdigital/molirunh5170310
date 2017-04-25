/* ==========================================================================
 * WeChat ShareInterface js
 * ---------------------------------------------------------------------------
 * Author: Coton
 * Email: coton.chen@createcdigital.com
 * ========================================================================== */
var WeChat = function(){
	return {

		init: function(){
			this.setWechatConfig();
			this.setWechatShare();
		},


        // =========================================================================
        // Set Config and Content
        // =========================================================================
		setWechatConfig: function(){
			var data = {};
			data.pageurl = window.location.href;
			$.getJSON("https://molirun.wechat.createcdigital.com/jssdk", data, function(data){
				wx.config(data);
			});
		},

		getShareContent: function(){
			return {
					title : '传爱魔都｜茉莉跑报名传送门',
					titleformoment: '茉莉跑报名正式开始！快点击报名参加，让每一步都有爱！',
					desc: '别怪我没跟你说，茉莉跑报名已经开始，我们一起参加吧！',
					link: 'https://pay.wechat.createcdigital.com/h5-molirun',
					imgUrl: 'https://pay.wechat.createcdigital.com/h5-molirun/img/share.jpg',
					type: '',
					dataUrl: ''
				};
		},

		getShareLink: function(){
			//.replace(/&s=\d+/g, "");
			var link = window.location.href;

			if(link.indexOf("data=") > 0)
				link = link.substring(0, link.indexOf("data=")-1);

			if(link.indexOf("usercenter.html") > 0 || link.indexOf("country.html") > 0)
			{
				link = link.replace("usercenter.html", "index.html")
							.replace("country.html", "index.html");
			}

			return link;
		},

		setWechatShare: function(){
			wx.ready(function () {
	            wx.onMenuShareTimeline({
	                title: WeChat.getShareContent().titleformoment,
	                link: WeChat.getShareContent().link,
	                imgUrl: WeChat.getShareContent().imgUrl,
	                success: function () {
	                	WeChat.addShareLog("timeline");
	                },
	                cancel: function () {
	                }
	            });

	            wx.onMenuShareAppMessage({
	            	title: WeChat.getShareContent().title,
	            	desc: WeChat.getShareContent().desc,
	                link: WeChat.getShareContent().link,
	                imgUrl: WeChat.getShareContent().imgUrl,
	                type: WeChat.getShareContent().link,
	                dataUrl: WeChat.getShareContent().dataUrl,
	                success: function () {
	                	WeChat.addShareLog("appmessage");
	                },
	                cancel: function () {
	                }
	            });

	            wx.onMenuShareQQ({
                  	title: WeChat.getShareContent().title,
	            	desc: WeChat.getShareContent().desc,
	                link: WeChat.getShareContent().link,
	                imgUrl: WeChat.getShareContent().imgUrl,
	                success: function () {
	                	WeChat.addShareLog("qq");
	                },
	                cancel: function () {
	                }
	            });

	            wx.onMenuShareWeibo({
                   	title: WeChat.getShareContent().title,
	            	desc: WeChat.getShareContent().desc,
	                link: WeChat.getShareContent().link,
	                imgUrl: WeChat.getShareContent().imgUrl,
	                success: function () {
	                	WeChat.addShareLog("weibo");
	                },
	                cancel: function () {
	                }
	            });

	            wx.onMenuShareQZone({
                   	title: WeChat.getShareContent().title,
	            	desc: WeChat.getShareContent().desc,
	                link: WeChat.getShareContent().link,
	                imgUrl: WeChat.getShareContent().imgUrl,
	                success: function () {
	                	WeChat.addShareLog("qzone");
	                },
	                cancel: function () {
	                }
	            });
        	});
		},


        // =========================================================================
        // Upload Data
        // =========================================================================
        addShareLog: function(share_to){
        	var data = {};
        	data.openid = AppCommon.getUser().id;
        	data.share_to = share_to;
        	data.page_type = AppCommon.getPageType();
        	data.store_id = AppCommon.getCurrentStoreId();
        	data.coupon_id = AppCommon.getCouponId();
        	data.share_url = WeChat.getShareContent().link;
        	data.page_url = window.location.href;

        	$.post(AppCommon.handleAPIURL() + '/sharelog/add', data, function(data){
					console.log('addShareLog, result:' + data.rs);
				}, "JSON");
        },

	};
}();

WeChat.init();