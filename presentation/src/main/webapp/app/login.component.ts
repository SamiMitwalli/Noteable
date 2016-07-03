import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HTTPTestService} from "./http.service";

@Component({
    selector: 'login',
    templateUrl: 'templates/login.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTPTestService]
})

export class LoginComponent {
    loginName:string;
    password:string;
    response:any;
    userId:number;
    angemeldet:any;
    remember:boolean;

    constructor(private _httpService:HTTPTestService) {
        this.angemeldet = false;
        this.remember = false;
    }

    login() {
        this._httpService.login(this.loginName, this.password, this.remember).subscribe(
            response => this.angemeldet = response
        ); // TODO: angemeldet ist immer false

        alert(this.angemeldet.toString());

        // this.angemeldet = !!this.angemeldet;

        if (this.angemeldet) {
            alert("Login fehlgeschlagen!");
        }
        else {
            alert("Login erfolgreich!");
        }
    }
}