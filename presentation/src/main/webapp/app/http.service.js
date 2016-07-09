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
var HTTPService = (function () {
    function HTTPService(_http) {
        this._http = _http;
    }
    // METHODEN FÜR NOTES
    HTTPService.prototype.createNote = function (content) {
        var neu = { "content": content };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this._http
            .post('resources/access/user/createNote', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPService.prototype.readNotes = function () {
        return this._http.get("resources/access/user/readNotes").map(function (res) { return res.json(); });
    };
    HTTPService.prototype.updateNote = function (id, content) {
        var neu = { "id": id, "content": content };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this._http
            .post('resources/access/user/updateNote', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPService.prototype.deleteNote = function (id) {
        var neu = { "id": id };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this._http
            .post('resources/access/user/deleteNote', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    // METHODEN FÜR USER
    HTTPService.prototype.userinfo = function () {
        return this._http.get("resources/access/user/info").map(function (res) { return res.json(); });
    };
    HTTPService.prototype.register = function (loginName, password) {
        var neu = { "loginName": loginName, "password": password };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this._http
            .post('resources/access/register', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPService.prototype.login = function (loginName, password, remember) {
        var neu = { "loginName": loginName, "password": password, "remember": remember };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this._http
            .post('resources/access/login', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPService.prototype.changePassword = function (id, password) {
        var neu = { "id": id, "password": password };
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/text');
        return this._http
            .post('resources/access/user/changePassword', neu, {
            headers: headers
        })
            .map(function (response) { return response.text(); });
    };
    HTTPService.prototype.logout = function () {
        return this._http.get("resources/access/user/logout").map(function (res) { return res.text(); });
    };
    HTTPService.prototype.deleteAccount = function (id) {
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
    HTTPService.prototype.deleteNotes = function () {
        return this._http
            .get('resources/access/admin/deleteAllNotes')
            .map(function (response) { return response.text(); });
    };
    HTTPService.prototype.deleteUsers = function () {
        return this._http.get("resources/access/admin/deleteAllUsers").map(function (res) { return res.json(); });
    };
    HTTPService.prototype.allNotes = function () {
        return this._http.get("resources/access/admin/readAllNotes").map(function (res) { return res.json(); });
    };
    HTTPService.prototype.allUsers = function () {
        return this._http.get("resources/access/admin/readAllUsers").map(function (res) { return res.json(); });
    };
    // TEST METHODEN
    HTTPService.prototype.getNotes = function (url) {
        return this._http.get(url).map(function (res) { return res.json(); });
    };
    HTTPService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HTTPService);
    return HTTPService;
}());
exports.HTTPService = HTTPService;
//# sourceMappingURL=http.service.js.map