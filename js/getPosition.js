function getPosition(e) {
  var x = y = 0;
  var value = 0;

  if (!e) {
    var e = window.event;
  }

  if (e.pageX || e.pageY) {
    x = e.pageX;
    y = e.pageY;
  } else if (e.clientX || e.clientY) {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return { x: x, y: y, value: value + 1 }
}
var heatmapContainer = document.getElementById('heatmapContainerWrapper');
var coords = [];

heatmapContainer.addEventListener('mousemove', e => {
  var coord = getPosition(e);
  // if (coord.value > 1) // todo
  coords.push(coord);
});

heatmapContainer.addEventListener('click', e => {
  console.log(coords);
});