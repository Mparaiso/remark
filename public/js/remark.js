/*global Parse,angular*/
(function () {
    "use strict";
    angular.module('remark', ['ui.router'], function (Parse, $urlRouterProvider, $stateProvider) {
        Parse.initialize("ybjJj7M2jfPIVi6LJGUhjQtjm20IpzQM0nyv7NzK", "pL1iooSxOsrNVCxq7EPfJB8UtiMZvwT5mkOwePJE");
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html'
        })
        .state('note-new', {
            url: '/note/new',
            templateUrl: 'templates/note-new.html',
            controller: function ($scope, Note, $q, $location) {
                $scope.save = function (note) {
                    var note = new Note({ title: note.title, content: note.content });
                    $q(function (res, rej) { note.save().then(res, rej) })
                    .then(function (note) {
                        $location.path('/note/' + note.id);
                    });
                };
            }
        })
        .state('note-read', {
            url: '/note/:id',
            templateUrl: 'templates/note-read.html',
            resolve: {
                note: function (Note, $stateParams) {
                    return Note.getById($stateParams.id);
                }
            },
            controller: function ($scope, note) {
                $scope.note = note;
            }
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html',
            resolve: {
                notes: function (Note) {
                    return Note.query();
                }
            },
            controller: function ($scope, notes) { $scope.notes = notes; }
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
.factory('Note', function (Parse, $q) {
    return Parse.Object.extend('Note', {}, {
        query: function (limit, skip) {
            var self = this, limit = limit || 100, skip = skip || 0;
            return $q(function (res, rej) {
                (new Parse.Query(self)).limit(limit).skip(skip).find().then(res, rej);
            }).then(function (notes) {
                console.log(notes);
                return (new Parse.Collection(notes)).toJSON();
            })
        },
        getById: function (id) {
            var self = this;
            return $q(function (res, rej) {
                (new Parse.Query(self)).get(id).then(res, rej);
            }).then(function (note) {
                return note.toJSON();
            });
        }
    });
})
.factory('Notes', function (Parse, Note) {
    return Parse.Collection.extend({ model: Note });
})
.constant('VERSION', "0.1")
.run(function run() { });
} ());