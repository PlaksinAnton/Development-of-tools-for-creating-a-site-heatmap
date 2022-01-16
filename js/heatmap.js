window.onload = function () {
  // create a heatmap instance
  var heatmap = h337.create({
    container: document.getElementById('heatmapContainer'),
    maxOpacity: .6,
    radius: 50,
    blur: .90,
  });
  var heatmapContainer = document.getElementById('heatmapContainerWrapper');

  heatmapContainer.onmousemove = heatmapContainer.ontouchmove = function (e) {
    // we need preventDefault for the touchmove
    e.preventDefault();
    var x = e.layerX;
    var y = e.layerY;
    if (e.touches) {
      x = e.touches[0].pageX;
      y = e.touches[0].pageY;
    }

    heatmap.addData({ x: x, y: y, value: 1 });

  };

  heatmapContainer.onclick = function (e) {
    var x = e.layerX;
    var y = e.layerY;
    heatmap.addData({ x: x, y: y, value: 1 });
    console.log(heatmap.getData());
  };

};