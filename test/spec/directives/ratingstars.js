'use strict';

describe('Directive: ratingStars', function () {

  // load the directive's module
  beforeEach(module('shareCreationsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rating-stars></rating-stars>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ratingStars directive');
  }));
});
