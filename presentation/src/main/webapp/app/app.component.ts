import {Component} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {HTTPService} from "./http.service";

import {TodoComponent} from './todo.component';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';

/*Hero example*/
import {DashboardComponent} from './hero_example/dashboard.component';
import {HeroesComponent} from './hero_example/heroes.component';
import {HeroDetailComponent} from './hero_example/hero-detail.component';
import {HeroService} from './hero_example/hero.service';

@Component({
    selector: 'my-app',
    templateUrl: '/templates/header.html',
//  styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HeroService,
        HTTPService
    ]
})

@RouteConfig([
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent,
        useAsDefault: true
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterComponent
    },
    {
        path: '/todo',
        name: 'Todo',
        component: TodoComponent
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent
    },
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
    },
    {
        path: '/heroes',
        name: 'Heroes',
        component: HeroesComponent
    }
])

export class AppComponent {

    title = 'Noteable';
    response:any;
    user:string;
//    mode = 'Observable';

    constructor(private _httpService:HTTPService,
                private router:Router) {
    }

    ngOnInit() {
        this.getUser();
    }

    navTodo(router:Router) {
        if (this.user !== undefined) {
            router.navigate(['Todo'])
        }
    }

    getUser() {
        this._httpService.userinfo()
            .subscribe(
                response => this.user = response.loginName,
                error => () => {
                    console.log("nicht eingeloggt.")
                },
                () => this.router.navigate(['Todo'])
            );
    }

    logout() {
        var success:any;
        this._httpService.logout()
            .subscribe(
                response => success = response,
                error => console.log("logout failed"),
                () => {
                    console.log("logout successfully");
                    this.user = null;
                    this.router.navigate(['Login'])
                }
            );
    }
}