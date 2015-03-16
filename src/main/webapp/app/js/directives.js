'use strict';

var directives = angular.module('bookland.directives', [ 'ngResource',
    'bookland.services' ]);

directives.directive('fileModel', [ '$parse', function($parse) {
  return {
    restrict : 'A',
    link : function(scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var modelSetter = model.assign;

      element.bind('change', function() {
        scope.$apply(function() {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }

  };
} ]);

directives.directive('uploadBtn', [ function() {
  return {
    restrict : 'C',
    link : function(scope, elem, attrs) {
      var inputFile = elem.parent().find('input')[0];
      elem.bind('click', function() {
        inputFile.click();
      });

      var inputId = attrs.inputId;
      angular.element(inputFile).bind(
          'change',
          function() {
            var inputText = angular.element(document
                .getElementById(inputId));
            inputText.val(angular.element(this).val());
          });

    }
  };
} ]);

directives.directive('tagSelection', [ 'tagService', function(tagService) {
  return {
    restrict : 'E',
    templateUrl : 'templates/tags/tagSelection.html',
    scope : {
      book : '='
    },
    controller : function($scope) {

      var book = $scope.book;

      $scope.tags = tagService.query();

      $scope.add = function(tag) {

        if (tag == undefined || tag == '') {
          alert('Choose a tag!');
          return;
        }

        if (typeof book.tags == 'undefined') {
          book.tags = [];
        }

        if (book.tags.indexOf(tag) != -1) {
          alert("tag already added!");
          return;
        }

        book.tags.push(tag);
      };

      $scope.addNew = function() {

        var tag = $scope.newTag;

        if (tag == undefined || tag == '') {
          alert('tag must be not blank!');
          return;
        }

        tagService.save({
          'name' : tag
        }).$promise.then(function() {
          $scope.tags = tagService.query();
          $scope.add({name: tag});
          $scope.newTag = '';
        });

      };

      $scope.remove = function(index) {
        book.tags.splice(index, 1);
      };

    },
    controllerAs : 'tagCtrl'
  };
} ]);
