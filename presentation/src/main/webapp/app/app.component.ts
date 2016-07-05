import {Component, OnInit} from '@angular/core';
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
import {RouterConfig} from "@angular/router";

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

    errorMessage:string;
    success:number;
    title = 'Noteable';
    response:any;
    user:string;
    mode = 'Observable';

    constructor(private _httpService:HTTPService,
                private router:Router) {
        router.root.subscribe((val) => this.getUser());
        this.navTodo(router);
    }

    navTodo(router:Router) {
        if (typeof this.user !== undefined) {
            router.navigate(['Todo'])
        }
    }

    /*    ngOnInit() {
     this.getUser();
     }*/

    getUser() {
        this._httpService.userinfo()
            .subscribe(
                response => this.user = response.loginName,
                error => console.log("nicht eingeloggt"),
                () => console.log(this.user)
            )
    }

    logout() {
        this._httpService.logout()
            .subscribe(
                response => this.success = parseInt(response),
                () => function () {
                    if (this.success == null) {
                        alert("Logout fehlgeschlagen!");
                    }
                    else {
                        alert("Logout erfolgreich!");
                    }
                }
            );
    }
}