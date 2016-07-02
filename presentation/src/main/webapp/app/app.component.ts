import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTPTestService} from "./http-test.service";

import {DashboardComponent} from './dashboard.component';
import {HeroesComponent} from './heroes.component';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import {TodoComponent} from './todo.component';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';

@Component({
    selector: 'my-app',
    templateUrl: '/templates/header.html',
//  styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HeroService,
        HTTPTestService
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
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterComponent
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
    },
    {
        path: '/todo',
        name: 'Todo',
        component: TodoComponent
    }
])

export class AppComponent {

    success : number;
    title = 'Noteable';

    constructor(private _httpService:HTTPTestService) {
    }

    logout() {
        this._httpService.logout().subscribe(
            response => this.success = parseInt(response)
        );


        if (this.success == null) {
            alert("Logout fehlgeschlagen!");
        }
        else {
            alert("Logout erfolgreich!");
        }
    }
}