// create configuration object
var config = {
  container: document.getElementById('heatmapContainer'),
  radius: 10,
  maxOpacity: .5,
  minOpacity: 0,
  blur: .75
};
// create heatmap with configuration
var heatmapInstance = h337.create(config);

// // a single datapoint
// var dataPoint = {
//   x: 5, // x coordinate of the datapoint, a number
//   y: 5, // y coordinate of the datapoint, a number
//   value: 100 // the value at datapoint(x, y)
// };
// heatmapInstance.addData(dataPoint);

// // multiple datapoints (for data initialization use setData!!)
// var dataPoints = [dataPoint, dataPoint, dataPoint, dataPoint];
// heatmapInstance.addData(dataPoints);