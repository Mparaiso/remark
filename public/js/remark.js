/*global Parse,angular*/
"use strict";
angular.module('remark',['ui.router'],function(Parse,$urlRouterProvider,$stateProvider){
    Parse.initialize("ybjJj7M2jfPIVi6LJGUhjQtjm20IpzQM0nyv7NzK", "pL1iooSxOsrNVCxq7EPfJB8UtiMZvwT5mkOwePJE");
    $urlRouterProvider.otherwise('/notes');
    $stateProvider
        .state('notes',{
            url:'/notes',
            templateUrl:'templates/home.html',
        })
        .state('note-new',{
            url:'/note-new',
            templateUrl:'templates/note-new.html'
        })
        .state('dashboard',{
            url:'/dashboard',
            templateUrl:'templates/dashboard.html'
        })
        .state('sign-in',{
            url:'/sign-in',
            templateUrl:'templates/sign-in.html'
        })
        .state('sign-up',{
            url:'/sign-up',
            templateUrl:'templates/sign-up.html',
            controller:function ($scope) {
                $scope.register=function(){
                };
            }
        });
})
.constant('Parse',Parse)
.constant('VERSION',"0.1")
.run(function run(){});
