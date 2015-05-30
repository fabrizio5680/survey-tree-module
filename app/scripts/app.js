'use strict';

/**
 * @ngdoc overview
 * @name surveyTreeModuleApp
 * @description
 * # surveyTreeModuleApp
 *
 * Main module of the application.
 */
angular
  .module('surveyTreeModuleApp', [
    'ngAnimate',
    'ngTouch',
    'cfp.hotkeys',
    'eydis.gapi',
    'angucomplete'
  ])


  .config(function (hotkeysProvider, $gapiProvider) {
    hotkeysProvider.template = '<div class="my-own-cheatsheet"></div>';
    $gapiProvider.api_base = 'https://vivos-api-staging.appspot.com/_ah/api';
  })


  .run(function ($templateCache, $http, $q) {

    var templates = [
      { url: '/views/directives/dropdown.html', name: 'DROP_DOWN' },
      { url: '/views/directives/longtext.html', name: 'LONG_TEXT' },
      { url: '/views/directives/multiplechoice.html', name: 'MULTIPLE_CHOICE' },
      { url: '/views/directives/nonebutton.html', name: '' },
      { url: '/views/directives/number.html', name: 'NUMBER' },
      { url: '/views/directives/okbutton.html', name: '' },
      { url: '/views/directives/picturechoice.html', name: 'PICTURE_CHOICE' },
      { url: '/views/directives/shorttext.html', name: 'SHORT_TEXT' },
      { url: '/views/directives/slider.html', name: '' },
      { url: '/views/directives/statement.html', name: 'STATEMENT' },
      { url: '/views/directives/yesno.html', name: 'BOOLEAN' }
    ];

    var getAndCacheStoreTemplates = function (templates) {
      var http = function (url) {
        var d = $q.defer();
        $http.get(url).then(function (response) {
          d.resolve(response);
        }, function (error) {
          d.reject(error);
        });

        return d.promise;
      };


      angular.forEach(templates, function (template) {
        http(template.url).then(function (response) {
          $templateCache.put(template.name, response.data);
        }, function (error) {
          alert(error);
        });
      });
    };

    getAndCacheStoreTemplates(templates);



  });
