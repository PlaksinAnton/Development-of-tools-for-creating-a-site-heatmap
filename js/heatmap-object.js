window.onload = function () {
  var heatmapContainer = document.querySelector('.heatmap');

  var heatmapInstance = h337.create({
    container: heatmapContainer,
    radius: 50
  });

  heatmapContainer.onmousemove = heatmapContainer.ontouchmove = function (e) {
    // we need preventDefault for the touchmove
    e.preventDefault();
    var x = e.layerX;
    var y = e.layerY;
    if (e.touches) {
      x = e.touches[0].pageX;
      y = e.touches[0].pageY;
    }

    heatmapInstance.addData({ x: x, y: y, value: 1 });
  };
  heatmapContainer.onclick = function (ev) {
    heatmapInstance.addData({ x: ev.layerX, y: ev.layerY, value: 1 });
  };
};