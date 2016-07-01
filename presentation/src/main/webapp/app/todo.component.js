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
var http_test_service_1 = require("./http-test.service");
var Todo = (function () {
    function Todo() {
    }
    return Todo;
}());
exports.Todo = Todo;
var TODOS = [
    { id: 1, text: 'Mr. Nice', owner: 'User1' },
    { id: 2, text: 'Narco', owner: 'User1' },
    { id: 3, text: 'Bombasto', owner: 'User1' },
    { id: 4, text: 'Celeritas', owner: 'User1' },
    { id: 5, text: 'Magneta', owner: 'User1' },
    { id: 6, text: 'RubberMan', owner: 'User1' },
    { id: 7, text: 'Dynama', owner: 'User1' },
    { id: 8, text: 'Dr IQ', owner: 'User1' },
    { id: 9, text: 'Magma', owner: 'User1' }
];
var TodoComponent = (function () {
    /*    todos = TODOS;*/
    function TodoComponent(_httpService) {
        this._httpService = _httpService;
        this.test();
        //this.update();
        this.newTodo = '';
    }
    TodoComponent.prototype.showEditDialog = function (text) {
        bootbox.setDefaults({
            locale: "de",
        });
        bootbox.prompt({
            title: 'ToDo bearbeiten',
            value: text,
            callback: function (result) {
                if (result === null) {
                    alert("ok");
                }
                else {
                    alert("nicht ok");
                }
            }
        });
    };
    TodoComponent.prototype.test = function () {
        var _this = this;
        this._httpService.getNotes("http://jsonplaceholder.typicode.com/todos").subscribe(function (data) { return _this.todos = data; }, function (error) { return alert("Something went wrong"); }, function () { return console.log("Finished "); });
    };
    TodoComponent.prototype.update = function () {
        var _this = this;
        //TODO Restschnittstelle ansteuern
        this._httpService.readNote(this.currentId).subscribe(function (response) { return _this.todos = response; });
    };
    TodoComponent.prototype.addNote = function () {
        //TODO Wie bekomme ich die aktuelle Userid bzw. den aktuellen usernamen 
        var _this = this;
        this._httpService.newNote(this.currentId, this.content, this.owner).subscribe(function (response) { return _this.noteid = parseInt(response); });
        this.update();
        //alert(this.response);
    };
    TodoComponent.prototype.deleteAll = function () {
        //TODO Wie weiß ich ob ich Admin bin ?
        var _this = this;
        this._httpService.deleteAllNotes().subscribe(function (data) { return _this.response = data; }, function (error) { return _this.error = error; }, function () { return console.log("Success"); });
    };
    TodoComponent.prototype.deleteNote = function () {
        //TODO Auch hier wie bekomme ich die aktulle Userid?
        var _this = this;
        this._httpService.deleteNote(this.noteid).subscribe(function (response) { return _this.noteid = parseInt(response); });
        this.update();
        alert(this.response);
    };
    TodoComponent.prototype.updateNote = function () {
        //TODO Wie bekomme ich die aktuelle Userid bzw. den aktuellen usernamen vom Bearbeiten feld ?
        var _this = this;
        //Beispiel:
        this._httpService.updateNote(this.currentId, this.content, this.owner).subscribe(function (response) { return _this.noteid = parseInt(response); });
        this.update();
        // alert(this.response);
    };
    TodoComponent = __decorate([
        core_1.Component({
            selector: 'todo',
            templateUrl: 'templates/todo.html',
            providers: [http_test_service_1.HTTPTestService]
        }), 
        __metadata('design:paramtypes', [http_test_service_1.HTTPTestService])
    ], TodoComponent);
    return TodoComponent;
}());
exports.TodoComponent = TodoComponent;
//# sourceMappingURL=todo.component.js.map