"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_service_1 = require("./http.service");
var router_deprecated_1 = require('@angular/router-deprecated');
var TodoComponent = (function () {
    function TodoComponent(_httpService, router) {
        var _this = this;
        this._httpService = _httpService;
        this.router = router;
        //this.test();
        this.update();
        this._httpService.userinfo().subscribe(function (res) { return _this.response = res; }, function (err) { return _this.admin = false; }, function () {
            if (_this.response.loginName == "root") {
                _this.admin = true;
            }
        });
    }
    TodoComponent.prototype.adminSpace = function () {
        this.router.navigate(['AdminPanel']);
    };
    TodoComponent.prototype.addNote = function () {
        var _this = this;
        this._httpService.createNote(this.newTodo).subscribe(function (response) { return _this.response = response; }, function (error) { return console.log("add note failed"); }, function () {
            console.log("todo added successfully");
            _this.newTodo = "";
            _this.update();
        });
    };
    TodoComponent.prototype.update = function () {
        var _this = this;
        console.log("loading notes...");
        this._httpService.readNotes().subscribe(function (response) { return _this.todos = response; }, function (error) { return console.log("loading failed"); }, function () { return console.log("loading finished"); });
    };
    TodoComponent.prototype.showEditDialog = function (id, content) {
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
    };
    TodoComponent.prototype.showDeleteDialog = function (id, content) {
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
    };
    TodoComponent.prototype.updateNote = function (noteId, content) {
        var _this = this;
        this._httpService.updateNote(noteId, content).subscribe(function (response) { return _this.noteid = parseInt(response); }, function (error) { return console.log("update note failed"); }, function () {
            console.log("note " + _this.noteid + " updated");
            _this.update();
        });
    };
    TodoComponent.prototype.deleteNote = function (id) {
        var _this = this;
        this._httpService.deleteNote(id).subscribe(function (response) { return _this.noteid = parseInt(response); }, function (error) { return console.log("delete note failed"); }, function () {
            console.log("delete note successfully");
            _this.update();
        });
    };
    // TEST METHODEN
    TodoComponent.prototype.test = function () {
        var _this = this;
        this._httpService.getNotes("http://jsonplaceholder.typicode.com/todos").subscribe(function (data) { return _this.todos = data; }, function (error) { return alert("Something went wrong"); }, function () { return console.log("Finished "); });
    };
    TodoComponent = __decorate([
        core_1.Component({
            selector: 'todo',
            templateUrl: 'templates/todo.html',
            providers: [http_service_1.HTTPService]
        }), 
        __metadata('design:paramtypes', [http_service_1.HTTPService, router_deprecated_1.Router])
    ], TodoComponent);
    return TodoComponent;
}());
exports.TodoComponent = TodoComponent;
//# sourceMappingURL=todo.component.js.map