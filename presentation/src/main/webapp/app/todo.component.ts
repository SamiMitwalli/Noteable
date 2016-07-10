import {Component} from '@angular/core';
import {HTTPService} from "./http.service";
import {} from 'bootbox';
import {} from 'jquery';

@Component({
    selector: 'todo',
    templateUrl: 'templates/todo.html',
    styles: [`
    .todo-text {
      font-size: 1.25em;
    }
  `],
    providers: [HTTPService]
})

export class TodoComponent {
    todos:any;
    content:string;
    response:any;
    noteid:number;
    newTodo:string;

    constructor(private _httpService:HTTPService) {
        //this.test();
        this.update();
    }

    addNote() {
        this._httpService.createNote(this.newTodo).subscribe(
            response => this.response = response,
            error => console.log("add note failed"),
            () => {
                console.log("todo "+this.newTodo+" added");
                this.newTodo = "";
                this.update();
            }
        );
    }

    update() {
        console.log("loading notes...")
        this._httpService.readNotes().subscribe(
            response => this.todos = response,
            error => console.log("loading failed"),
            () => console.log("ready")
        );
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
                    if (result == "") {
                        alert("Fehler: Die Todo darf nicht leer sein!");
                    }
                    else {
                        that.updateNote(parseInt(id), result);
                    }
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
                console.log("delete note "+this.noteid+" successful");
                this.update();
            }
        );
    }

    // TEST METHODEN

    test() {
        this._httpService.getNotes("http://jsonplaceholder.typicode.com/todos").subscribe(
            data => this.todos = data,
            error => alert("Something went wrong"),
            () => console.log("ready")
        );
    }
}