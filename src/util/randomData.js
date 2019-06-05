const smooth = (values, alpha) => {
  var weighted = average(values) * alpha;
  var smoothed = [];
  for (var i in values) {
    var curr = values[i];
    var prev = smoothed[i - 1] || values[values.length - 1];
    var next = curr || values[0];
    var improved = Number(average([weighted, prev, curr, next]).toFixed(2));
    smoothed.push(improved);
  }
  return smoothed;
};

const average = data => {
  var sum = data.reduce(function(sum, value) {
    return sum + value;
  }, 0);
  var avg = sum / data.length;
  return avg;
};

export const generateData = (dataPoints = 100) => {
  const data = [];
  for (let i = 0; i < dataPoints; i++) {
    data.push(Math.random() * 100);
  }
  return smooth(data, 0.1).map((point, index) => ({ x: index, y: point }));
};
