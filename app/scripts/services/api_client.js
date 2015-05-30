'use strict';

/**
 * @ngdoc service
 * @name surveyTreeModuleApp.apiClient
 * @description
 * # apiClient
 * Service in the surveyTreeModuleApp.
 */
angular.module('surveyTreeModuleApp')
  .service('apiClient', function (api) {
    /**
     * Create Candidate Method
     * @param data
     * @returns {*}
     */
    this.getList = function (payload) {
      return api.execute(api.API_CLIENT, ['questions', 'list'], payload);
    };
  });
