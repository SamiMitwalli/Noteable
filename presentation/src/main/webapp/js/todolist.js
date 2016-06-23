/**
 * Created by Thomas on 18.06.2016.
 */

var mockDataForThisTest = "json=" + encodeURI(JSON.stringify([
        {
            id: 1,
            text: "Einkaufen gehen",
            status: "offen",
            user: "Testuser"},
        {
            id: 2,
            text: "Staubsaugen",
            status: "offen",
            user: "Testuser"},
    ]));


//var app = angular.module("app", ["xeditable", "ngMockE2E"]);

/*
var app = angular.module('myApp', []);

app.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});
*/

function NoteCtrl($scope) {

    $scope.notes = [
        {
            id: 1,
            text: "Einkaufen gehen",
            status: "offen",
            user: "Testuser"},
        {
            id: 2,
            text: "Staubsaugen",
            status: "offen",
            user: "Testuser"}
    ];

/*    $scope.loadNote = function() {
        var httpRequest = $http({
            method: 'POST',
            url: '/echo/json/',
            data: mockDataForThisTest

        }).success(function(data, status) {
            $scope.note = data;
        });

    };*/

}




/*
app.controller('Ctrl', function ($scope, $filter, $http) {


    $scope.notes = [
        {id: 1, text: 'awesome user1', status: 2, owner: 'admin'},
        {id: 2, text: 'awesome user2', status: 2, owner: 'vip'},
        {id: 3, text: 'awesome user3', status: 2, owner: null}
    ];

    $scope.statuses = [
        {value: 1, text: 'erledigt'},
        {value: 2, text: 'offen'}
    ];
});

$scope.groups = [];
$scope.loadGroups = function () {
    return $scope.groups.length ? null : $http.get('/groups').success(function (data) {
        $scope.groups = data;
    });
};

$scope.showGroup = function (user) {
    if (user.group && $scope.groups.length) {
        var selected = $filter('filter')($scope.groups, {id: user.group});
        return selected.length ? selected[0].text : 'Not set';
    } else {
        return user.groupName || 'Not set';
    }
};

$scope.showStatus = function (user) {
    var selected = [];
    if (user.status) {
        selected = $filter('filter')($scope.statuses, {value: user.status});
    }
    return selected.length ? selected[0].text : 'Not set';
};

$scope.checkName = function (data, id) {
    if (id === 2 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
    }
};

$scope.saveUser = function (data, id) {
    //$scope.user not updated yet
    angular.extend(data, {id: id});
    return $http.post('/saveUser', data);
};

// remove user
$scope.removeUser = function (index) {
    $scope.users.splice(index, 1);
};

// add user
$scope.addUser = function () {
    $scope.inserted = {
        id: $scope.users.length + 1,
        name: '',
        status: null,
        group: null
    };
    $scope.users.push($scope.inserted);
};
}
;
*/
/*

// --------------- mock $http requests ----------------------
app.run(function ($httpBackend) {
    $httpBackend.whenGET('/groups').respond([
        {id: 1, text: 'user'},
        {id: 2, text: 'customer'},
        {id: 3, text: 'vip'},
        {id: 4, text: 'admin'}
    ]);

    $httpBackend.whenPOST(/\/saveUser/).respond(function (method, url, data) {
        data = angular.fromJson(data);
        return [200, {status: 'ok'}];
    });
});*/
