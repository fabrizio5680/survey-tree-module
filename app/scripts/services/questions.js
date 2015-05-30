'use strict';

/**
 * @ngdoc service
 * @name surveyTreeModuleApp.question
 * @description
 * # question
 * Service in the surveyTreeModuleApp.
 */
angular.module('surveyTreeModuleApp')
  .service('questions', function (apiClient, $q) {
    var questionnaire = {};
    var service = this;
    var answers = {};

    // CONSTANTS OPERATOR
    service.MAP = 'MAP';
    service.OR = 'OR';
    service.AND = 'AND';
    // CONSTANTS QUESTION TYPES
    service.QUESTION_GROUP = 'QUESTION_GROUP';
    service.DROP_DOWN = 'DROP_DOWN';
    service.EMAIL = 'EMAIL';
    service.LEGAL = 'LEGAL';
    service.NUMBER = 'NUMBER';
    service.STATEMENT = 'STATEMENT';
    service.MULTIPLE_CHOICE = 'MULTIPLE_CHOICE';
    service.PICTURE_CHOICE = 'PICTURE_CHOICE';
    service.SHORT_TEXT = 'SHORT_TEXT';
    service.FILE_UPLOAD = 'FILE_UPLOAD';
    service.LONG_TEXT = 'LONG_TEXT';
    service.WEBSITE = 'WEBSITE';
    service.BOOLEAN = 'BOOLEAN';
    service.RATING = 'RATING';
    service.OPINION_SCALE = 'OPINION_SCALE';
    service.PAYMENT = 'PAYMENT';


    var activeQuestionId = 0;

    /**
     * Setup
     */
    service.setupQuestionnaireById = function (id) {
      var d = $q.defer();

      service.getQuestionnaire(id).then(function (list) {
        angular.forEach(list, function (question) {
          if (question.id) {
            question.id = parseInt(question.id, 10);
            questionnaire[question.id] = question;
            questionnaire[question.id].user = {};
          }
        });

        d.resolve();
      }, function (error) {
        console.log(error);
        d.reject();
      });

      return d.promise;
    };

    /**
     * Gets questionnaire from API or ...
     * @param id
     * @returns {$gapi.$get.promise|$get.promise|promise|qFactory.Deferred.promise|fd.g.promise}
     */
    service.getQuestionnaire = function (id) {
      var d = $q.defer();
      apiClient.getList({ id: id }).then(function (response) {
        d.resolve(response);
      }, function (response) {
        d.reject(response);
        console.log('error', response);
      });

      return d.promise;
    };

    /**
     * Get Current Question by ID
     * @returns {number}
     */
    service.getCurrentQuestionId = function () {
      return activeQuestionId || 1;
    };

    /**
     * Set Current Question by ID
     * @param id
     * @returns {number}
     */
    service.setCurrentQuestionId = function (id) {
      activeQuestionId = id;
      return activeQuestionId;
    };

    /**
     * Get Question By ID
     * @param id
     * @returns {*}
     */
    service.getQuestionById = function (id) {
      id = id || service.getCurrentQuestionId();
      return questionnaire[id];
    };

    /**
     * Answer question
     * @param id - question ID
     * @param alt - answer alt
     */
    service.answerQuestion = function (id, alt) {
      questionnaire[id].user = questionnaire[id].user || {};
      questionnaire[id].user.answer = alt;
      answers[id] = alt;
    };
  });
