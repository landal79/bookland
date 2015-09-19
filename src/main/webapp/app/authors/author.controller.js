'use strict';

var controllers = angular.module('bookland.controllers', [ 'bookland.services', 'bookland.filters', 'ngResource' ]);

function NewAuthorController($scope, $location, authorService) {
    $scope.author = {};
    $scope.save = function() {
        authorService.save($scope.author);
        $location.path("/");
    };
}

controllers.controller('NewAuthorController', NewAuthorController);


function AuthorBookDetailCtrl ($scope, authorService, $modal) {

    $scope.authors = authorService.query();

    $scope.addAuthor = function(author) {

        if (author == undefined) {
            alert('Choose an author!');
            return;
        }

        if (typeof $scope.book.authors == 'undefined') {
            $scope.book.authors = [];
        } else if (typeof $scope.book.authors.find(function(elem) {
                return elem.id == author.id;
            }) != 'undefined') {
            alert("author already added!");
            return;
        }

        $scope.book.authors.push(author);

        $scope.author = '';
    };

    $scope.removeAuthor = function(index) {
        $scope.book.authors.splice(index, 1);
    };

    $scope.open = function() {
        var modalInstance = $modal.open({
            templateUrl : 'app/authors/authorDialog.html',
            controller : AuthorModalCtrl,
            size : 'md'
        });
        modalInstance.result.then(function(author) {
            $scope.addAuthor(author);
            $scope.authors = authorService.query();
        }, function() {

        });
    };
}

controllers.controller('AuthorBookDetailCtrl', AuthorBookDetailCtrl);

function AuthorModalCtrl($scope, authorService, $modalInstance) {
    $scope.author = {};
    $scope.save = function(author_form) {
        if (!author_form.$valid) {
            console.log('invalid author data!');
            alert('invalid author data!');
            return;
        }

        $modalInstance.close(authorService.save($scope.author));
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
};

controllers.controller('AuthorModalCtrl', AuthorModalCtrl);