(function() {

  var canvas = $("#webcam-canvas");
  var ctx = canvas[0].getContext('2d');
  var interval = null;
  var image = new Image();

  image.onload = function () {
    ctx.drawImage(image, 0, 0)
  }

  image.onerror = function() {
    clearInterval(interval);
    interval = null;
  }

  var load = function () {
    image.src = "http://siren.upl.cs.wisc.edu:1312/webcam-frame.jpg?" + Math.random();
  }

  load();
  canvas.click(function () {
    if(interval) return;
    $("#click-to-stream").hide()
    interval = setInterval(load, 40);
  });
  
})()
   
