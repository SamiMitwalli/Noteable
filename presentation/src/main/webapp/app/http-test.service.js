"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var http_2 = require('@angular/http');
var HTTPTestService = (function () {
    function HTTPTestService(_http) {
        this._http = _http;
    }
    // METHODEN FÜR NOTES
    HTTPTestService.prototype.newNote = function (content) {
        var neu = [{ "Content": content }];
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('/resources/Notes/createNote', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPTestService.prototype.readNote = function (id) {
        var neu = id;
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post('/resources/Notes/readNote', neu, {
            headers: headers
        })
            .map(function (response) { return response.json(); });
    };
    HTTPTestService.prototype.updateNote = function (Id, content, owner) {
        var neu = [{ "Id": Id, "Content": content, "Owner": owner }];
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('/resources/Notes/updateNote', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPTestService.prototype.deleteNote = function (id) {
        var neu = id;
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('/resources/Notes/deleteNote', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPTestService.prototype.readAllNotes = function () {
        return this._http.get("/resources/Notes/readAll").map(function (res) { return res.json(); });
    };
    HTTPTestService.prototype.deleteAllNotes = function () {
        return this._http.get("/resources/Notes/deleteAll").map(function (res) { return res.text(); });
    };
    // METHODEN FÜR USERS
    HTTPTestService.prototype.newUser = function (username, password) {
        var neu = [{ "loginName": username, "password": password }];
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('/resources/access/register', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPTestService.prototype.readUser = function (id) {
        var neu = id;
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post('/resources/Users/readUser', neu, {
            headers: headers
        })
            .map(function (response) { return response.json(); });
    };
    HTTPTestService.prototype.updateUser = function (id, loginName, password) {
        var neu = [{ "id": id, "loginName": loginName, "password": password }];
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('/resources/access/updateUser', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPTestService.prototype.deleteUser = function (id) {
        var neu = id;
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('/resources/Users/deleteUser', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    // METHODEN FÜR DIE AUTHENTIFIKATION
    HTTPTestService.prototype.login = function (username, password, remember) {
        var neu = username + ',' + password + ',' + remember;
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('/resources/access/login', neu, {})
            .map(function (response) { return response.text(); });
    };
    // METHODEN ZUM TESTEN
    HTTPTestService.prototype.getNotes = function (url) {
        return this._http.get(url).map(function (res) { return res.json(); });
    };
    HTTPTestService.prototype.postJSON = function () {
        var json = JSON.stringify({ var1: 'Test', var2: 3 });
        var params = 'json=' + json;
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post('http://validate.jsontest.com', params, {
            headers: headers
        }).map(function (res) { return res.json(); });
    };
    HTTPTestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HTTPTestService);
    return HTTPTestService;
}());
exports.HTTPTestService = HTTPTestService;
//# sourceMappingURL=http-test.service.js.map