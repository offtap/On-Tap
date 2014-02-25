var t = document.getElementById("tapMe");
Hammer(t).on("tap", function(event) {
            event.gesture.preventDefault();
			if(t.className == "orange") t.className = "blue";
			else t.className = "orange"
});

var dt = document.getElementById("doubleTapMe");
Hammer(dt).on("doubletap", function(event) {
            event.gesture.preventDefault();
			if(dt.className == "orange") dt.className = "blue";
			else dt.className = "orange"
});

var h = document.getElementById("holdMe");
Hammer(h).on("hold", function(event) {
            event.gesture.preventDefault();
			if(h.className == "orange") h.className = "blue";
			else h.className = "orange"
});

var d = document.getElementById("dragMe");
Hammer(d).on("dragend dragup dragdown dragleft dragright", function(event) {
            event.gesture.preventDefault();
			d.innerHTML=event.type;
			if(event.type == "dragend") d.innerHTML="drag";
			if(d.innerHTML!= "drag") d.className = "blue";
			else d.className = "orange"
});

var s = document.getElementById("swipeMe");
Hammer(s).on("swipeup swipedown swipeleft swiperight", function(event) {
            event.gesture.preventDefault();
			s.innerHTML=event.type;
			if(event.type == "swipeup" || event.type == "swipedown" || event.type == "swipeleft" || event.type == "swiperight") s.className = "blue";
});

var p = document.getElementById("pinchMe");
Hammer(p).on("release pinchin pinchout", function(event) {
            event.gesture.preventDefault();
			p.innerHTML=event.type;
			
			if(event.type == "release"){
				 p.innerHTML="pinch";
				 p.style.fontSize= "1em";
			}
			else if(event.type =="pinchin") {
				p.style.fontSize = "0.5em";
			}
			else if(event.type =="pinchout") {
				p.style.fontSize = "2em";
			}
			if(p.innerHTML!= "pinch") p.className = "blue";
			else p.className = "orange"
});

var r = document.getElementById("rotateMe");
var sR = r.style.webkitTransform;
Hammer(r).on("release rotate", function(event) {
            event.gesture.preventDefault();
			r.style.webkitTransform = "rotate(" + event.gesture.angle +"deg)";
			if(event.type == "release") r.style.webkitTransform = sR;
});