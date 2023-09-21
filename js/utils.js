/*
  Author: anqisoft@gmail.com
  Date: 2023-09-09
*/

function getBodyElement() {
  return document.getElementsByTagName('body')[0];
}
function getNumbersArray(min, max) {
  const array = [];
  for (let i = min; i <= max; ++i) {
    array.push(i.toString());
  }

  return array;
}

function createElement(tagName, options) {
  return document.createElement(tagName, options);
}

new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec');
