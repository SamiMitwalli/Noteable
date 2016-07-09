import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router-deprecated';
import {HTTPService} from "./http.service";

@Component({
    selector: 'admin',
    templateUrl: 'templates/adminPanel.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTPService]
})

export class AdminComponent {

    alleuseranzeigen:boolean;
    alletodosanzeigen:boolean;
    todos:any;
    users:any;
    name:any;


    constructor(private _httpService:HTTPService,
                private router:Router) {
    }

    backToTodos() {
        this.router.navigate(['Todo']);
    }

    getAllNotes() {
        this.alletodosanzeigen = true;
        this.alleuseranzeigen = false;
        this._httpService.allNotes().subscribe(
            response => this.todos = response,
            err => alert("Fehler"),
            () => console.log("Erfolg")
        );
    }

    deleteAllNotes() {
        this.alletodosanzeigen = true;
        this.alleuseranzeigen = false;
        this._httpService.deleteNotes().subscribe(
            response => console.log("success"),
            err => console.log("failed"),
            () => this.getAllNotes()
        );
    }

    getAllUsers() {
        this.alletodosanzeigen = false;
        this.alleuseranzeigen = true;
        this._httpService.allUsers().subscribe(
            res => this.users = res,
            err => alert(err),
            () => console.log("Success")
        );
    }

    deleteAllUsers() {
        this.alletodosanzeigen = false;
        this.alleuseranzeigen = true;
        this._httpService.deleteUsers().subscribe(
            response => console.log("deleting all users..."),
            err => console.log("failed"),
            () => console.log("ready")
        );
    }
}