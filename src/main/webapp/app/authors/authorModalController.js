define([], function () {

    // @ngInject
    function AuthorModalController($scope, $rootScope, authorService, $modalInstance) {
        $scope.author = {};
        $scope.save = function (author_form) {
            if (!author_form.$valid) {
                console.log('invalid author data!');
                alert('invalid author data!');
                return;
            }

            var author = authorService.save($scope.author);

            $rootScope.$broadcast("author:added", author);

            $modalInstance.close(author);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    return AuthorModalController;

});