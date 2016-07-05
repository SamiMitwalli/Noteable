import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {HTTPService} from "./http.service";

@Component({
    selector: 'register',
    templateUrl: 'templates/register.html',
    providers: [HTTPService]
})

export class RegisterComponent {

    loginName:string;
    password1:string;
    password2:string;
    response:string;

    constructor(private _httpService:HTTPService,
                private router:Router) {
    }

    createUser() {
        if (this.password1 === this.password2) {
            this._httpService.register(this.loginName, this.password1).subscribe(
                response => this.response = response,
                error => console.log("register failed"),
                () => {
                    alert(this.response);
                    if (this.response != "") {
                        alert("registriert!");
                        this.router.navigate(['Login']);
                    }
                    else {
                        alert("Registrierung fehlgeschlagen!");
                        console.log("register failed");
                    }
                }
            );
        }
        else {
            alert("Fehler: Die eingegebenen Passwörter stimmen nicht überein.");
        }
    }
}