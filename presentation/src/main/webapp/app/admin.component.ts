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
        console.log("loading notes...");
        this.alletodosanzeigen = true;
        this.alleuseranzeigen = false;
        this._httpService.allNotes().subscribe(
            response => this.todos = response,
            err => alert("failed"),
            () => console.log("ready")
        );
    }

    deleteAllNotes() {
        console.log("deleting all notes...");
        this.alletodosanzeigen = true;
        this.alleuseranzeigen = false;
        this._httpService.deleteNotes().subscribe(
            response => {},
            err => console.log("failed"),
            () => {
                console.log("success");
                this.getAllNotes()
            }
        );
    }

    getAllUsers() {
        console.log("loading users...");
        this.alletodosanzeigen = false;
        this.alleuseranzeigen = true;
        this._httpService.allUsers().subscribe(
            res => this.users = res,
            err => alert(err),
            () => console.log("ready")
        );
    }

    deleteAllUsers() {
        console.log("deleting all users...");
        this.alletodosanzeigen = false;
        this.alleuseranzeigen = true;
        this._httpService.deleteUsers().subscribe(
            response => {},
            err => console.log("failed"),
            () => {
                console.log("success");
                this.getAllUsers()
            }
        );
    }
}