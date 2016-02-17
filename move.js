/*
*****************
    Move Framework
    Date：2013.08.13
    Author:shadow
******************
*/

/*getByClass function*/
function getByClass(oParent,classn){
	var oTag = oParent.getElementsByTagName('*');//In oParent
	var oResult = [];
	for (var i = 0; i < oTag.length; i++) {
		if (oTag[i].className==classn) {
			oResult.push(oTag[i]);
		};
	};
	return oResult;
};
/*getByClass function End*/

/*getStyle function : Get between the lines style*/
function getStyle(obj,name){
	if (obj.currentStyle) {
		return obj.currentStyle[name];//IE
	}
	else{
		return getComputedStyle(obj,false)[name];  //chorme  FF 
	};
};
/*End*/

function startMove(obj,json,fnEnd){ 
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var ifMove = true;
		for(var attr in json){
			var cur=0;
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
			}else{
				cur=parseInt(getStyle(obj, attr));
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
			}
		}	
	},30);	
};