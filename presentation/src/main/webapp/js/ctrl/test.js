/**
 * Created by Thomas on 19.06.2016.
 */

var app = angular.module('myApp', ["ngRoute"], ["xeditable"]);


app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "index.html"
        })
        .when("/register", {
            templateUrl : "templates/register.html"
        })

        .otherwise({
            redirectTo: 'text.html'
    });
});

app.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});

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