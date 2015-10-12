define([], function () {

    // @ngInject
    function AuthorModalController($scope, authorService, $modalInstance) {
        $scope.author = {};
        $scope.save = function (author_form) {
            if (!author_form.$valid) {
                console.log('invalid author data!');
                alert('invalid author data!');
                return;
            }

            $modalInstance.close(authorService.save($scope.author));
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    return AuthorModalController;

});