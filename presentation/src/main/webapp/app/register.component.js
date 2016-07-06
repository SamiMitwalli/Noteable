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
var RegisterComponent = (function () {
    function RegisterComponent(_httpService, router) {
        this._httpService = _httpService;
        this.router = router;
    }
    RegisterComponent.prototype.createUser = function () {
        var _this = this;
        if (this.password1 === this.password2) {
            this._httpService.register(this.loginName, this.password1).subscribe(function (response) { return _this.response = response; }, function (error) { return console.log("register failed"); }, function () {
                if (_this.response != "") {
                    alert("Registrierung erfolgreich abgeschlossen!");
                    _this.router.navigate(['Login']);
                }
                else {
                    alert("Registrierung fehlgeschlagen!");
                    console.log("register failed");
                }
            });
        }
        else {
            alert("Fehler: Die eingegebenen Passwörter stimmen nicht überein.");
        }
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: 'templates/register.html',
            providers: [http_service_1.HTTPService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HTTPService, router_deprecated_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map