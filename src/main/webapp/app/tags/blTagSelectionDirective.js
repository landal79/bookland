define([], function(){

    // @ngInject
   function blTagSelection(tagService) {
        return {
            restrict: 'E',
            templateUrl: 'app/tags/tagSelection.html',
            scope: {
                book: '='
            },
            controller: function ($scope) {

                var book = $scope.book;

                $scope.tags = tagService.query();

                $scope.add = function (tag) {

                    if (tag == undefined || tag == '') {
                        alert('Choose a tag!');
                        return;
                    }

                    if (typeof book.tags == 'undefined') {
                        book.tags = [];
                    } else if (typeof book.tags.find(function (elem) {
                            return elem.id == tag.id;
                        }) != 'undefined') {
                        alert("tag already added!");
                        return;
                    }

                    book.tags.push(tag);

                    $scope.tag = '';
                };

                $scope.addNew = function () {

                    var tag = $scope.newTag;

                    if (tag == undefined || tag == '') {
                        alert('tag must be not blank!');
                        return;
                    }

                    tagService.save({
                        'name': tag
                    }, function (tag) {
                        $scope.add(tag);
                        $scope.tags = tagService.query();
                        $scope.newTag = '';
                    });

                };

                $scope.remove = function (index) {
                    book.tags.splice(index, 1);
                };

            },
            controllerAs: 'tagCtrl'
        };
    }

    return blTagSelection;

});