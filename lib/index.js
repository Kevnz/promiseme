
export default class PromiseMe {
  constructor(fn) {
    this.resolved = false;
    if (fn){
      fn(this.resolve.bind(this), this.reject.bind(this))
    }
  }
  resolve(result) {
    this.resolved = true;
    this.result = result;
    if(this.fn) {
      this.fn(result);
    }
  }
  reject(err) {
    this.catchFn(err);
  }
  then (fn) {
    if(this.resolved) {
      fn(this.result);
    }
    this.fn = fn;
    return new PromiseMe((resolve) => {

    });
  }
  catch (fn) {
    this.catchFn = fn;
    return this;
  }
}
