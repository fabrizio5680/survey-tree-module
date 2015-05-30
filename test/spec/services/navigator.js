'use strict';

describe('Service: navigator', function () {

  // load the service's module
  beforeEach(module('surveyTreeModuleApp'));

  // instantiate service
  var navigator;
  beforeEach(inject(function (_navigator_) {
    navigator = _navigator_;
  }));

  it('should do something', function () {
    expect(!!navigator).toBe(true);
  });

});
