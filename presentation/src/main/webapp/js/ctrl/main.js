/**
 * Created by Thomas on 19.06.2016.
 */

//var app = angular.module('myApp', ["ngRoute"], ["xeditable"]);
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/todo", {
            templateUrl : "templates/todo.html",
            controller : "NoteCtrl"
        })
        .when("/register", {
            templateUrl : "templates/register.html",
            controller : "registerCtrl"
        })
        .when("/test", {
            template : "<h1>Banana</h1><p>Bananas contain around 75% water.</p>"
        })
        .otherwise({
            templateUrl : "templates/login.html",
            controller : "loginCtrl"
        });
});

/*app.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});*/


app.controller('NoteCtrl', function($scope,$http) {

    $http.get("resources/NoteResource/resttest")
        .success(function (data) {
            $scope.restful = data;
        });

    $scope.notes = [
        {
            id:1,
            text: "Einkaufen gehen",
            status: "offen",
            user: "Testuser"},
        {
            id:2,
            text: "Staubsaugen",
            status: "offen",
            user: "Testuser"}
    ];

});

app.controller('registerCtrl', function($scope) {

});

app.controller('loginCtrl', function($scope) {

});