/* globals describe, it */
import { assert } from 'chai'
import PromiseMe from '../lib/'

describe('When I create a new Promise', () => {
  it('I should receive a promise object', () => {
    const promise = new PromiseMe()
    assert.typeOf(promise.then, 'function')
  })
  it('I should receive a promise object with a catch method', () => {
    const promise = new PromiseMe()
    assert.typeOf(promise.catch, 'function')
  })
  it('should resolve succeful promise', (done) => {
    const promise = new PromiseMe(() => {
      done()
    });
  })
  it('should resolve when then is called', (done) => {
    const promise = new PromiseMe((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    promise.then(() => {
      done();
    })
  })
  it('should resolve with data when then is called', (done) => {
    const promise = new PromiseMe((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
    promise.then((result) => {
      assert.equal(true, result);
      done();
    })
  })
  it('should reject when an error is thrown', (done) => {
    const promise = new PromiseMe((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('oops'));
      }, 500);
    });
    promise.then((result) => {
      assert.equal(true, false);
      done('This should never ever be hit');
    })
    .catch((err) => {
      assert.ok(err);
      done();
    })
  })
  it('should resolve when then is called with no timeout', (done) => {
    const promise = new PromiseMe((resolve) => {
      resolve();
    });
    promise.then(() => {
      done();
    })
  })
  it('should resolve when then is called with no timeout and pass correct value', (done) => {
    const promise = new PromiseMe((resolve) => {
      resolve(true);
    });
    promise.then((result) => {
      assert.equal(true, result);
      done();
    })
  })
  it('should resolve when then is called with no timeout and pass correct value', (done) => {
    const promise = new PromiseMe((resolve) => {
      resolve(true);
    });
    promise.then((result) => {
      assert.equal(true, result);
      return 'foo';
    })
    .then((newResult) => {
      assert.equal('foo', newResult);
      done();
    })
  })
})
