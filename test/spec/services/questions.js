'use strict';

describe('Service: questions', function () {

  // load the service's module
  beforeEach(module('surveyTreeModuleApp'));

  // instantiate service
  var questions;
  beforeEach(inject(function (_questions_) {
    questions = _questions_;
  }));

  it('should do something', function () {
    expect(!!questions).toBe(true);
  });

});
