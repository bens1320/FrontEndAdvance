const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const assert = chai.assert

const bind = require('../src/index')
Function.prototype.bind2 = bind

describe('bind', () => {
  it('bind 不为 undefined', () => {
    assert(Function.prototype.bind2 !== undefined)
  })

  it('接收 this', () => {
    const fn1 = function () {
      return this
    }
    const newFn1 = fn1.bind2({name: 'ben'})
    assert(newFn1().name === 'ben')
  })
  it('接收 this，同时接收其他参数', () => {
    const fn1 = function (p1, p2) {
      return [this, p1, p2]
    }
    const newFn1 = fn1.bind2({name: 'ben'}, 123, 456)
    assert(newFn1()[0].name === 'ben')
    assert(newFn1()[1] === 123)
    assert(newFn1()[2] === 456)
  })
  it('接收 this，同时两次传参', ()=>{
    const fn1 = function (p1, p2) {
      return [this, p1, p2]
    }
    const newFn1 = fn1.bind2({name: 'ben'}, 123)
    assert(newFn1(223)[0].name === 'ben')
    assert(newFn1(223)[1] === 123)
    assert(newFn1(223)[2] === 223)
  })
})



