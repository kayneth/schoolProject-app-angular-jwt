'use strict';

describe('Service: scBase64', function () {

  // load the service's module
  beforeEach(module('shareCreationsApp'));

  // instantiate service
  var scBase64;
  beforeEach(inject(function (_scBase64_) {
    scBase64 = _scBase64_;
  }));

  it('should do something', function () {
    expect(!!scBase64).toBe(true);
  });

});
