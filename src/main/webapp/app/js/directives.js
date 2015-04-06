'use strict';

var directives = angular.module('bookland.directives', [ 'ngResource', 'bookland.services', 'ui.bootstrap' ]);

directives.directive('blFileUpload', [ '$parse', function($parse) {
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

} ]);

directives.directive('blTagSelection', [ 'tagService', function(tagService) {
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
} ]);

directives.directive("blDatepicker", [ function() {
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
} ]);

directives.directive('blStars', [ function() {
  return {
    restrict : "E",
    templateUrl : 'templates/stars.html',
    require : 'ngModel',
    scope : true,
    link : function(scope, element, attrs, ngModelCtrl) {

      scope.items = new Array(+attrs.max);

      var emptyIcon = attrs.iconEmpty || 'fa-star-o';
      var fullIcon = attrs.iconFull || 'fa-star';
      var iconBase = attrs.iconBase || 'fa fa-fw';
      scope.listClass = attrs.listClass || 'angular-input-stars';
      scope.readonly = !(attrs.readonly === undefined);

      ngModelCtrl.$render = function() {
        scope.last_value = ngModelCtrl.$viewValue;
      };

      scope.getClass = function(index) {
        return index >= scope.last_value ? iconBase + ' ' + emptyIcon : iconBase + ' ' + fullIcon + ' active ';
      };

      scope.unpaintStars = function() {
        scope.paintStars(scope.last_value - 1);
      };

      scope.paintStars = function($index) {
        //ignore painting, if readonly
        if (scope.readonly) {
          return;
        }
        var items = element.find('li').find('i');

        for (var index = 0; index < items.length; index++) {

          var $star = angular.element(items[index]);

          if ($index >= index) {
            $star.addClass(fullIcon);
            $star.addClass('active');
            $star.removeClass(emptyIcon);
          } else {
            $star.removeClass(fullIcon);
            $star.removeClass('active');
            $star.addClass(emptyIcon);
          }
        }

      };

      scope.setValue = function(index, e) {
        //ignore painting
        if (scope.readonly) {
          return;
        }
        var star = e.target;

        if (e.pageX < star.getBoundingClientRect().left + star.offsetWidth / 2) {
          scope.last_value = index + 1;
        } else {
          scope.last_value = index + 1;
        }

        ngModelCtrl.$setViewValue(scope.last_value);

      };

    }
  };
} ]);
