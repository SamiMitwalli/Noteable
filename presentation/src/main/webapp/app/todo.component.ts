import {Component} from '@angular/core';
import {HTTPService} from "./http.service";
import {} from 'bootbox';
import {} from 'jquery';

@Component({
    selector: 'todo',
    templateUrl: 'templates/todo.html',
    providers: [HTTPService]
})

export class TodoComponent {
    todos:any;
    content:string;
    response:any;
    error:string;
    userId:number;
    owner:any;
    noteid:number;
    newTodo:string;

    constructor(private _httpService:HTTPService) {
        //this.test();
        this.update();
        this.newTodo = '';
    }

    showEditDialog(id:number, content:string) {

        bootbox.addLocale("todo", {
            OK: 'OK',
            CANCEL: 'Abbrechen',
            CONFIRM: 'Speichern'
        });
        bootbox.setDefaults({
            locale: "todo",
        });
        var that = this;
        bootbox.prompt({
            title: 'ToDo bearbeiten',
            value: content,
            callback: function (result) {
                    that.updateNote(id,result);
                }
        });
    }

    showDeleteDialog(id:number, content:string) {
        var that = this;
        bootbox.dialog({
            title: "Wollen Sie diesen Eintrag wirklich löschen?",
            message: content,
            buttons: {
                cancel: {
                    label: "Abbrechen",
                    className: "btn-default",
                },
                confirm: {
                    label: "Löschen",
                    className: "btn-danger",
                    callback: function () {
                        that.deleteNote(id);
                        that.update();
                    }
                },
            }
        });
    }

    update() {
        this._httpService.readNotes().subscribe(
            response => this.todos = response
        );
    }

    addNote() {
        this._httpService.createNote(this.newTodo).subscribe(
            response => this.response = response);
        this.update();
        alert(this.response);
    }

    deleteAll() {
        this._httpService.deleteNotes(this.userId).subscribe(
            data => this.response = parseInt(data),
            error => this.error = error,
            () => console.log("Success")
        );
    }

    deleteNote(id:number) {
        this._httpService.deleteNote(id).subscribe(
            response => this.noteid = parseInt(response));
        this.update();
        alert(this.response);
    }

    updateNote(noteId:number, content:string) {
        this._httpService.updateNote(noteId, content).subscribe(
            response => this.noteid = parseInt(response)),
            () => console.log("note"+this.noteid+"successfully updated");
        this.update();
    }

    // TEST METHODEN

    test() {
        this._httpService.getNotes("http://jsonplaceholder.typicode.com/todos").subscribe(
            data => this.todos = data,
            error => alert("Something went wrong"),
            () => console.log("Finished ")
        );
    }
}