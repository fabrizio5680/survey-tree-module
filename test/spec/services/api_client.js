'use strict';

describe('Service: apiClient', function () {

  // load the service's module
  beforeEach(module('surveyTreeModuleApp'));

  // instantiate service
  var apiClient;
  beforeEach(inject(function (_apiClient_) {
    apiClient = _apiClient_;
  }));

  it('should do something', function () {
    expect(!!apiClient).toBe(true);
  });

});
