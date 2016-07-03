import { Component } from '@angular/core';
import {HTTPTestService} from "./http.service";

@Component({
    selector: 'register',
    templateUrl : 'templates/register.html',
    providers:[HTTPTestService]
})

export class RegisterComponent {

    response : any;
    loginName:string;
    password1:string;
    password2:string;
    currentId:number;


    constructor(private _httpService: HTTPTestService){

    }

    createUser()
    {
        if(this.password1 === this.password2)
         {
                 this._httpService.register(this.loginName,this.password1).subscribe(
                     response => this.currentId = parseInt(response)
                 );
         }
        else
        {
            alert("Fehler: Die eingegebenen Passwörter stimmen nicht überein.");
        }
    }
}