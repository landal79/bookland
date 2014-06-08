'use strict';

booklandModule.directive('fileModel', [ '$parse', function($parse) {
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
} ]).directive('uploadBtn', [ function() {
	return {
		restrict : 'C',
		link : function(scope, elem, attrs) {
			var inputFile = elem.parent().find('input')[0];
			elem.bind('click', function() {
				inputFile.click();
			});

			var inputId = attrs.inputId;
			angular.element(inputFile).bind('change', function(){
				var inputText = angular.element(document.getElementById(inputId));
				inputText.val(angular.element(this).val());
			});

		}
	}
} ]);
