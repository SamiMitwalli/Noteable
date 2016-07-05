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
var todo_component_1 = require('./todo.component');
var login_component_1 = require('./login.component');
var register_component_1 = require('./register.component');
/*Hero example*/
var dashboard_component_1 = require('./hero_example/dashboard.component');
var heroes_component_1 = require('./hero_example/heroes.component');
var hero_detail_component_1 = require('./hero_example/hero-detail.component');
var hero_service_1 = require('./hero_example/hero.service');
var AppComponent = (function () {
    //    mode = 'Observable';
    function AppComponent(_httpService, router) {
        this._httpService = _httpService;
        this.router = router;
        this.title = 'Noteable';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    AppComponent.prototype.navTodo = function (router) {
        if (this.user !== undefined) {
            router.navigate(['Todo']);
        }
    };
    AppComponent.prototype.getUser = function () {
        var _this = this;
        this._httpService.userinfo()
            .subscribe(function (response) { return _this.user = response.loginName; }, function (error) { return function () {
            console.log("nicht eingeloggt.");
        }; }, function () { return _this.router.navigate(['Todo']); });
    };
    AppComponent.prototype.logout = function () {
        var _this = this;
        var success;
        this._httpService.logout()
            .subscribe(function (response) { return success = response; }, function (error) { return console.log("logout failed"); }, function () {
            console.log("logout successfully");
            _this.user = null;
            _this.router.navigate(['Login']);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: '/templates/header.html',
            //  styleUrls: ['app/app.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS,
                hero_service_1.HeroService,
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
                path: '/todo',
                name: 'Todo',
                component: todo_component_1.TodoComponent
            },
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: dashboard_component_1.DashboardComponent
            },
            {
                path: '/detail/:id',
                name: 'HeroDetail',
                component: hero_detail_component_1.HeroDetailComponent
            },
            {
                path: '/heroes',
                name: 'Heroes',
                component: heroes_component_1.HeroesComponent
            }
        ]), 
        __metadata('design:paramtypes', [http_service_1.HTTPService, router_deprecated_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map