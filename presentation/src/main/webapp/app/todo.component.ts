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

    showEditDialog(id:string, content:string) {

        var that = this;
        bootbox.addLocale("todo", {
            OK: 'OK',
            CANCEL: 'Abbrechen',
            CONFIRM: 'Speichern'
        });
        bootbox.setDefaults({
            locale: "todo",
        });
        bootbox.prompt({
            title: 'ToDo bearbeiten',
            value: content,
            callback: function (result) {
                if (result != null) {
                    alert(typeof parseInt(id)+id);
                    that.updateNote(parseInt(id), result);
                }
            }
        });
    }

    showDeleteDialog(id:string, content:string) {
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
                        that.deleteNote(parseInt(id));
                    }
                },
            }
        });
    }

    update() {
        console.log("loading notes...")
        this._httpService.readNotes().subscribe(
            response => this.todos = response,
            error => console.log("loading failed"),
            () => console.log("loading finished")
        );
    }

    addNote() {
        this._httpService.createNote(this.newTodo).subscribe(
            response => this.response = response,
            error => console.log("add note failed"),
            () => {
                console.log("todo added successfully");
                this.update()
            }
        );
    }

    updateNote(noteId:number, content:string) {
        this._httpService.updateNote(noteId, content).subscribe(
            response => this.noteid = parseInt(response),
            error => console.log("update note failed"),
            () => {
                console.log("note " + this.noteid + " updated");
                this.update()
            }
        );
    }

    deleteNote(id:number) {
        this._httpService.deleteNote(id).subscribe(
            response => this.noteid = parseInt(response),
            error => console.log("delete note failed"),
            () => {
                console.log("delete note successfully");
                this.update();
            }
        );
    }

    deleteAll() {
        this._httpService.deleteNotes(this.userId).subscribe(
            data => this.response = parseInt(data),
            error => this.error = error,
            () => console.log("Success")
        );
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