/*
 *  Loader - v1.0
 *  Light-weight, Loader.
 *  Base on Semantic/jQuery/Bootstrap3+ Modal(Maybe)
 *
 *  Made by RT
 *  Mail:623059008@qq.com
 *  Under No License :)
 *  How to use it?
 *  $(ele).loader();   //simple loader with circle and text
 *  $(ele).loader(1);  //simple loader with circle and text
 *  $(ele).loader([2,"imgurl"]);  //simple loader with circle and text and a PICTURE! Imgurl is the src.
 *  How to close the loader when it shows?
 *  $(any ele).modal_close();
 *  It will close the loader which you just open.Every Loader has a unique id,and you can't open two loader.
 *  You must close the last one, and you can get a new loader. 
 */
;(function( $, window, document, undefined ) {
		var pluginName="loader";
		function a_l_Plugin (element, options) {
			this.element = element;
			this._name = pluginName;
			if(options==undefined)
			{
				//没有参数时默认mode=1
				options=1;
			}
			this.init(element,options);

		}
		$.extend(a_l_Plugin.prototype, {
      getHtml:function(){
          //极简固定文字loader
          return "<div class=\"ui text loader\">加载中<\/div>\n";
      },
      getModalHtml:function(mode,id,imgurl){
				if(mode==1)
				{
        var strVar = "";
        strVar += "<div class=\"ui basic modal\" id="+id+">\n";
        strVar += "  <div class=\"ui header\">\n";
        strVar += this.getHtml();
        strVar += "  <\/div>\n";
        strVar += "<\/div>\n";
        return strVar;
				}
				if(mode==2)
				{
					var strVar = "";
			    strVar += "<div class=\"ui basic modal\" id="+id+">\n";
			    strVar += "  <div class=\"ui header\">\n";
			    strVar += this.getHtml();
			    strVar += "  <\/div>\n";
			    strVar += "  <div class=\"image content\" style=\"overflow:hidden;max-width:40%;margin:0 auto;\">\n";
			    strVar += "    <img class=\"image\" src=\""+imgurl+"\">\n";
			    strVar += "  <\/div>\n";
			    strVar += "<\/div>\n";
					return strVar;
				}
      },
      randomModalId:function(){
        function randNum(under,over){return parseInt(Math.random()*(over-under+1) + under);}
        var ran1=randNum(0,1000);
        var ran2=randNum(0,1000);
        var ran3=randNum(0,1000);
        return "modal_"+ran1+"_"+ran2+"_"+ran3;
      },
			close:function(mid)
			{
				$("#"+mid).modal("hide");
				$("#"+mid).remove();
			},
			init:function(aid,options){
				var mid=this.randomModalId();
				var html="";
				if(typeof(options)=='object')
				{
					if(options[0]==1)
					{
						//mode1 只有文字，不需要其他参数
						html=this.getModalHtml(1,mid);
					}
					if(options[0]==2 && options[1]!=undefined)
					{

						//mode2 带图片loader
						html=this.getModalHtml(2,mid,options[1]);
					}
					if(options[0]==2 && options[1]==undefined)
					{
						//mode2 带图片loader
						html=this.getModalHtml(1,mid);
					}
				}else{
				if(typeof(options)=="number" && options!=2)
					{
					//options为数字
					html=this.getModalHtml(options,mid);
				}else{
						html=this.getModalHtml(1,mid);
					}
				}

				$(aid).after(html);
        $("#"+mid).modal("show");
				var modal_close=function(){
					$("#"+mid).modal("hide");
					$("#"+mid).remove();
				}
				$("#"+mid).on("click",modal_close);
				 $.fn.modal_close = function(){
					modal_close();
				}
			}
		});
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
					$.data( this, "plugin_" +
						pluginName, new a_l_Plugin( this, options ) );
			} );

		};
	})( jQuery, window, document );
