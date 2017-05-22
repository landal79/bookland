define([], function () {

    // @ngInject
    function AuthorModalController($scope, $rootScope, authorService, $uibModalInstance) {
        $scope.author = {};
        $scope.save = function (author_form) {
            if (!author_form.$valid) {
                console.log('invalid author data!');
                alert('invalid author data!');
                return;
            }

            var author = authorService.save($scope.author);

            $rootScope.$broadcast("author:added", author);

            $uibModalInstance.close(author);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
    return AuthorModalController;

});