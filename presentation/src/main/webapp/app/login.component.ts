import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HTTPService} from "./http.service";
import {UserData, USER} from './userData';

@Component({
    selector: 'login',
    templateUrl: 'templates/login.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTPService]
})

export class LoginComponent {
    loginName:string;
    password:string;
    angemeldet:string;
    remember:boolean;
    user:UserData;

    constructor(private _httpService:HTTPService, private router:Router) {
        this.user = USER;
        this.angemeldet = "false";
        this.remember = false;
    }

    login() {
        this._httpService.login(this.loginName, this.password, this.remember).subscribe(
            response => this.angemeldet = response,
            error => alert("Anmeldung fehlgeschlagen!"),
            () => {
                if (this.angemeldet == "true") {
                    console.log("login successful");
                    this.getUser();
                }
                else {
                    alert("Login fehlgeschlagen: User oder Passwort falsch!");
                    console.log("login failed");
                }
            }
        );
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
}