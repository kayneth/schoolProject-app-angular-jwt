'use strict';

describe('Service: scAuthManager', function () {

  // load the service's module
  beforeEach(module('shareCreationsApp'));

  // instantiate service
  var scAuthManager;
  beforeEach(inject(function (_scAuthManager_) {
    scAuthManager = _scAuthManager_;
  }));

  it('should do something', function () {
    expect(!!scAuthManager).toBe(true);
  });

});
