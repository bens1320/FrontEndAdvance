// var slice = Array.prototype.slice
// function bind(asThis) {
//   // this 就是函数
//   var args = slice.call(arguments, 1)
//   var fn = this
//   if (typeof fn !== 'function') {
//     throw new Error('bind 必须调用在函数身上')
//   }
//   return function () {
//     var args2 = slice.call(arguments, 0)
//     return fn.apply(asThis, args.concat(args2))
//   }
// }

// es 6写法：既然不支持 bind，因此很多 es6 语法糖也就不能用，推荐使用上面这种兼容性好。
function _bind(asThis, ...args) {
  // this 就是函数
  const fn = this
  function ResFn(...args2) {
    return fn.call(
      this instanceof ResFn ? this : asThis,
      ...args,
      ...args2
    )
  }
  ResFn.prototype = fn.prototype
  return  ResFn
}

module.exports = _bind

if (!Function.prototype.bind) {
  Function.prototype.bind = _bind()
}



