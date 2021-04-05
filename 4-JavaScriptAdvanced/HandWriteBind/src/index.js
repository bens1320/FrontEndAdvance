var slice = Array.prototype.slice
function bind(asThis) {
  // this 就是函数
  var args = slice.call(arguments, 1)
  var fn = this
  if (typeof fn !== 'function') {
    throw new Error('bind 必须调用在函数身上')
  }
  return function () {
    var arg2 = slice.call(arguments, 0)
    return fn.apply(asThis, args.concat(arg2))
  }
}
// es 6写法：既然不支持bind，因此很多 es6 语法糖也就不能用，推荐使用上面这种兼容性好。
// function bind(asThis, ...args) {
//   // this 就是函数
//   const fn = this
//   return function (...arg2) {
//     return fn.call(asThis, ...args, ...arg2)
//   }
// }

module.exports = bind

if (!Function.prototype.bind()) {
  Function.prototype.bind = bind()
}