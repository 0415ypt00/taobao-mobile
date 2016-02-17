/*
***********************************
    Move Framework By Oop        *
    Date：2014.10.30             *
    Author:shadow                *
***********************************
*/


var mvFrame = {
	//get Elements By TagName.......Array
    tag : function(oParent,sTag){
        return oParent.getElementsByTagName(sTag);//array
    },
    //get Elements By class........Array
    getByClass : function(oParent,classn){
        var oTag = this.tag(oParent,"*");
        var oResult = [];
        for (var i = 0; i < oTag.length; i++) {
            if(oTag[i].className==classn){
                oResult.push(oTag[i]);
            }
        };
        return oResult;//array
    },
    //get Element's style attr By class........String
    getStyle : function(obj,name){
        return obj.currentStyle ? obj.currentStyle[name] : getComputedStyle(obj,false)[name];            
    },

    /*
     * other menthod
     */

    //startMove
    startMove : function(obj,json,fnEnd){
    	var __this = this;
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var ifMove = true;
			for(var attr in json){
				var cur=0;
				if(attr=='opacity'){
					cur=Math.round(parseFloat(__this.getStyle(obj, attr))*100);
				}else{
					cur=parseInt(__this.getStyle(obj, attr));
				};
				
				if(cur!=json[attr]){
					ifMove = false;
				}
				
				var speed = (json[attr]-cur)/6;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);
				if(attr=='opacity'){
					obj.style.filter='alpha(opacity:'+(cur+speed)+')';
					obj.style.opacity=(cur+speed)/100;
				}else{
					obj.style[attr]=cur+speed+'px';
				};	
			};
			if(ifMove){
				clearInterval(obj.timer);
				if(fnEnd){
					fnEnd();
				};
			};
		},30);
	}
};