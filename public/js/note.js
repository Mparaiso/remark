/*global Parse,angular*/
angular.module('note','ui.router',function(Parse){
    Parse.initialize("ybjJj7M2jfPIVi6LJGUhjQtjm20IpzQM0nyv7NzK", "pL1iooSxOsrNVCxq7EPfJB8UtiMZvwT5mkOwePJE");
})
.constant('Parse',Parse)
.constant('VERSION',"0.1");
