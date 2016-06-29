import { Component } from '@angular/core';
import {HTTPTestService} from "./http-test.service";

@Component({
    selector: 'http-test',
    template : `
  
        <ul>
        <li *ngFor="let note of getData">
        Titel : {{note.title}}, UserId: {{note.userId}}
</li>
</ul>
    `,
    providers:[HTTPTestService]
})
export class HTTPTestComponent
{
    getData : any;
    postData : string;


    constructor(private _httpService: HTTPTestService){

        this._httpService.getNotes("http://jsonplaceholder.typicode.com/todos").subscribe(
            data => this.getData = data,
            error => alert("Something went wrong"),
            () => console.log("Finished ")
        );

    }
}