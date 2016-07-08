import {Component, OnInit} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
//import {Observable} from 'rxjs/Rx';

import {HTTPService} from "./http.service";

import {TodoComponent} from './todo.component';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {AdminComponent} from './admin.component';

import {UserData, USER} from './userData';

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
        path: '/adminpanel',
        name: 'AdminPanel',
        component: AdminComponent
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

export class AppComponent implements OnInit {

    title = 'Noteable';
    user:UserData;
    time:any;

    constructor(private _httpService:HTTPService,
                private router:Router) {

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

    ngOnInit() {
        this.user = USER;
        this.getUser();
    }

    getUser() {
        this._httpService.userinfo()
            .subscribe(
                response => this.user.name = response.loginName,
                error => () => {
                    console.log("nicht eingeloggt.")
                },
                () => {
                    this.user.loggedIn = true;
                    this.router.navigate(['Todo'])
                }
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
                    this.user.name = null;
                    this.user.loggedIn = false;
                    this.router.navigate(['Login'])
                }
            );
    }
}