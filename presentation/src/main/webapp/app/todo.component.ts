import { Component } from '@angular/core';
import { HTTPTestService } from "./http-test.service";

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
    currentId:number;

    newTodo:string;
/*    todos = TODOS;*/

    constructor(private _httpService: HTTPTestService){
        this.update();
        this.newTodo = '';
    }

/*    showEditDialog() {
        bootbox.prompt({
            title: 'What is your real name?',
            value: 'Hallo',
            callback: function (result) {
                if (result === null) {
                    Example.show('Prompt dismissed');
                } else {
                    Example.show('Hi <b>' + result + '</b>');
                }
            }
        })
    }*/
    
    update(){
        this._httpService.getNotes("http://jsonplaceholder.typicode.com/todos").subscribe(
            data => this.todos = data,
            error => alert("Something went wrong"),
            () => console.log("Finished ")
        );
    }
    addNote()
    {
        //TODO Wie bekomme ich die aktuelle Userid bzw. den aktuellen usernamen 
        
        this._httpService.newNote(1,this.content ,"Philipp").subscribe(
            response => this.response=response);
        this.update();
        alert(this.response);
    }
    deleteAll()
    {
        //TODO Wie weiß ich ob ich Admin bin ?
        
        this._httpService.deleteAll("/resources/Notes/deleteAll").subscribe(
            data => this.response = data,
            error => this.error=error,
            () => console.log("Success")
        );
    }
    deleteNote()
    {
        //TODO Auch hier wie bekomme ich die aktulle Userid?

        this._httpService.deleteNote(this.currentId).subscribe(
            response => this.response=response);
        this.update();
        alert(this.response);
    }
    updateNote()
    {
        //TODO Wie bekomme ich die aktuelle Userid bzw. den aktuellen usernamen vom Bearbeiten feld ?

        //Beispiel:

        this._httpService.updateNote(1,this.content ,"Philipp").subscribe(
            response => this.response=response);
        this.update();
        alert(this.response);
    }
}