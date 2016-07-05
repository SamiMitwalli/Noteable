import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HTTPService} from "./http.service";

@Component({
    selector: 'login',
    templateUrl: 'templates/login.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTPService]
})

export class LoginComponent {
    loginName:string;
    password:string;
    response:any;
    userId:number;
    angemeldet:string;
    remember:boolean;

    constructor(private _httpService:HTTPService, private router:Router) {
        this.angemeldet = "false";
        this.remember = false;
    }

    login() {
        this._httpService.login(this.loginName, this.password, this.remember).subscribe(
            response => this.angemeldet = response,
            error => alert("Something went wrong"),
            () => {
                if (this.angemeldet == "true") {
                    console.log("login successful");
                    this.router.navigate(['Todo']);
                }
                else {
                    alert("Login fehlgeschlagen!");
                    console.log("login failed");
                }
            }
        );
    }
}