import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTPTestService} from "./http.service";

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