'use strict';

describe('Directive: radio', function () {

  // load the directive's module
  beforeEach(module('surveyTreeModuleApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<radio></radio>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the radio directive');
  }));
});
