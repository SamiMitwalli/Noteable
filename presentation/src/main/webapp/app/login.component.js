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
var LoginComponent = (function () {
    function LoginComponent(_httpService, router) {
        this._httpService = _httpService;
        this.router = router;
        this.angemeldet = "false";
        this.remember = false;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this._httpService.login(this.loginName, this.password, this.remember).subscribe(function (response) { return _this.angemeldet = response; }, function (error) { return alert("Anmeldung fehlgeschlagen!"); }, function () {
            if (_this.angemeldet == "true") {
                console.log("login successful");
                _this.router.navigate(['Todo']);
            }
            else {
                alert("Login fehlgeschlagen: User oder Passwort falsch!");
                console.log("login failed");
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'templates/login.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [http_service_1.HTTPService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HTTPService, router_deprecated_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map