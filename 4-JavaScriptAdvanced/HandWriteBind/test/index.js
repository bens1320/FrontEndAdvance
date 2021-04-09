const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const assert = chai.assert

const bind = require('../src/index')
Function.prototype.bind2 = bind

describe('bind', () => {
  it('1 bind 不为 undefined', () => {
    assert(Function.prototype.bind2 !== undefined)
  })

  it('2 接收 this', () => {
    const fn1 = function () {
      return this
    }
    const newFn1 = fn1.bind2({name: 'ben'})
    assert(newFn1().name === 'ben')
  })
  it('3 接收 this，同时两次传参', () => {
    const fn1 = function (p1, p2) {
      return [this, p1, p2]
    }
    const newFn1 = fn1.bind2({name: 'ben'}, 123)
    assert(newFn1(223)[0].name === 'ben')
    assert(newFn1(223)[1] === 123)
    assert(newFn1(223)[2] === 223)
  })
  it('4 接收 this，同时接收其他参数', () => {
    const fn1 = function (p1, p2) {
      return [this, p1, p2]
    }
    const newFn1 = fn1.bind2({name: 'ben'}, 123, 456)
    assert(newFn1()[0].name === 'ben')
    assert(newFn1()[1] === 123)
    assert(newFn1()[2] === 456)
  })
  it('5 new 的时候绑定了 p1, p2', () => {
    Function.prototype.bind2 = bind
    const fn = function (p1, p2) {
      this.p1 = p1
      this.p2 = p2
    }
    const fn2 = fn.bind2(undefined, 'x', 'y')
    const object = new fn2()
    assert(object.p1 === 'x')
    assert(object.p2 === 'y')
  })
  it('6 new 的时候绑定了 p1, p2, 并且 fn 有 prototype.sayHi', () => {
    const fn = function (p1, p2) {
      this.p1 = p1
      this.p2 = p2
    }
    fn.prototype.sayHi = function () {}
    const fn2 = fn.bind2(undefined, 'x', 'y')
    const object = new fn2()
    assert(object.p1 === 'x')
    assert(object.p2 === 'y')
    assert(object.__proto__ === fn.prototype)
    assert(typeof object.sayHi === 'function')
  })

  it('7 不用 new，用类似的对象', () => {
    const fn = function (p1, p2) {
      this.p1 = p1
      this.p2 = p2
    }
    fn.prototype.sayHi = function () {}
    const object1 = new fn('a', 'b')
    console.log(object1)
    const fn2 = fn.bind2(object1, 'x', 'y')
    const object = fn2()
    assert(object === undefined)
    assert(object1.p1 === 'x')
    assert(object1.p2 === 'y')
  })

})






