'use strict';

var directives = angular.module('bookland.directives', [ 'ngResource', 'bookland.services', 'ui.bootstrap' ]);

function blFileUpload($parse) {
  return {
    restrict : 'E',
    templateUrl : 'templates/fileUpload.html',
    scope : {
      onfileselected : '&'
    },
    link : function(scope, element, attrs) {
      var inputFile = angular.element(element.find('input[type=file]')[0]);
      var btnUpload = angular.element(element.find('button')[0]);
      var inputText = angular.element(element.find('input[type=text]')[0]);
      btnUpload.bind('click', function() {
        inputFile.click();
      });
      inputText.bind('click', function() {
        inputFile.click();
      });

      inputFile.bind('change', function(event) {
        inputText.val(inputFile.val());
        scope.onfileselected({
          'event' : event
        });
      });

    }
  };
}

directives.directive('blFileUpload', blFileUpload);

function blTagSelection(tagService) {
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
        } else if (typeof book.tags.find(function(elem) {
              return elem.id == tag.id;
            }) != 'undefined') {
          alert("tag already added!");
          return;
        }

        book.tags.push(tag);

        $scope.tag = '';
      };

      $scope.addNew = function() {

        var tag = $scope.newTag;

        if (tag == undefined || tag == '') {
          alert('tag must be not blank!');
          return;
        }

        tagService.save({
          'name' : tag
        }, function(tag) {
          $scope.add(tag);
          $scope.tags = tagService.query();
          $scope.newTag = '';
        });

      };

      $scope.remove = function(index) {
        book.tags.splice(index, 1);
      };

    },
    controllerAs : 'tagCtrl'
  };
}

directives.directive('blTagSelection', blTagSelection);

function blDatepicker() {
  return {
    restrict : "E",
    scope : {
      dateModel : "=",
      dateOptions : "=",
      opened : "=",
    },
    link : function(scope, element, attrs) {
      scope.open = function(event) {
        event.preventDefault();
        event.stopPropagation();
        scope.opened = true;
      };

      scope.clear = function() {
        scope.ngModel = null;
      };

      scope.opened = false;

      scope.dateOptions = {
        'year-format' : "'yy'",
        'show-weeks' : false
      };

    },
    templateUrl : 'templates/datepicker.html'
  };
}

directives.directive("blDatepicker", blDatepicker);
