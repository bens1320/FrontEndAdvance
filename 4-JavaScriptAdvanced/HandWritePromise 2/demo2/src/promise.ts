class Promise2 {
  state = 'pending';
  callbacks = [];

  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('我只接受函数');
    }
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(result) {
    if (this.state !== 'pending') return;
    this.state = 'fulfilled';
    setTimeout(() => {
      this.callbacks.forEach(handle => {
        if (typeof handle[0] === 'function') {
          const x = handle[0].call(undefined, result);
          handle[2].resolveWith(x);
        }
      });
    }, 0);
  }

  reject(reason) {
    if (this.state !== 'pending') return;
    this.state = 'rejected';
    setTimeout(() => {
      this.callbacks.forEach(handle => {
        if (typeof handle[1] === 'function') {
          const x = handle[1].call(undefined, reason);
          handle[2].resolveWith(x);
        }
      });

    }, 0);
  }

  then(succeed?, fail?) {
    const handle = [];
    if (typeof succeed === 'function') {
      handle[0] = succeed;
    }
    if (typeof fail === 'function') {
      handle[1] = fail;
    }
    handle[2] = new Promise2(() => {});
    this.callbacks.push(handle);

    return handle[2];
  }

  resolveWith(x) {}
}

export default Promise2;