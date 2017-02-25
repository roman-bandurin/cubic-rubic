"use strict";
var cube = document.querySelector('.cube');
var container = document.querySelector('.container');
var width = document.documentElement.clientWidth / window.devicePixelRatio | 0;
var height = document.documentElement.clientHeight / window.devicePixelRatio | 0;
var cubearray = [];

var phi = 0, theta = 0, zeta = 0, touchX = 0, touchY = 0;
function cubeRotate(dphi, dtheta, dzeta){
	dphi = dphi | 0;
	dtheta = dtheta | 0;
	dzeta = dzeta | 0;
	var min = window.Math.min;
	var scale = +((+min(width, height) * (width < 650 ? +0.075 : +0.025))|0) / +10;//0.035
	phi += dphi;
	theta += dtheta;
	zeta += dzeta;
	cube.style.transform = 'perspective(900px) scale('+scale+', '+scale+') rotate3d(1,1,0,-45deg) rotate3d(1,0,0,'+theta+'deg) rotate3d(0,1,0,'+phi+'deg) rotate3d(0,0,1,'+zeta+'deg)';
}

var i = container.childNodes.length | 0, obj = null;
while(i--){
	obj = container.childNodes[i];
	if(obj.nodeType === 3)
		container.removeChild(obj);
}

i = cube.childNodes.length | 0; obj = null;
while(i--){
	obj = cube.childNodes[i];
	if(obj.nodeType === 3)
		cube.removeChild(obj);
	else if(obj.nodeType === 1)
		if(!!obj.dataset.num){
			cubearray[obj.dataset.num|0] = obj;
			//obj.innerHTML = obj.dataset.num;
			obj.onclick = span_click;
		} else if(!!obj.dataset.side) {
			cubearray[obj.dataset.side|0 + 48] = obj;
		}
}

container.onmousemove = function(){
	if(!event) var event = arguments[0];
	if(event.which === 1) cubeRotate(event.movementX, -event.movementY, 0);
}

container.ontouchstart = function(){
	if(event === undefined) var event = arguments[0];
	touchX = event.touches[0].pageX | 0;
	touchY = event.touches[0].pageY | 0;
};

container.ontouchmove = function(){
	if(event === undefined) var event = arguments[0];
	var dtx = (event.touches[0].pageX - touchX) | 0,
		dty = (event.touches[0].pageY - touchY) | 0;
	touchX = event.touches[0].pageX | 0;
	touchY = event.touches[0].pageY | 0;
	cubeRotate(dtx, -dty, 0);
};

container.ontouchend = function(){ touchX = 0; touchY = 0; };

document.onkeyup = function(){
	if(event.keyIdentifier == 'Up') cubeRotate(0, 30, 0);
	if(event.keyIdentifier == 'Right') cubeRotate(30, 0, 0);
	if(event.keyIdentifier == 'Down') cubeRotate(0, -30, 0);
	if(event.keyIdentifier == 'Left') cubeRotate(-30, 0, 0);
	if(event.keyCode == 107) cubeRotate(0, 0, -30);
	if(event.keyCode == 109) cubeRotate(0, 0, 30);
}
