'use strict';

/**
 * @ngdoc function
 * @name surveyTreeModuleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the surveyTreeModuleApp
 */
angular.module('surveyTreeModuleApp')
  .controller('MainCtrl', function ($scope) {


    /**
     * Setup of Controller
     */
    $scope.setup = function () {
      $scope.questionnaireId = 1;
    };

    $scope.setup();

  });
