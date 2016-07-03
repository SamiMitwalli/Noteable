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
    HTTPTestService.prototype.createNote = function (content) {
        var neu = { "content": content };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post('resources/access/user/createNote', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPTestService.prototype.readNotes = function () {
        return this._http.get("resources/access/user/readNotes").map(function (res) { return res.json(); });
    };
    HTTPTestService.prototype.updateNote = function (id, content) {
        var neu = { "id": id, "content": content };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('resources/access/user/updateNote', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPTestService.prototype.deleteNote = function (id) {
        var neu = { "id": id };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('resources/access/user/deleteNote', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    // METHODEN FÜR USER
    HTTPTestService.prototype.register = function (loginName, password) {
        var neu = { "loginName": loginName, "password": password };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post('resources/access/register', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPTestService.prototype.login = function (loginName, password, remember) {
        var neu = { "loginName": loginName, "password": password, "remember": remember };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post('resources/access/login', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPTestService.prototype.changePassword = function (id, password) {
        var neu = { "id": id, "password": password };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('resources/access/user/changePassword', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPTestService.prototype.logout = function () {
        return this._http.get("resources/access/user/logout").map(function (res) { return res.text(); });
    };
    HTTPTestService.prototype.deleteAccount = function (id) {
        var neu = { "id": id };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('resources/access/user/deleteAccount', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    // ADMIN AKTIONEN
    HTTPTestService.prototype.deleteNotes = function (id) {
        var neu = { "id": id };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('resources/access/admin/deleteNotes', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPTestService.prototype.deleteUsers = function () {
        return this._http.get("resources/access/admin/deleteUsers").map(function (res) { return res.text(); });
    };
    // TEST METHODEN
    HTTPTestService.prototype.getNotes = function (url) {
        return this._http.get(url).map(function (res) { return res.json(); });
    };
    HTTPTestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HTTPTestService);
    return HTTPTestService;
}());
exports.HTTPTestService = HTTPTestService;
//# sourceMappingURL=http.service.js.map