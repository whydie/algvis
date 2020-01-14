import { ARR_LENGTH } from "common/settings";

function shuffleArr(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomArr(from, to) {
  let arr = [];

  for (let i = from || 1; i <= ((to - from) || ARR_LENGTH); ++i) {
      arr.push(i);
  }
  shuffleArr(arr);
 
  return arr;
}

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

export { shuffleArr, randomArr, getTextWidth };
