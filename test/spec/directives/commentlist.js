'use strict';

describe('Directive: commentList', function () {

  // load the directive's module
  beforeEach(module('shareCreationsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<comment-list></comment-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the commentList directive');
  }));
});
