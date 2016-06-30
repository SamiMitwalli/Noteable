import { Component } from '@angular/core';
import {HTTPTestService} from "./http-test.service";

@Component({
    selector: 'http-test',
    template : `
        <ul>
        <li *ngFor="let note of getData">
        Titel : {{note.Name}}, UserId: {{note.City}}
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
        this.update();
    }
    update(){
        this._httpService.getNotes('./citys.json').subscribe(
        data => this.getData = data,
        error => alert(error),
        () => console.log("Finished ")
    );
    }
}