import { Component } from '@angular/core';
import { HTTPTestService } from "./http-test.service";
import { } from 'bootbox';
import { } from 'jquery';

export class Todo {
    id:number;
    text:string;
    owner:string;
}

const TODOS: Todo[] = [
    { id: 1, text: 'Mr. Nice' , owner: 'User1' },
    { id: 2, text: 'Narco'    , owner: 'User1' },
    { id: 3, text: 'Bombasto' , owner: 'User1' },
    { id: 4, text: 'Celeritas', owner: 'User1' },
    { id: 5, text: 'Magneta'  , owner: 'User1' },
    { id: 6, text: 'RubberMan', owner: 'User1' },
    { id: 7, text: 'Dynama'   , owner: 'User1' },
    { id: 8, text: 'Dr IQ'    , owner: 'User1' },
    { id: 9, text: 'Magma'    , owner: 'User1' }
];

@Component({
    selector: 'todo',
    templateUrl: 'templates/todo.html',
    providers:[HTTPTestService]
})

export class TodoComponent {
    // todos = TODOS;

    todos : any;
    content:string;
    response:any;
    error:string;
    userId:number;
    owner:any;
    noteid:number;

    newTodo:string;
/*    todos = TODOS;*/

    constructor(private _httpService: HTTPTestService){
        //this.test();
        
        this.update();
        
        this.newTodo = '';
    }

    showEditDialog(text:string) {

        bootbox.setDefaults({
            locale: "de",
        });
        bootbox.prompt({
            title: 'ToDo bearbeiten',
            value: text,
            callback: function (result) {
                if (result === null) {
                    alert("ok");
                } else {
                    alert("nicht ok");
                }
            }
        })
    }
    
    update()
    {
        this._httpService.readNotes().subscribe(
            response => this.todos = response
        );
    }

    addNote()
    {
        this._httpService.createNote(this.content).subscribe(
            response => this.noteid = parseInt(response));
        this.update();
    }

    deleteAll()
    {
        this._httpService.deleteNotes(this.userId).subscribe(
            data => this.response = parseInt(data),
            error => this.error = error,
            () => console.log("Success")
        );
    }
    
    deleteNote()
    {
        this._httpService.deleteNote(this.noteid).subscribe(
            response => this.noteid = parseInt(response));
        this.update();
        alert(this.response);
    }
    
    updateNote()
    {
        this._httpService.updateNote(this.userId,this.content).subscribe(
            response => this.noteid = parseInt(response));
        this.update();
    }

    // TEST METHODEN

    test()
    {
        this._httpService.getNotes("http://jsonplaceholder.typicode.com/todos").subscribe(
            data => this.todos = data,
            error => alert("Something went wrong"),
            () => console.log("Finished ")
        );
    }
}