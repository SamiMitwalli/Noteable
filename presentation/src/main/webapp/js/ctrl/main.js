/**
 * Created by Thomas on 19.06.2016.
 */

//var app = angular.module('myApp', ["ngRoute"], ["xeditable"]);
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
        .when("/todo", {
            templateUrl : "templates/todo.html"
        })
        .when("/register", {
            templateUrl : "templates/register.html"
        })
        .when("/test", {
            template : "<h1>Banana</h1><p>Bananas contain around 75% water.</p>"
        })
        .otherwise({
            templateUrl : "templates/login.html"
        });
});

/*app.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});*/


app.controller('NoteCtrl', function($scope) {

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
