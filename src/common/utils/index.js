const util = module.exports = {}

util.swapArray = (arr, index1, index2) => {
  if(index2 < 0 || index2 >= arr.length) return

  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

util.moveUp = (arr, index) => {
  util.swapArray(arr, index, index - 1)
}

util.moveDown = (arr, index) => {
  util.swapArray(arr, index, index + 1)
}

util.cartesianProductOf = function() {
  return Array.prototype.reduce.call(arguments, function (a, b) {
    var ret = [];
    a.forEach(a => {
      b.forEach(b => {
        ret.push(a.concat([b]))
      });
    });
    return ret
  }, [[]])
}