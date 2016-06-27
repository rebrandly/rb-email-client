import RbEmailClient from '../src/index.js';
const should = require('should');
const assert = require('chai').assert;
const expect = require('chai').expect;

describe('RbEmailClient', () => {
  it('should return an exception when the apiUrl option is null', () => {
    (() => new RbEmailClient({ apiUrl: null })).should.throw();
  });
  it('should return an exception when the apiUrl option is undefined', () => {
    (() => new RbEmailClient({ apiUrl: undefined })).should.throw();
  });
  it('should return an exception when the apiUrl option is the empty string', () => {
    (() => new RbEmailClient({ apiUrl: '' })).should.throw();
  });
  it('should return exception send email without parameters', () => {
    const client = new RbEmailClient({ apiUrl: 'http://localhost:9000' });
    client.sendEmail()
      .then(assert.fail)
  });
  it('should reject if templateEmail is not defined', done => {
    const client = new RbEmailClient({ apiUrl: 'http://localhost:9000' });
    client.sendEmail(null, 'torebrandly@gmail.com', {
      redirectUrl: 'http://google.it',
    }).catch(errors => done());
  });
  it('should reject if "to" parameter is not defined', done => {
    const client = new RbEmailClient({ apiUrl: 'http://localhost:9000' });
    client.sendEmail('welcome').catch(errors => done());
  });
  it('should send email without errors', done => {
    const client = new RbEmailClient({ apiUrl: 'http://localhost:9000' });
    client.sendEmail('welcome', 'torebrandly@gmail.com', {
      redirectUrl: 'http://google.it',
    }).then(results => done())
      .catch(errors => done());
  });
  it('should send email receiveing errors', done => {
    const client = new RbEmailClient({ apiUrl: 'http://localhost:9000' });
    client.sendEmail('welcome', 'torebrandly@gmail.com').catch(results => done());
  });
});
