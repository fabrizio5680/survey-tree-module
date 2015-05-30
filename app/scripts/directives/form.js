'use strict';

/**
 * @ngdoc directive
 * @name surveyTreeModuleApp.directive:radio
 * @description
 * # radio
 */
angular.module('surveyTreeModuleApp')
  .directive('vivosQuestionForm', function ($rootScope, keyboard, $compile) {
    return {
      restrict: 'A',
      scope: {
        questionnaireId: '=vivosQuestionForm'
      },
      controller: function ($scope, $element, $templateCache, questions) {
        var ctrl = this;
        var question = null;
        var keyIndex = {};
        var isMultipleChoice = null;

        /**
         * Initiate Controller
         */
        this.init = function () {
          questions.setupQuestionnaireById($scope.questionnaireId).then(function () {
            question = questions.getQuestionById(1);
            ctrl.initQuestion(question);
          });
        };

        /**
         * Initiate Question
         * @param question
         */
        this.initQuestion = function (question) {
          ctrl.setupQuestion(question);
          ctrl.draw();
        };

        /**
         * Setup Question
         * @param question
         */
        this.setupQuestion = function (question) {
          keyIndex = {};
          $scope.selected = null;
          $scope.title = question.title;
          $scope.required = question.type.attributes.REQUIRED;
          $scope.answers = question.type.attributes.ANSWERS || [];
          isMultipleChoice = false;

          angular.forEach($scope.answers, function (answer, index) {
            keyIndex[keyboard.alphabet[index]] = answer;
            answer.key = keyboard.alphabet[index];
          });
        };

        /**
         * Draw Form Section
         */
        this.draw = function () {
          //var html = $templateCache.get(questions[question.type.type]);
          var html = $templateCache.get(questions[questions.PICTURE_CHOICE]);

          $element.empty();
          $element.append(
            $compile(
              angular.element(html)
            )($scope)
          );
        };

        /**
         * On User Key Press
         * @param event
         * @param key
         */
        this.onUserKeyPress = function (event, key) {
          var answers = [];
          //console.log(event.name);
          if (isMultipleChoice) {
            answers.push(keyIndex[key]);
          } else {
            answers[0] = keyIndex[key];
            ctrl.submit(answers);
          }
        };

        /**
         * Submit Form
         */
        this.submit = function (answers) {
          var submission = [];
          angular.forEach(answers, function (answer) {
            submission.push(answer.answers[0].alt);
          });

          if (submission && submission.length > 0) {
            questions.answerQuestion(question.id, submission);
            question = questions.getQuestionById(question.id + 1);
            ctrl.initQuestion(question);
          }
        };

        // Initiate Controller
        this.init();
      },
      link: {
        pre: function (scope, el, attrs, ctrl) {


        },
        post: function (scope, el, attrs, ctrl) {
          scope.$on(keyboard.ENTER, ctrl.onUserKeyPress);
          scope.$on(keyboard.KEY, ctrl.onUserKeyPress);

          scope.onUserKeyPress = ctrl.onUserKeyPress;
        }
      }
    };
  });
