'use strict';

/**
 * @ngdoc directive
 * @name surveyTreeModuleApp.directive:radio
 * @description
 * # radio
 */
angular.module('surveyTreeModuleApp')
  .directive('radio', function (keyboard) {
    return {
      //templateUrl: '/views/directives/radio.html',
      restrict: 'A',
      link: {
        pre: function (scope, element, attrs) {
          scope.animate = null;
          keyboard.bindKeysToCollection();

        },
        post: function (scope, element, attrs) {



          scope.onUserClick = function (e, item) {
            var selection;
            selection = item;
            selection.action = e.type;

            if (scope.vMultiChoice) {
              if (scope.isActive(item) === -1) {
                scope.vModel = scope.vModel || [];
                scope.vModel.push(selection);
              } else {
                scope.vModel.splice(scope.isActive(item), 1);
              }
            } else {
              scope.vModel = [];
              scope.vModel.push(selection);
            }
          };

          scope.onUserEnter = function (e, model) {
            if (model && model.length > 0) {
              scope.animate = true;
              $timeout(function () {
                scope.controllerAction(e, model);
              });
            }
          };

          scope.onUserNone = function () {
            $timeout(function () {
              scope.controllerAction();
            });
          };

          scope.isActive = function (item) {
            var i, modelItem;
            if (!scope.vModel) {
              return - 1;
            }

            for(i = 0; i < scope.vModel.length; i += 1) {
              modelItem = scope.vModel[i];
              if (modelItem.$$hashKey === item.$$hashKey) {
                return i
              }
            }
            return - 1;
          };
        }
      }
    };
  });
