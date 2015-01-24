/*global Parse,angular*/
"use strict";
angular.module('remark', ['ui.router'], function (Parse, $urlRouterProvider, $stateProvider) {
    Parse.initialize("ybjJj7M2jfPIVi6LJGUhjQtjm20IpzQM0nyv7NzK", "pL1iooSxOsrNVCxq7EPfJB8UtiMZvwT5mkOwePJE");
    $urlRouterProvider.otherwise('/notes');
    $stateProvider
        .state('notes', {
            url: '/notes',
            templateUrl: 'templates/home.html',
            controller: function () { }
        })
        .state('note-new', {
            url: '/note/new',
            templateUrl: 'templates/note-new.html',
            controller: function ($scope, Note, $q, $location) {
                $scope.save = function (note) {
                    var note = new Note({ title: note.title, content: note.content });
                    $q(function (res, rej) { note.save().then(res, rej) })
                    .then(function (note) {
                        $location.path('/note/' + node.id);
                    });
                };
            }
        })
        .state('/note/:id', {
            templateUrl: 'templates/note-read.html',
            resolve: {
                note: function (Note, $q) {
                    $q(function (res, rej) {

                    })
                }
            },
            controller: function () { }
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html'
        })
        .state('sign-in', {
            url: '/sign-in',
            templateUrl: 'templates/sign-in.html'
        })
        .state('sign-up', {
            url: '/sign-up',
            templateUrl: 'templates/sign-up.html',
            controller: function ($scope) {
                $scope.register = function () {
                };
            }
        });
})
.constant('Parse', Parse)
.factory('Note', function (Parse) {
    return Parse.Object.extend('Note', {}, {
        getById: function (id) {
            var self = this;
            return $q(function (res, rej) {
                (new Parse.Query(self)).get(id).then(res, rej);
            })
        }
    });
})
.factory('Notes', function (Parse, Note) {
    return Parse.Collection.extend({ model: Note });
})
.constant('VERSION', "0.1")
.run(function run() { });