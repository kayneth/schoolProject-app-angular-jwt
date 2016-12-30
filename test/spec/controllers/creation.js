'use strict';

describe('Controller: CreationCtrl', function () {

  // load the controller's module
  beforeEach(module('shareCreationsApp'));

  var CreationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreationCtrl = $controller('CreationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreationCtrl.awesomeThings.length).toBe(3);
  });
});
