import {Component, OnInit} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
//import {Observable} from 'rxjs/Rx';

import {HTTPService} from "./http.service";

import {TodoComponent} from './todo.component';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {AdminComponent} from './admin.component';

import {UserData, USER} from './userData';

@Component({
    selector: 'my-app',
    templateUrl: '/templates/header.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
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
        path: '/admin',
        name: 'AdminPanel',
        component: AdminComponent
    },
    {
        path: '/todo',
        name: 'Todo',
        component: TodoComponent
    },
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
                    console.log("logout successful");
                    this.user.name = null;
                    this.user.loggedIn = false;
                    this.router.navigate(['Login'])
                }
            );
    }
}