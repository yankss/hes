import { result } from "lodash";

let str = '我要去[一|二]的地方吃(三|四)可以吗'

function aaa(str) {
  let structure;
  if(str.indexOf('|') !== -1) {
    if(str.indexOf('[')&&str.indexOf(']')) {
      
    }
    let shu = str.slice(str.indexOf('['), str.indexOf(']') + 1)
    
    let leftValue = shu.slice(1, shu.indexOf('|'));
    let rightValue = shu.slice(shu.indexOf('|') + 1, shu.indexOf(']'))
    let nullValue = '';
    structure = [leftValue, rightValue, nullValue]
    let nextStr = str.slice(str.indexOf('|') + 3)
    aaa(nextStr)
  }else {
    return structure;
  }
  
}
aaa(str)



// function debounce(fn, delay) {
//   let timer = null;
//   return function()  {
//     let _this = this;
//     let arg = arguments;
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.apply(_this,arg);
//     }, delay);
//   }
// }

function debounce(fn, delay) {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();      
    }, delay);
  }
}