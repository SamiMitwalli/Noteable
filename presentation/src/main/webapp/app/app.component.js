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
//import {Observable} from 'rxjs/Rx';
var http_service_1 = require("./http.service");
var todo_component_1 = require('./todo.component');
var login_component_1 = require('./login.component');
var register_component_1 = require('./register.component');
var admin_component_1 = require('./admin.component');
var userData_1 = require('./userData');
var AppComponent = (function () {
    function AppComponent(_httpService, router) {
        this._httpService = _httpService;
        this.router = router;
        this.title = 'Noteable';
        /*        Observable.interval(1000).subscribe(
                   x => { this.time = this.getCurrentTime();
                     }
                );*/
    }
    /*    getCurrentTime()
        {
            var time = new Date();
            return time.toLocaleTimeString();//time.getHours()+":"+time.getMinutes()+":"+time.getSeconds();
        }*/
    AppComponent.prototype.ngOnInit = function () {
        this.user = userData_1.USER;
        this.getUser();
    };
    AppComponent.prototype.getUser = function () {
        var _this = this;
        this._httpService.userinfo()
            .subscribe(function (response) { return _this.user.name = response.loginName; }, function (error) { return function () {
            console.log("nicht eingeloggt.");
        }; }, function () {
            _this.user.loggedIn = true;
            _this.router.navigate(['Todo']);
        });
    };
    AppComponent.prototype.logout = function () {
        var _this = this;
        var success;
        this._httpService.logout()
            .subscribe(function (response) { return success = response; }, function (error) { return console.log("logout failed"); }, function () {
            console.log("logout successful");
            _this.user.name = null;
            _this.user.loggedIn = false;
            _this.router.navigate(['Login']);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: '/templates/header.html',
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                http_service_1.HTTPService
            ]
        }),
        router_deprecated_1.RouteConfig([
            {
                path: '/login',
                name: 'Login',
                component: login_component_1.LoginComponent,
                useAsDefault: true
            },
            {
                path: '/register',
                name: 'Register',
                component: register_component_1.RegisterComponent
            },
            {
                path: '/admin',
                name: 'AdminPanel',
                component: admin_component_1.AdminComponent
            },
            {
                path: '/todo',
                name: 'Todo',
                component: todo_component_1.TodoComponent
            },
        ]), 
        __metadata('design:paramtypes', [http_service_1.HTTPService, router_deprecated_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map