import { Component } from '@angular/core';
import {HTTPTestService} from "./http-test.service";

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
    samepw:boolean;


    constructor(private _httpService: HTTPTestService){
        if(this.password1 === this.password2)
        {
            alert (this.password1);
        }
    }
}