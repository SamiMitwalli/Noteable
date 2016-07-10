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
var router_deprecated_1 = require('@angular/router-deprecated');
var http_service_1 = require("./http.service");
var AdminComponent = (function () {
    function AdminComponent(_httpService, router) {
        this._httpService = _httpService;
        this.router = router;
    }
    AdminComponent.prototype.backToTodos = function () {
        this.router.navigate(['Todo']);
    };
    AdminComponent.prototype.getAllNotes = function () {
        var _this = this;
        console.log("loading notes...");
        this.alletodosanzeigen = true;
        this.alleuseranzeigen = false;
        this._httpService.allNotes().subscribe(function (response) { return _this.todos = response; }, function (err) { return alert("failed"); }, function () { return console.log("ready"); });
    };
    AdminComponent.prototype.deleteAllNotes = function () {
        var _this = this;
        console.log("deleting all notes...");
        this.alletodosanzeigen = true;
        this.alleuseranzeigen = false;
        this._httpService.deleteNotes().subscribe(function (response) { }, function (err) { return console.log("failed"); }, function () {
            console.log("success");
            _this.getAllNotes();
        });
    };
    AdminComponent.prototype.getAllUsers = function () {
        var _this = this;
        console.log("loading users...");
        this.alletodosanzeigen = false;
        this.alleuseranzeigen = true;
        this._httpService.allUsers().subscribe(function (res) { return _this.users = res; }, function (err) { return alert(err); }, function () { return console.log("ready"); });
    };
    AdminComponent.prototype.deleteAllUsers = function () {
        var _this = this;
        console.log("deleting all users...");
        this.alletodosanzeigen = false;
        this.alleuseranzeigen = true;
        this._httpService.deleteUsers().subscribe(function (response) { }, function (err) { return console.log("failed"); }, function () {
            console.log("success");
            _this.getAllUsers();
        });
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'admin',
            templateUrl: 'templates/adminPanel.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_service_1.HTTPService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HTTPService, router_deprecated_1.Router])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map